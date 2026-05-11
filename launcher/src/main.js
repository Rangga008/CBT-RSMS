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
const net = require("net");
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

const POSTGRES_WIN_SERVICES = [
	"postgresql-x64-17",
	"postgresql-x64-16",
	"postgresql-x64-15",
	"postgresql-x64-14",
	"postgresql-x64-13",
	"postgresql",
];
const REDIS_WIN_SERVICES = ["Redis", "memurai"];

async function listWindowsServiceNames(keyword) {
	try {
		const { stdout } = await execAsync(`sc query type= service state= all`);
		const names = [];
		const lines = stdout.split(/\r?\n/);
		for (const line of lines) {
			const m = line.match(/SERVICE_NAME:\s*(.+)$/i);
			if (!m) continue;
			const name = m[1].trim();
			if (name.toLowerCase().includes(keyword.toLowerCase())) {
				names.push(name);
			}
		}
		return names;
	} catch {
		return [];
	}
}

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
				click: async () => {
					if (serverProcess) await stopServer();
					else await startServer();
				},
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
				click: async () => {
					app.isQuitting = true;
					await stopServer();
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
async function startInfraServices() {
	const log = (msg) =>
		mainWindow?.webContents.send("server-log", { type: "info", msg });

	if (process.platform === "win32") {
		const discoveredPg = await listWindowsServiceNames("postgres");
		const pgServices = [
			...new Set([...POSTGRES_WIN_SERVICES, ...discoveredPg]),
		];
		for (const svc of [...pgServices, ...REDIS_WIN_SERVICES]) {
			try {
				await execAsync(`sc start "${svc}"`);
				log(`ℹ️ Service ${svc} dijalankan.\n`);
			} catch {
				// ignore if service not found or already running
			}
		}
		return;
	}

	try {
		await execAsync("systemctl start postgresql || true");
		await execAsync(
			"systemctl start redis-server || systemctl start redis || true",
		);
	} catch {
		// best effort only
	}
}

async function stopInfraServices() {
	if (process.platform === "win32") {
		const discoveredPg = await listWindowsServiceNames("postgres");
		const pgServices = [
			...new Set([...POSTGRES_WIN_SERVICES, ...discoveredPg]),
		];
		for (const svc of [...REDIS_WIN_SERVICES, ...pgServices]) {
			try {
				await execAsync(`sc stop "${svc}"`);
			} catch {
				// ignore
			}
		}
		return;
	}

	try {
		await execAsync(
			"systemctl stop redis-server || systemctl stop redis || true",
		);
		await execAsync("systemctl stop postgresql || true");
	} catch {
		// best effort only
	}
}

async function startServer() {
	if (serverProcess) return;
	const rootDir = APP_DIR;
	const backendDir = path.join(APP_DIR, "backend");

	await startInfraServices();

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

async function stopServer() {
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

	await stopInfraServices();
}

// ─── IPC Handlers ────────────────────────────────────────────────────────────
ipcMain.handle("get-config", () => loadConfig());
ipcMain.handle("save-config", (_, data) => saveConfig(data));
ipcMain.handle("get-server-status", () => ({ running: !!serverProcess }));
ipcMain.handle("start-server", async () => {
	await startServer();
	return { ok: true };
});
ipcMain.handle("stop-server", async () => {
	await stopServer();
	return { ok: true };
});
ipcMain.handle("restart-server", async () => {
	await stopServer();
	await new Promise((r) => setTimeout(r, 1000));
	await startServer();
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

ipcMain.handle("install-postgres-winget", async () => {
	try {
		await execAsync("winget upgrade --all");
		await execAsync(
			"winget install PostgreSQL.PostgreSQL --exact --silent --accept-package-agreements --accept-source-agreements",
		);
		return { ok: true };
	} catch (err) {
		return { ok: false, error: err.message };
	}
});

ipcMain.handle("install-node-winget", async () => {
	try {
		await execAsync(
			"winget install OpenJS.NodeJS --exact --silent --accept-package-agreements --accept-source-agreements",
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
ipcMain.handle("win-quit", async () => {
	app.isQuitting = true;
	await stopServer();
	app.quit();
	return { ok: true };
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
		// Ensure dev dependencies are available because Prisma CLI is needed at install-time.
		await runCmd("npm", ["install", "--include=dev"], {
			cwd: rootDir,
			send,
		});
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
		await runCmd("npm", ["exec", "--", "prisma", "generate"], {
			cwd: backendDir,
			send,
		});
		send("prisma", "Prisma Client siap.", true);

		// Step 4: Write .env
		send("env", "Menyimpan konfigurasi...");
		const envContent = buildEnvContent(opts);
		fs.writeFileSync(path.join(backendDir, ".env"), envContent, "utf-8");
		send("env", "File .env disimpan.", true);

		// Step 4.5: Ensure DB service is up and database exists before migration.
		send("log", "Menyiapkan service PostgreSQL...\n");
		await ensurePostgresReady(opts, send);
		await ensureDatabaseExists(opts, send);

		// Step 5: DB migrate
		send("migrate", "Menjalankan migrasi database...");
		try {
			await runCmd("npm", ["exec", "--", "prisma", "migrate", "deploy"], {
				cwd: backendDir,
				send,
			});
		} catch (migrateErr) {
			const msg = String(migrateErr.message || "");
			// P1003 = database does not exist, P1001 = can't reach server
			const hint = msg.includes("P1003")
				? '\n💡 Buat database manual: psql -U postgres -c "CREATE DATABASE cbt_rsms" lalu install ulang.'
				: msg.includes("P1001")
					? "\n💡 Pastikan PostgreSQL berjalan dan password di step 3 benar."
					: "";
			throw new Error(
				`Migrasi database gagal.${hint}\n\nDetail: ${msg.split("\n")[0]}`,
			);
		}
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

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function canOpenTcp(host, port, timeoutMs = 1200) {
	return new Promise((resolve) => {
		const socket = new net.Socket();
		let settled = false;

		const done = (ok) => {
			if (settled) return;
			settled = true;
			socket.destroy();
			resolve(ok);
		};

		socket.setTimeout(timeoutMs);
		socket.once("connect", () => done(true));
		socket.once("timeout", () => done(false));
		socket.once("error", () => done(false));
		socket.connect(port, host);
	});
}

async function ensurePostgresReady(opts, send) {
	const host = opts.dbHost || "localhost";
	const port = String(opts.dbPort || 5432);
	const cwd = APP_DIR;

	await startInfraServices();

	let lastError = null;
	for (let i = 1; i <= 30; i++) {
		try {
			await runCmd("pg_isready", ["-h", host, "-p", port], { cwd });
			send("log", `✅ PostgreSQL siap di ${host}:${port}\n`);
			return;
		} catch (err) {
			lastError = err;
		}

		const open = await canOpenTcp(host, Number(port));
		if (open) {
			send("log", `✅ Port PostgreSQL aktif di ${host}:${port}\n`);
			return;
		}

		if (i % 5 === 0) {
			send("log", `⏳ Menunggu PostgreSQL siap... (${i}/30)\n`);
		}
		await delay(2000);
	}

	throw new Error(
		`PostgreSQL belum siap di ${host}:${port}. Cek service PostgreSQL.\n${lastError?.message || ""}`,
	);
}

function getPostgreSQLBinPath() {
	if (process.platform !== "win32") return "psql";
	const commonPaths = [
		"C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe",
		"C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe",
		"C:\\Program Files\\PostgreSQL\\15\\bin\\psql.exe",
		"C:\\Program Files\\PostgreSQL\\14\\bin\\psql.exe",
		"C:\\Program Files (x86)\\PostgreSQL\\17\\bin\\psql.exe",
		"C:\\Program Files (x86)\\PostgreSQL\\16\\bin\\psql.exe",
		"C:\\Program Files (x86)\\PostgreSQL\\15\\bin\\psql.exe",
	];

	for (const p of commonPaths) {
		if (fs.existsSync(p)) return p;
	}

	return "psql"; // Fallback: try PATH
}

async function ensureDatabaseExists(opts, send) {
	const host = opts.dbHost || "localhost";
	const port = String(opts.dbPort || 5432);
	const dbName = opts.dbName || "cbt_rsms";
	const dbUser = opts.dbUser || "postgres";
	const dbPass = opts.dbPass || "";
	const cwd = APP_DIR;

	const psqlPath = getPostgreSQLBinPath();
	// Always pass PGPASSWORD even if empty — prevents psql from hanging on password prompt
	const env = { PGPASSWORD: dbPass };
	const dbNameLiteral = dbName.replace(/'/g, "''");
	const dbNameIdentifier = dbName.replace(/"/g, '""');

	// ── Step 1: Check if database already exists ──────────────────────────────
	let dbExists = false;
	try {
		const check = await runCmd(
			psqlPath,
			[
				"-h",
				host,
				"-p",
				port,
				"-U",
				dbUser,
				"-d",
				"postgres",
				"-tAc",
				`SELECT 1 FROM pg_database WHERE datname='${dbNameLiteral}'`,
			],
			{ cwd, env },
		);
		// Use .includes("1") — tolerant of \r\n, extra whitespace, or psql notices
		dbExists = check.stdout.includes("1");
	} catch (checkErr) {
		// psql not found or auth failed — log warning but don't abort
		const firstLine = String(checkErr.message || "").split("\n")[0];
		send("log", `⚠️ Tidak bisa cek database via psql: ${firstLine}\n`);
		send(
			"log",
			`ℹ️ Melanjutkan — Prisma akan memvalidasi koneksi saat migrasi...\n`,
		);
	}

	if (dbExists) {
		send("log", `✅ Database ${dbName} sudah ada\n`);
		return;
	}

	// ── Step 2: Try to create database ───────────────────────────────────────
	send("log", `ℹ️ Membuat database ${dbName}...\n`);
	try {
		await runCmd(
			psqlPath,
			[
				"-h",
				host,
				"-p",
				port,
				"-U",
				dbUser,
				"-d",
				"postgres",
				"-c",
				`CREATE DATABASE "${dbNameIdentifier}"`,
			],
			{ cwd, env },
		);
		send("log", `✅ Database ${dbName} berhasil dibuat\n`);
	} catch (createErr) {
		const errMsg = String(createErr.message || "").toLowerCase();

		// "already exists" (error code 42P04) → database is there, treat as success
		if (errMsg.includes("already exists") || errMsg.includes("42p04")) {
			send("log", `✅ Database ${dbName} sudah ada\n`);
			return;
		}

		// Psql failed for other reason (auth, path not found, etc.)
		// Log detailed warning but DO NOT throw — let prisma migrate be the judge.
		// If the database truly doesn't exist, prisma migrate will fail with a clear message.
		const firstLine = String(createErr.message || "").split("\n")[0];
		send("log", `⚠️ psql tidak bisa membuat database: ${firstLine}\n`);
		send("log", `ℹ️ Jika database sudah ada, migrasi akan tetap berjalan.\n`);
		send(
			"log",
			`ℹ️ Jika gagal, buat manual: psql -U postgres -c "CREATE DATABASE ${dbName}"\n`,
		);
	}
}

function runCmd(cmd, args, { cwd, send, env = {} }) {
	return new Promise((resolve, reject) => {
		let proc;
		if (process.platform === "win32") {
			// Directly spawn cmd.exe — avoids ENOENT caused by shell option path resolution
			const sysRoot =
				process.env.SystemRoot || process.env.SYSTEMROOT || "C:\\Windows";
			const cmdExe = path.join(sysRoot, "System32", "cmd.exe");
			const cmdToken = cmd.includes(" ") ? `"${cmd}"` : cmd;
			const cmdStr = [
				cmdToken,
				...args.map((a) => {
					const str = String(a);
					return str.includes(" ") || str.includes("\t")
						? `"${str.replace(/\"/g, '\\\"')}"`
						: str;
				}),
			].join(" ");
			proc = spawn(cmdExe, ["/d", "/s", "/c", cmdStr], {
				cwd,
				env: { ...process.env, ...env },
				windowsHide: true,
			});
		} else {
			proc = spawn(cmd, args, {
				cwd,
				env: { ...process.env, ...env },
			});
		}
		let stdout = "";
		let stderr = "";
		proc.stdout?.on("data", (d) => send?.("log", d.toString()));
		proc.stderr?.on("data", (d) => send?.("log", d.toString()));
		proc.stdout?.on("data", (d) => {
			stdout += d.toString();
		});
		proc.stderr?.on("data", (d) => {
			stderr += d.toString();
		});
		proc.on("close", (code) => {
			if (code === 0) {
				resolve({ stdout, stderr });
				return;
			}

			const details = [`${cmd} gagal (exit ${code})`, `cwd: ${cwd}`];
			if (stderr.trim()) details.push(`stderr: ${stderr.trim()}`);
			if (stdout.trim()) details.push(`stdout: ${stdout.trim()}`);
			reject(new Error(details.join("\n")));
		});
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
