<template>
	<div class="space-y-6">
		<div class="flex items-center justify-between flex-wrap gap-3">
			<h2 class="text-xl font-bold text-slate-800">Manajemen Pengguna</h2>
			<div class="flex gap-2 flex-wrap">
				<!-- Bulk print toolbar -->
				<button
					v-if="selectedUsers.size > 0"
					@click="printSelectedKartu"
					class="btn-outline border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center gap-2"
				>
					<svg
						class="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
						/>
					</svg>
					Cetak {{ selectedUsers.size }} Kartu
				</button>
				<button @click="openCreate" class="btn-primary">
					+ Tambah Pengguna
				</button>
				<button
					@click="
						showBulkModal = true;
						importResult = null;
					"
					class="btn-outline"
				>
					📥 Impor Excel
				</button>
			</div>
		</div>

		<!-- Filter -->
		<div
			class="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 flex-wrap shadow-sm items-center"
		>
			<div class="flex items-center gap-2 text-sm text-slate-600 flex-shrink-0">
				<span>Tampilkan</span>
				<select
					v-model="limit"
					@change="
						page = 1;
						load();
					"
					class="input-field py-1.5 w-20 text-center"
				>
					<option :value="10">10</option>
					<option :value="25">25</option>
					<option :value="50">50</option>
					<option :value="100">100</option>
				</select>
				<span>data</span>
			</div>
			<input
				v-model="search"
				@input="debouncedLoad"
				placeholder="Cari nama atau ID..."
				class="input-field flex-1 min-w-48"
			/>
			<select
				v-model="filterRole"
				@change="
					page = 1;
					load();
				"
				class="input-field w-32"
			>
				<option value="">Semua</option>
				<option value="Admin">Admin</option>
				<option value="Guru">Guru</option>
				<option value="Siswa">Siswa</option>
			</select>
		</div>

		<!-- Table -->
		<div
			class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto"
		>
			<div v-if="loading" class="p-8 text-center text-slate-400">
				Memuat data...
			</div>
			<div
				v-else-if="users.length === 0"
				class="p-8 text-center text-slate-400"
			>
				Tidak ada pengguna ditemukan
			</div>
			<table v-else class="w-full text-sm">
				<thead class="bg-slate-50 border-b border-slate-200">
					<tr>
						<th class="px-3 py-3 text-center w-10">
							<input
								type="checkbox"
								:checked="allSiswaSelected"
								@change="toggleSelectAll($event.target.checked)"
								class="w-4 h-4 rounded border-slate-300 cursor-pointer accent-purple-600"
								title="Pilih semua siswa"
							/>
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">ID</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Nama
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Role
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Kelas
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							Status
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							Aksi
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					<tr
						v-for="u in users"
						:key="u.id"
						class="hover:bg-slate-50"
						:class="selectedUsers.has(u.id) ? 'bg-purple-50' : ''"
					>
						<td class="px-3 py-3 text-center">
							<input
								v-if="u.role === 'Siswa'"
								type="checkbox"
								:checked="selectedUsers.has(u.id)"
								@change="toggleUser(u, $event.target.checked)"
								class="w-4 h-4 rounded border-slate-300 cursor-pointer accent-purple-600"
							/>
						</td>
						<td class="px-4 py-3 font-mono text-slate-600 text-xs">
							{{ u.userId }}
						</td>
						<td class="px-4 py-3 font-medium text-slate-800">{{ u.nama }}</td>
						<td class="px-4 py-3">
							<span class="badge" :class="roleBadge(u.role)">{{ u.role }}</span>
						</td>
						<td class="px-4 py-3 text-slate-500 text-xs max-w-[180px]">
							<template v-if="u.role === 'Guru' && u.kelas">
								<div class="flex flex-wrap gap-1">
									<span
										v-for="t in displayTeacherAssignments(u.kelas)"
										:key="t"
										class="inline-block bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
										>{{ t }}</span
									>
								</div>
							</template>
							<template v-else>{{ u.kelas || "-" }}</template>
						</td>
						<td
							class="px-4 py-3 text-center cursor-pointer"
							@click="toggleStatus(u)"
							title="Klik untuk ubah status"
						>
							<span
								class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wide transition hover:opacity-75"
								:class="
									u.isActive !== false
										? 'bg-emerald-50 text-emerald-700 border-emerald-100'
										: 'bg-red-50 text-red-600 border-red-100'
								"
							>
								<span
									class="w-1.5 h-1.5 rounded-full"
									:class="
										u.isActive !== false ? 'bg-emerald-500' : 'bg-red-400'
									"
								></span>
								{{ u.isActive !== false ? "Aktif" : "Non-Aktif" }}
							</span>
						</td>
						<td class="px-4 py-3">
							<div class="flex items-center justify-center gap-2">
								<button
									v-if="u.role === 'Siswa'"
									@click="printKartu(u)"
									class="btn-icon"
									title="Cetak Kartu Ujian"
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
											d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
										/>
									</svg>
								</button>
								<button @click="openEdit(u)" class="btn-icon" title="Edit">
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
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
										/>
									</svg>
								</button>
								<button
									@click="confirmDelete(u)"
									class="btn-icon-danger"
									title="Hapus"
									:disabled="u.id === auth.user?.id"
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
			<div
				v-if="total > 0"
				class="px-4 py-3 border-t text-sm text-slate-500 flex items-center justify-between"
			>
				<span>{{ users.length }} dari {{ total }} pengguna</span>
				<div class="flex gap-2">
					<button
						@click="
							page--;
							load();
						"
						:disabled="page <= 1"
						class="btn-sm-outline"
					>
						‹
					</button>
					<span>{{ page }}</span>
					<button
						@click="
							page++;
							load();
						"
						:disabled="page * limit >= total"
						class="btn-sm-outline"
					>
						›
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Tambah/Edit -->
		<div
			v-if="showModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto"
			>
				<h3 class="text-lg font-bold text-slate-800 mb-4">
					{{ editId ? "Edit Pengguna" : "Tambah Pengguna" }}
				</h3>
				<form @submit.prevent="save" class="space-y-4">
					<div>
						<label class="label-field"
							>ID Pengguna <span class="text-red-500">*</span></label
						>
						<input
							v-model="form.userId"
							type="text"
							class="input-field"
							required
							:disabled="!!editId"
						/>
					</div>
					<div>
						<label class="label-field"
							>Nama Lengkap <span class="text-red-500">*</span></label
						>
						<input
							v-model="form.nama"
							type="text"
							class="input-field"
							required
						/>
					</div>
					<div>
						<label class="label-field"
							>Kata Sandi
							{{ editId ? "(kosongkan jika tidak diubah)" : "" }}</label
						>
						<input
							v-model="form.password"
							type="password"
							class="input-field"
							:required="!editId"
							autocomplete="new-password"
						/>
					</div>
					<div>
						<label class="label-field">Role</label>
						<select v-model="form.role" class="input-field">
							<option value="Siswa">Siswa</option>
							<option value="Guru">Guru</option>
							<option value="Admin">Admin</option>
						</select>
					</div>
					<!-- Kelas untuk Siswa -->
					<div v-if="form.role === 'Siswa'">
						<label class="label-field">Kelas</label>
						<select
							v-if="masterKelas.length"
							v-model="form.kelas"
							class="input-field"
						>
							<option value="">-- Pilih Kelas --</option>
							<option v-for="k in masterKelas" :key="k.id" :value="k.nama">
								{{ k.nama }}
							</option>
						</select>
						<input
							v-else
							v-model="form.kelas"
							type="text"
							class="input-field"
							placeholder="Mis: X-IPA-1"
						/>
					</div>

					<!-- Kelas untuk Admin -->
					<div v-else-if="form.role === 'Admin'">
						<label class="label-field">Unit / Jabatan (opsional)</label>
						<input
							v-model="form.kelas"
							type="text"
							class="input-field"
							placeholder="Mis: Tata Usaha"
						/>
					</div>

					<!-- Penugasan Mapel+Kelas untuk Guru -->
					<div v-else-if="form.role === 'Guru'">
						<label class="label-field">Penugasan Mengajar</label>
						<p class="text-xs text-slate-400 mb-2">
							Tambahkan setiap kombinasi Mata Pelajaran dan Kelas yang diampu.
						</p>
						<div class="space-y-2">
							<div
								v-for="(row, idx) in teacherAssignments"
								:key="idx"
								class="flex items-center gap-2"
							>
								<!-- Mata Pelajaran -->
								<select
									v-if="masterMapel.length"
									v-model="row.subject"
									class="input-field flex-1"
								>
									<option value="">-- Mapel --</option>
									<option v-for="m in masterMapel" :key="m.id" :value="m.nama">
										{{ m.nama }}
									</option>
								</select>
								<input
									v-else
									v-model="row.subject"
									type="text"
									class="input-field flex-1"
									placeholder="Mata Pelajaran"
								/>
								<!-- Kelas -->
								<select
									v-if="masterKelas.length"
									v-model="row.kelas"
									class="input-field flex-1"
								>
									<option value="">-- Kelas --</option>
									<option v-for="k in masterKelas" :key="k.id" :value="k.nama">
										{{ k.nama }}
									</option>
								</select>
								<input
									v-else
									v-model="row.kelas"
									type="text"
									class="input-field flex-1"
									placeholder="Kelas"
								/>
								<!-- Hapus baris -->
								<button
									type="button"
									@click="teacherAssignments.splice(idx, 1)"
									class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-white hover:bg-red-500 border border-red-200 transition shrink-0"
									title="Hapus"
								>
									✕
								</button>
							</div>
							<div
								v-if="teacherAssignments.length === 0"
								class="text-xs text-slate-400 italic py-1"
							>
								Belum ada penugasan. Klik tombol di bawah untuk menambah.
							</div>
						</div>
						<button
							type="button"
							@click="teacherAssignments.push({ subject: '', kelas: '' })"
							class="mt-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-lg border border-blue-200 transition flex items-center gap-1"
						>
							+ Tambah Penugasan
						</button>
					</div>
					<div class="flex gap-3 pt-2">
						<button type="submit" :disabled="saving" class="btn-primary flex-1">
							{{ saving ? "Menyimpan..." : "Simpan" }}
						</button>
						<button
							type="button"
							@click="showModal = false"
							class="btn-outline flex-1"
						>
							Batal
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Modal Excel Import -->
		<div
			v-if="showBulkModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
			>
				<div
					class="px-6 py-4 border-b bg-emerald-50 flex items-center justify-between"
				>
					<div class="flex items-center gap-3">
						<div
							class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm"
						>
							📊
						</div>
						<h3 class="font-bold text-lg text-emerald-900">
							Import User dari Excel
						</h3>
					</div>
					<button
						@click="showBulkModal = false"
						class="text-slate-400 hover:text-red-500 text-lg leading-none"
					>
						✕
					</button>
				</div>
				<div class="p-6 space-y-4">
					<div
						class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600"
					>
						<p class="font-bold text-slate-800 mb-2">ℹ️ Format Kolom Excel:</p>
						<ul class="list-disc list-inside space-y-1 text-xs ml-1">
							<li><b>A – Nama</b>: Nama lengkap (Wajib)</li>
							<li><b>B – Password</b>: Kata sandi (Wajib)</li>
							<li><b>C – Role</b>: Siswa / Guru / Admin</li>
							<li><b>D – Kelas</b>: Nama kelas (untuk Siswa)</li>
							<li>
								<b>E – ID</b>: User ID (opsional, dibuat otomatis jika kosong)
							</li>
						</ul>
						<button
							type="button"
							@click="downloadTemplate"
							class="mt-3 text-emerald-600 font-bold hover:underline text-xs flex items-center gap-1"
						>
							⬇ Download Template Excel
						</button>
					</div>

					<div>
						<label class="label-field">Upload File (.xlsx / .xls)</label>
						<input
							ref="excelFileInput"
							type="file"
							accept=".xlsx,.xls"
							class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer border border-slate-300 rounded-xl p-2 bg-white"
						/>
					</div>

					<div
						v-if="importResult"
						class="rounded-xl p-3 text-sm"
						:class="
							importResult.ok
								? 'bg-green-50 text-green-800 border border-green-200'
								: 'bg-red-50 text-red-800 border border-red-200'
						"
					>
						{{ importResult.msg }}
					</div>

					<div class="flex gap-3">
						<button
							@click="processExcelImport"
							:disabled="bulkSaving"
							class="btn-primary flex-1"
						>
							{{ bulkSaving ? "Mengimpor..." : "📤 Proses Import" }}
						</button>
						<button @click="showBulkModal = false" class="btn-outline flex-1">
							Batal
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import api from "@/services/api.js";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const auth = useAuthStore();
const users = ref([]);
const total = ref(0);
const appConfig = ref({});
const loading = ref(true);
const search = ref("");
const filterRole = ref("");
const page = ref(1);
const limit = ref(50);
const showModal = ref(false);
const saving = ref(false);
const editId = ref(null);
const showBulkModal = ref(false);
const bulkSaving = ref(false);
const importResult = ref(null);
const excelFileInput = ref(null);
const masterKelas = ref([]);
const masterMapel = ref([]);
const teacherAssignments = ref([]);

const selectedUsers = ref(new Set());

const allSiswaSelected = computed(() => {
	const siswaOnPage = users.value.filter((u) => u.role === "Siswa");
	return (
		siswaOnPage.length > 0 &&
		siswaOnPage.every((u) => selectedUsers.value.has(u.id))
	);
});

function toggleUser(u, checked) {
	const next = new Set(selectedUsers.value);
	if (checked) next.add(u.id);
	else next.delete(u.id);
	selectedUsers.value = next;
}

function toggleSelectAll(checked) {
	const next = new Set(selectedUsers.value);
	users.value
		.filter((u) => u.role === "Siswa")
		.forEach((u) => {
			if (checked) next.add(u.id);
			else next.delete(u.id);
		});
	selectedUsers.value = next;
}

function printSelectedKartu() {
	const list = users.value.filter((u) => selectedUsers.value.has(u.id));
	if (!list.length) return;
	const cardsHtml = list.map((u) => kartuHTML(u)).join("");
	const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Kartu Ujian</title>
	<style>body{font-family:Arial,sans-serif;margin:0;padding:16px;background:#f1f5f9}.card-wrap{display:inline-block;margin:8px;vertical-align:top}@media print{button{display:none}}</style></head>
	<body><div style="margin-bottom:12px;text-align:center"><button onclick="window.print()" style="padding:8px 20px;background:#7c3aed;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;margin-right:8px">🖨 Print Semua</button><button onclick="window.close()" style="padding:8px 16px;background:#e2e8f0;border:none;border-radius:8px;cursor:pointer;font-weight:bold">Tutup</button></div>
	${cardsHtml}</body></html>`;
	const w = window.open("", "_blank", "width=950,height=750");
	if (w) {
		w.document.write(html);
		w.document.close();
	}
}

const defaultForm = () => ({
	userId: "",
	nama: "",
	password: "",
	role: "Siswa",
	kelas: "",
});
const form = ref(defaultForm());

function displayTeacherAssignments(kelas) {
	if (!kelas) return [];
	try {
		const parsed = JSON.parse(kelas);
		if (Array.isArray(parsed)) {
			return parsed.map(
				(item) =>
					`${item.subject || item.mapel || "?"} - ${item.classVal || item.class || item.kelas || "?"}`,
			);
		}
	} catch (_) {}
	return kelas
		.split(",")
		.map((p) => {
			const parts = p.trim().split(":");
			return parts.length === 2
				? `${parts[0].trim()} - ${parts[1].trim()}`
				: p.trim();
		})
		.filter(Boolean);
}

const roleBadge = (r) =>
	({
		Admin: "bg-purple-100 text-purple-700",
		Guru: "bg-blue-100 text-blue-700",
		Siswa: "bg-green-100 text-green-700",
	})[r] || "bg-slate-100 text-slate-500";

let debounceTimer;
const debouncedLoad = () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(load, 400);
};

async function loadMasterData() {
	try {
		const res = await api.get("/master-data");
		masterKelas.value = res.data.data?.kelas || [];
		masterMapel.value = res.data.data?.mapel || [];
	} catch (_) {}
}

function parseTeacherAssignments(kelas) {
	if (!kelas) return [];
	try {
		const parsed = JSON.parse(kelas);
		if (Array.isArray(parsed)) {
			return parsed.map((item) => ({
				subject: item.subject || item.mapel || "",
				kelas: item.classVal || item.class || item.kelas || "",
			}));
		}
	} catch (_) {}
	// plain text format: "Matematika:XII-IPA,Fisika:XI-IPA"
	return kelas
		.split(",")
		.map((p) => {
			const [subject, kls] = p.trim().split(":");
			return { subject: subject?.trim() || "", kelas: kls?.trim() || "" };
		})
		.filter((r) => r.subject || r.kelas);
}

function serializeTeacherAssignments(assignments) {
	return assignments
		.filter((r) => r.subject || r.kelas)
		.map((r) => `${r.subject}:${r.kelas}`)
		.join(",");
}

async function load() {
	loading.value = true;
	try {
		const params = new URLSearchParams({
			page: page.value,
			limit: limit.value,
		});
		if (search.value) params.set("search", search.value);
		if (filterRole.value) params.set("role", filterRole.value);
		const res = await api.get(`/users?${params}`);
		users.value = res.data.data || [];
		total.value = res.data.total || 0;
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

function openCreate() {
	editId.value = null;
	form.value = defaultForm();
	teacherAssignments.value = [];
	showModal.value = true;
}
function openEdit(u) {
	editId.value = u.id;
	form.value = {
		userId: u.userId,
		nama: u.nama,
		password: "",
		role: u.role,
		kelas: u.kelas || "",
	};
	teacherAssignments.value =
		u.role === "Guru" ? parseTeacherAssignments(u.kelas) : [];
	showModal.value = true;
}

async function save() {
	saving.value = true;
	try {
		const payload = { ...form.value };
		if (payload.role === "Guru") {
			payload.kelas = serializeTeacherAssignments(teacherAssignments.value);
		}
		if (editId.value && !payload.password) delete payload.password;
		if (editId.value) {
			await api.patch(`/users/${editId.value}`, payload);
		} else {
			await api.post("/users", payload);
		}
		showModal.value = false;
		await load();
		Swal.fire({
			icon: "success",
			title: "Berhasil",
			timer: 1200,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	} finally {
		saving.value = false;
	}
}

async function confirmDelete(u) {
	if (u.id === auth.user?.id) return;
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: "Hapus pengguna?",
		text: `"${u.nama}" akan dihapus.`,
		showCancelButton: true,
		confirmButtonText: "Hapus",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/users/${u.id}`);
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal menghapus.",
		});
	}
}

function downloadTemplate() {
	const data = [
		["Nama", "Password", "Role", "Kelas", "ID (Opsional)"],
		["Ahmad Siswa", "123456", "Siswa", "XII-RPL", ""],
		["Budi Santoso", "123456", "Siswa", "XII-TKJ", "SIS-099"],
		["Pak Guru", "guru123", "Guru", "XII-IPA", "GUR-01"],
	];
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet(data);
	ws["!cols"] = [
		{ wch: 25 },
		{ wch: 15 },
		{ wch: 10 },
		{ wch: 15 },
		{ wch: 15 },
	];
	XLSX.utils.book_append_sheet(wb, ws, "TemplateUser");
	XLSX.writeFile(wb, "Template_Import_User.xlsx");
}

async function processExcelImport() {
	const file = excelFileInput.value?.files?.[0];
	if (!file) {
		Swal.fire("Peringatan", "Pilih file Excel terlebih dahulu.", "warning");
		return;
	}
	importResult.value = null;
	bulkSaving.value = true;
	try {
		const buffer = await file.arrayBuffer();
		const wb = XLSX.read(buffer, { type: "array" });
		const ws = wb.Sheets[wb.SheetNames[0]];
		const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

		const usersToImport = [];
		for (let i = 1; i < rows.length; i++) {
			const r = rows[i];
			if (!r || r.length === 0) continue;
			const nama = r[0] ? String(r[0]).trim() : "";
			const password = r[1] ? String(r[1]).trim() : "";
			if (!nama || !password) continue;
			usersToImport.push({
				nama,
				password,
				role: r[2] ? String(r[2]).trim() : "Siswa",
				kelas: r[3] ? String(r[3]).trim() : "",
				userId: r[4] ? String(r[4]).trim() : "",
			});
		}

		if (usersToImport.length === 0) {
			importResult.value = {
				ok: false,
				msg: "Tidak ada data ditemukan di file Excel.",
			};
			bulkSaving.value = false;
			return;
		}

		const res = await api.post("/users/bulk", usersToImport);
		importResult.value = {
			ok: true,
			msg: res.data.message || `Berhasil import ${usersToImport.length} user.`,
		};
		await load();
	} catch (err) {
		importResult.value = {
			ok: false,
			msg:
				err.response?.data?.message || err.message || "Gagal memproses file.",
		};
	} finally {
		bulkSaving.value = false;
	}
}

function kartuHTML(u) {
	const appName = appConfig.value.app_name || "CBT RSMS";
	const schoolName = appConfig.value.school_name || "";
	return `
    <div style="width:340px;border:2px solid #059669;border-radius:12px;overflow:hidden;font-family:'Segoe UI',sans-serif;box-shadow:0 4px 15px rgba(0,0,0,.1);break-inside:avoid;page-break-inside:avoid;">
      <div style="background:linear-gradient(135deg,#059669,#0284c7);padding:14px 16px;color:white;">
        <div style="font-size:11px;font-weight:600;letter-spacing:2px;opacity:.8;text-transform:uppercase;">Kartu Peserta Ujian</div>
        <div style="font-size:16px;font-weight:800;margin-top:2px;">${appName}</div>
        <div style="font-size:10px;opacity:.75;margin-top:1px;">${schoolName}</div>
      </div>
      <div style="background:#f0fdf4;padding:14px 16px;border-bottom:1px solid #d1fae5;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:52px;height:52px;background:linear-gradient(135deg,#059669,#0284c7);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:22px;font-weight:900;text-transform:uppercase;flex-shrink:0;">
            ${(u.nama || u.userId || "?").charAt(0).toUpperCase()}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:15px;font-weight:800;color:#065f46;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.nama || u.userId}</div>
            <div style="font-size:11px;color:#6b7280;margin-top:2px;">Kelas: <b style="color:#047857;">${u.kelas || "-"}</b></div>
          </div>
        </div>
      </div>
      <div style="padding:12px 16px;background:white;">
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <tr>
            <td style="padding:4px 0;color:#6b7280;width:80px;">ID Siswa</td>
            <td style="padding:4px 0;font-weight:700;color:#111;font-family:monospace;letter-spacing:.5px;">${u.userId}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;">Password</td>
            <td style="padding:4px 0;font-weight:700;color:#b91c1c;font-family:monospace;">••••••••</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;">Status</td>
            <td style="padding:4px 0;">
              <span style="background:${u.isActive !== false ? "#d1fae5" : "#fee2e2"};color:${u.isActive !== false ? "#065f46" : "#991b1b"};padding:2px 8px;border-radius:99px;font-size:10px;font-weight:700;">
                ${u.isActive !== false ? "AKTIF" : "NON-AKTIF"}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div style="background:#f8fafc;padding:8px 16px;border-top:1px solid #e2e8f0;text-align:center;">
        <div style="font-size:10px;color:#94a3b8;">Kartu ini bersifat rahasia. Jangan dibagikan kepada orang lain.</div>
      </div>
    </div>
  `;
}

function printKartu(u) {
	const w = window.open("", "_blank", "width=900,height=700");
	const card = kartuHTML(u);
	w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kartu Ujian - ${u.nama}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f9; padding: 20px; font-family: 'Segoe UI', sans-serif; display: flex; align-items: flex-start; gap: 16px; }
        @media print { body { background: white; padding: 0; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:16px;">
        <button onclick="window.print()" style="background:#059669;color:white;border:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-right:8px;">
          🖨️ Cetak / Simpan PDF
        </button>
        <button onclick="window.close()" style="background:#64748b;color:white;border:none;padding:10px 16px;border-radius:8px;font-size:14px;cursor:pointer;">
          ✕ Tutup
        </button>
      </div>
      ${card}
    </body>
    </html>
  `);
	w.document.close();
}

onMounted(() => {
	loadMasterData();
	load();
	api
		.get("/config")
		.then((r) => {
			Object.assign(appConfig.value, r.data.data || {});
		})
		.catch(() => {});
});
async function toggleStatus(u) {
	const isActive = u.isActive !== false;
	const result = await Swal.fire({
		title: isActive ? "Nonaktifkan User?" : "Aktifkan User?",
		text: `Ubah status ${u.nama}?`,
		icon: "question",
		showCancelButton: true,
		confirmButtonColor: isActive ? "#d33" : "#3085d6",
		confirmButtonText: "Ya, lanjutkan",
		cancelButtonText: "Batal",
	});
	if (!result.isConfirmed) return;
	try {
		const res = await api.patch(`/users/${u.id}/toggle-status`);
		u.isActive = res.data.data.isActive;
	} catch (err) {
		Swal.fire(
			"Gagal",
			err.response?.data?.message || "Terjadi kesalahan.",
			"error",
		);
	}
}
</script>
