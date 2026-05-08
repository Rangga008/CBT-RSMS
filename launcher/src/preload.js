const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cbt", {
	// Config
	getConfig: () => ipcRenderer.invoke("get-config"),
	saveConfig: (data) => ipcRenderer.invoke("save-config", data),

	// Server
	getServerStatus: () => ipcRenderer.invoke("get-server-status"),
	startServer: () => ipcRenderer.invoke("start-server"),
	stopServer: () => ipcRenderer.invoke("stop-server"),
	restartServer: () => ipcRenderer.invoke("restart-server"),
	openBrowser: () => ipcRenderer.invoke("open-browser"),
	openUrl: (url) => ipcRenderer.invoke("open-url", url),
	openFolder: (f) => ipcRenderer.invoke("open-folder", f),

	// Install
	runInstall: (opts) => ipcRenderer.invoke("run-install", opts),
	checkDeps: () => ipcRenderer.invoke("check-deps"),
	installRedisWinget: () => ipcRenderer.invoke("install-redis-winget"),

	// Network
	getNetworkIps: () => ipcRenderer.invoke("get-network-ips"),

	// Env
	readEnv: () => ipcRenderer.invoke("read-env"),
	writeEnv: (content) => ipcRenderer.invoke("write-env", content),

	// Window controls
	minimize: () => ipcRenderer.send("win-minimize"),
	maximize: () => ipcRenderer.send("win-maximize"),
	close: () => ipcRenderer.send("win-close"),

	// Events
	onServerLog: (cb) => ipcRenderer.on("server-log", (_, d) => cb(d)),
	onServerStatus: (cb) => ipcRenderer.on("server-status", (_, d) => cb(d)),
	onInstallProgress: (cb) =>
		ipcRenderer.on("install-progress", (_, d) => cb(d)),
	offAll: (ch) => ipcRenderer.removeAllListeners(ch),
});
