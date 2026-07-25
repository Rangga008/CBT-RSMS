<template>
	<div class="space-y-6 animate-fade-in">
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800">Kunjungan Rumah</h2>
				<p class="text-sm text-slate-500">
					Kelola layanan kunjungan rumah BK beserta dokumen yang dibutuhkan
				</p>
			</div>
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-plus"></i> Buat Kunjungan
			</button>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
			<div
				v-for="s in statusStats"
				:key="s.status"
				:class="['card-sm text-center', s.bg]"
			>
				<div :class="['text-2xl font-bold', s.color]">{{ s.count }}</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					{{ s.status }}
				</div>
			</div>
		</div>

		<!-- Filters -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div>
				<label class="label">Status</label>
				<select v-model="filterStatus" class="input w-36">
					<option value="">Semua Status</option>
					<option v-for="s in statusList" :key="s">{{ s }}</option>
				</select>
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" class="input w-32">
					<option value="">Semua</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<button @click="loadKunjungan" class="btn-secondary">
				<i class="fas fa-search"></i> Filter
			</button>
		</div>

		<!-- List -->
		<div class="space-y-3">
			<div
				v-for="k in kunjunganList"
				:key="k.id"
				class="card hover:shadow-md transition cursor-pointer"
				@click="openDetail(k)"
			>
				<div class="flex items-start gap-4">
					<div
						class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0"
					>
						<i class="fas fa-home"></i>
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
						<p class="text-sm text-slate-600 line-clamp-2">{{ k.tujuan }}</p>
						<div class="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
							<span
								><i class="fas fa-calendar mr-1"></i
								>{{ formatDate(k.tanggal) }}</span
							>
							<span
								><i class="fas fa-user-tie mr-1"></i
								>{{ k.petugasBk || "Belum ditentukan" }}</span
							>
							<span
								><i class="fas fa-map-marker-alt mr-1"></i
								>{{ k.siswa?.alamat || "-" }}</span
							>
							<!-- Dokumen progress -->
							<span v-if="k.dokumenList?.length">
								<i class="fas fa-file-alt mr-1"></i>
								{{ completedDocs(k.dokumenList) }}/{{ k.dokumenList.length }}
								dokumen
							</span>
						</div>
					</div>
					<i class="fas fa-chevron-right text-slate-300 shrink-0"></i>
				</div>
			</div>
			<div
				v-if="!kunjunganList.length"
				class="card text-center py-12 text-slate-400"
			>
				<i class="fas fa-home text-4xl mb-3 opacity-30"></i>
				<p>Tidak ada data kunjungan</p>
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
					<h3 class="font-bold text-slate-800">Buat Kunjungan Rumah</h3>
					<button @click="showAddModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div>
						<label class="label">Siswa *</label>
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
									<p class="font-semibold">
										{{ s.nama }}
										<span class="text-slate-400">{{ s.kelas }}</span>
									</p>
									<p class="text-xs text-slate-400">
										NISN: {{ s.nisn }} | {{ s.alamat || "Alamat belum diisi" }}
									</p>
								</div>
							</div>
						</div>
						<div
							v-if="form.siswaNisn"
							class="mt-2 p-3 bg-blue-50 rounded-lg text-sm"
						>
							<p class="font-semibold text-blue-700">{{ form.siswaNama }}</p>
							<p class="text-xs text-blue-500">
								{{ form.siswaAlamat || "Alamat tidak ada" }}
							</p>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label class="label">Tanggal Kunjungan *</label>
							<input v-model="form.tanggal" type="date" class="input" />
						</div>
						<div>
							<label class="label">Petugas BK</label>
							<input
								v-model="form.petugasBk"
								type="text"
								class="input"
								placeholder="Nama Guru BK..."
							/>
						</div>
					</div>
					<div>
						<label class="label">Tujuan Kunjungan *</label>
						<textarea
							v-model="form.tujuan"
							rows="3"
							class="input"
							placeholder="Jelaskan tujuan kunjungan rumah..."
						></textarea>
					</div>
					<div>
						<label class="label">Catatan</label>
						<textarea
							v-model="form.catatan"
							rows="2"
							class="input"
							placeholder="Catatan tambahan..."
						></textarea>
					</div>
					<!-- Dokumen checklist -->
					<div>
						<label class="label">Dokumen yang Dibutuhkan</label>
						<div class="space-y-2">
							<div
								v-for="(doc, i) in form.dokumenList"
								:key="i"
								class="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl"
							>
								<i
									:class="[
										'fas fa-file-alt text-slate-400',
										doc.required ? 'text-red-400' : '',
									]"
								></i>
								<span class="flex-1 text-sm text-slate-700">{{
									doc.nama
								}}</span>
								<span v-if="doc.required" class="text-xs text-red-500 font-bold"
									>Wajib</span
								>
								<span v-else class="text-xs text-slate-400">Opsional</span>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showAddModal = false" class="btn-secondary">
						Batal
					</button>
					<button
						@click="saveKunjungan"
						:disabled="saveLoading"
						class="btn-primary"
					>
						<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>

		<!-- Detail Modal -->
		<div
			v-if="selectedKunjungan"
			class="modal-overlay"
			@click.self="selectedKunjungan = null"
		>
			<div class="modal modal-xl">
				<div class="modal-header">
					<div>
						<h3 class="font-bold text-slate-800">
							{{ selectedKunjungan.nomor }}
						</h3>
						<p class="text-sm text-slate-500">
							{{ selectedKunjungan.siswa?.nama }} —
							{{ selectedKunjungan.siswa?.kelas }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<span :class="statusClass(selectedKunjungan.status)">{{
							selectedKunjungan.status
						}}</span>
						<button
							@click="selectedKunjungan = null"
							class="text-slate-400 ml-2"
						>
							<i class="fas fa-times"></i>
						</button>
					</div>
				</div>
				<div class="modal-body space-y-5">
					<!-- Info siswa -->
					<div
						class="p-4 bg-slate-50 rounded-xl grid grid-cols-2 gap-3 text-sm"
					>
						<div>
							<span class="font-bold text-slate-500">Alamat:</span>
							{{ selectedKunjungan.siswa?.alamat || "-" }}
						</div>
						<div>
							<span class="font-bold text-slate-500">No. HP Ortu:</span>
							{{ selectedKunjungan.siswa?.noHp || "-" }}
						</div>
						<div>
							<span class="font-bold text-slate-500">Nama Ayah:</span>
							{{ selectedKunjungan.siswa?.namaAyah || "-" }}
						</div>
						<div>
							<span class="font-bold text-slate-500">Nama Ibu:</span>
							{{ selectedKunjungan.siswa?.namaIbu || "-" }}
						</div>
					</div>

					<div class="p-4 bg-blue-50 rounded-xl">
						<p class="text-xs font-bold text-blue-600 uppercase mb-1">
							Tujuan Kunjungan
						</p>
						<p class="text-sm text-slate-700">{{ selectedKunjungan.tujuan }}</p>
					</div>

					<!-- Update status & hasil -->
					<div>
						<label class="label">Update Status</label>
						<div class="flex gap-2 flex-wrap">
							<button
								v-for="s in statusList"
								:key="s"
								@click="updateStatus(s)"
								:class="[
									'btn btn-sm',
									selectedKunjungan.status === s
										? 'btn-primary'
										: 'btn-secondary',
								]"
							>
								{{ s }}
							</button>
						</div>
					</div>

					<div>
						<label class="label">Hasil Kunjungan</label>
						<textarea
							v-model="hasilKunjungan"
							rows="3"
							class="input"
							placeholder="Tulis hasil kunjungan..."
						></textarea>
						<button @click="saveHasil" class="btn-primary btn-sm mt-2">
							Simpan Hasil
						</button>
					</div>

					<!-- Dokumen checklist -->
					<div>
						<label class="label">Dokumen Kunjungan</label>
						<div class="space-y-2">
							<div
								v-for="(doc, i) in selectedKunjungan.dokumenList"
								:key="i"
								:class="[
									'flex items-center gap-3 p-3 rounded-xl border',
									doc.url
										? 'bg-emerald-50 border-emerald-200'
										: 'bg-slate-50 border-slate-200',
								]"
							>
								<i
									:class="[
										'fas text-lg',
										doc.url
											? 'fa-check-circle text-emerald-500'
											: 'fa-file-alt text-slate-400',
									]"
								></i>
								<div class="flex-1">
									<p class="text-sm font-semibold text-slate-700">
										{{ doc.nama }}
									</p>
									<p v-if="doc.url" class="text-xs text-emerald-600">
										Sudah diunggah
									</p>
									<p v-else class="text-xs text-slate-400">
										{{ doc.required ? "Wajib diunggah" : "Opsional" }}
									</p>
								</div>
								<div v-if="doc.url">
									<a
										:href="doc.url"
										target="_blank"
										class="btn-secondary btn-sm"
										><i class="fas fa-download"></i
									></a>
								</div>
								<label v-else class="btn-secondary btn-sm cursor-pointer">
									<i class="fas fa-upload"></i> Upload
									<input
										type="file"
										class="hidden"
										@change="uploadDokumen($event, i)"
										accept=".pdf,.jpg,.png,.doc,.docx"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api.js";
import { useToast } from "@/composables/useToast.js";
const toast = useToast();

const kunjunganList = ref([]);
const kelasList = ref([]);
const templateDokumen = ref([]);
const filterStatus = ref("");
const filterKelas = ref("");
const showAddModal = ref(false);
const saveLoading = ref(false);
const selectedKunjungan = ref(null);
const hasilKunjungan = ref("");
const searchSiswa = ref("");
const siswaResults = ref([]);

const form = ref({
	siswaNisn: "",
	siswaNama: "",
	siswaAlamat: "",
	tanggal: new Date().toISOString().split("T")[0],
	tujuan: "",
	petugasBk: "",
	catatan: "",
	dokumenList: [],
});

const statusList = ["Rencana", "Berlangsung", "Selesai", "Dibatalkan"];

function statusClass(s) {
	const map = {
		Rencana: "status-rencana",
		Berlangsung: "status-berlangsung",
		Selesai: "status-selesai",
		Dibatalkan: "status-dibatalkan",
	};
	return map[s] || "badge-gray";
}

const statusStats = computed(() => {
	const groups = { Rencana: 0, Berlangsung: 0, Selesai: 0, Dibatalkan: 0 };
	kunjunganList.value.forEach((k) => {
		if (groups[k.status] !== undefined) groups[k.status]++;
	});
	const bgs = {
		Rencana: "bg-indigo-50",
		Berlangsung: "bg-amber-50",
		Selesai: "bg-emerald-50",
		Dibatalkan: "bg-red-50",
	};
	const colors = {
		Rencana: "text-indigo-600",
		Berlangsung: "text-amber-600",
		Selesai: "text-emerald-600",
		Dibatalkan: "text-red-600",
	};
	return Object.entries(groups).map(([status, count]) => ({
		status,
		count,
		bg: bgs[status],
		color: colors[status],
	}));
});

function completedDocs(docs) {
	return docs.filter((d) => d.url).length;
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

async function loadKunjungan() {
	const params = {};
	if (filterStatus.value) params.status = filterStatus.value;
	if (filterKelas.value) params.kelas = filterKelas.value;
	const { data } = await api.get("/bk/kunjungan", { params });
	kunjunganList.value = data.data;
}

async function openDetail(k) {
	const { data } = await api.get(`/bk/kunjungan/${k.id}`);
	selectedKunjungan.value = data.data;
	hasilKunjungan.value = data.data.hasilKunjungan || "";
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
	form.value.siswaAlamat = s.alamat || "";
	siswaResults.value = [];
	searchSiswa.value = "";
}

function openAdd() {
	form.value = {
		siswaNisn: "",
		siswaNama: "",
		siswaAlamat: "",
		tanggal: new Date().toISOString().split("T")[0],
		tujuan: "",
		petugasBk: "",
		catatan: "",
		dokumenList: [...templateDokumen.value],
	};
	showAddModal.value = true;
}

async function saveKunjungan() {
	if (!form.value.siswaNisn || !form.value.tujuan) {
		toast.warn("Lengkapi data!");
		return;
	}
	saveLoading.value = true;
	try {
		await api.post("/bk/kunjungan", {
			siswaNisn: form.value.siswaNisn,
			tanggal: form.value.tanggal,
			tujuan: form.value.tujuan,
			petugasBk: form.value.petugasBk || null,
			catatan: form.value.catatan || null,
			dokumenList: form.value.dokumenList,
		});
		showAddModal.value = false;
		loadKunjungan();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function updateStatus(status) {
	await api.put(`/bk/kunjungan/${selectedKunjungan.value.id}`, { status });
	selectedKunjungan.value.status = status;
	loadKunjungan();
}

async function saveHasil() {
	await api.put(`/bk/kunjungan/${selectedKunjungan.value.id}`, {
		hasilKunjungan: hasilKunjungan.value,
		status: "Selesai",
	});
	selectedKunjungan.value.hasilKunjungan = hasilKunjungan.value;
	selectedKunjungan.value.status = "Selesai";
	loadKunjungan();
}

async function uploadDokumen(event, index) {
	const file = event.target.files[0];
	if (!file) return;
	const formData = new FormData();
	formData.append("file", file);
	try {
		const { data } = await api.post("/upload", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const updatedDokumen = [...(selectedKunjungan.value.dokumenList || [])];
		updatedDokumen[index] = { ...updatedDokumen[index], url: data.url };
		await api.put(`/bk/kunjungan/${selectedKunjungan.value.id}`, {
			dokumenList: updatedDokumen,
		});
		selectedKunjungan.value.dokumenList = updatedDokumen;
	} catch (e) {
		toast.error("Gagal upload: " + (e.response?.data?.message || e.message));
	}
}

onMounted(async () => {
	await Promise.all([
		loadKunjungan(),
		api.get("/siswa/kelas-list").then(({ data }) => {
			kelasList.value = data.data;
		}),
		api.get("/bk/kunjungan/template-dokumen").then(({ data }) => {
			templateDokumen.value = data.data;
		}),
	]);
});
</script>
