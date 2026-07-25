<template>
	<div
		class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4"
	>
		<!-- Header -->
		<div class="text-center mb-6">
			<img
				v-if="publicConfig.logoUrl"
				:src="publicConfig.logoUrl"
				class="w-16 h-16 object-contain mx-auto mb-2 rounded-xl"
				alt="Logo"
			/>
			<h1 class="text-2xl font-bold text-white">
				{{ publicConfig.namaSekolah || "Kios Absensi" }}
			</h1>
			<p class="text-blue-300 text-sm">
				{{ publicConfig.appName || "SIAP BK RSMS" }}
			</p>
			<p class="text-slate-400 text-xs mt-1">{{ currentDateTime }}</p>
		</div>

		<!-- Scanner Box -->
		<div
			class="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/20"
		>
			<!-- Status alert -->
			<transition name="fade">
				<div
					v-if="statusMsg"
					class="mb-4 p-4 rounded-2xl text-center font-semibold text-lg transition-all"
					:class="
						statusType === 'success'
							? 'bg-emerald-500/80 text-white'
							: statusType === 'info'
								? 'bg-blue-500/80 text-white'
								: 'bg-red-500/80 text-white'
					"
				>
					<i
						:class="
							statusType === 'success'
								? 'fas fa-check-circle'
								: statusType === 'info'
									? 'fas fa-info-circle'
									: 'fas fa-times-circle'
						"
						class="mr-2"
					></i>
					{{ statusMsg }}
				</div>
			</transition>

			<!-- Last scan info -->
			<transition name="slide-down">
				<div
					v-if="lastScan"
					class="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10 text-center"
				>
					<p class="text-white font-bold text-xl">{{ lastScan.nama }}</p>
					<p class="text-blue-300 text-sm">{{ lastScan.kelas }}</p>
					<div class="flex justify-center gap-3 mt-2 text-sm text-slate-300">
						<span v-if="lastScan.jamMasuk">
							<i class="fas fa-sign-in-alt text-green-400 mr-1"></i>
							{{ lastScan.jamMasuk.slice(0, 5) }}
						</span>
						<span v-if="lastScan.jamSholat">
							<i class="fas fa-mosque text-yellow-400 mr-1"></i>
							{{ lastScan.jamSholat.slice(0, 5) }}
						</span>
						<span v-if="lastScan.jamPulang">
							<i class="fas fa-sign-out-alt text-red-400 mr-1"></i>
							{{ lastScan.jamPulang.slice(0, 5) }}
						</span>
					</div>
				</div>
			</transition>

			<!-- QR Scanner -->
			<div class="relative">
				<div
					id="kios-qr-reader"
					class="w-full rounded-2xl overflow-hidden"
					:class="{ 'opacity-50': scanning }"
				></div>
				<div
					v-if="!cameraStarted"
					class="aspect-square bg-black/30 rounded-2xl flex flex-col items-center justify-center"
				>
					<i class="fas fa-camera text-white/50 text-5xl mb-3"></i>
					<p class="text-white/60 text-sm">Memulai kamera...</p>
				</div>
			</div>

			<!-- Manual NISN input -->
			<div class="mt-4">
				<div class="flex gap-2">
					<input
						v-model="manualNisn"
						type="text"
						inputmode="numeric"
						placeholder="Ketik NISN manual..."
						class="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
						@keyup.enter="submitManual"
					/>
					<button
						@click="submitManual"
						:disabled="scanning"
						class="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
					>
						<i class="fas fa-check"></i>
					</button>
				</div>
			</div>
		</div>

		<!-- Today stats -->
		<div v-if="todayStats" class="mt-4 flex gap-3 text-center text-sm">
			<div class="bg-white/10 rounded-2xl px-4 py-2 text-white">
				<p class="text-2xl font-bold text-emerald-400">
					{{ todayStats.hadir }}
				</p>
				<p class="text-xs text-slate-400">Hadir</p>
			</div>
			<div class="bg-white/10 rounded-2xl px-4 py-2 text-white">
				<p class="text-2xl font-bold text-blue-400">
					{{ todayStats.total }}
				</p>
				<p class="text-xs text-slate-400">Terdaftar</p>
			</div>
		</div>

		<!-- Footer link -->
		<p class="mt-6 text-slate-600 text-xs">
			<a href="/" class="hover:text-slate-400 transition-colors">
				← Login Admin
			</a>
		</p>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL
	? import.meta.env.VITE_API_URL + "/api/v1"
	: "/api/v1";

const publicConfig = ref({});
const currentDateTime = ref("");
const statusMsg = ref("");
const statusType = ref("success");
const lastScan = ref(null);
const manualNisn = ref("");
const scanning = ref(false);
const cameraStarted = ref(false);
const todayStats = ref(null);

let html5QrCode = null;
let statusTimer = null;
let clockInterval = null;
const cooldownMap = new Map();

function updateClock() {
	currentDateTime.value = new Date().toLocaleString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

function showStatus(msg, type = "success", duration = 4000) {
	statusMsg.value = msg;
	statusType.value = type;
	if (statusTimer) clearTimeout(statusTimer);
	statusTimer = setTimeout(() => {
		statusMsg.value = "";
	}, duration);
}

async function processNisn(nisn) {
	const trimmed = String(nisn).trim();
	if (!trimmed) return;
	const cooldownMs = 4000;
	const lastTime = cooldownMap.get(trimmed) || 0;
	if (Date.now() - lastTime < cooldownMs) return;
	cooldownMap.set(trimmed, Date.now());
	scanning.value = true;
	try {
		const { data } = await axios.post(`${API_BASE}/absensi/scan-kios`, {
			nisn: trimmed,
		});
		if (data.success) {
			showStatus(data.message, "success");
			lastScan.value = data.data;
			loadTodayStats();
		} else {
			showStatus(data.message || "Gagal absen", "error");
		}
	} catch (e) {
		showStatus(e.response?.data?.message || "Error jaringan", "error");
	} finally {
		scanning.value = false;
		manualNisn.value = "";
	}
}

async function submitManual() {
	if (manualNisn.value.trim()) {
		await processNisn(manualNisn.value);
	}
}

async function startCamera() {
	const { Html5Qrcode } = await import("html5-qrcode");
	html5QrCode = new Html5Qrcode("kios-qr-reader");

	const cameras = await Html5Qrcode.getCameras().catch(() => []);
	if (!cameras.length) {
		showStatus("Tidak ada kamera ditemukan.", "error", 10000);
		return;
	}

	// Prefer back camera
	const cameraId =
		cameras.find(
			(c) =>
				c.label.toLowerCase().includes("back") ||
				c.label.toLowerCase().includes("belakang") ||
				c.label.toLowerCase().includes("environment"),
		)?.id || cameras[0].id;

	await html5QrCode.start(
		cameraId,
		{ fps: 10, qrbox: { width: 250, height: 250 } },
		async (decodedText) => {
			await processNisn(decodedText);
		},
		() => {}, // ignore scan errors
	);
	cameraStarted.value = true;
}

async function loadPublicConfig() {
	try {
		const { data } = await axios.get(`${API_BASE}/config/public`);
		publicConfig.value = data.data || {};
	} catch {
		// ignore
	}
}

async function loadTodayStats() {
	try {
		const today = new Date().toISOString().split("T")[0];
		const { data } = await axios.get(
			`${API_BASE}/absensi/rekap-harian?dari=${today}&sampai=${today}`,
		);
		if (data.data?.length) {
			const total = data.data.reduce(
				(acc, d) => ({
					hadir: acc.hadir + (d.hadir || 0),
					total:
						acc.total +
						(d.hadir || 0) +
						(d.sakit || 0) +
						(d.izin || 0) +
						(d.alpa || 0),
				}),
				{ hadir: 0, total: 0 },
			);
			todayStats.value = total;
		}
	} catch {
		// ignore
	}
}

onMounted(async () => {
	updateClock();
	clockInterval = setInterval(updateClock, 1000);
	await loadPublicConfig();
	await loadTodayStats();
	// Small delay to ensure DOM is ready
	setTimeout(startCamera, 500);
});

onUnmounted(() => {
	if (clockInterval) clearInterval(clockInterval);
	if (statusTimer) clearTimeout(statusTimer);
	if (html5QrCode) {
		html5QrCode.stop().catch(() => {});
	}
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active {
	transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
