<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between flex-wrap gap-3">
			<div>
				<h2 class="text-xl font-bold text-slate-800">Manajemen IP</h2>
				<p class="text-sm text-slate-500 mt-0.5">
					Kelola daftar IP yang diizinkan mengakses aplikasi
				</p>
			</div>
			<div class="flex items-center gap-3 flex-wrap">
				<!-- Mode Toggle -->
				<div
					class="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm"
				>
					<span class="text-sm text-slate-600">Mode:</span>
					<button
						@click="toggleMode"
						class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
						:class="ipMode === 'whitelist' ? 'bg-blue-600' : 'bg-slate-300'"
					>
						<span
							class="inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform"
							:class="
								ipMode === 'whitelist' ? 'translate-x-6' : 'translate-x-1'
							"
						></span>
					</button>
					<span
						class="text-sm font-medium"
						:class="ipMode === 'whitelist' ? 'text-blue-600' : 'text-slate-500'"
					>
						{{ ipMode === "whitelist" ? "Whitelist Aktif" : "Terbuka" }}
					</span>
				</div>
				<button
					@click="showAddModal = true"
					class="btn-primary flex items-center gap-2"
				>
					+ Tambah IP
				</button>
			</div>
		</div>

		<!-- IP Info Card -->
		<div
			class="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3"
		>
			<span class="text-2xl">💡</span>
			<div class="text-sm text-blue-700">
				<b>IP saya saat ini:</b>
				<span class="font-mono bg-blue-100 px-2 py-0.5 rounded">{{
					myIp
				}}</span>
				<p class="mt-1 text-blue-600">
					Superadmin IP ({{ superadminIps }}) selalu diizinkan meskipun mode
					whitelist aktif.
				</p>
			</div>
		</div>

		<!-- Filter Bar -->
		<div
			class="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 flex-wrap shadow-sm"
		>
			<input
				v-model="search"
				@input="debouncedLoad"
				type="text"
				placeholder="Cari IP atau label..."
				class="flex-1 min-w-48 input-field"
			/>
			<select v-model="filterRole" @change="loadIps" class="input-field w-40">
				<option value="">Semua Role</option>
				<option value="Admin">Admin</option>
				<option value="Guru">Guru</option>
				<option value="Siswa">Siswa</option>
			</select>
			<select v-model="filterActive" @change="loadIps" class="input-field w-40">
				<option value="">Semua Status</option>
				<option value="true">Aktif</option>
				<option value="false">Nonaktif</option>
			</select>
		</div>

		<!-- IP Table -->
		<div
			class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
		>
			<div v-if="loading" class="p-8 text-center text-slate-400">
				Memuat data...
			</div>
			<div v-else-if="ips.length === 0" class="p-8 text-center text-slate-400">
				Tidak ada data IP
			</div>
			<table v-else class="w-full text-sm">
				<thead class="bg-slate-50 border-b border-slate-200">
					<tr>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							IP Address
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Label
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Role
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Status
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Ditambahkan
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							Aksi
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					<tr
						v-for="ip in ips"
						:key="ip.id"
						class="hover:bg-slate-50 transition-colors"
					>
						<td class="px-4 py-3 font-mono font-medium text-slate-800">
							{{ ip.ipAddress }}
						</td>
						<td class="px-4 py-3 text-slate-600">{{ ip.label || "-" }}</td>
						<td class="px-4 py-3">
							<span class="badge" :class="roleBadge(ip.targetRole)">{{
								ip.targetRole || "Semua"
							}}</span>
						</td>
						<td class="px-4 py-3">
							<span
								class="badge"
								:class="
									ip.isActive
										? 'bg-green-100 text-green-700'
										: 'bg-red-100 text-red-700'
								"
							>
								{{ ip.isActive ? "Aktif" : "Nonaktif" }}
							</span>
						</td>
						<td class="px-4 py-3 text-slate-400 text-xs">
							{{ fmtDate(ip.createdAt) }}
						</td>
						<td class="px-4 py-3">
							<div class="flex items-center justify-center gap-1">
								<button
									@click="toggleIp(ip)"
									class="btn-icon"
									:title="ip.isActive ? 'Nonaktifkan' : 'Aktifkan'"
								>
									<svg
										v-if="ip.isActive"
										class="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<svg
										v-else
										class="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-13.5 0l4.5-4.5 4.5 4.5"
										/>
									</svg>
								</button>
								<button
									@click="confirmDelete(ip)"
									class="btn-icon-danger"
									title="Hapus"
								>
									<svg
										class="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Pagination -->
			<div
				v-if="total > limit"
				class="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500"
			>
				<span>Menampilkan {{ ips.length }} dari {{ total }}</span>
				<div class="flex gap-2">
					<button
						@click="
							page--;
							loadIps();
						"
						:disabled="page <= 1"
						class="btn-sm-outline"
						:class="page <= 1 ? 'opacity-50' : ''"
					>
						‹
					</button>
					<span class="px-2">{{ page }}</span>
					<button
						@click="
							page++;
							loadIps();
						"
						:disabled="page * limit >= total"
						class="btn-sm-outline"
						:class="page * limit >= total ? 'opacity-50' : ''"
					>
						›
					</button>
				</div>
			</div>
		</div>

		<!-- Access Logs -->
		<div
			class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
		>
			<div
				class="px-5 py-4 border-b border-slate-100 flex items-center justify-between"
			>
				<h3 class="font-semibold text-slate-700">📋 Log Akses IP</h3>
				<button @click="loadLogs" class="text-sm text-blue-600 hover:underline">
					Refresh
				</button>
			</div>
			<div v-if="loadingLogs" class="p-6 text-center text-slate-400">
				Memuat log...
			</div>
			<div v-else-if="logs.length === 0" class="p-6 text-center text-slate-400">
				Belum ada log akses
			</div>
			<table v-else class="w-full text-xs">
				<thead class="bg-slate-50">
					<tr>
						<th class="px-4 py-2 text-left text-slate-500">Waktu</th>
						<th class="px-4 py-2 text-left text-slate-500">IP</th>
						<th class="px-4 py-2 text-left text-slate-500">Path</th>
						<th class="px-4 py-2 text-left text-slate-500">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					<tr v-for="log in logs" :key="log.id" class="hover:bg-slate-50">
						<td class="px-4 py-2 text-slate-400">
							{{ fmtDate(log.timestamp) }}
						</td>
						<td class="px-4 py-2 font-mono">{{ log.ipAddress }}</td>
						<td class="px-4 py-2 text-slate-600">
							{{ log.method }} {{ log.path }}
						</td>
						<td class="px-4 py-2">
							<span
								class="badge"
								:class="
									log.statusCode < 400
										? 'bg-green-100 text-green-700'
										: 'bg-red-100 text-red-700'
								"
							>
								{{ log.statusCode }}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Modal Tambah IP -->
		<div
			v-if="showAddModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		>
			<div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
				<h3 class="text-lg font-bold text-slate-800 mb-4">
					Tambah IP ke Whitelist
				</h3>
				<form @submit.prevent="addIp" class="space-y-4">
					<div>
						<label class="label-field"
							>IP Address <span class="text-red-500">*</span></label
						>
						<input
							v-model="form.ipAddress"
							type="text"
							placeholder="192.168.1.100"
							class="input-field"
							required
						/>
					</div>
					<div>
						<label class="label-field">Label (opsional)</label>
						<input
							v-model="form.label"
							type="text"
							placeholder="Misal: Lab Komputer 1"
							class="input-field"
						/>
					</div>
					<div>
						<label class="label-field">Batasi untuk Role</label>
						<select v-model="form.targetRole" class="input-field">
							<option value="">Semua Role</option>
							<option value="Admin">Admin</option>
							<option value="Guru">Guru</option>
							<option value="Siswa">Siswa</option>
						</select>
					</div>
					<div class="flex gap-3 pt-2">
						<button type="submit" :disabled="adding" class="btn-primary flex-1">
							{{ adding ? "Menyimpan..." : "Simpan" }}
						</button>
						<button
							type="button"
							@click="showAddModal = false"
							class="btn-outline flex-1"
						>
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const ips = ref([]);
const logs = ref([]);
const total = ref(0);
const page = ref(1);
const limit = 50;
const loading = ref(true);
const loadingLogs = ref(true);
const ipMode = ref("open");
const myIp = ref("...");
const superadminIps = ref("127.0.0.1, ::1");
const search = ref("");
const filterRole = ref("");
const filterActive = ref("");
const showAddModal = ref(false);
const adding = ref(false);

const form = ref({ ipAddress: "", label: "", targetRole: "" });

let debounceTimer;
const debouncedLoad = () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(loadIps, 400);
};

const fmtDate = (d) =>
	d
		? new Date(d).toLocaleString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		: "-";

const roleBadge = (role) => {
	if (!role) return "bg-slate-100 text-slate-500";
	return (
		{
			Admin: "bg-purple-100 text-purple-700",
			Guru: "bg-blue-100 text-blue-700",
			Siswa: "bg-green-100 text-green-700",
		}[role] || "bg-slate-100 text-slate-500"
	);
};

async function loadIps() {
	loading.value = true;
	try {
		const params = new URLSearchParams({ page: page.value, limit });
		if (search.value) params.set("search", search.value);
		if (filterRole.value) params.set("targetRole", filterRole.value);
		if (filterActive.value !== "") params.set("isActive", filterActive.value);
		const res = await api.get(`/ip-management?${params}`);
		ips.value = res.data.data || [];
		total.value = res.data.total || 0;
		ipMode.value = res.data.mode || "open";
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

async function loadLogs() {
	loadingLogs.value = true;
	try {
		const res = await api.get("/ip-management/logs?limit=100");
		logs.value = res.data.data || [];
	} catch (_) {
	} finally {
		loadingLogs.value = false;
	}
}

async function toggleMode() {
	const newMode = ipMode.value === "whitelist" ? "open" : "whitelist";
	const label = newMode === "whitelist" ? "Whitelist Aktif" : "Mode Terbuka";
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: `Ubah ke ${label}?`,
		text:
			newMode === "whitelist"
				? "Hanya IP yang terdaftar yang bisa mengakses."
				: "Semua IP dapat mengakses.",
		showCancelButton: true,
		confirmButtonText: "Ya, Ubah",
		cancelButtonText: "Batal",
		confirmButtonColor: "#2563eb",
	});
	if (!isConfirmed) return;
	try {
		await api.patch("/ip-management/mode", { mode: newMode });
		ipMode.value = newMode;
		Swal.fire({
			icon: "success",
			title: "Berhasil",
			text: "Mode filter IP diperbarui.",
			timer: 1500,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	}
}

async function toggleIp(ip) {
	try {
		await api.patch(`/ip-management/${ip.id}`, { isActive: !ip.isActive });
		ip.isActive = !ip.isActive;
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal mengubah status.",
		});
	}
}

async function addIp() {
	adding.value = true;
	try {
		await api.post("/ip-management", {
			ipAddress: form.value.ipAddress,
			label: form.value.label || null,
			targetRole: form.value.targetRole || null,
			isActive: true,
		});
		showAddModal.value = false;
		form.value = { ipAddress: "", label: "", targetRole: "" };
		await loadIps();
		Swal.fire({
			icon: "success",
			title: "Berhasil",
			text: "IP berhasil ditambahkan.",
			timer: 1500,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	} finally {
		adding.value = false;
	}
}

async function confirmDelete(ip) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: "Hapus IP?",
		text: `Hapus ${ip.ipAddress} dari whitelist?`,
		showCancelButton: true,
		confirmButtonText: "Hapus",
		cancelButtonText: "Batal",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/ip-management/${ip.id}`);
		await loadIps();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal menghapus.",
		});
	}
}

onMounted(async () => {
	await Promise.all([loadIps(), loadLogs()]);
	try {
		const res = await api.get("/ip-management/my-ip");
		myIp.value = res.data.ip || "-";
	} catch (_) {}
});
</script>
