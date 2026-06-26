<template>
	<div class="space-y-6 animate-fade-in">
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800">Data Siswa</h2>
				<p class="text-sm text-slate-500">
					Kelola database siswa untuk sistem BK & Absensi
				</p>
			</div>
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-user-plus"></i> Tambah Siswa
			</button>
		</div>

		<!-- Filters -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div class="flex-1 min-w-[160px]">
				<label class="label">Cari</label>
				<input
					v-model="search"
					@input="debouncedLoad"
					type="text"
					class="input"
					placeholder="Nama / NISN..."
				/>
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" @change="load" class="input w-32">
					<option value="">Semua</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<span class="text-sm text-slate-500 self-end pb-2.5"
				>{{ siswaList.length }} siswa</span
			>
		</div>

		<div class="card">
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>NISN</th>
							<th>Nama</th>
							<th>Kelas</th>
							<th>L/P</th>
							<th>No. HP Ortu</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="s in siswaList" :key="s.nisn">
							<td class="font-mono text-xs">{{ s.nisn }}</td>
							<td
								class="font-semibold cursor-pointer hover:text-blue-600"
								@click="$router.push('/bk/profil/' + s.nisn)"
							>
								{{ s.nama }}
							</td>
							<td>{{ s.kelas }}</td>
							<td>
								<span
									:class="
										s.jenisKelamin === 'L'
											? 'badge-blue'
											: 'badge bg-pink-100 text-pink-700'
									"
									>{{ s.jenisKelamin }}</span
								>
							</td>
							<td class="text-xs">{{ s.noHp || "-" }}</td>
							<td>
								<div class="flex gap-2">
									<button
										@click="$router.push('/bk/profil/' + s.nisn)"
										class="text-purple-400 hover:text-purple-600 transition"
										title="Profil BK"
									>
										<i class="fas fa-user-circle"></i>
									</button>
									<button
										@click="openEdit(s)"
										class="text-blue-400 hover:text-blue-600 transition"
									>
										<i class="fas fa-pencil-alt"></i>
									</button>
									<button
										v-if="authStore.isAdmin"
										@click="deleteSiswa(s.nisn)"
										class="text-red-400 hover:text-red-600 transition"
									>
										<i class="fas fa-trash-alt"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr v-if="!siswaList.length">
							<td colspan="6" class="text-center py-8 text-slate-400">
								Tidak ada data
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
			<div class="modal modal-lg">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">
						{{ editing ? "Edit" : "Tambah" }} Siswa
					</h3>
					<button @click="showModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label class="label">NISN *</label
						><input
							v-model="form.nisn"
							type="text"
							class="input"
							:disabled="!!editing"
						/>
					</div>
					<div>
						<label class="label">Nama Lengkap *</label
						><input v-model="form.nama" type="text" class="input" />
					</div>
					<div>
						<label class="label">Kelas *</label
						><input
							v-model="form.kelas"
							type="text"
							class="input"
							placeholder="X-RPL"
						/>
					</div>
					<div>
						<label class="label">Jenis Kelamin *</label>
						<select v-model="form.jenisKelamin" class="input">
							<option value="L">Laki-laki</option>
							<option value="P">Perempuan</option>
						</select>
					</div>
					<div>
						<label class="label">Tanggal Lahir</label
						><input v-model="form.tanggalLahir" type="date" class="input" />
					</div>
					<div>
						<label class="label">Agama</label
						><input v-model="form.agama" type="text" class="input" />
					</div>
					<div>
						<label class="label">Nama Ayah</label
						><input v-model="form.namaAyah" type="text" class="input" />
					</div>
					<div>
						<label class="label">Nama Ibu</label
						><input v-model="form.namaIbu" type="text" class="input" />
					</div>
					<div>
						<label class="label">No. HP Orang Tua</label
						><input v-model="form.noHp" type="text" class="input" />
					</div>
					<div class="sm:col-span-2">
						<label class="label">Alamat</label
						><textarea v-model="form.alamat" rows="2" class="input"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showModal = false" class="btn-secondary">
						Batal
					</button>
					<button
						@click="saveSiswa"
						:disabled="saveLoading"
						class="btn-primary"
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
import { ref, onMounted } from "vue";
import api from "@/services/api.js";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const siswaList = ref([]);
const kelasList = ref([]);
const search = ref("");
const filterKelas = ref("");
const showModal = ref(false);
const editing = ref(null);
const saveLoading = ref(false);
const form = ref({});
let debounceTimer = null;

function debouncedLoad() {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(load, 400);
}

async function load() {
	const params = {};
	if (search.value) params.search = search.value;
	if (filterKelas.value) params.kelas = filterKelas.value;
	const { data } = await api.get("/siswa", { params });
	siswaList.value = data.data;
}

function openAdd() {
	editing.value = null;
	form.value = {
		nisn: "",
		nama: "",
		jenisKelamin: "L",
		kelas: "",
		tanggalLahir: "",
		agama: "",
		namaAyah: "",
		namaIbu: "",
		noHp: "",
		alamat: "",
	};
	showModal.value = true;
}

function openEdit(s) {
	editing.value = s;
	form.value = {
		...s,
		tanggalLahir: s.tanggalLahir ? s.tanggalLahir.split("T")[0] : "",
	};
	showModal.value = true;
}

async function saveSiswa() {
	saveLoading.value = true;
	try {
		const payload = { ...form.value };
		if (!payload.tanggalLahir) payload.tanggalLahir = null;
		if (editing.value) await api.put(`/siswa/${editing.value.nisn}`, payload);
		else await api.post("/siswa", payload);
		showModal.value = false;
		load();
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function deleteSiswa(nisn) {
	if (
		!confirm(
			"Hapus siswa ini? Semua data absensi dan BK terkait akan terhapus!",
		)
	)
		return;
	await api.delete(`/siswa/${nisn}`);
	load();
}

onMounted(async () => {
	await Promise.all([
		load(),
		api.get("/siswa/kelas-list").then(({ data }) => {
			kelasList.value = data.data;
		}),
	]);
});
</script>
