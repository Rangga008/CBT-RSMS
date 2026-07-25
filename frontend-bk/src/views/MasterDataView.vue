<template>
	<div class="space-y-6 animate-fade-in">
		<div>
			<h2 class="text-xl font-bold text-slate-800">Data Master</h2>
			<p class="text-sm text-slate-500">
				Kelola kelas dan mata pelajaran untuk sistem BK & Absensi
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Kelas -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700 flex items-center gap-2">
						<i class="fas fa-school text-blue-500"></i> Daftar Kelas
					</h3>
					<span class="text-xs text-slate-400">{{ kelas.length }} kelas</span>
				</div>
				<form @submit.prevent="addKelas" class="flex gap-2 mb-4">
					<input
						v-model="newKelas"
						type="text"
						placeholder="Nama kelas baru (cth: X-RPL)"
						class="input flex-1 text-sm"
						required
					/>
					<button type="submit" :disabled="addingKelas" class="btn-primary">
						<i v-if="addingKelas" class="fas fa-circle-notch fa-spin"></i>
						<i v-else class="fas fa-plus"></i>
					</button>
				</form>
				<ul class="space-y-1 max-h-80 overflow-y-auto">
					<li
						v-for="k in kelas"
						:key="k.id"
						class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 group"
					>
						<span class="text-slate-700 text-sm font-medium">{{ k.nama }}</span>
						<button
							@click="deleteKelas(k)"
							class="text-slate-300 hover:text-red-500 group-hover:text-slate-400 transition text-xs"
							title="Hapus"
						>
							<i class="fas fa-times"></i>
						</button>
					</li>
					<li
						v-if="!kelas.length"
						class="text-center text-slate-400 text-sm py-6"
					>
						Belum ada kelas
					</li>
				</ul>
			</div>

			<!-- Mata Pelajaran -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700 flex items-center gap-2">
						<i class="fas fa-book text-purple-500"></i> Mata Pelajaran
					</h3>
					<span class="text-xs text-slate-400">{{ mapel.length }} mapel</span>
				</div>
				<form @submit.prevent="addMapel" class="flex gap-2 mb-4">
					<input
						v-model="newMapel"
						type="text"
						placeholder="Nama mata pelajaran baru"
						class="input flex-1 text-sm"
						required
					/>
					<button type="submit" :disabled="addingMapel" class="btn-primary">
						<i v-if="addingMapel" class="fas fa-circle-notch fa-spin"></i>
						<i v-else class="fas fa-plus"></i>
					</button>
				</form>
				<ul class="space-y-1 max-h-80 overflow-y-auto">
					<li
						v-for="m in mapel"
						:key="m.id"
						class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 group"
					>
						<span class="text-slate-700 text-sm font-medium">{{ m.nama }}</span>
						<button
							@click="deleteMapel(m)"
							class="text-slate-300 hover:text-red-500 group-hover:text-slate-400 transition text-xs"
							title="Hapus"
						>
							<i class="fas fa-times"></i>
						</button>
					</li>
					<li
						v-if="!mapel.length"
						class="text-center text-slate-400 text-sm py-6"
					>
						Belum ada mata pelajaran
					</li>
				</ul>
			</div>
		</div>

		<!-- Info sync -->
		<div
			class="card-sm bg-blue-50 border border-blue-100 text-blue-700 text-sm flex items-start gap-2"
		>
			<i class="fas fa-info-circle mt-0.5 shrink-0"></i>
			<span>
				Data kelas dan mata pelajaran ini digunakan di seluruh sistem BK &
				Absensi. Untuk sinkronisasi dari CBT RSMS, gunakan menu
				<strong>Konfigurasi &gt; Sinkronisasi</strong>.
			</span>
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

const kelas = ref([]);
const mapel = ref([]);
const newKelas = ref("");
const newMapel = ref("");
const addingKelas = ref(false);
const addingMapel = ref(false);

async function load() {
	try {
		const { data } = await api.get("/master-data");
		kelas.value = data.data.kelas || [];
		mapel.value = data.data.mapel || [];
	} catch {
		/* ignore */
	}
}

async function addKelas() {
	if (!newKelas.value.trim()) return;
	addingKelas.value = true;
	try {
		await api.post("/master-data/kelas", { nama: newKelas.value.trim() });
		newKelas.value = "";
		await load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menambah kelas");
	} finally {
		addingKelas.value = false;
	}
}

async function deleteKelas(k) {
	if (!(await confirm(`Hapus kelas "${k.nama}"?`))) return;
	try {
		await api.delete(`/master-data/kelas/${k.id}`);
		await load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menghapus");
	}
}

async function addMapel() {
	if (!newMapel.value.trim()) return;
	addingMapel.value = true;
	try {
		await api.post("/master-data/mapel", { nama: newMapel.value.trim() });
		newMapel.value = "";
		await load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menambah mapel");
	} finally {
		addingMapel.value = false;
	}
}

async function deleteMapel(m) {
	if (!(await confirm(`Hapus mata pelajaran "${m.nama}"?`))) return;
	try {
		await api.delete(`/master-data/mapel/${m.id}`);
		await load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal menghapus");
	}
}

onMounted(load);
</script>
