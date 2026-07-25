<template>
	<div class="space-y-8 animate-fade-in">
		<div>
			<h2 class="text-xl font-bold text-slate-800">Konfigurasi Sistem</h2>
			<p class="text-sm text-slate-500">
				Pengaturan absensi, jam sekolah, dan hari libur
			</p>
		</div>

		<!-- Identitas Sekolah -->
		<div class="card">
			<h3 class="font-bold text-slate-700 mb-4 flex items-center gap-2">
				<i class="fas fa-school text-purple-500"></i> Identitas Sekolah
			</h3>
			<div v-if="config" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="sm:col-span-2">
					<label class="label">Nama Aplikasi</label>
					<input
						v-model="config.appName"
						type="text"
						class="input"
						placeholder="BK RSMS / SIAP BK"
					/>
				</div>
				<div class="sm:col-span-2">
					<label class="label">Nama Sekolah</label>
					<input
						v-model="config.namaSekolah"
						type="text"
						class="input"
						placeholder="SMK Negeri 1 ..."
					/>
				</div>
				<div>
					<label class="label">Nama Kepala Sekolah</label>
					<input
						v-model="config.namaKepalaSekolah"
						type="text"
						class="input"
						placeholder="Drs. ..."
					/>
				</div>
				<div>
					<label class="label">NIP Kepala Sekolah</label>
					<input
						v-model="config.nipKepalaSekolah"
						type="text"
						class="input"
						placeholder="19..."
					/>
				</div>
				<div class="sm:col-span-2">
					<label class="label">Alamat Sekolah</label>
					<input
						v-model="config.alamatSekolah"
						type="text"
						class="input"
						placeholder="Jl. ..."
					/>
				</div>
				<div>
					<label class="label">NPSN</label>
					<input
						v-model="config.npsn"
						type="text"
						class="input"
						placeholder="12345678"
					/>
				</div>
				<div>
					<label class="label">Batas Poin Pelanggaran</label>
					<input
						v-model.number="config.batasPoinPelanggaran"
						type="number"
						class="input"
						min="0"
						placeholder="100"
					/>
					<p class="text-xs text-slate-400 mt-1">
						Siswa dengan poin ≥ nilai ini akan mendapat peringatan.
					</p>
				</div>
			</div>
			<div class="mt-4 flex justify-end">
				<button @click="saveConfig" :disabled="saveLoading" class="btn-primary">
					<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
					Simpan
				</button>
			</div>
		</div>

		<!-- Tampilan & Branding -->
		<div class="card">
			<h3 class="font-bold text-slate-700 mb-4 flex items-center gap-2">
				<i class="fas fa-palette text-pink-500"></i> Tampilan & Branding
			</h3>
			<div v-if="config" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="sm:col-span-2">
					<label class="label">URL Logo Aplikasi</label>
					<div class="flex gap-3 items-center">
						<input
							v-model="config.logoUrl"
							type="text"
							class="input flex-1"
							placeholder="/uploads/bk/logo.png atau https://..."
						/>
						<input
							type="file"
							accept="image/*"
							@change="uploadBranding('logoUrl', $event)"
							class="hidden"
							:ref="(el) => (fileInputs.logoUrl = el)"
						/>
						<button
							type="button"
							@click="fileInputs.logoUrl?.click()"
							class="btn-secondary btn-sm shrink-0"
						>
							<i class="fas fa-upload"></i> Upload
						</button>
						<div
							class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0"
						>
							<img
								v-if="config.logoUrl"
								:src="config.logoUrl"
								class="max-w-full max-h-full object-contain"
								@error="config.logoUrl = ''"
								alt="Logo"
							/>
							<i v-else class="fas fa-image text-slate-300 text-xl"></i>
						</div>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label class="label">URL Gambar Latar Halaman Login</label>
					<div class="flex gap-3 items-center">
						<input
							v-model="config.backgroundUrl"
							type="text"
							class="input flex-1"
							placeholder="/uploads/bk/background.jpg atau https://..."
						/>
						<input
							type="file"
							accept="image/*"
							@change="uploadBranding('backgroundUrl', $event)"
							class="hidden"
							:ref="(el) => (fileInputs.backgroundUrl = el)"
						/>
						<button
							type="button"
							@click="fileInputs.backgroundUrl?.click()"
							class="btn-secondary btn-sm shrink-0"
						>
							<i class="fas fa-upload"></i> Upload
						</button>
						<div
							class="w-20 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0"
						>
							<img
								v-if="config.backgroundUrl"
								:src="config.backgroundUrl"
								class="w-full h-full object-cover"
								@error="config.backgroundUrl = ''"
								alt="BG"
							/>
							<div
								v-else
								class="w-full h-full flex items-center justify-center"
							>
								<i class="fas fa-image text-slate-300"></i>
							</div>
						</div>
					</div>
					<p class="text-xs text-slate-400 mt-1">
						Direkomendasikan gambar landscape.
					</p>
				</div>
				<div>
					<label class="label">URL Favicon (ikon tab browser)</label>
					<div class="flex gap-3 items-center">
						<input
							v-model="config.faviconUrl"
							type="text"
							class="input flex-1"
							placeholder="/uploads/bk/favicon.ico atau https://..."
						/>
						<input
							type="file"
							accept="image/*"
							@change="uploadBranding('faviconUrl', $event)"
							class="hidden"
							:ref="(el) => (fileInputs.faviconUrl = el)"
						/>
						<button
							type="button"
							@click="fileInputs.faviconUrl?.click()"
							class="btn-secondary btn-sm shrink-0"
						>
							<i class="fas fa-upload"></i> Upload
						</button>
					</div>
				</div>
			</div>
			<div class="mt-4 flex justify-end">
				<button @click="saveConfig" :disabled="saveLoading" class="btn-primary">
					<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
					Simpan Tampilan
				</button>
			</div>
		</div>

		<!-- Config form -->
		<div class="card">
			<h3 class="font-bold text-slate-700 mb-4 flex items-center gap-2">
				<i class="fas fa-cog text-blue-500"></i> Pengaturan Absensi
			</h3>
			<div v-if="config" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label class="label">Jam Buka Absensi (HH:MM)</label>
					<input v-model="config.jam_masuk_mulai" type="time" class="input" />
					<p class="text-xs text-slate-400 mt-1">
						Absensi mulai dibuka jam ini.
					</p>
				</div>
				<div>
					<label class="label">Batas Jam Masuk — Telat setelah ini</label>
					<input v-model="config.jam_masuk_akhir" type="time" class="input" />
					<p class="text-xs text-slate-400 mt-1">
						Siswa yang absen setelah jam ini dianggap terlambat.
					</p>
				</div>
				<div>
					<label class="label">Jam Mulai Pulang (HH:MM)</label>
					<input v-model="config.jam_pulang_mulai" type="time" class="input" />
					<p class="text-xs text-slate-400 mt-1">
						Absensi pulang mulai bisa diinput.
					</p>
				</div>
				<div>
					<label class="label">Batas Jam Pulang (HH:MM)</label>
					<input v-model="config.jam_pulang_akhir" type="time" class="input" />
					<p class="text-xs text-slate-400 mt-1">
						Setelah jam ini absensi ditutup.
					</p>
				</div>
				<div>
					<label class="label">Mode Absen</label>
					<select v-model="config.mode_absen" class="input">
						<option value="masuk_saja">Masuk saja</option>
						<option value="masuk_pulang">Masuk & Pulang</option>
						<option value="masuk_sholat_pulang">Masuk, Sholat & Pulang</option>
					</select>
				</div>
				<div class="sm:col-span-2">
					<label class="label">Jadwal Aktif per Hari</label>
					<div class="flex flex-wrap gap-2">
						<label
							v-for="d in hariList"
							:key="d.value"
							class="flex items-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-blue-50 px-3 py-2 rounded-lg border border-slate-200 transition"
						>
							<input
								type="checkbox"
								:value="d.value"
								v-model="config.jadwal_harian"
								class="rounded"
							/>
							<span class="text-sm text-slate-700">{{ d.label }}</span>
						</label>
					</div>
					<p class="text-xs text-slate-400 mt-1">
						Biarkan kosong untuk tidak membatasi hari.
					</p>
				</div>
			</div>
			<div class="mt-4 flex justify-end">
				<button @click="saveConfig" :disabled="saveLoading" class="btn-primary">
					<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i> Simpan
					Konfigurasi
				</button>
			</div>
		</div>

		<!-- Hari libur -->
		<div class="card">
			<div class="flex items-center justify-between mb-4">
				<h3 class="font-bold text-slate-700 flex items-center gap-2">
					<i class="fas fa-calendar-times text-red-500"></i> Hari Libur / Tidak
					Masuk
				</h3>
				<button @click="showHariLiburModal = true" class="btn-primary btn-sm">
					<i class="fas fa-plus"></i> Tambah
				</button>
			</div>
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>Tanggal</th>
							<th>Keterangan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="h in hariLibur" :key="h.id">
							<td>{{ formatDate(h.tanggal) }}</td>
							<td>{{ h.keterangan }}</td>
							<td>
								<button
									@click="deleteHariLibur(h.id)"
									class="text-red-400 hover:text-red-600 transition"
								>
									<i class="fas fa-trash-alt"></i>
								</button>
							</td>
						</tr>
						<tr v-if="!hariLibur.length">
							<td colspan="3" class="text-center py-6 text-slate-400">
								Tidak ada hari libur
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Hari libur modal -->
		<div
			v-if="showHariLiburModal"
			class="modal-overlay"
			@click.self="showHariLiburModal = false"
		>
			<div class="modal">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">Tambah Hari Libur</h3>
					<button @click="showHariLiburModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div>
						<label class="label">Tanggal *</label
						><input v-model="hlForm.tanggal" type="date" class="input" />
					</div>
					<div>
						<label class="label">Keterangan *</label
						><input
							v-model="hlForm.keterangan"
							type="text"
							class="input"
							placeholder="cth: Hari Raya Idul Fitri"
						/>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showHariLiburModal = false" class="btn-secondary">
						Batal
					</button>
					<button @click="addHariLibur" class="btn-primary">Simpan</button>
				</div>
			</div>
		</div>

		<!-- Sinkronisasi Siswa & Guru dari CBT RSMS -->
		<div class="card">
			<h3 class="font-bold text-slate-700 mb-1 flex items-center gap-2">
				<i class="fas fa-sync-alt text-green-500"></i> Sinkronisasi Siswa & Guru
				dari CBT RSMS
			</h3>
			<p class="text-sm text-slate-500 mb-4">
				Tarik data siswa dan guru/admin dari aplikasi CBT RSMS ke database BK
				secara otomatis.
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<button @click="syncFromCbt" :disabled="syncing" class="btn-success">
					<i v-if="syncing" class="fas fa-circle-notch fa-spin"></i>
					<i v-else class="fas fa-sync-alt"></i>
					{{ syncing ? "Menyinkronkan..." : "Sinkronkan Siswa & Guru" }}
				</button>
				<span
					v-if="syncStatus"
					class="text-sm"
					:class="syncStatus.ok ? 'text-emerald-600' : 'text-red-600'"
				>
					<i
						:class="
							syncStatus.ok ? 'fas fa-check-circle' : 'fas fa-times-circle'
						"
						class="mr-1"
					></i>
					{{ syncStatus.msg }}
				</span>
			</div>
			<div
				v-if="syncResult"
				class="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200"
			>
				<p class="text-sm font-bold text-emerald-700 mb-2">
					<i class="fas fa-check-circle mr-1"></i>Hasil Sinkronisasi
				</p>
				<div class="grid grid-cols-2 gap-3 text-sm">
					<div class="bg-white rounded-lg p-3 border border-emerald-100">
						<p class="font-semibold text-slate-700">Siswa</p>
						<p class="text-emerald-600">
							+{{ syncResult.siswa.ditambah }} baru
						</p>
						<p class="text-blue-600">
							↑ {{ syncResult.siswa.diperbarui }} diperbarui
						</p>
						<p class="text-slate-400 text-xs mt-1">
							Total dari CBT: {{ syncResult.siswa.total }}
						</p>
					</div>
					<div class="bg-white rounded-lg p-3 border border-emerald-100">
						<p class="font-semibold text-slate-700">Guru/Admin</p>
						<p class="text-emerald-600">+{{ syncResult.guru.ditambah }} baru</p>
						<p class="text-blue-600">
							↑ {{ syncResult.guru.diperbarui }} diperbarui
						</p>
						<p class="text-slate-400 text-xs mt-1">
							Total dari CBT: {{ syncResult.guru.total }}
						</p>
					</div>
				</div>
			</div>
			<div
				v-if="syncError"
				class="mt-4 p-4 bg-red-50 rounded-xl border border-red-200 text-sm text-red-700"
			>
				<i class="fas fa-exclamation-triangle mr-1"></i> {{ syncError }}
			</div>
		</div>

		<!-- Sinkronisasi Master Data (Kelas & Mapel) dari CBT -->
		<div class="card">
			<h3 class="font-bold text-slate-700 mb-1 flex items-center gap-2">
				<i class="fas fa-database text-blue-500"></i> Sinkronisasi Master Data
				dari CBT RSMS
			</h3>
			<p class="text-sm text-slate-500 mb-4">
				Tarik data kelas dan mata pelajaran dari CBT RSMS.
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<button
					@click="syncMasterData"
					:disabled="syncingMasterData"
					class="btn-success"
				>
					<i v-if="syncingMasterData" class="fas fa-circle-notch fa-spin"></i>
					<i v-else class="fas fa-database"></i>
					{{
						syncingMasterData ? "Menyinkronkan..." : "Sinkronkan Kelas & Mapel"
					}}
				</button>
				<span
					v-if="syncMasterDataStatus"
					class="text-sm"
					:class="syncMasterDataStatus.ok ? 'text-emerald-600' : 'text-red-600'"
				>
					<i
						:class="
							syncMasterDataStatus.ok
								? 'fas fa-check-circle'
								: 'fas fa-times-circle'
						"
						class="mr-1"
					></i>
					{{ syncMasterDataStatus.msg }}
				</span>
			</div>
			<div
				v-if="syncMasterDataResult"
				class="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200"
			>
				<p class="text-sm font-bold text-emerald-700 mb-2">
					<i class="fas fa-check-circle mr-1"></i>Hasil Sinkronisasi Master Data
				</p>
				<div class="grid grid-cols-2 gap-3 text-sm">
					<div class="bg-white rounded-lg p-3 border border-emerald-100">
						<p class="font-semibold text-slate-700">Kelas</p>
						<p class="text-emerald-600">
							+{{ syncMasterDataResult.kelas.ditambah }} baru
						</p>
						<p class="text-blue-600">
							↑ {{ syncMasterDataResult.kelas.diperbarui }} diperbarui
						</p>
						<p class="text-slate-400 text-xs mt-1">
							Total: {{ syncMasterDataResult.kelas.total }}
						</p>
					</div>
					<div class="bg-white rounded-lg p-3 border border-emerald-100">
						<p class="font-semibold text-slate-700">Mata Pelajaran</p>
						<p class="text-emerald-600">
							+{{ syncMasterDataResult.mapel.ditambah }} baru
						</p>
						<p class="text-blue-600">
							↑ {{ syncMasterDataResult.mapel.diperbarui }} diperbarui
						</p>
						<p class="text-slate-400 text-xs mt-1">
							Total: {{ syncMasterDataResult.mapel.total }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api.js";
import { useToast } from "@/composables/useToast.js";
import { useConfirm } from "@/composables/useConfirm.js";

const toast = useToast();
const { confirm } = useConfirm();
const fileInputs = ref({});

const config = ref(null);
const hariLibur = ref([]);
const saveLoading = ref(false);
const showHariLiburModal = ref(false);
const hlForm = ref({ tanggal: "", keterangan: "" });
const syncing = ref(false);
const syncStatus = ref(null);
const syncResult = ref(null);
const syncError = ref("");
const syncingMasterData = ref(false);
const syncMasterDataStatus = ref(null);
const syncMasterDataResult = ref(null);

const hariList = [
	{ value: "Senin", label: "Sen" },
	{ value: "Selasa", label: "Sel" },
	{ value: "Rabu", label: "Rab" },
	{ value: "Kamis", label: "Kam" },
	{ value: "Jumat", label: "Jum" },
	{ value: "Sabtu", label: "Sab" },
	{ value: "Minggu", label: "Min" },
];

function formatDate(d) {
	return d
		? new Date(d).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
			})
		: "-";
}

async function loadConfig() {
	const { data } = await api.get("/config");
	const d = data.data;
	config.value = {
		appName: d.appName || "",
		namaSekolah: d.namaSekolah || "",
		logoUrl: d.logoUrl || "",
		backgroundUrl: d.backgroundUrl || "",
		faviconUrl: d.faviconUrl || "",
		namaKepalaSekolah: d.namaKepalaSekolah || "",
		nipKepalaSekolah: d.nipKepalaSekolah || "",
		alamatSekolah: d.alamatSekolah || "",
		npsn: d.npsn || "",
		batasPoinPelanggaran: d.batasPoinPelanggaran || 100,
		jam_masuk_mulai: d.jam_masuk_mulai || d.jamMasuk || "07:00",
		jam_masuk_akhir: d.jam_masuk_akhir || "08:00",
		jam_pulang_mulai: d.jam_pulang_mulai || d.jamPulang || "14:00",
		jam_pulang_akhir: d.jam_pulang_akhir || "17:00",
		mode_absen: d.mode_absen || d.modeAbsen || "masuk_pulang",
		jadwal_harian: Array.isArray(d.jadwal_harian)
			? d.jadwal_harian
			: Array.isArray(d.jadwalHarian)
				? d.jadwalHarian
				: [],
	};
}

async function loadHariLibur() {
	const { data } = await api.get("/config/hari-libur");
	hariLibur.value = data.data;
}

async function saveConfig() {
	saveLoading.value = true;
	try {
		await api.put("/config", config.value);
		toast.success("Konfigurasi berhasil disimpan");
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menyimpan konfigurasi");
	} finally {
		saveLoading.value = false;
	}
}

async function addHariLibur() {
	if (!hlForm.value.tanggal || !hlForm.value.keterangan) {
		toast.warn("Lengkapi data!");
		return;
	}
	await api.post("/config/hari-libur", hlForm.value);
	showHariLiburModal.value = false;
	hlForm.value = { tanggal: "", keterangan: "" };
	loadHariLibur();
}

async function deleteHariLibur(id) {
	if (!(await confirm("Hapus hari libur ini?"))) return;
	await api.delete(`/config/hari-libur/${id}`);
	toast.success("Hari libur dihapus");
	loadHariLibur();
}

async function syncFromCbt() {
	syncing.value = true;
	syncStatus.value = null;
	syncResult.value = null;
	syncError.value = "";
	try {
		const { data } = await api.post("/sync/from-cbt");
		syncResult.value = data.data;
		syncStatus.value = { ok: true, msg: data.message };
	} catch (e) {
		const msg =
			e.response?.data?.message ||
			"Gagal terhubung ke CBT RSMS. Pastikan server CBT berjalan.";
		syncError.value = msg;
		syncStatus.value = { ok: false, msg };
	} finally {
		syncing.value = false;
	}
}

async function syncMasterData() {
	syncingMasterData.value = true;
	syncMasterDataStatus.value = null;
	syncMasterDataResult.value = null;
	try {
		const { data } = await api.post("/sync/from-cbt/master-data");
		syncMasterDataResult.value = data.data;
		syncMasterDataStatus.value = { ok: true, msg: data.message };
	} catch (e) {
		const msg =
			e.response?.data?.message ||
			"Gagal sinkronisasi master data. Pastikan server CBT berjalan.";
		syncMasterDataStatus.value = { ok: false, msg };
	} finally {
		syncingMasterData.value = false;
	}
}

async function uploadBranding(field, event) {
	const file = event.target.files?.[0];
	if (!file) return;
	const formData = new FormData();
	formData.append("file", file);
	try {
		const { data } = await api.post("/uploads/bk-image", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		config.value[field] = data.url;
		toast.success("Gambar berhasil diupload");
	} catch (e) {
		toast.error(e.response?.data?.message || "Upload gagal");
	}
}

onMounted(() => {
	loadConfig();
	loadHariLibur();
});
</script>
