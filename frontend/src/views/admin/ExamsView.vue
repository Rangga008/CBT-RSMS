<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between flex-wrap gap-3">
			<h2 class="text-xl font-bold text-slate-800">Manajemen Ujian</h2>
			<button @click="openCreate" class="btn-primary">+ Buat Ujian</button>
		</div>

		<!-- Filter -->
		<div
			class="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 flex-wrap shadow-sm"
		>
			<input
				v-model="search"
				@input="debouncedLoad"
				placeholder="Cari mata pelajaran..."
				class="input-field flex-1 min-w-48"
			/>
			<select v-model="filterStatus" @change="load" class="input-field w-40">
				<option value="">Semua Status</option>
				<option value="Draft">Draft</option>
				<option value="Aktif">Aktif</option>
				<option value="Selesai">Selesai</option>
				<option value="Diarsipkan">Diarsipkan</option>
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
				v-else-if="exams.length === 0"
				class="p-8 text-center text-slate-400"
			>
				Belum ada ujian
			</div>
			<table v-else class="w-full text-sm">
				<thead class="bg-slate-50 border-b border-slate-200">
					<tr>
						<th class="px-4 py-3 text-left font-semibold text-slate-600 w-10">
							NO
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							MATA PELAJARAN &amp; KELAS
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							WAKTU MULAI &amp; SELESAI
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							PIN SESI
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							STATUS
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							AKSI
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					<tr
						v-for="(exam, idx) in exams"
						:key="exam.id"
						class="hover:bg-slate-50 transition-colors"
					>
						<!-- NO -->
						<td class="px-4 py-3 text-slate-400 text-xs font-medium">
							{{ (page - 1) * limit + idx + 1 }}
						</td>

						<!-- MATA PELAJARAN & KELAS -->
						<td class="px-4 py-4 min-w-[200px]">
							<div class="font-bold text-slate-800 text-sm">
								{{ exam.subject }}
							</div>
							<div class="flex flex-wrap gap-1 mt-1.5">
								<span
									v-for="k in exam.kelas.split(',')"
									:key="k"
									class="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium"
									>{{ k.trim() }}</span
								>
							</div>
							<div
								class="mt-1.5 flex items-center gap-1 text-xs text-slate-400"
							>
								<svg
									class="w-3.5 h-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								{{ exam._count?.questions ?? 0 }} soal
							</div>
						</td>

						<!-- WAKTU MULAI & SELESAI -->
						<td class="px-4 py-4 min-w-[180px]">
							<div
								class="flex items-center gap-1.5 text-slate-700 text-xs font-medium"
							>
								<svg
									class="w-3.5 h-3.5 text-blue-500 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
									<line x1="16" y1="2" x2="16" y2="6" />
									<line x1="8" y1="2" x2="8" y2="6" />
									<line x1="3" y1="10" x2="21" y2="10" />
								</svg>
								{{ formatDateTime(exam.date) }}
							</div>
							<div
								v-if="exam.endDate"
								class="flex items-center gap-1.5 text-slate-500 text-xs mt-1"
							>
								<svg
									class="w-3.5 h-3.5 text-slate-400 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Sampai: {{ formatTime(exam.endDate) }}
							</div>
							<div
								class="flex items-center gap-1.5 text-slate-400 text-xs mt-1"
							>
								<svg
									class="w-3.5 h-3.5 text-slate-400 shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
								{{ exam.duration }} Menit
							</div>
						</td>

						<!-- PIN SESI -->
						<td class="px-4 py-4">
							<span
								v-if="exam.pin"
								class="font-mono bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg border border-yellow-200 text-sm font-bold select-all tracking-wider"
								>{{ exam.pin }}</span
							>
							<span v-else class="text-slate-300 text-xs">—</span>
						</td>

						<!-- STATUS -->
						<td class="px-4 py-4">
							<button
								class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer"
								:class="statusBadge(exam.status)"
								@click="toggleExamStatus(exam)"
								title="Klik untuk ubah status"
							>
								<span
									class="w-1.5 h-1.5 rounded-full"
									:class="statusDot(exam.status)"
								></span>
								{{ statusLabel(exam.status) }}
							</button>
						</td>

						<!-- AKSI -->
						<td class="px-4 py-4">
							<div class="flex items-center justify-center gap-2">
								<router-link
									:to="`/dashboard/questions?examId=${exam.id}&examName=${encodeURIComponent(exam.subject)}`"
									class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition"
									title="Kelola Soal"
								>
									<svg
										class="w-3.5 h-3.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
									Soal
								</router-link>
								<button
									@click="recalculateScores(exam)"
									class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 text-violet-500 hover:text-violet-700 transition"
									title="Hitung Ulang Nilai"
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
											d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
										/>
									</svg>
								</button>
								<button
									@click="openEdit(exam)"
									class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 hover:text-blue-700 transition"
									title="Edit"
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
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
										/>
									</svg>
								</button>
								<button
									v-if="isAdmin"
									@click="confirmDelete(exam)"
									class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition"
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
			<div
				v-if="total > 0"
				class="px-4 py-3 border-t text-sm text-slate-500 flex items-center justify-between"
			>
				<span>{{ exams.length }} dari {{ total }} ujian</span>
				<div class="flex gap-2 items-center">
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
					<span class="px-1">{{ page }}</span>
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

		<!-- Modal -->
		<div
			v-if="showModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto"
			>
				<h3 class="text-lg font-bold text-slate-800 mb-4">
					{{ editId ? "Edit Ujian" : "Buat Ujian Baru" }}
				</h3>
				<form @submit.prevent="save" class="space-y-4">
					<!-- Mata Pelajaran -->
					<div>
						<label class="label-field"
							>Mata Pelajaran <span class="text-red-500">*</span></label
						>
						<select
							v-if="masterMapel.length"
							v-model="form.subject"
							class="input-field"
							required
						>
							<option value="">-- Pilih Mapel --</option>
							<option v-for="m in masterMapel" :key="m.id" :value="m.nama">
								{{ m.nama }}
							</option>
						</select>
						<input
							v-else
							v-model="form.subject"
							type="text"
							class="input-field"
							placeholder="Nama mata pelajaran"
							required
						/>
					</div>

					<!-- Kelas Multi-select -->
					<div>
						<label class="label-field"
							>Kelas <span class="text-red-500">*</span></label
						>
						<div
							v-if="masterKelas.length"
							class="border border-slate-200 rounded-xl p-3 max-h-36 overflow-y-auto bg-slate-50 space-y-1.5"
						>
							<label
								v-for="k in masterKelas"
								:key="k.id"
								class="flex items-center gap-2 cursor-pointer text-sm text-slate-700 hover:text-slate-900"
							>
								<input
									type="checkbox"
									:value="k.nama"
									v-model="selectedKelas"
									class="rounded accent-blue-600"
								/>
								{{ k.nama }}
							</label>
						</div>
						<input
							v-else
							v-model="form.kelas"
							type="text"
							class="input-field"
							placeholder="X,XI,XII atau 10A,10B"
							required
						/>
						<p
							v-if="masterKelas.length && selectedKelas.length === 0"
							class="text-xs text-red-500 mt-1"
						>
							Pilih minimal satu kelas
						</p>
					</div>

					<!-- Durasi & PIN -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="label-field"
								>Durasi (menit) <span class="text-red-500">*</span></label
							>
							<input
								v-model.number="form.duration"
								type="number"
								min="1"
								max="600"
								class="input-field"
								required
							/>
						</div>
						<div>
							<label class="label-field">PIN Ujian</label>
							<div class="flex gap-2">
								<input
									v-model="form.pin"
									type="text"
									placeholder="Opsional"
									class="input-field flex-1"
									maxlength="10"
								/>
								<button
									type="button"
									@click="genPin"
									class="px-3 py-2 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg text-xs font-bold hover:bg-yellow-100 transition whitespace-nowrap"
									title="Generate PIN"
								>
									🎲 PIN
								</button>
							</div>
						</div>
					</div>

					<!-- Tanggal -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="label-field"
								>Tanggal Mulai <span class="text-red-500">*</span></label
							>
							<input
								v-model="form.date"
								type="datetime-local"
								class="input-field"
								required
							/>
						</div>
						<div>
							<label class="label-field">Tanggal Selesai</label>
							<input
								v-model="form.endDate"
								type="datetime-local"
								class="input-field"
							/>
						</div>
					</div>

					<!-- Status -->
					<div>
						<label class="label-field">Status</label>
						<select v-model="form.status" class="input-field">
							<option value="Draft">Draft</option>
							<option value="Aktif">Aktif</option>
							<option value="Selesai">Selesai</option>
							<option value="Diarsipkan">Diarsipkan</option>
						</select>
					</div>

					<!-- Shuffle Config Per-Tipe -->
					<div class="border border-slate-200 rounded-xl overflow-hidden">
						<div
							class="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2"
						>
							<svg
								class="w-4 h-4 text-indigo-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
								/>
							</svg>
							<span
								class="text-xs font-bold text-slate-600 uppercase tracking-wide"
								>Pengacakan Soal per Tipe</span
							>
						</div>
						<div class="p-4">
							<p class="text-xs text-slate-400 mb-3">
								Aktifkan untuk mengacak urutan & opsi soal per jenis saat siswa
								mulai ujian.
							</p>
							<div class="grid grid-cols-2 gap-2">
								<label
									v-for="(label, key) in shuffleTypes"
									:key="key"
									class="flex items-center justify-between gap-2 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-100"
									:class="{ 'col-span-2': key === 'Esai' }"
								>
									<span class="text-xs font-semibold text-slate-600">{{
										label
									}}</span>
									<div class="relative inline-flex flex-shrink-0">
										<input
											type="checkbox"
											v-model="form.shuffleConfig[key]"
											class="sr-only peer"
										/>
										<div
											class="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-indigo-500 transition-colors duration-200"
										></div>
										<div
											class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform duration-200"
										></div>
									</div>
								</label>
							</div>
						</div>
					</div>

					<!-- Actions -->
					<div class="flex gap-3 pt-2">
						<button
							type="submit"
							:disabled="
								saving || (masterKelas.length > 0 && selectedKelas.length === 0)
							"
							class="btn-primary flex-1"
						>
							{{ saving ? "Menyimpan..." : editId ? "Perbarui" : "Buat Ujian" }}
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
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const auth = useAuthStore();
const isAdmin = computed(() => auth.user?.role === "Admin");

const exams = ref([]);
const total = ref(0);
const page = ref(1);
const limit = ref(20);
const loading = ref(true);
const search = ref("");
const filterStatus = ref("");
const showModal = ref(false);
const saving = ref(false);
const editId = ref(null);

// Master Data
const masterKelas = ref([]);
const masterMapel = ref([]);
const selectedKelas = ref([]);

const shuffleTypes = {
	PG: "📋 Pilihan Ganda (PG)",
	PG_KOMPLEKS: "📝 PG Kompleks",
	BS: "✅ Benar/Salah",
	JODOH: "🔗 Menjodohkan",
	Esai: "✍️ Esai",
};

const defaultShuffleConfig = () => ({
	PG: false,
	PG_KOMPLEKS: false,
	BS: false,
	JODOH: false,
	Esai: false,
});

const defaultForm = () => ({
	subject: "",
	kelas: "",
	duration: 90,
	pin: "",
	date: "",
	endDate: "",
	status: "Draft",
	shuffleConfig: defaultShuffleConfig(),
});
const form = ref(defaultForm());

const statusLabel = (s) =>
	({
		Draft: "NON-AKTIF",
		Aktif: "AKTIF",
		Selesai: "SELESAI",
		Diarsipkan: "DIARSIPKAN",
	})[s] || s;

const statusBadge = (s) =>
	({
		Draft: "bg-slate-100 text-slate-600 border-slate-200",
		Aktif: "bg-green-50 text-green-700 border-green-200",
		Selesai: "bg-blue-50 text-blue-700 border-blue-200",
		Diarsipkan: "bg-orange-50 text-orange-700 border-orange-200",
	})[s] || "bg-slate-100 text-slate-500 border-slate-200";

const statusDot = (s) =>
	({
		Draft: "bg-slate-400",
		Aktif: "bg-green-500",
		Selesai: "bg-blue-500",
		Diarsipkan: "bg-orange-400",
	})[s] || "bg-slate-400";

function formatDateTime(iso) {
	if (!iso) return "-";
	const d = new Date(iso);
	const day = String(d.getDate()).padStart(2, "0");
	const mon = String(d.getMonth() + 1).padStart(2, "0");
	const yr = d.getFullYear();
	const h = String(d.getHours()).padStart(2, "0");
	const m = String(d.getMinutes()).padStart(2, "0");
	return `${day}/${mon}/${yr} ${h}:${m}`;
}

function formatTime(iso) {
	if (!iso) return "-";
	const d = new Date(iso);
	return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function genPin() {
	form.value.pin = String(Math.floor(100000 + Math.random() * 900000));
}

let debounceTimer;
const debouncedLoad = () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(load, 400);
};

function toLocalDatetime(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
		.toISOString()
		.slice(0, 16);
}

async function loadMasterData() {
	try {
		const res = await api.get("/master-data");
		masterKelas.value = res.data.data?.kelas || [];
		masterMapel.value = res.data.data?.mapel || [];
	} catch (_) {}
}

async function load() {
	loading.value = true;
	try {
		const params = new URLSearchParams({
			limit: limit.value,
			page: page.value,
		});
		if (search.value) params.set("search", search.value);
		if (filterStatus.value) params.set("status", filterStatus.value);
		const res = await api.get(`/exams?${params}`);
		exams.value = res.data.data || [];
		total.value = res.data.total || 0;
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

function openCreate() {
	editId.value = null;
	form.value = defaultForm();
	selectedKelas.value = [];
	showModal.value = true;
}

function openEdit(exam) {
	editId.value = exam.id;
	const sc = exam.shuffleConfig || {};
	form.value = {
		subject: exam.subject,
		kelas: exam.kelas,
		duration: exam.duration,
		pin: exam.pin || "",
		date: toLocalDatetime(exam.date),
		endDate: toLocalDatetime(exam.endDate),
		status: exam.status,
		shuffleConfig: {
			PG: !!sc.PG,
			PG_KOMPLEKS: !!sc.PG_KOMPLEKS,
			BS: !!sc.BS,
			JODOH: !!sc.JODOH,
			Esai: !!sc.Esai,
		},
	};
	// Pre-select kelas dari string koma
	selectedKelas.value = exam.kelas
		? exam.kelas
				.split(",")
				.map((k) => k.trim())
				.filter(Boolean)
		: [];
	showModal.value = true;
}

async function save() {
	// Resolve kelas: gunakan selectedKelas jika ada master data
	if (masterKelas.value.length > 0) {
		if (selectedKelas.value.length === 0) {
			Swal.fire({
				icon: "warning",
				title: "Validasi",
				text: "Pilih minimal satu kelas.",
			});
			return;
		}
		form.value.kelas = selectedKelas.value.join(",");
	}

	saving.value = true;
	try {
		const payload = {
			...form.value,
			date: new Date(form.value.date).toISOString(),
			endDate: form.value.endDate
				? new Date(form.value.endDate).toISOString()
				: null,
			pin: form.value.pin || null,
		};
		if (editId.value) {
			await api.patch(`/exams/${editId.value}`, payload);
		} else {
			await api.post("/exams", payload);
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

async function confirmDelete(exam) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: "Hapus ujian?",
		text: `"${exam.subject}" akan dihapus permanen.`,
		showCancelButton: true,
		confirmButtonText: "Hapus",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/exams/${exam.id}`);
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal menghapus.",
		});
	}
}

async function recalculateScores(exam) {
	const { isConfirmed } = await Swal.fire({
		icon: "question",
		title: "Hitung Ulang Nilai?",
		text: `Semua nilai ujian "${exam.subject}" akan dihitung ulang berdasarkan kunci jawaban terkini.`,
		showCancelButton: true,
		confirmButtonText: "Ya, Hitung Ulang",
		cancelButtonText: "Batal",
		confirmButtonColor: "#7c3aed",
	});
	if (!isConfirmed) return;
	try {
		const res = await api.post(`/exams/${exam.id}/recalculate`);
		Swal.fire({
			icon: "success",
			title: "Berhasil",
			text: res.data.message || `${res.data.updated} nilai dihitung ulang.`,
			timer: 2000,
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

onMounted(() => {
	loadMasterData();
	load();
});
async function toggleExamStatus(exam) {
	if (exam.status === "Selesai" || exam.status === "Diarsipkan") {
		Swal.fire(
			"Info",
			`Ujian dengan status "${exam.status}" tidak dapat diubah dari sini.`,
			"info",
		);
		return;
	}
	const newStatus = exam.status === "Aktif" ? "Draft" : "Aktif";
	const result = await Swal.fire({
		title: `Ubah ke "${statusLabel(newStatus)}"?`,
		text: `Ujian "${exam.subject}" akan diubah ke ${statusLabel(newStatus)}.`,
		icon: "question",
		showCancelButton: true,
		confirmButtonColor: newStatus === "Aktif" ? "#3085d6" : "#d33",
		confirmButtonText: "Ya, ubah",
		cancelButtonText: "Batal",
	});
	if (!result.isConfirmed) return;
	try {
		await api.patch(`/exams/${exam.id}`, { status: newStatus });
		await load();
	} catch (err) {
		Swal.fire(
			"Gagal",
			err.response?.data?.message || "Terjadi kesalahan.",
			"error",
		);
	}
}
</script>
