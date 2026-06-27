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
					Simpan Identitas
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
					<label class="label">Jam Masuk (HH:MM)</label
					><input v-model="config.jamMasuk" type="time" class="input" />
				</div>
				<div>
					<label class="label">Jam Pulang (HH:MM)</label
					><input v-model="config.jamPulang" type="time" class="input" />
				</div>
				<div>
					<label class="label">Batas Telat (menit)</label
					><input
						v-model.number="config.batasTelat"
						type="number"
						class="input"
						min="0"
					/>
				</div>
				<div>
					<label class="label">Mode Absen</label>
					<select v-model="config.modeAbsen" class="input">
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
								v-model="config.jadwalHarian"
								class="rounded"
							/>
							<span class="text-sm text-slate-700">{{ d.label }}</span>
						</label>
					</div>
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
	</div>

	<!-- Sinkronisasi dari CBT RSMS -->
	<div class="card">
		<h3 class="font-bold text-slate-700 mb-1 flex items-center gap-2">
			<i class="fas fa-sync-alt text-green-500"></i> Sinkronisasi Data dari CBT
			RSMS
		</h3>
		<p class="text-sm text-slate-500 mb-4">
			Tarik data siswa dan guru/admin dari aplikasi CBT RSMS ke database BK
			secara otomatis.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<button @click="syncFromCbt" :disabled="syncing" class="btn-success">
				<i v-if="syncing" class="fas fa-circle-notch fa-spin"></i>
				<i v-else class="fas fa-sync-alt"></i>
				{{ syncing ? "Menyinkronkan..." : "Sinkronkan Sekarang" }}
			</button>
			<span
				v-if="syncStatus"
				class="text-sm"
				:class="syncStatus.ok ? 'text-emerald-600' : 'text-red-600'"
			>
				<i
					:class="syncStatus.ok ? 'fas fa-check-circle' : 'fas fa-times-circle'"
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
					<p class="text-emerald-600">+{{ syncResult.siswa.ditambah }} baru</p>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api.js";

const config = ref(null);
const hariLibur = ref([]);
const saveLoading = ref(false);
const showHariLiburModal = ref(false);
const hlForm = ref({ tanggal: "", keterangan: "" });
const syncing = ref(false);
const syncStatus = ref(null);
const syncResult = ref(null);
const syncError = ref("");

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
	config.value = { ...data.data, jadwalHarian: data.data.jadwalHarian || [] };
}

async function loadHariLibur() {
	const { data } = await api.get("/config/hari-libur");
	hariLibur.value = data.data;
}

async function saveConfig() {
	saveLoading.value = true;
	try {
		await api.put("/config", config.value);
		alert("Konfigurasi berhasil disimpan");
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function addHariLibur() {
	if (!hlForm.value.tanggal || !hlForm.value.keterangan)
		return alert("Lengkapi data!");
	await api.post("/config/hari-libur", hlForm.value);
	showHariLiburModal.value = false;
	hlForm.value = { tanggal: "", keterangan: "" };
	loadHariLibur();
}

async function deleteHariLibur(id) {
	if (!confirm("Hapus hari libur ini?")) return;
	await api.delete(`/config/hari-libur/${id}`);
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

onMounted(() => {
	loadConfig();
	loadHariLibur();
});
</script>
