const {
	app,
	BrowserWindow,
	ipcMain,
	dialog,
	shell,
	Tray,
	Menu,
	nativeImage,
} = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { spawn, exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

const isDev = process.argv.includes("--dev");
const APP_DIR = isDev
	? path.join(__dirname, "../..") // monorepo root saat dev
	: path.join(process.resourcesPath, "app");

const CONFIG_FILE = path.join(app.getPath("userData"), "cbt-config.json");

let mainWindow = null;
let tray = null;
let serverProcess = null;

// ─── Window ─────────────────────────────────────────────────────────────────
function createWindow(page = "dashboard") {
	const iconPath = path.join(__dirname, "../assets/icon.png");
	mainWindow = new BrowserWindow({
		width: 960,
		height: 680,
		minWidth: 800,
		minHeight: 600,
		icon: fs.existsSync(iconPath) ? iconPath : undefined,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
		titleBarStyle: "hidden",
		frame: false,
		backgroundColor: "#1e1e2e",
	});

	mainWindow.loadFile(path.join(__dirname, "renderer/index.html"), {
		hash: page,
	});

	if (isDev) mainWindow.webContents.openDevTools();

	// Hide to tray on close, don't quit
	mainWindow.on("close", (e) => {
		if (!app.isQuitting) {
			e.preventDefault();
			mainWindow.hide();
		}
	});
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

// ─── App Ready ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
	const config = loadConfig();
	const isInstalled = config.installed === true;

	createWindow(isInstalled ? "dashboard" : "installer");
	setupTray();

	app.on("activate", () => {
		if (!mainWindow) createWindow();
	});
});

app.on("window-all-closed", () => {
	// Don't quit — stay in tray
});

app.on("before-quit", () => {
	app.isQuitting = true;
});

// ─── Tray ───────────────────────────────────────────────────────────────────
function setupTray() {
	const iconPath = path.join(__dirname, "../assets/tray-icon.png");
	let img = nativeImage.createEmpty();
	if (fs.existsSync(iconPath))
		img = nativeImage
			.createFromPath(iconPath)
			.resize({ width: 16, height: 16 });
	try {
		tray = new Tray(img);
	} catch {
		return;
	} // skip tray on Linux without systray support

	const buildMenu = () =>
		Menu.buildFromTemplate([
			{ label: "CBT RSMS Control Panel", enabled: false },
			{ type: "separator" },
			{
				label: serverProcess ? "⏹ Stop Server" : "▶ Start Server",
				click: () => (serverProcess ? stopServer() : startServer()),
			},
			{
				label: "🖥 Buka Control Panel",
				click: () => {
					if (mainWindow) mainWindow.show();
					else createWindow();
				},
			},
			{
				label: "🌐 Buka Aplikasi di Browser",
				click: () => {
					const cfg = loadConfig();
					shell.openExternal(`http://localhost:${cfg.port || 3000}`);
				},
			},
			{ type: "separator" },
			{
				label: "Keluar",
				click: () => {
					app.isQuitting = true;
					stopServer();
					app.quit();
				},
			},
		]);

	tray.setToolTip("CBT RSMS Server");
	tray.setContextMenu(buildMenu());
	tray.on("double-click", () => {
		if (mainWindow) mainWindow.show();
		else createWindow();
	});
}

// ─── Config ─────────────────────────────────────────────────────────────────
function loadConfig() {
	try {
		return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
	} catch {
		return {};
	}
}

function saveConfig(data) {
	const existing = loadConfig();
	const merged = { ...existing, ...data };
	fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2));
	return merged;
}

// ─── Server Management ───────────────────────────────────────────────────────
function startServer() {
	if (serverProcess) return;
	const rootDir = APP_DIR;
	const backendDir = path.join(APP_DIR, "backend");

	// Try PM2 first (if installed and ecosystem file exists)
	const ecoFile = fs.existsSync(path.join(rootDir, "ecosystem.config.cjs"))
		? "ecosystem.config.cjs"
		: "ecosystem.config.js";
	const isWin32 = process.platform === "win32";
	const shellExe = isWin32
		? process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe"
		: true;
	const pm2 = spawn("pm2", ["start", ecoFile, "--env", "production"], {
		cwd: rootDir,
		shell: shellExe,
		stdio: ["ignore", "pipe", "pipe"],
	});

	pm2.on("close", (code) => {
		if (code === 0) {
			serverProcess = "pm2";
			mainWindow?.webContents.send("server-status", { running: true });
			mainWindow?.webContents.send("server-log", {
				type: "info",
				msg: "▶ Server dimulai via PM2\n",
			});
			// Stream PM2 logs
			const logStream = spawn("pm2", ["logs", "--nostream", "--lines", "20"], {
				shell: shellExe,
				stdio: ["ignore", "pipe", "pipe"],
			});
			logStream.stdout?.on("data", (d) =>
				mainWindow?.webContents.send("server-log", {
					type: "info",
					msg: d.toString(),
				}),
			);
		} else {
			// Fallback: direct Node spawn
			startServerDirect(backendDir);
		}
	});
	pm2.on("error", () => startServerDirect(backendDir));
}

function startServerDirect(backendDir) {
	serverProcess = spawn("node", ["src/app.js"], {
		cwd: backendDir,
		env: { ...process.env, NODE_ENV: "production" },
		stdio: ["ignore", "pipe", "pipe"],
	});
	serverProcess.stdout.on("data", (d) =>
		mainWindow?.webContents.send("server-log", {
			type: "info",
			msg: d.toString(),
		}),
	);
	serverProcess.stderr.on("data", (d) =>
		mainWindow?.webContents.send("server-log", {
			type: "error",
			msg: d.toString(),
		}),
	);
	serverProcess.on("exit", (code) => {
		serverProcess = null;
		mainWindow?.webContents.send("server-status", { running: false, code });
	});
	mainWindow?.webContents.send("server-status", { running: true });
}

function stopServer() {
	if (serverProcess === "pm2") {
		if (process.platform === "win32") {
			const sysRoot =
				process.env.SystemRoot || process.env.SYSTEMROOT || "C:\\Windows";
			const cmdExe = path.join(sysRoot, "System32", "cmd.exe");
			exec(`"${cmdExe}" /d /s /c "pm2 stop all"`, () => {});
		} else {
			exec("pm2 stop all", () => {});
		}
		serverProcess = null;
	} else if (serverProcess) {
		serverProcess.kill();
		serverProcess = null;
	}
}

// ─── IPC Handlers ────────────────────────────────────────────────────────────
ipcMain.handle("get-config", () => loadConfig());
ipcMain.handle("save-config", (_, data) => saveConfig(data));
ipcMain.handle("get-server-status", () => ({ running: !!serverProcess }));
ipcMain.handle("start-server", () => {
	startServer();
	return { ok: true };
});
ipcMain.handle("stop-server", () => {
	stopServer();
	return { ok: true };
});
ipcMain.handle("restart-server", async () => {
	stopServer();
	await new Promise((r) => setTimeout(r, 1000));
	startServer();
	return { ok: true };
});
ipcMain.handle("open-browser", () => {
	const cfg = loadConfig();
	shell.openExternal(`http://localhost:${cfg.port || 3000}`);
});
ipcMain.handle("open-url", (_, url) => shell.openExternal(url));
ipcMain.handle("open-folder", (_, folder) =>
	shell.openPath(folder === "app" ? APP_DIR : app.getPath("userData")),
);

// Install Redis via winget (Windows 10/11)
ipcMain.handle("install-redis-winget", async () => {
	try {
		await execAsync(
			"winget install Redis.Redis --silent --accept-package-agreements --accept-source-agreements",
		);
		return { ok: true };
	} catch (err) {
		return { ok: false, error: err.message };
	}
});

// Window controls
ipcMain.on("win-minimize", () => mainWindow?.minimize());
ipcMain.on("win-maximize", () =>
	mainWindow?.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize(),
);
ipcMain.on("win-close", () => mainWindow?.hide()); // hide to tray
ipcMain.on("win-quit", () => {
	app.isQuitting = true;
	stopServer();
	app.quit();
});

// Installation
ipcMain.handle("run-install", async (_, opts) => {
	return runInstallation(opts);
});

// Check commands exist
ipcMain.handle("check-deps", async () => {
	const isWin = process.platform === "win32";
	const checks = await Promise.allSettled([
		execAsync("node --version").then((r) => ({
			name: "Node.js",
			version: r.stdout.trim(),
			ok: true,
		})),
		execAsync("npm --version").then((r) => ({
			name: "npm",
			version: r.stdout.trim(),
			ok: true,
		})),
		execAsync(
			isWin ? "pg_isready --version 2>nul || psql --version" : "psql --version",
		)
			.then((r) => ({
				name: "PostgreSQL",
				version: r.stdout.trim() || "terdeteksi",
				ok: true,
			}))
			.catch(async () => {
				// Try finding postgres service on Windows
				if (isWin) {
					try {
						const r = await execAsync(
							"sc query type= all | findstr /i postgres",
						);
						if (r.stdout.trim())
							return {
								name: "PostgreSQL",
								version: "service berjalan",
								ok: true,
							};
					} catch {}
				}
				return { name: "PostgreSQL", ok: false, version: "" };
			}),
		execAsync("redis-cli --version")
			.then((r) => ({ name: "Redis", version: r.stdout.trim(), ok: true }))
			.catch(async () => {
				if (isWin) {
					try {
						const r = await execAsync(
							"sc query Redis 2>nul || sc query memurai 2>nul",
						);
						if (r.stdout.includes("RUNNING"))
							return { name: "Redis", version: "service berjalan", ok: true };
					} catch {}
				}
				return { name: "Redis", ok: false, version: "" };
			}),
		execAsync("pm2 --version")
			.then((r) => ({ name: "PM2", version: r.stdout.trim(), ok: true }))
			.catch(() => ({
				name: "PM2",
				ok: false,
				version: "(akan diinstall otomatis)",
			})),
	]);
	return checks.map((r) => (r.status === "fulfilled" ? r.value : r.reason));
});

ipcMain.handle("get-network-ips", async () => {
	const ifaces = os.networkInterfaces();
	const ips = [];
	for (const [name, addrs] of Object.entries(ifaces)) {
		for (const addr of addrs) {
			if (addr.family === "IPv4" && !addr.internal)
				ips.push({ name, address: addr.address });
		}
	}
	ips.push({ name: "Loopback", address: "127.0.0.1" });
	return ips;
});

ipcMain.handle("read-env", () => {
	const envPath = path.join(APP_DIR, "backend", ".env");
	try {
		return fs.readFileSync(envPath, "utf-8");
	} catch {
		return "";
	}
});

ipcMain.handle("write-env", (_, content) => {
	const envPath = path.join(APP_DIR, "backend", ".env");
	fs.writeFileSync(envPath, content, "utf-8");
	return { ok: true };
});

// ─── Installation Logic ──────────────────────────────────────────────────────
async function runInstallation(opts) {
	const send = (step, msg, done = false, error = false) =>
		mainWindow?.webContents.send("install-progress", {
			step,
			msg,
			done,
			error,
		});

	try {
		const backendDir = path.join(APP_DIR, "backend");
		const rootDir = APP_DIR;

		// Step 1: npm install
		send("deps", "Menginstall dependencies...");
		await runCmd("npm", ["install"], { cwd: rootDir, send });
		send("deps", "Dependencies terinstall.", true);

		// Step 2: Install PM2 globally
		send("pm2", "Menginstall PM2 (process manager)...");
		try {
			await runCmd("npm", ["install", "-g", "pm2"], { cwd: rootDir, send });
			send("pm2", "PM2 terinstall.", true);
		} catch {
			// PM2 already installed, that's fine
			send("pm2", "PM2 sudah terinstall.", true);
		}

		// Step 3: Prisma generate
		send("prisma", "Generate Prisma Client...");
		await runCmd("npx", ["prisma", "generate"], { cwd: backendDir, send });
		send("prisma", "Prisma Client siap.", true);

		// Step 4: Write .env
		send("env", "Menyimpan konfigurasi...");
		const envContent = buildEnvContent(opts);
		fs.writeFileSync(path.join(backendDir, ".env"), envContent, "utf-8");
		send("env", "File .env disimpan.", true);

		// Step 5: DB migrate
		send("migrate", "Menjalankan migrasi database...");
		await runCmd("npx", ["prisma", "migrate", "deploy"], {
			cwd: backendDir,
			send,
		});
		send("migrate", "Database siap.", true);

		// Step 6: Seed
		send("seed", "Mengisi data awal...");
		try {
			await runCmd("node", ["prisma/seed.js"], { cwd: backendDir, send });
			send("seed", "Data awal berhasil diisi.", true);
		} catch {
			send("seed", "Data awal sudah ada / skip.", true);
		}

		// Step 7: Build frontend
		send("build", "Build frontend...");
		await runCmd("npm", ["run", "build", "--workspace=frontend"], {
			cwd: rootDir,
			send,
		});
		send("build", "Frontend berhasil di-build.", true);

		// Step 8: Start server via PM2
		send("start", "Memulai server dengan PM2...");
		const isWin = process.platform === "win32";
		const ecoFile = fs.existsSync(path.join(rootDir, "ecosystem.config.cjs"))
			? "ecosystem.config.cjs"
			: "ecosystem.config.js";
		try {
			await runCmd("pm2", ["start", ecoFile, "--env", "production"], {
				cwd: rootDir,
				send,
			});
			await runCmd("pm2", ["save"], { cwd: rootDir, send });
			send("start", "Server berjalan via PM2!", true);
			// Update internal server state
			serverProcess = "pm2"; // sentinel: managed by PM2
			mainWindow?.webContents.send("server-status", { running: true });
		} catch {
			// Fallback: direct spawn
			startServer();
			send("start", "Server berjalan (direct).", true);
		}

		saveConfig({ installed: true, ...opts });
		return { ok: true };
	} catch (err) {
		return { ok: false, error: err.message };
	}
}

function runCmd(cmd, args, { cwd, send }) {
	return new Promise((resolve, reject) => {
		let proc;
		if (process.platform === "win32") {
			// Directly spawn cmd.exe — avoids ENOENT caused by shell option path resolution
			const sysRoot =
				process.env.SystemRoot || process.env.SYSTEMROOT || "C:\\Windows";
			const cmdExe = path.join(sysRoot, "System32", "cmd.exe");
			const cmdStr = [
				cmd,
				...args.map((a) => (a.includes(" ") ? `"${a}"` : a)),
			].join(" ");
			proc = spawn(cmdExe, ["/d", "/s", "/c", cmdStr], {
				cwd,
				env: { ...process.env },
				windowsHide: true,
			});
		} else {
			proc = spawn(cmd, args, {
				cwd,
				env: { ...process.env },
			});
		}
		proc.stdout?.on("data", (d) => send?.("log", d.toString()));
		proc.stderr?.on("data", (d) => send?.("log", d.toString()));
		proc.on("close", (code) =>
			code === 0
				? resolve()
				: reject(new Error(`${cmd} gagal (exit ${code})\ncwd: ${cwd}`)),
		);
		proc.on("error", (err) =>
			reject(new Error(`${cmd}: ${err.message}\ncwd: ${cwd}`)),
		);
	});
}

function buildEnvContent(opts) {
	const genSecret = () => require("crypto").randomBytes(48).toString("base64");
	return `NODE_ENV=production
PORT=${opts.port || 3000}
HOST=0.0.0.0

DATABASE_URL="${opts.dbUrl || `postgresql://${opts.dbUser || "postgres"}:${opts.dbPass || "postgres"}@${opts.dbHost || "localhost"}:${opts.dbPort || 5432}/${opts.dbName || "cbt_rsms"}`}"
REDIS_URL="${opts.redisUrl || "redis://localhost:6379"}"

JWT_ACCESS_SECRET="${genSecret()}"
JWT_REFRESH_SECRET="${genSecret()}"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

FRONTEND_URL="http://${opts.serverIp || "localhost"}:${opts.port || 3000}"

IP_FILTER_MODE=${opts.ipMode || "open"}
IP_SUPERADMIN=127.0.0.1,::1,${opts.serverIp || "127.0.0.1"}

MAX_FILE_SIZE_MB=5
UPLOAD_DIR="./uploads"
`;
}
