// ─── State ────────────────────────────────────────────────────────────────────
let currentStep = 0;
let selectedIp = "";
let ipEntries = [];
let config = {};

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", async () => {
	config = await window.cbt.getConfig();
	const hash = window.location.hash.replace("#", "") || "dashboard";

	if (hash === "installer" || !config.installed) {
		showPage("installer");
		checkDeps();
	} else {
		showPage("dashboard");
		initDashboard();
	}

	// Listen for server events
	window.cbt.onServerLog(({ type, msg }) => appendLog(msg, type));
	window.cbt.onServerStatus(({ running }) => updateServerStatus(running));
});

function showPage(name) {
	document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
	document.getElementById(`page-${name}`).classList.remove("hidden");
}

// ─── INSTALLER ────────────────────────────────────────────────────────────────
async function checkDeps() {
	const deps = await window.cbt.checkDeps();
	const list = document.getElementById("deps-list");
	const guide = document.getElementById("install-guide");
	list.innerHTML = "";
	guide.innerHTML = "";
	guide.classList.add("hidden");

	let coreOk = true; // node + npm must be ok
	const guides = [];

	deps.forEach((dep) => {
		const isCritical = dep.name === "Node.js" || dep.name === "npm";
		const el = document.createElement("div");
		el.className = `dep-item ${dep.ok ? "ok" : isCritical ? "fail" : "warn"}`;
		const icon = dep.ok ? "✅" : isCritical ? "❌" : "⚠️";
		el.innerHTML = `
      <span class="dep-icon">${icon}</span>
      <span class="dep-name">${dep.name}</span>
      <span class="dep-version">${dep.version || (dep.ok ? "" : "Tidak ditemukan")}</span>
    `;
		list.appendChild(el);

		if (!dep.ok) {
			if (isCritical) coreOk = false;
			guides.push(dep);
		}
	});

	// Build install guide for missing deps
	if (guides.length > 0) {
		guide.classList.remove("hidden");
		let html = '<div style="display:flex;flex-direction:column;gap:8px">';

		for (const dep of guides) {
			if (dep.name === "Node.js") {
				html += `<div class="info-box" style="border-color:var(--red)">
          ❌ <b>Node.js wajib diinstall!</b><br>
          Download: <b>https://nodejs.org/en/download</b> (pilih LTS)<br>
          Setelah install, <b>restart komputer</b> lalu klik "Cek Ulang"
        </div>`;
			} else if (dep.name === "PostgreSQL") {
				html += `<div class="info-box" style="border-color:var(--yellow)">
          ⚠️ <b>PostgreSQL belum terdeteksi.</b><br>
          Download: <b>https://www.enterprisedb.com/downloads/postgres-postgresql-installers</b><br>
          Pilih versi Windows x86-64, jalankan installer, lalu:<br>
          1. Set password untuk user <code>postgres</code><br>
          2. Port biarkan default (<b>5432</b>)<br>
          3. Centang "Stack Builder" → bisa skip saat ditawarkan<br>
          4. Setelah install, pastikan service PostgreSQL sudah berjalan<br>
          <button class="btn-sm" style="margin-top:6px" onclick="window.cbt.openUrl('https://www.enterprisedb.com/downloads/postgres-postgresql-installers')">🔗 Buka Halaman Download</button>
          <button class="btn-sm" style="margin-top:6px;margin-left:6px" onclick="checkDeps()">🔄 Cek Ulang</button>
        </div>`;
			} else if (dep.name === "Redis") {
				html += `<div class="info-box" style="border-color:var(--yellow)">
          ⚠️ <b>Redis belum terdeteksi.</b><br>
          <b>Cara install Redis di Windows:</b><br>
          • Opsi A (direkomendasikan): Gunakan <b>Memurai</b> — Redis-compatible untuk Windows<br>
          &nbsp;&nbsp;Download: <b>https://www.memurai.com/get-memurai</b><br>
          • Opsi B: Aktifkan WSL2 lalu jalankan Redis di dalam WSL<br>
          • Opsi C: Download binary lama (Windows): <b>https://github.com/microsoftarchive/redis/releases</b><br>
          <button class="btn-sm" style="margin-top:6px" onclick="window.cbt.openUrl('https://www.memurai.com/get-memurai')">🔗 Download Memurai</button>
          <button class="btn-sm" style="margin-top:6px;margin-left:6px" onclick="tryInstallRedis()">⚡ Auto-install via winget</button>
          <button class="btn-sm" style="margin-top:6px;margin-left:6px" onclick="checkDeps()">🔄 Cek Ulang</button>
        </div>`;
			} else if (dep.name === "PM2") {
				html += `<div class="info-box">
          ℹ️ <b>PM2</b> akan diinstall otomatis saat proses instalasi berjalan. Tidak perlu install manual.
        </div>`;
			}
		}
		html += "</div>";
		guide.innerHTML = html;
	}

	document.getElementById("btn-next-0").disabled = !coreOk;
}

async function tryInstallRedis() {
	const result = await window.cbt.installRedisWinget();
	if (result.ok) {
		alert(
			'✅ Redis berhasil diinstall via winget! Klik "Cek Ulang" untuk verifikasi.',
		);
	} else {
		alert(
			"❌ Gagal auto-install: " +
				result.error +
				"\nCoba install manual dengan link di atas.",
		);
	}
	checkDeps();
}

async function goStep(n) {
	// Populate step 3 network list when entering it
	if (n === 3) await populateNetworkStep();

	// Mark steps done/active
	document.querySelectorAll(".step").forEach((s) => {
		const sn = parseInt(s.dataset.step);
		s.classList.toggle("active", sn === n);
		s.classList.toggle("done", sn < n);
	});
	document
		.querySelectorAll(".step-content")
		.forEach((s) => s.classList.remove("active"));
	document.getElementById(`step-${n}`).classList.add("active");
	currentStep = n;
}

async function populateNetworkStep() {
	const ips = await window.cbt.getNetworkIps();
	const list = document.getElementById("ip-list");
	list.innerHTML = "";
	ips.forEach((ip) => {
		const el = document.createElement("div");
		el.className = "ip-item";
		el.dataset.ip = ip.address;
		el.innerHTML = `
      <span style="font-size:18px">📡</span>
      <div>
        <div style="font-weight:600">${ip.address}</div>
        <div style="font-size:11px;color:var(--text-muted)">${ip.name}</div>
      </div>
    `;
		el.addEventListener("click", () => {
			document
				.querySelectorAll(".ip-item")
				.forEach((i) => i.classList.remove("selected"));
			el.classList.add("selected");
			selectedIp = ip.address;
			document.getElementById("cfg-server-ip").value = ip.address;
		});
		list.appendChild(el);
		// Auto-select first non-loopback
		if (!selectedIp && ip.address !== "127.0.0.1") {
			el.click();
		}
	});
}

async function startInstall() {
	document.getElementById("btn-start-install").disabled = true;
	document.getElementById("btn-back-install").disabled = true;
	document.getElementById("install-log").classList.remove("hidden");

	const opts = {
		port: document.getElementById("cfg-port").value,
		ipMode: document.getElementById("cfg-ip-mode").value,
		dbHost: document.getElementById("cfg-db-host").value,
		dbPort: document.getElementById("cfg-db-port").value,
		dbName: document.getElementById("cfg-db-name").value,
		dbUser: document.getElementById("cfg-db-user").value,
		dbPass: document.getElementById("cfg-db-pass").value,
		redisUrl: document.getElementById("cfg-redis").value,
		serverIp: document.getElementById("cfg-server-ip").value || selectedIp,
	};

	// Listen for progress
	const stepMap = {
		deps: "istep-deps",
		pm2: "istep-pm2",
		prisma: "istep-prisma",
		env: "istep-env",
		migrate: "istep-migrate",
		seed: "istep-seed",
		build: "istep-build",
		start: "istep-start",
		log: null,
	};
	window.cbt.onInstallProgress(({ step, msg, done, error }) => {
		if (step === "log") {
			appendInstallLog(msg);
			return;
		}
		const id = stepMap[step];
		if (!id) return;
		const el = document.getElementById(id);
		if (!el) return;
		if (done) {
			el.className = "install-step done";
			el.querySelector(".istep-icon").textContent = "✅";
		} else if (error) {
			el.className = "install-step error";
			el.querySelector(".istep-icon").textContent = "❌";
		} else {
			el.className = "install-step running";
			el.querySelector(".istep-icon").innerHTML =
				'<span class="spinner"></span>';
		}
	});

	const result = await window.cbt.runInstall(opts);
	const resultEl = document.getElementById("install-result");
	resultEl.classList.remove("hidden");

	if (result.ok) {
		resultEl.innerHTML = `<div class="info-box" style="border-color:var(--green);background:rgba(64,160,43,0.1)">
      ✅ <b>Instalasi berhasil!</b> Aplikasi siap digunakan.
    </div>`;
		document.getElementById("btn-open-dashboard").classList.remove("hidden");
	} else {
		resultEl.innerHTML = `<div class="info-box" style="border-color:var(--red);background:rgba(210,15,57,0.1)">
      ❌ <b>Instalasi gagal:</b> ${result.error}
    </div>`;
		document.getElementById("btn-start-install").disabled = false;
		document.getElementById("btn-back-install").disabled = false;
	}
}

function appendInstallLog(msg) {
	const box = document.getElementById("install-log");
	box.textContent += msg;
	box.scrollTop = box.scrollHeight;
}

function openDashboard() {
	showPage("dashboard");
	initDashboard();
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
async function initDashboard() {
	config = await window.cbt.getConfig();

	// Update status
	const status = await window.cbt.getServerStatus();
	updateServerStatus(status.running);
	document.getElementById("status-port").textContent = config.port || 3000;

	// Set server config fields
	document.getElementById("srv-port").value = config.port || 3000;
	document.getElementById("srv-ip-mode").value = config.ipMode || "open";

	// Load network
	await refreshNetwork();

	// Load IP table
	await loadIpTable();

	// Load env
	await loadEnv();
}

function updateServerStatus(running) {
	const lbl = document.getElementById("status-label");
	const card = document.getElementById("card-server");
	const startBtn = document.getElementById("btn-main-start");
	const stopBtn = document.getElementById("btn-main-stop");

	if (running) {
		lbl.textContent = "● Berjalan";
		lbl.style.color = "var(--green)";
		card.className = "status-card running";
		startBtn.classList.add("hidden");
		stopBtn.classList.remove("hidden");
	} else {
		lbl.textContent = "● Berhenti";
		lbl.style.color = "var(--red)";
		card.className = "status-card stopped";
		startBtn.classList.remove("hidden");
		stopBtn.classList.add("hidden");
	}
}

function appendLog(msg, type = "info") {
	const box = document.getElementById("log-box");
	if (!box) return;
	const line = document.createElement("span");
	line.style.color = type === "error" ? "#f38ba8" : "#a6e3a1";
	line.textContent = msg;
	box.appendChild(line);
	box.scrollTop = box.scrollHeight;

	// Max 500 lines
	while (box.childNodes.length > 500) box.removeChild(box.firstChild);
}

async function startServer() {
	appendLog("▶ Memulai server...\n");
	await window.cbt.startServer();
}

async function stopServer() {
	appendLog("⏹ Menghentikan server...\n");
	await window.cbt.stopServer();
	updateServerStatus(false);
}

async function restartServer() {
	appendLog("🔄 Merestart server...\n");
	await window.cbt.restartServer();
}

// ─── SERVER CONFIG TAB ────────────────────────────────────────────────────────
async function saveServerConfig() {
	const port = document.getElementById("srv-port").value;
	const ipMode = document.getElementById("srv-ip-mode").value;

	// Update .env
	let env = await window.cbt.readEnv();
	env = env.replace(/^PORT=.*/m, `PORT=${port}`);
	env = env.replace(/^IP_FILTER_MODE=.*/m, `IP_FILTER_MODE=${ipMode}`);
	await window.cbt.writeEnv(env);

	await window.cbt.saveConfig({ port, ipMode });
	config = await window.cbt.getConfig();
	document.getElementById("status-port").textContent = port;
	appendLog(`💾 Konfigurasi disimpan. Port: ${port}, IP Mode: ${ipMode}\n`);
	await restartServer();
}

// ─── IP MANAGEMENT TAB ────────────────────────────────────────────────────────
async function loadIpTable() {
	// Read from saved config (local JSON file — not DB — since DB may not be running)
	const cfg = await window.cbt.getConfig();
	ipEntries = cfg.ipEntries || [];
	const mode = cfg.ipMode || "open";

	document.getElementById("ip-mode-label").innerHTML =
		mode === "whitelist"
			? '<span class="badge badge-yellow">Whitelist</span>'
			: '<span class="badge badge-green">Terbuka</span>';

	renderIpTable();
}

function renderIpTable() {
	const tbody = document.getElementById("ip-table-body");
	if (!ipEntries.length) {
		tbody.innerHTML =
			'<tr><td colspan="5" class="text-center text-muted">Belum ada IP terdaftar.</td></tr>';
		return;
	}
	tbody.innerHTML = ipEntries
		.map(
			(ip, i) => `
    <tr>
      <td><code>${ip.address}</code></td>
      <td>${ip.label || "-"}</td>
      <td><span class="badge badge-yellow">${ip.role || "all"}</span></td>
      <td>
        <label style="cursor:pointer">
          <input type="checkbox" ${ip.active !== false ? "checked" : ""} onchange="toggleIpActive(${i}, this.checked)" />
        </label>
      </td>
      <td>
        <button class="btn-sm btn-danger" onclick="deleteIp(${i})">Hapus</button>
      </td>
    </tr>
  `,
		)
		.join("");
}

async function addIpEntry() {
	const addr = document.getElementById("new-ip-addr").value.trim();
	const label = document.getElementById("new-ip-label").value.trim();
	const role = document.getElementById("new-ip-role").value;

	if (!addr) return alert("Masukkan alamat IP!");
	if (!/^[\d.:\/a-fA-F]+$/.test(addr)) return alert("Format IP tidak valid!");

	ipEntries.push({ address: addr, label, role, active: true });
	await saveIpEntries();
	renderIpTable();

	document.getElementById("new-ip-addr").value = "";
	document.getElementById("new-ip-label").value = "";
}

async function toggleIpActive(i, val) {
	ipEntries[i].active = val;
	await saveIpEntries();
}

async function deleteIp(i) {
	ipEntries.splice(i, 1);
	await saveIpEntries();
	renderIpTable();
}

async function saveIpEntries() {
	await window.cbt.saveConfig({ ipEntries });
	// Also write to .env IP_SUPERADMIN (always-allowed IPs)
	const alwaysAllow = [
		"127.0.0.1",
		"::1",
		...ipEntries
			.filter((e) => e.role === "Admin" && e.active)
			.map((e) => e.address),
	];
	let env = await window.cbt.readEnv();
	if (env) {
		env = env.replace(
			/^IP_SUPERADMIN=.*/m,
			`IP_SUPERADMIN=${[...new Set(alwaysAllow)].join(",")}`,
		);
		await window.cbt.writeEnv(env);
	}
}

async function toggleIpMode() {
	const cfg = await window.cbt.getConfig();
	const newMode = cfg.ipMode === "whitelist" ? "open" : "whitelist";
	await window.cbt.saveConfig({ ipMode: newMode });

	let env = await window.cbt.readEnv();
	if (env) {
		env = env.replace(/^IP_FILTER_MODE=.*/m, `IP_FILTER_MODE=${newMode}`);
		await window.cbt.writeEnv(env);
	}

	await loadIpTable();
	appendLog(`🌐 Mode IP diganti ke: ${newMode}\n`);

	if (confirm("Mode IP diubah. Restart server agar perubahan berlaku?"))
		restartServer();
}

// ─── NETWORK TAB ──────────────────────────────────────────────────────────────
async function refreshNetwork() {
	const ips = await window.cbt.getNetworkIps();
	const grid = document.getElementById("network-list");
	if (!grid) return;
	grid.innerHTML = "";
	const cfg = await window.cbt.getConfig();
	const port = cfg.port || 3000;

	ips.forEach((ip) => {
		const el = document.createElement("div");
		el.className = "network-card";
		el.innerHTML = `
      <div class="nc-iface">${ip.name}</div>
      <div class="nc-ip">${ip.address}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">:${port}</div>
    `;
		el.addEventListener("click", () => {
			document
				.querySelectorAll(".network-card")
				.forEach((c) => c.classList.remove("selected"));
			el.classList.add("selected");
			const url = `http://${ip.address}:${port}`;
			document.getElementById("access-url").value = url;
			document.getElementById("status-ip").textContent = ip.address;
		});
		grid.appendChild(el);
		if (
			!document.getElementById("access-url").value &&
			ip.address !== "127.0.0.1"
		)
			el.click();
	});
}

function copyUrl() {
	const val = document.getElementById("access-url").value;
	if (!val) return;
	navigator.clipboard.writeText(val).then(() => {
		const btn = document.querySelector('[onclick="copyUrl()"]');
		btn.textContent = "✅ Disalin!";
		setTimeout(() => (btn.textContent = "📋 Salin"), 2000);
	});
}

// ─── ENV EDITOR ───────────────────────────────────────────────────────────────
async function loadEnv() {
	const content = await window.cbt.readEnv();
	const editor = document.getElementById("env-editor");
	if (editor)
		editor.value =
			content || "# File .env belum ada\n# Jalankan installer terlebih dahulu";
}

async function saveEnv() {
	const content = document.getElementById("env-editor").value;
	await window.cbt.writeEnv(content);
	appendLog("💾 File .env disimpan.\n");
	if (confirm("File .env disimpan. Restart server agar perubahan berlaku?"))
		restartServer();
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────
function showTab(tabId, linkEl) {
	document
		.querySelectorAll(".tab")
		.forEach((t) => t.classList.remove("active"));
	document
		.querySelectorAll(".nav-link")
		.forEach((l) => l.classList.remove("active"));
	document.getElementById(tabId)?.classList.add("active");
	if (linkEl) linkEl.classList.add("active");

	// Lazy load tabs
	if (tabId === "tab-network") refreshNetwork();
	if (tabId === "tab-ip") loadIpTable();
	if (tabId === "tab-env") loadEnv();
}

function confirmQuit() {
	if (
		confirm(
			"Keluar dari Control Panel?\nServer akan tetap berjalan di background (system tray).",
		)
	) {
		window.cbt.close();
	}
}
