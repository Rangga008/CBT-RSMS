<template>
	<div class="space-y-6 animate-fade-in">
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800">Poin Siswa</h2>
				<p class="text-sm text-slate-500">
					Manajemen poin prestasi dan pelanggaran siswa
				</p>
			</div>
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-plus"></i> Tambah Poin
			</button>
		</div>

		<!-- Filter bar -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div>
				<label class="label">Cari Siswa</label>
				<input
					v-model="filterSearch"
					type="text"
					class="input w-44"
					placeholder="Nama / NISN..."
				/>
			</div>
			<div>
				<label class="label">Tipe</label>
				<select v-model="filterTipe" class="input w-36">
					<option value="">Semua</option>
					<option value="PRESTASI">Prestasi</option>
					<option value="PELANGGARAN">Pelanggaran</option>
				</select>
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" class="input w-32">
					<option value="">Semua</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<div>
				<label class="label">Dari</label>
				<input v-model="filterDari" type="date" class="input w-36" />
			</div>
			<div>
				<label class="label">Sampai</label>
				<input v-model="filterSampai" type="date" class="input w-36" />
			</div>
			<button @click="loadPoin" class="btn-secondary">
				<i class="fas fa-search"></i> Filter
			</button>
		</div>

		<!-- Tabs: Daftar / Ranking -->
		<div class="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
			<button
				v-for="t in ['list', 'ranking']"
				:key="t"
				@click="activeTab = t"
				:class="[
					'px-4 py-2 rounded-lg text-sm font-bold transition-all',
					activeTab === t ? 'bg-white shadow text-blue-700' : 'text-slate-500',
				]"
			>
				{{ t === "list" ? "Daftar Poin" : "Ranking" }}
			</button>
		</div>

		<!-- List -->
		<div v-if="activeTab === 'list'" class="card">
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>Tanggal</th>
							<th>Siswa</th>
							<th>Kelas</th>
							<th>Tipe</th>
							<th>Jenis</th>
							<th>Poin</th>
							<th>Keterangan</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="p in poinList" :key="p.id">
							<td class="text-xs text-slate-500">
								{{ formatDate(p.tanggal) }}
							</td>
							<td
								class="font-semibold cursor-pointer hover:text-blue-600"
								@click="$router.push('/bk/profil/' + p.siswaNisn)"
							>
								{{ p.siswa?.nama }}
							</td>
							<td>{{ p.siswa?.kelas }}</td>
							<td>
								<span
									:class="
										p.tipe === 'PRESTASI'
											? 'badge bg-emerald-100 text-emerald-700'
											: 'badge bg-red-100 text-red-700'
									"
								>
									<i
										:class="
											p.tipe === 'PRESTASI'
												? 'fas fa-star mr-1'
												: 'fas fa-exclamation-triangle mr-1'
										"
									></i>
									{{ p.tipe === "PRESTASI" ? "Prestasi" : "Pelanggaran" }}
								</span>
							</td>
							<td class="text-sm">
								{{ p.jenisPrestasi?.nama || p.jenisPelanggaran?.nama || "-" }}
							</td>
							<td
								:class="[
									'font-bold text-lg',
									p.tipe === 'PRESTASI' ? 'text-emerald-600' : 'text-red-600',
								]"
							>
								{{ p.tipe === "PRESTASI" ? "+" : "-" }}{{ p.poin }}
							</td>
							<td class="text-xs text-slate-500 max-w-[200px] truncate">
								{{ p.deskripsi || "-" }}
							</td>
							<td>
								<button
									@click="deletePoin(p.id)"
									class="text-red-400 hover:text-red-600 transition"
								>
									<i class="fas fa-trash-alt"></i>
								</button>
							</td>
						</tr>
						<tr v-if="!poinList.length">
							<td colspan="8" class="text-center py-8 text-slate-400">
								Tidak ada data
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Ranking -->
		<div v-if="activeTab === 'ranking'" class="card">
			<div class="flex gap-3 mb-4">
				<select v-model="rankingTipe" @change="loadRanking" class="input w-44">
					<option value="PELANGGARAN">Ranking Pelanggaran</option>
					<option value="PRESTASI">Ranking Prestasi</option>
				</select>
			</div>
			<div class="space-y-2">
				<div
					v-for="(s, i) in rankingList"
					:key="s.nisn"
					class="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition cursor-pointer"
					@click="$router.push('/bk/profil/' + s.nisn)"
				>
					<div
						:class="[
							'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0',
							i === 0
								? 'bg-yellow-400'
								: i === 1
									? 'bg-slate-400'
									: i === 2
										? 'bg-orange-500'
										: rankingTipe === 'PELANGGARAN'
											? 'bg-red-400'
											: 'bg-emerald-400',
						]"
					>
						{{ i + 1 }}
					</div>
					<div class="flex-1">
						<p class="font-semibold text-slate-800">{{ s.nama }}</p>
						<p class="text-xs text-slate-400">{{ s.kelas }}</p>
					</div>
					<div
						:class="[
							'text-2xl font-bold',
							rankingTipe === 'PELANGGARAN'
								? 'text-red-600'
								: 'text-emerald-600',
						]"
					>
						{{ s.totalPoin }} poin
					</div>
				</div>
				<div v-if="!rankingList.length" class="text-center py-8 text-slate-400">
					Tidak ada data ranking
				</div>
			</div>
		</div>

		<!-- Modal Tambah Poin -->
		<div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
			<div class="modal">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">Tambah Poin Siswa</h3>
					<button
						@click="showModal = false"
						class="text-slate-400 hover:text-slate-600"
					>
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div>
						<label class="label">Tipe Poin</label>
						<div class="flex gap-2">
							<button
								v-for="t in ['PRESTASI', 'PELANGGARAN']"
								:key="t"
								@click="form.tipe = t"
								:class="[
									'flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition',
									form.tipe === t
										? t === 'PRESTASI'
											? 'bg-emerald-50 border-emerald-400 text-emerald-700'
											: 'bg-red-50 border-red-400 text-red-700'
										: 'border-slate-200 text-slate-500',
								]"
							>
								<i
									:class="
										t === 'PRESTASI'
											? 'fas fa-star mr-2'
											: 'fas fa-exclamation-triangle mr-2'
									"
								></i>
								{{ t === "PRESTASI" ? "Prestasi" : "Pelanggaran" }}
							</button>
						</div>
					</div>
					<div>
						<label class="label">Cari Siswa (NISN / Nama)</label>
						<div class="relative">
							<input
								v-model="searchSiswa"
								@input="searchSiswaList"
								type="text"
								class="input"
								placeholder="Ketik nama atau NISN..."
							/>
							<div
								v-if="siswaResults.length"
								class="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto"
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
							Terpilih: {{ form.siswaNama }} ({{ form.siswaNisn }})
						</div>
					</div>
					<div>
						<label class="label">{{
							form.tipe === "PRESTASI" ? "Jenis Prestasi" : "Jenis Pelanggaran"
						}}</label>
						<select
							v-model="form.jenisId"
							@change="onJenisChange"
							class="input"
						>
							<option value="">-- Pilih --</option>
							<option v-for="j in activeJenisList" :key="j.id" :value="j.id">
								{{ j.nama }} ({{ j.poin }} poin)
							</option>
						</select>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label class="label">Poin</label>
							<input
								v-model.number="form.poin"
								type="number"
								min="1"
								class="input"
							/>
						</div>
						<div>
							<label class="label">Tanggal</label>
							<input v-model="form.tanggal" type="date" class="input" />
						</div>
					</div>
					<div v-if="form.tipe === 'PRESTASI'">
						<label class="label">Tingkat (Opsional)</label>
						<select v-model="form.tingkat" class="input">
							<option value="">-</option>
							<option v-for="t in tingkatList" :key="t">{{ t }}</option>
						</select>
					</div>
					<div>
						<label class="label">Keterangan</label>
						<textarea
							v-model="form.deskripsi"
							rows="2"
							class="input"
							placeholder="Deskripsi poin..."
						></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showModal = false" class="btn-secondary">
						Batal
					</button>
					<button
						@click="savePoin"
						:disabled="saveLoading"
						:class="form.tipe === 'PRESTASI' ? 'btn-success' : 'btn-danger'"
					>
						<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import api from "@/services/api.js";
import { useToast } from "@/composables/useToast.js";
import { useConfirm } from "@/composables/useConfirm.js";
const toast = useToast();
const { confirm } = useConfirm();

const poinList = ref([]);
const rankingList = ref([]);
const kelasList = ref([]);
const jenisPelanggaran = ref([]);
const jenisPrestasi = ref([]);
const filterSearch = ref("");
const filterTipe = ref("");
const filterKelas = ref("");
const filterDari = ref("");
const filterSampai = ref("");
const activeTab = ref("list");
const rankingTipe = ref("PELANGGARAN");
const showModal = ref(false);
const saveLoading = ref(false);
const searchSiswa = ref("");
const siswaResults = ref([]);

const form = ref({
	tipe: "PELANGGARAN",
	siswaNisn: "",
	siswaNama: "",
	jenisId: "",
	poin: 5,
	tanggal: new Date().toISOString().split("T")[0],
	deskripsi: "",
	tingkat: "",
});

const tingkatList = [
	"Sekolah",
	"Kabupaten/Kota",
	"Provinsi",
	"Nasional",
	"Internasional",
];
const activeJenisList = computed(() =>
	form.value.tipe === "PRESTASI" ? jenisPrestasi.value : jenisPelanggaran.value,
);

function formatDate(d) {
	return d
		? new Date(d).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})
		: "-";
}

async function loadPoin() {
	const params = {};
	if (filterSearch.value) params.search = filterSearch.value;
	if (filterTipe.value) params.tipe = filterTipe.value;
	if (filterKelas.value) params.kelas = filterKelas.value;
	if (filterDari.value && filterSampai.value) {
		params.dari = filterDari.value;
		params.sampai = filterSampai.value;
	}
	const { data } = await api.get("/bk/poin", { params });
	poinList.value = data.data;
}

async function loadRanking() {
	const { data } = await api.get("/bk/poin/ranking", {
		params: { tipe: rankingTipe.value },
	});
	rankingList.value = data.data;
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

function onJenisChange() {
	const jenisList = activeJenisList.value;
	const found = jenisList.find((j) => j.id === form.value.jenisId);
	if (found) form.value.poin = found.poin;
}

function openAdd() {
	form.value = {
		tipe: "PELANGGARAN",
		siswaNisn: "",
		siswaNama: "",
		jenisId: "",
		poin: 5,
		tanggal: new Date().toISOString().split("T")[0],
		deskripsi: "",
		tingkat: "",
	};
	searchSiswa.value = "";
	siswaResults.value = [];
	showModal.value = true;
}

async function savePoin() {
	if (!form.value.siswaNisn || !form.value.poin) {
		toast.warn("Lengkapi data poin!");
		return;
	}
	saveLoading.value = true;
	try {
		const payload = {
			siswaNisn: form.value.siswaNisn,
			tipe: form.value.tipe,
			poin: form.value.poin,
			deskripsi: form.value.deskripsi,
			tanggal: form.value.tanggal,
		};
		if (form.value.tipe === "PRESTASI") {
			payload.jenisPrestasiId = form.value.jenisId || null;
			payload.tingkat = form.value.tingkat || null;
		} else {
			payload.jenisPelanggaranId = form.value.jenisId || null;
		}
		await api.post("/bk/poin", payload);
		showModal.value = false;
		loadPoin();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menyimpan");
	} finally {
		saveLoading.value = false;
	}
}

async function deletePoin(id) {
	if (!(await confirm("Hapus data poin ini?"))) return;
	try {
		await api.delete(`/bk/poin/${id}`);
		loadPoin();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menghapus");
	}
}

onMounted(async () => {
	await Promise.all([
		loadPoin(),
		loadRanking(),
		api.get("/siswa/kelas-list").then(({ data }) => {
			kelasList.value = data.data;
		}),
		api.get("/bk/jenis-pelanggaran").then(({ data }) => {
			jenisPelanggaran.value = data.data;
		}),
		api.get("/bk/jenis-prestasi").then(({ data }) => {
			jenisPrestasi.value = data.data;
		}),
	]);
});
watch(rankingTipe, loadRanking);
</script>
