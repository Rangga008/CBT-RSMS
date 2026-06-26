<template>
	<div class="space-y-6 animate-fade-in">
		<div>
			<h2 class="text-xl font-bold text-slate-800">Manajemen Pengguna</h2>
			<p class="text-sm text-slate-500">
				Kelola akun admin, petugas BK, guru, dan siswa
			</p>
		</div>

		<div class="flex justify-end">
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-user-plus"></i> Tambah User
			</button>
		</div>

		<div class="card">
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>Nama</th>
							<th>Username</th>
							<th>Role</th>
							<th>NIP / NISN</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="u in users" :key="u.id">
							<td class="font-semibold">{{ u.namaLengkap || u.username }}</td>
							<td class="font-mono text-xs">{{ u.username }}</td>
							<td>
								<span :class="roleClass(u.role)">{{ u.role }}</span>
							</td>
							<td class="text-xs">{{ u.nip || u.nisn || "-" }}</td>
							<td>
								<div class="flex gap-2">
									<button
										@click="openEdit(u)"
										class="text-blue-400 hover:text-blue-600 transition"
									>
										<i class="fas fa-pencil-alt"></i>
									</button>
									<button
										@click="deleteUser(u.id)"
										class="text-red-400 hover:text-red-600 transition"
									>
										<i class="fas fa-trash-alt"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr v-if="!users.length">
							<td colspan="5" class="text-center py-8 text-slate-400">
								Tidak ada data
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
			<div class="modal">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">
						{{ editing ? "Edit" : "Tambah" }} Pengguna
					</h3>
					<button @click="showModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div>
						<label class="label">Nama Lengkap</label
						><input v-model="form.namaLengkap" type="text" class="input" />
					</div>
					<div>
						<label class="label">Username *</label
						><input
							v-model="form.username"
							type="text"
							class="input"
							:disabled="!!editing"
						/>
					</div>
					<div>
						<label class="label">{{
							editing
								? "Password Baru (kosongkan jika tidak diubah)"
								: "Password *"
						}}</label>
						<input
							v-model="form.password"
							type="password"
							class="input"
							autocomplete="new-password"
						/>
					</div>
					<div>
						<label class="label">Role *</label>
						<select v-model="form.role" class="input">
							<option value="admin">Admin</option>
							<option value="bk">Petugas BK</option>
							<option value="guru">Guru</option>
							<option value="siswa">Siswa</option>
						</select>
					</div>
					<div>
						<label class="label">NIP (Guru/BK)</label
						><input v-model="form.nip" type="text" class="input" />
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showModal = false" class="btn-secondary">
						Batal
					</button>
					<button @click="saveUser" :disabled="saveLoading" class="btn-primary">
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

const users = ref([]);
const showModal = ref(false);
const editing = ref(null);
const saveLoading = ref(false);
const form = ref({});

function roleClass(r) {
	const m = {
		admin: "badge-red",
		bk: "badge-purple",
		guru: "badge-blue",
		siswa: "badge-green",
	};
	return m[r] || "badge-gray";
}

async function load() {
	const { data } = await api.get("/users");
	users.value = data.data;
}

function openAdd() {
	editing.value = null;
	form.value = {
		username: "",
		password: "",
		namaLengkap: "",
		role: "guru",
		nip: "",
	};
	showModal.value = true;
}

function openEdit(u) {
	editing.value = u;
	form.value = { ...u, password: "" };
	showModal.value = true;
}

async function saveUser() {
	saveLoading.value = true;
	try {
		const payload = { ...form.value };
		if (!payload.password) delete payload.password;
		if (!payload.nip) payload.nip = null;
		if (editing.value) await api.put(`/users/${editing.value.id}`, payload);
		else await api.post("/users", payload);
		showModal.value = false;
		load();
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function deleteUser(id) {
	if (!confirm("Hapus pengguna ini?")) return;
	await api.delete(`/users/${id}`);
	load();
}

onMounted(load);
</script>
