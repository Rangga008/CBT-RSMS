<template>
	<div class="space-y-6 animate-fade-in">
		<!-- ===== VIEW KHUSUS SISWA ===== -->
		<template v-if="authStore.isSiswa">
			<div>
				<h2 class="text-xl font-bold text-slate-800">Absensi Saya</h2>
				<p class="text-sm text-slate-500">
					Klik tombol untuk mencatat kehadiran hari ini
				</p>
			</div>

			<div class="card text-center py-8 space-y-5">
				<div
					class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mx-auto"
				>
					{{ authStore.user?.nama?.[0]?.toUpperCase() }}
				</div>
				<div>
					<p class="text-lg font-bold text-slate-800">
						{{ authStore.user?.nama }}
					</p>
					<p class="text-sm text-slate-500">
						NISN: {{ authStore.user?.userId }}
					</p>
				</div>

				<!-- Status hari ini -->
				<div v-if="siswaAbsenHariIni" class="space-y-1">
					<p class="text-xs text-slate-500 uppercase font-bold">
						Status Hari Ini
					</p>
					<span
						:class="statusAbsenBadge(siswaAbsenHariIni.status)"
						class="text-base px-4 py-1"
					>
						{{ siswaAbsenHariIni.status }}
					</span>
					<p v-if="siswaAbsenHariIni.jamDatang" class="text-sm text-slate-500">
						Masuk: {{ siswaAbsenHariIni.jamDatang }}
						<span v-if="siswaAbsenHariIni.jamPulang">
							| Pulang: {{ siswaAbsenHariIni.jamPulang }}</span
						>
					</p>
				</div>
				<div v-else class="text-sm text-slate-400">Belum absen hari ini</div>

				<button
					@click="absenSendiri"
					:disabled="scanLoading"
					class="btn-primary px-8 py-3 text-base"
				>
					<i v-if="scanLoading" class="fas fa-circle-notch fa-spin"></i>
					<i v-else class="fas fa-fingerprint"></i>
					Absen Sekarang
				</button>

				<transition name="fade">
					<div
						v-if="scanResult"
						:class="[
							'rounded-xl px-5 py-3 text-sm font-semibold',
							scanResult.success
								? 'bg-emerald-100 text-emerald-700'
								: 'bg-red-100 text-red-700',
						]"
					>
						{{ scanResult.message }}
					</div>
				</transition>
			</div>

			<!-- Riwayat absensi siswa sendiri -->
			<div class="card">
				<h3 class="font-bold text-slate-700 mb-4">Riwayat Absensi Bulan Ini</h3>
				<div class="table-wrap">
					<table class="table">
						<thead>
							<tr>
								<th>Tanggal</th>
								<th>Masuk</th>
								<th>Pulang</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="a in siswaRiwayat" :key="a.id">
								<td class="text-sm">{{ formatDate(a.tanggal) }}</td>
								<td class="font-mono text-xs text-emerald-700">
									{{ a.jamDatang || "-" }}
								</td>
								<td class="font-mono text-xs text-orange-700">
									{{ a.jamPulang || "-" }}
								</td>
								<td>
									<span :class="statusAbsenBadge(a.status)">{{
										a.status
									}}</span>
								</td>
							</tr>
							<tr v-if="!siswaRiwayat.length">
								<td colspan="4" class="text-center py-6 text-slate-400">
									Belum ada riwayat
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</template>

		<!-- ===== VIEW STAFF (admin/bk/guru) ===== -->
		<template v-else>
			<!-- QR Scanner section -->
			<div class="card">
				<div
					class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
				>
					<h3 class="font-bold text-slate-700 flex items-center gap-2">
						<i class="fas fa-qrcode text-blue-500"></i> Scan QR Absensi
					</h3>
					<!-- Mode toggle -->
					<div class="flex gap-2 bg-slate-100 p-1 rounded-xl">
						<button
							v-for="m in modes"
							:key="m.value"
							@click="mode = m.value"
							:class="[
								'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
								mode === m.value
									? 'bg-white shadow text-blue-700'
									: 'text-slate-500 hover:text-slate-700',
							]"
						>
							<i :class="m.icon + ' mr-1'"></i>{{ m.label }}
						</button>
					</div>
				</div>

				<!-- QR Scanner -->
				<div v-if="mode === 'qr'" class="flex flex-col items-center gap-4">
					<div v-if="!scannerActive" class="text-center">
						<div
							class="w-24 h-24 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4"
						>
							<i class="fas fa-qrcode text-4xl text-blue-400"></i>
						</div>
						<p class="text-slate-500 text-sm mb-4">
							Klik tombol untuk membuka kamera QR
						</p>
						<button @click="startScanner" class="btn-primary">
							<i class="fas fa-camera"></i> Buka Kamera
						</button>
					</div>
					<div v-else class="w-full max-w-sm">
						<div
							id="qr-reader"
							class="w-full rounded-2xl overflow-hidden border-2 border-blue-200"
						></div>
						<button @click="stopScanner" class="btn-secondary w-full mt-3">
							<i class="fas fa-stop"></i> Stop Kamera
						</button>
					</div>
				</div>

				<!-- Manual Input -->
				<div v-if="mode === 'manual'" class="flex flex-col sm:flex-row gap-3">
					<div class="flex-1">
						<label class="label">Cari Siswa (Nama / NISN)</label>
						<SiswaSearch
							placeholder="Ketik nama atau NISN siswa..."
							@select="onManualSiswaSelect"
						/>
					</div>
					<div class="flex items-end">
						<button
							@click="submitManual"
							:disabled="scanLoading"
							class="btn-primary w-full sm:w-auto"
						>
							<i v-if="scanLoading" class="fas fa-circle-notch fa-spin"></i>
							<i v-else class="fas fa-check"></i>
							Absen
						</button>
					</div>
				</div>

				<!-- Batch Input -->
				<div v-if="mode === 'batch'" class="space-y-3">
					<div class="flex gap-3">
						<div class="flex-1">
							<label class="label">Kelas</label>
							<select
								v-model="batchKelas"
								@change="loadSiswaBatch"
								class="input"
							>
								<option value="">-- Pilih Kelas --</option>
								<option v-for="k in kelasList" :key="k" :value="k">
									{{ k }}
								</option>
							</select>
						</div>
						<div class="flex-1">
							<label class="label">Tanggal</label>
							<input v-model="batchTanggal" type="date" class="input" />
						</div>
					</div>
					<div
						v-if="batchSiswa.length"
						class="border rounded-xl overflow-hidden"
					>
						<div class="table-wrap max-h-64">
							<table class="table">
								<thead>
									<tr>
										<th>Nama</th>
										<th>Kelas</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="s in batchSiswa" :key="s.nisn">
										<td class="font-medium">{{ s.nama }}</td>
										<td>{{ s.kelas }}</td>
										<td>
											<select
												v-model="batchStatus[s.nisn]"
												class="input input-sm py-1"
											>
												<option v-for="st in statusList" :key="st" :value="st">
													{{ st }}
												</option>
											</select>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="p-3 bg-slate-50 border-t">
							<button
								@click="submitBatch"
								:disabled="scanLoading"
								class="btn-primary"
							>
								<i class="fas fa-save"></i> Simpan Absensi Batch
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Scan result notification -->
			<transition name="fade">
				<div
					v-if="scanResult"
					:class="[
						'card border-2 animate-slide-up',
						scanResult.success
							? 'border-emerald-300 bg-emerald-50'
							: 'border-red-300 bg-red-50',
					]"
				>
					<div class="flex items-start gap-4">
						<div
							:class="[
								'w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0',
								scanResult.success
									? 'bg-emerald-100 text-emerald-600'
									: 'bg-red-100 text-red-600',
							]"
						>
							<i
								:class="
									scanResult.success
										? 'fas fa-check-circle'
										: 'fas fa-times-circle'
								"
							></i>
						</div>
						<div>
							<p
								:class="[
									'font-bold text-base',
									scanResult.success ? 'text-emerald-700' : 'text-red-700',
								]"
							>
								{{ scanResult.message }}
							</p>
							<p v-if="scanResult.data" class="text-sm text-slate-600 mt-1">
								{{ scanResult.data.namaSnapshot }} —
								{{ scanResult.data.kelasSnapshot }} |
								{{ scanResult.data.status }}
								<span v-if="scanResult.data.jamDatang">
									| Masuk: {{ scanResult.data.jamDatang }}</span
								>
								<span v-if="scanResult.data.jamPulang">
									| Pulang: {{ scanResult.data.jamPulang }}</span
								>
							</p>
						</div>
						<button
							@click="scanResult = null"
							class="ml-auto text-slate-400 hover:text-slate-600"
						>
							<i class="fas fa-times"></i>
						</button>
					</div>
				</div>
			</transition>

			<!-- Absensi list hari ini -->
			<div class="card">
				<div
					class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
				>
					<h3 class="font-bold text-slate-700 flex items-center gap-2">
						<i class="fas fa-list text-slate-500"></i>
						Daftar Absensi — {{ formatDate(filterTanggal) }}
						<span class="badge-blue">{{ absensiList.length }} siswa</span>
					</h3>
					<div class="flex gap-2 items-center">
						<input
							v-model="filterTanggal"
							type="date"
							class="input input-sm w-40"
							@change="loadAbsensi"
						/>
						<select
							v-model="filterKelas"
							class="input input-sm w-36"
							@change="loadAbsensi"
						>
							<option value="">Semua Kelas</option>
							<option v-for="k in kelasList" :key="k">{{ k }}</option>
						</select>
						<select
							v-model="filterStatus"
							class="input input-sm w-28"
							@change="loadAbsensi"
						>
							<option value="">Semua</option>
							<option v-for="s in statusList" :key="s">{{ s }}</option>
						</select>
					</div>
				</div>

				<!-- Stats strip -->
				<div class="grid grid-cols-4 gap-2 mb-4">
					<div
						v-for="(count, key) in statsHariIni"
						:key="key"
						:class="['text-center rounded-xl py-2', statBg[key]]"
					>
						<div :class="['text-xl font-bold', statColor[key]]">
							{{ count }}
						</div>
						<div class="text-xs text-slate-500 font-semibold">{{ key }}</div>
					</div>
				</div>

				<div class="table-wrap">
					<table class="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Nama</th>
								<th>Kelas</th>
								<th>Masuk</th>
								<th>Pulang</th>
								<th>Status</th>
								<th>Ket.</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(a, i) in absensiList" :key="a.id" class="group">
								<td class="text-slate-400 text-xs">{{ i + 1 }}</td>
								<td
									class="font-semibold cursor-pointer hover:text-blue-600"
									@click="$router.push('/bk/profil/' + a.siswaNisn)"
								>
									{{ a.namaSnapshot }}
								</td>
								<td>{{ a.kelasSnapshot }}</td>
								<td class="text-xs text-emerald-700 font-mono">
									{{ a.jamDatang || "-" }}
								</td>
								<td class="text-xs text-orange-700 font-mono">
									{{ a.jamPulang || "-" }}
								</td>
								<td>
									<span :class="statusAbsenBadge(a.status)">{{
										a.status
									}}</span>
								</td>
								<td class="text-xs text-slate-500">
									{{ a.keterangan || "-" }}
								</td>
							</tr>
							<tr v-if="!absensiList.length">
								<td colspan="7" class="text-center py-8 text-slate-400">
									Belum ada data absensi
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> </template
		><!-- end staff view -->
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import api from "@/services/api.js";
import { useAuthStore } from "@/stores/auth.js";
import SiswaSearch from "@/components/SiswaSearch.vue";

const authStore = useAuthStore();

// Siswa self-absen
const siswaAbsenHariIni = ref(null);
const siswaRiwayat = ref([]);

async function loadSiswaAbsen() {
	const nisn = authStore.user?.userId;
	if (!nisn) return;
	const today = new Date().toISOString().split("T")[0];
	const dari = new Date(new Date().setDate(1)).toISOString().split("T")[0];
	try {
		const [daily, hist] = await Promise.all([
			api.get("/absensi/harian", { params: { tanggal: today } }),
			api.get("/absensi/riwayat-siswa", { params: { dari, sampai: today } }),
		]);
		siswaAbsenHariIni.value =
			daily.data.data.find((a) => a.siswaNisn === nisn) || null;
		siswaRiwayat.value = hist.data.data || [];
	} catch {
		/* ignore */
	}
}

async function absenSendiri() {
	const nisn = authStore.user?.userId;
	if (!nisn) return;
	scanLoading.value = true;
	try {
		const { data } = await api.post("/absensi/scan", { nisn });
		scanResult.value = { success: data.success, message: data.message };
		if (data.success) {
			await loadSiswaAbsen();
		}
	} catch (e) {
		scanResult.value = {
			success: false,
			message: e.response?.data?.message || "Error",
		};
	} finally {
		scanLoading.value = false;
		clearTimeout(resultTimer);
		resultTimer = setTimeout(() => {
			scanResult.value = null;
		}, 5000);
	}
}

const mode = ref("qr");
const scannerActive = ref(false);
const manualNisn = ref("");
const scanLoading = ref(false);
const scanResult = ref(null);
const filterTanggal = ref(new Date().toISOString().split("T")[0]);
const filterKelas = ref("");
const filterStatus = ref("");
const absensiList = ref([]);
const statsHariIni = ref({ Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 });
const kelasList = ref([]);
const batchKelas = ref("");
const batchTanggal = ref(new Date().toISOString().split("T")[0]);
const batchSiswa = ref([]);
const batchStatus = ref({});
const statusList = ["Hadir", "Sakit", "Izin", "Alpa"];

const modes = [
	{ value: "qr", label: "Scan QR", icon: "fas fa-qrcode" },
	{ value: "manual", label: "Manual", icon: "fas fa-keyboard" },
	{ value: "batch", label: "Batch", icon: "fas fa-list-check" },
];

const statBg = {
	Hadir: "bg-emerald-50",
	Sakit: "bg-yellow-50",
	Izin: "bg-blue-50",
	Alpa: "bg-red-50",
};
const statColor = {
	Hadir: "text-emerald-700",
	Sakit: "text-yellow-700",
	Izin: "text-blue-700",
	Alpa: "text-red-700",
};

let qrCodeRef = null;
let lastScannedNisn = "";
let lastScannedTime = 0;
let sseSource = null;
let resultTimer = null;

function formatDate(d) {
	return d
		? new Date(d).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "numeric",
				month: "long",
			})
		: "-";
}

function statusAbsenBadge(s) {
	const map = {
		Hadir: "badge-green",
		Sakit: "badge-yellow",
		Izin: "badge-blue",
		Alpa: "badge-red",
	};
	return `badge ${map[s] || "badge-gray"}`;
}

async function loadAbsensi() {
	const params = { tanggal: filterTanggal.value };
	if (filterKelas.value) params.kelas = filterKelas.value;
	if (filterStatus.value) params.status = filterStatus.value;
	const { data } = await api.get("/absensi/harian", { params });
	absensiList.value = data.data;
	statsHariIni.value = data.stats;
}

async function loadKelasList() {
	const { data } = await api.get("/siswa/kelas-list");
	kelasList.value = data.data;
}

async function loadSiswaBatch() {
	if (!batchKelas.value) return;
	const { data } = await api.get("/siswa", {
		params: { kelas: batchKelas.value },
	});
	batchSiswa.value = data.data;
	const statusMap = {};
	data.data.forEach((s) => {
		statusMap[s.nisn] = "Hadir";
	});
	batchStatus.value = statusMap;
}

async function startScanner() {
	scannerActive.value = true;
	await new Promise((r) => setTimeout(r, 100));
	const cameras = await Html5Qrcode.getCameras().catch(() => []);
	if (!cameras.length) {
		scanResult.value = {
			success: false,
			message: "Tidak ada kamera ditemukan.",
		};
		scannerActive.value = false;
		return;
	}
	const camId =
		cameras.find((c) => c.label.toLowerCase().includes("back"))?.id ||
		cameras[0].id;
	qrCodeRef = new Html5Qrcode("qr-reader");
	await qrCodeRef.start(
		camId,
		{ fps: 10, qrbox: { width: 250, height: 250 } },
		async (decodedText) => {
			const now = Date.now();
			if (decodedText === lastScannedNisn && now - lastScannedTime < 3000)
				return;
			lastScannedNisn = decodedText;
			lastScannedTime = now;
			await processNisn(decodedText);
		},
		() => {},
	);
}

function stopScanner() {
	qrCodeRef
		?.stop()
		.catch(() => {})
		.finally(() => {
			qrCodeRef = null;
			scannerActive.value = false;
		});
}

async function submitManual() {
	if (!manualNisn.value) return;
	await processNisn(manualNisn.value.trim());
	manualNisn.value = "";
}

async function onManualSiswaSelect(s) {
	manualNisn.value = s.nisn;
	await submitManual();
}

async function processNisn(nisn) {
	scanLoading.value = true;
	try {
		const { data } = await api.post("/absensi/scan", { nisn });
		scanResult.value = {
			success: data.success,
			message: data.message,
			data: data.data,
		};
		if (data.success) loadAbsensi();
	} catch (e) {
		scanResult.value = {
			success: false,
			message: e.response?.data?.message || "Error server",
		};
	} finally {
		scanLoading.value = false;
		clearTimeout(resultTimer);
		resultTimer = setTimeout(() => {
			scanResult.value = null;
		}, 6000);
	}
}

async function submitBatch() {
	if (!batchSiswa.value.length) return;
	scanLoading.value = true;
	try {
		const items = batchSiswa.value.map((s) => ({
			nisn: s.nisn,
			status: batchStatus.value[s.nisn] || "Hadir",
		}));
		await api.post("/absensi/batch", {
			tanggal: batchTanggal.value,
			kelas: batchKelas.value,
			items,
		});
		scanResult.value = {
			success: true,
			message: `Berhasil menyimpan ${items.length} data absensi`,
		};
		loadAbsensi();
	} catch (e) {
		scanResult.value = {
			success: false,
			message: e.response?.data?.message || "Gagal simpan batch",
		};
	} finally {
		scanLoading.value = false;
	}
}

// SSE realtime
function connectSSE() {
	const token = authStore.token;
	const url = token
		? `/api/v1/absensi/stream?token=${encodeURIComponent(token)}`
		: "/api/v1/absensi/stream";
	sseSource = new EventSource(url);
	sseSource.onerror = () => {
		/* silently ignore */
	};
	sseSource.onmessage = (e) => {
		try {
			const payload = JSON.parse(e.data);
			if (
				payload.type === "absensi_update" ||
				payload.type === "batch_update"
			) {
				const today = new Date().toISOString().split("T")[0];
				if (filterTanggal.value === today) loadAbsensi();
			}
		} catch {
			/* ignore */
		}
	};
}

onMounted(async () => {
	if (authStore.isSiswa) {
		await loadSiswaAbsen();
		return;
	}
	await Promise.all([loadAbsensi(), loadKelasList()]);
	connectSSE();
});
onUnmounted(() => {
	stopScanner();
	sseSource?.close();
	clearTimeout(resultTimer);
});
</script>
