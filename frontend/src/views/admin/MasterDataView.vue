<template>
	<div class="space-y-6">
		<h2 class="text-xl font-bold text-slate-800">Data Master</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Kelas -->
			<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700">Daftar Kelas</h3>
					<form @submit.prevent="addKelas" class="flex gap-2">
						<input
							v-model="newKelas"
							type="text"
							placeholder="Nama kelas baru"
							class="input-field w-36 text-sm"
							required
						/>
						<button type="submit" class="btn-primary text-sm py-1.5">
							+ Tambah
						</button>
					</form>
				</div>
				<ul class="space-y-1 max-h-72 overflow-y-auto">
					<li
						v-for="k in kelas"
						:key="k.id"
						class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 group"
					>
						<span class="text-slate-700 text-sm">{{ k.nama }}</span>
						<button
							@click="deleteKelas(k)"
							class="text-slate-300 hover:text-red-500 group-hover:text-slate-400 transition-colors text-xs"
						>
							✕
						</button>
					</li>
					<li
						v-if="kelas.length === 0"
						class="text-center text-slate-400 text-sm py-4"
					>
						Belum ada data kelas
					</li>
				</ul>
			</div>

			<!-- Mata Pelajaran -->
			<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700">Mata Pelajaran</h3>
					<form @submit.prevent="addMapel" class="flex gap-2">
						<input
							v-model="newMapel"
							type="text"
							placeholder="Nama mapel baru"
							class="input-field w-40 text-sm"
							required
						/>
						<button type="submit" class="btn-primary text-sm py-1.5">
							+ Tambah
						</button>
					</form>
				</div>
				<ul class="space-y-1 max-h-72 overflow-y-auto">
					<li
						v-for="m in mapel"
						:key="m.id"
						class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 group"
					>
						<span class="text-slate-700 text-sm">{{ m.nama }}</span>
						<button
							@click="deleteMapel(m)"
							class="text-slate-300 hover:text-red-500 group-hover:text-slate-400 transition-colors text-xs"
						>
							✕
						</button>
					</li>
					<li
						v-if="mapel.length === 0"
						class="text-center text-slate-400 text-sm py-4"
					>
						Belum ada mata pelajaran
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const kelas = ref([]);
const mapel = ref([]);
const newKelas = ref("");
const newMapel = ref("");

async function load() {
	try {
		const res = await api.get("/master-data");
		kelas.value = res.data.data?.kelas || [];
		mapel.value = res.data.data?.mapel || [];
	} catch (_) {}
}

async function addKelas() {
	try {
		await api.post("/master-data/kelas", { nama: newKelas.value });
		newKelas.value = "";
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	}
}

async function deleteKelas(k) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: `Hapus kelas "${k.nama}"?`,
		showCancelButton: true,
		confirmButtonText: "Hapus",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/master-data/kelas/${k.id}`);
		await load();
	} catch (_) {}
}

async function addMapel() {
	try {
		await api.post("/master-data/mapel", { nama: newMapel.value });
		newMapel.value = "";
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	}
}

async function deleteMapel(m) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: `Hapus mapel "${m.nama}"?`,
		showCancelButton: true,
		confirmButtonText: "Hapus",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/master-data/mapel/${m.id}`);
		await load();
	} catch (_) {}
}

onMounted(load);
</script>
