<template>
	<div class="space-y-6 animate-fade-in">
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800">Kasus Siswa</h2>
				<p class="text-sm text-slate-500">
					Manajemen dan monitoring kasus bimbingan konseling
				</p>
			</div>
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-plus"></i> Tambah Kasus
			</button>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
			<div
				v-for="s in statusStats"
				:key="s.label"
				:class="[
					'card-sm text-center cursor-pointer hover:shadow-md transition',
					filterStatus === s.value ? 'ring-2 ring-blue-400' : '',
				]"
				@click="
					filterStatus = s.value;
					loadKasus();
				"
			>
				<div :class="['text-2xl font-bold', s.color]">{{ s.count }}</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					{{ s.label }}
				</div>
			</div>
		</div>

		<!-- Filters -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div>
				<label class="label">Cari</label
				><input
					v-model="filterSearch"
					type="text"
					class="input w-44"
					placeholder="Nama / nomor kasus..."
				/>
			</div>
			<div>
				<label class="label">Status</label>
				<select v-model="filterStatus" class="input w-32">
					<option value="">Semua</option>
					<option v-for="s in statusList" :key="s">{{ s }}</option>
				</select>
			</div>
			<div>
				<label class="label">Jenis Kasus</label>
				<select v-model="filterJenisKasus" class="input w-44">
					<option value="">Semua</option>
					<option v-for="j in jenisKasusList" :key="j.id" :value="j.id">
						{{ j.nama }}
					</option>
				</select>
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" class="input w-32">
					<option value="">Semua</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<button @click="loadKasus" class="btn-secondary">
				<i class="fas fa-search"></i>
			</button>
		</div>

		<!-- Kasus list -->
		<div class="space-y-3">
			<div
				v-for="k in kasusList"
				:key="k.id"
				class="card hover:shadow-md transition cursor-pointer"
				@click="openDetail(k)"
			>
				<div class="flex items-start gap-4">
					<div
						:class="[
							'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
							statusBg[k.status],
						]"
					>
						<i
							:class="['fas fa-folder text-lg', statusColorIcon[k.status]]"
						></i>
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<span class="font-bold text-slate-800">{{ k.siswa?.nama }}</span>
							<span class="text-xs text-slate-400">{{ k.siswa?.kelas }}</span>
							<span class="text-xs font-mono text-slate-400">{{
								k.nomor
							}}</span>
							<span :class="statusClass(k.status)">{{ k.status }}</span>
						</div>
						<p class="text-sm text-slate-600 line-clamp-2">{{ k.deskripsi }}</p>
						<div class="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
							<span
								><i class="fas fa-tag mr-1"></i
								>{{ k.jenisKasus?.nama || "Umum" }}</span
							>
							<span
								><i class="fas fa-calendar mr-1"></i
								>{{ formatDate(k.tanggal) }}</span
							>
							<span
								><i class="fas fa-clipboard-list mr-1"></i
								>{{ k.laporanList?.length || 0 }} laporan</span
							>
						</div>
					</div>
					<div class="text-slate-300 shrink-0">
						<i class="fas fa-chevron-right"></i>
					</div>
				</div>
			</div>
			<div
				v-if="!kasusList.length"
				class="card text-center py-12 text-slate-400"
			>
				<i class="fas fa-folder-open text-4xl mb-3 opacity-30"></i>
				<p>Tidak ada kasus ditemukan</p>
			</div>
		</div>

		<!-- Modal Tambah -->
		<div
			v-if="showAddModal"
			class="modal-overlay"
			@click.self="showAddModal = false"
		>
			<div class="modal modal-lg">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">Tambah Kasus Siswa</h3>
					<button
						@click="showAddModal = false"
						class="text-slate-400 hover:text-slate-600"
					>
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div>
						<label class="label">Siswa</label>
						<div class="relative">
							<input
								v-model="searchSiswa"
								@input="searchSiswaList"
								type="text"
								class="input"
								placeholder="Cari nama atau NISN..."
							/>
							<div
								v-if="siswaResults.length"
								class="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto"
							>
								<div
									v-for="s in siswaResults"
									:key="s.nisn"
									@click="selectSiswa(s)"
									class="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm"
								>
									<span class="font-semibold">{{ s.nama }}</span>
									<span class="text-slate-400"
										>{{ s.kelas }} — {{ s.nisn }}</span
									>
								</div>
							</div>
						</div>
						<div
							v-if="form.siswaNisn"
							class="mt-2 px-3 py-2 bg-blue-50 rounded-lg text-sm text-blue-700 font-semibold"
						>
							{{ form.siswaNama }}
						</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label class="label">Jenis Kasus</label>
							<select v-model="form.jenisKasusId" class="input">
								<option value="">-- Pilih Jenis --</option>
								<option v-for="j in jenisKasusList" :key="j.id" :value="j.id">
									{{ j.nama }}
								</option>
							</select>
						</div>
						<div>
							<label class="label">Jenis Pelanggaran (opsional)</label>
							<select v-model="form.jenisPelanggaranId" class="input">
								<option value="">-- Opsional --</option>
								<option
									v-for="j in jenisPelanggaranList"
									:key="j.id"
									:value="j.id"
								>
									{{ j.nama }}
								</option>
							</select>
						</div>
					</div>
					<div>
						<label class="label">Tanggal Kejadian</label>
						<input v-model="form.tanggal" type="date" class="input" />
					</div>
					<div>
						<label class="label">Deskripsi Kasus *</label>
						<textarea
							v-model="form.deskripsi"
							rows="4"
							class="input"
							placeholder="Jelaskan kronologi kasus..."
							required
						></textarea>
					</div>
					<div>
						<label class="label">Penanganan Awal</label>
						<textarea
							v-model="form.penanganan"
							rows="2"
							class="input"
							placeholder="Tindakan yang sudah dilakukan..."
						></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showAddModal = false" class="btn-secondary">
						Batal
					</button>
					<button
						@click="saveKasus"
						:disabled="saveLoading"
						class="btn-primary"
					>
						<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
						Simpan Kasus
					</button>
				</div>
			</div>
		</div>

		<!-- Detail Modal -->
		<div
			v-if="selectedKasus"
			class="modal-overlay"
			@click.self="selectedKasus = null"
		>
			<div class="modal modal-xl">
				<div class="modal-header">
					<div>
						<h3 class="font-bold text-slate-800">
							Detail Kasus — {{ selectedKasus.nomor }}
						</h3>
						<p class="text-sm text-slate-500">
							{{ selectedKasus.siswa?.nama }} ({{ selectedKasus.siswa?.kelas }})
						</p>
					</div>
					<div class="flex items-center gap-2">
						<span :class="statusClass(selectedKasus.status)">{{
							selectedKasus.status
						}}</span>
						<button
							@click="selectedKasus = null"
							class="text-slate-400 hover:text-slate-600 ml-2"
						>
							<i class="fas fa-times"></i>
						</button>
					</div>
				</div>
				<div class="modal-body space-y-5">
					<div class="p-4 bg-slate-50 rounded-xl">
						<p class="text-xs font-bold text-slate-500 uppercase mb-1">
							Deskripsi Kasus
						</p>
						<p class="text-sm text-slate-700">{{ selectedKasus.deskripsi }}</p>
					</div>
					<div class="grid grid-cols-2 gap-3 text-sm">
						<div>
							<span class="font-bold text-slate-500">Jenis:</span>
							{{ selectedKasus.jenisKasus?.nama || "-" }}
						</div>
						<div>
							<span class="font-bold text-slate-500">Tanggal:</span>
							{{ formatDate(selectedKasus.tanggal) }}
						</div>
					</div>

					<!-- Timeline laporan -->
					<div>
						<h4 class="font-bold text-slate-700 mb-3">Timeline Penanganan</h4>
						<div class="space-y-3 pl-4 border-l-2 border-slate-200">
							<div
								v-for="l in selectedKasus.laporanList"
								:key="l.id"
								class="relative"
							>
								<div
									class="absolute -left-[21px] w-4 h-4 rounded-full bg-blue-400 border-2 border-white"
								></div>
								<div class="ml-3 p-3 bg-slate-50 rounded-xl">
									<div class="flex items-center justify-between mb-1">
										<span class="text-xs font-bold text-slate-500">{{
											formatDate(l.tanggal)
										}}</span>
										<span :class="statusClass(l.status)">{{ l.status }}</span>
									</div>
									<p class="text-sm text-slate-700">{{ l.catatan }}</p>
									<p class="text-xs text-slate-400 mt-1">— {{ l.inputBy }}</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Add laporan -->
					<div
						class="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3"
					>
						<h4 class="font-bold text-blue-800 text-sm">
							Tambah Update / Laporan
						</h4>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="label">Tanggal</label>
								<input
									v-model="laporanForm.tanggal"
									type="date"
									class="input"
								/>
							</div>
							<div>
								<label class="label">Update Status</label>
								<select v-model="laporanForm.status" class="input">
									<option v-for="s in statusList" :key="s">{{ s }}</option>
								</select>
							</div>
						</div>
						<div>
							<label class="label">Catatan Penanganan</label>
							<textarea
								v-model="laporanForm.catatan"
								rows="2"
								class="input"
								placeholder="Catatan tindak lanjut..."
							></textarea>
						</div>
						<button
							@click="saveLaporan"
							:disabled="laporanLoading"
							class="btn-primary btn-sm"
						>
							<i v-if="laporanLoading" class="fas fa-circle-notch fa-spin"></i>
							Simpan Update
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api.js";

const kasusList = ref([]);
const jenisKasusList = ref([]);
const jenisPelanggaranList = ref([]);
const kelasList = ref([]);
const filterSearch = ref("");
const filterStatus = ref("");
const filterJenisKasus = ref("");
const filterKelas = ref("");
const showAddModal = ref(false);
const saveLoading = ref(false);
const selectedKasus = ref(null);
const laporanLoading = ref(false);
const searchSiswa = ref("");
const siswaResults = ref([]);
const allStats = ref({ Baru: 0, Proses: 0, Selesai: 0, Ditutup: 0 });

const form = ref({
	siswaNisn: "",
	siswaNama: "",
	jenisKasusId: "",
	jenisPelanggaranId: "",
	tanggal: new Date().toISOString().split("T")[0],
	deskripsi: "",
	penanganan: "",
});
const laporanForm = ref({
	tanggal: new Date().toISOString().split("T")[0],
	catatan: "",
	status: "Proses",
});

const statusList = ["Baru", "Proses", "Selesai", "Ditutup"];
const statusBg = {
	Baru: "bg-blue-100",
	Proses: "bg-amber-100",
	Selesai: "bg-emerald-100",
	Ditutup: "bg-slate-100",
};
const statusColorIcon = {
	Baru: "text-blue-600",
	Proses: "text-amber-600",
	Selesai: "text-emerald-600",
	Ditutup: "text-slate-400",
};

const statusStats = computed(() => [
	{
		label: "Baru",
		value: "Baru",
		count: allStats.value.Baru || 0,
		color: "text-blue-600",
	},
	{
		label: "Proses",
		value: "Proses",
		count: allStats.value.Proses || 0,
		color: "text-amber-600",
	},
	{
		label: "Selesai",
		value: "Selesai",
		count: allStats.value.Selesai || 0,
		color: "text-emerald-600",
	},
	{
		label: "Ditutup",
		value: "Ditutup",
		count: allStats.value.Ditutup || 0,
		color: "text-slate-500",
	},
]);

function statusClass(s) {
	const map = {
		Baru: "status-baru",
		Proses: "status-proses",
		Selesai: "status-selesai",
		Ditutup: "status-ditutup",
	};
	return map[s] || "badge-gray";
}
function formatDate(d) {
	return d
		? new Date(d).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})
		: "-";
}

async function loadKasus() {
	const params = {};
	if (filterSearch.value) params.search = filterSearch.value;
	if (filterStatus.value) params.status = filterStatus.value;
	if (filterJenisKasus.value) params.jenisKasusId = filterJenisKasus.value;
	if (filterKelas.value) params.kelas = filterKelas.value;
	const { data } = await api.get("/bk/kasus", { params });
	kasusList.value = data.data;
}

async function loadStats() {
	const { data } = await api.get("/bk/kasus/stats");
	allStats.value = data.data.byStatus;
}

async function openDetail(k) {
	const { data } = await api.get(`/bk/kasus/${k.id}`);
	selectedKasus.value = data.data;
	laporanForm.value = {
		tanggal: new Date().toISOString().split("T")[0],
		catatan: "",
		status: "Proses",
	};
}

async function searchSiswaList() {
	if (searchSiswa.value.length < 2) {
		siswaResults.value = [];
		return;
	}
	const { data } = await api.get("/siswa", {
		params: { search: searchSiswa.value },
	});
	siswaResults.value = data.data.slice(0, 8);
}

function selectSiswa(s) {
	form.value.siswaNisn = s.nisn;
	form.value.siswaNama = s.nama;
	siswaResults.value = [];
	searchSiswa.value = "";
}

function openAdd() {
	form.value = {
		siswaNisn: "",
		siswaNama: "",
		jenisKasusId: "",
		jenisPelanggaranId: "",
		tanggal: new Date().toISOString().split("T")[0],
		deskripsi: "",
		penanganan: "",
	};
	showAddModal.value = true;
}

async function saveKasus() {
	if (!form.value.siswaNisn || !form.value.deskripsi)
		return alert("Lengkapi data!");
	saveLoading.value = true;
	try {
		await api.post("/bk/kasus", {
			...form.value,
			jenisKasusId: form.value.jenisKasusId || null,
			jenisPelanggaranId: form.value.jenisPelanggaranId || null,
		});
		showAddModal.value = false;
		loadKasus();
		loadStats();
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function saveLaporan() {
	if (!laporanForm.value.catatan) return alert("Isi catatan!");
	laporanLoading.value = true;
	try {
		await api.post(
			`/bk/kasus/${selectedKasus.value.id}/laporan`,
			laporanForm.value,
		);
		const { data } = await api.get(`/bk/kasus/${selectedKasus.value.id}`);
		selectedKasus.value = data.data;
		laporanForm.value.catatan = "";
		loadKasus();
		loadStats();
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		laporanLoading.value = false;
	}
}

onMounted(async () => {
	await Promise.all([
		loadKasus(),
		loadStats(),
		api.get("/bk/jenis-kasus").then(({ data }) => {
			jenisKasusList.value = data.data;
		}),
		api.get("/bk/jenis-pelanggaran").then(({ data }) => {
			jenisPelanggaranList.value = data.data;
		}),
		api.get("/siswa/kelas-list").then(({ data }) => {
			kelasList.value = data.data;
		}),
	]);
});
</script>
