<template>
	<div class="space-y-4">
		<!-- Header -->
		<div
			class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
					<span
						class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block"
					></span>
					Monitor Ujian Real-time
				</h2>
				<p class="text-sm text-slate-500 mt-1">
					Pantau status siswa saat ujian berlangsung.
				</p>
			</div>
			<div class="flex gap-2 items-center flex-wrap">
				<span class="text-xs text-slate-400 font-mono">{{ lastUpdate }}</span>
				<button
					@click="loadMonitorData"
					:disabled="loadingData"
					class="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition flex items-center gap-2"
				>
					<svg
						v-if="loadingData"
						class="w-4 h-4 animate-spin"
						viewBox="0 0 24 24"
						fill="none"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						/>
					</svg>
					<svg
						v-else
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Refresh
				</button>
			</div>
		</div>

		<!-- Pilih Ujian -->
		<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
			<label class="block text-sm font-semibold text-slate-700 mb-2"
				>Pilih Ujian</label
			>
			<div class="flex gap-3 flex-wrap">
				<select
					v-model="selectedExamId"
					@change="loadMonitorData"
					class="input-field flex-1 min-w-[220px] max-w-lg"
				>
					<option value="">-- Pilih ujian --</option>
					<option v-for="e in examList" :key="e.id" :value="e.id">
						{{ e.subject }} — {{ e.kelas }} ({{ e.status }})
					</option>
				</select>
			</div>
		</div>

		<template v-if="selectedExamId && rawData">
			<!-- Stat Cards -->
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
				<div
					v-for="card in statCards"
					:key="card.key"
					@click="
						activeTab = card.key;
						applyFilters();
					"
					class="bg-white rounded-2xl border-2 cursor-pointer transition select-none p-4 hover:shadow-md"
					:class="
						activeTab === card.key
							? card.ringClass
							: 'border-slate-100 hover:border-slate-200'
					"
				>
					<div class="flex items-center justify-between mb-3">
						<div
							class="w-10 h-10 rounded-xl flex items-center justify-center text-base"
							:class="card.iconBg"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									:d="card.icon"
								/>
							</svg>
						</div>
						<span class="text-3xl font-black" :class="card.numColor">{{
							counts[card.key]
						}}</span>
					</div>
					<p class="text-sm font-bold text-slate-700">{{ card.label }}</p>
					<p class="text-xs text-slate-400 mt-0.5">{{ card.sub }}</p>
				</div>
			</div>

			<!-- Filter Bar -->
			<div
				class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3"
			>
				<!-- Tab status -->
				<div class="flex gap-1 flex-wrap">
					<button
						v-for="tab in tabs"
						:key="tab.key"
						@click="
							activeTab = tab.key;
							applyFilters();
						"
						class="px-3 py-1.5 rounded-lg text-xs font-bold transition"
						:class="
							activeTab === tab.key
								? 'bg-slate-700 text-white'
								: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
						"
					>
						{{ tab.label }}
					</button>
				</div>
				<!-- Filter kelas + mapel + search -->
				<div class="flex flex-col md:flex-row gap-2">
					<select
						v-model="filterKelas"
						@change="applyFilters"
						class="input-field flex-shrink-0 md:w-44"
					>
						<option value="">Semua Kelas</option>
						<option v-for="k in kelasList" :key="k" :value="k">{{ k }}</option>
					</select>
					<select
						v-model="filterMapel"
						@change="applyFilters"
						class="input-field flex-shrink-0 md:w-52"
					>
						<option value="">Semua Mata Pelajaran</option>
						<option v-for="m in mapelList" :key="m" :value="m">{{ m }}</option>
					</select>
					<div class="relative flex-1">
						<svg
							class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							v-model="searchQuery"
							@input="applyFilters"
							type="text"
							placeholder="Cari nama atau ID siswa..."
							class="input-field pl-9 w-full"
						/>
					</div>
				</div>
			</div>

			<!-- Bulk Toolbar -->
			<div
				v-if="selectedKeys.size > 0"
				class="bg-slate-800 text-white rounded-2xl p-3 flex items-center gap-3 flex-wrap"
			>
				<span class="text-sm font-bold">{{ selectedKeys.size }} dipilih</span>
				<button
					@click="bulkUnlock"
					class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-xs font-bold transition"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
					</svg>
					Buka Blokir Massal
				</button>
				<button
					@click="bulkReset"
					class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-xs font-bold transition"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					Reset Massal
				</button>
				<button
					@click="selectedKeys = new Set(); applyFilters()"
					class="ml-auto px-3 py-1.5 bg-slate-600 hover:bg-slate-500 rounded-lg text-xs font-bold transition"
				>
					Batalkan
				</button>
			</div>

			<!-- Tabel -->
			<div
				class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
			>
				<div
					v-if="filtered.length === 0"
					class="py-16 text-center text-slate-400"
				>
					<svg
						class="w-12 h-12 mx-auto mb-3 text-slate-200"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
						/>
					</svg>
					<p class="text-sm">Tidak ada siswa pada kategori ini.</p>
				</div>
				<div v-else class="overflow-x-auto">
					<table class="w-full text-left border-collapse">
						<thead>
							<tr
								class="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-widest"
							>
								<th class="py-3 px-4 w-10 text-center">
									<input
										type="checkbox"
										:checked="allFilteredKeys.length > 0 && allFilteredKeys.every(k => selectedKeys.has(k))"
										@change="(e) => toggleSelectAll(e.target.checked)"
										class="accent-slate-600 w-4 h-4 rounded cursor-pointer"
									/>
								</th>
								<th class="py-3 px-4 text-center w-10">#</th>
								<th class="py-3 px-4">Siswa</th>
								<th class="py-3 px-4">Kelas</th>
								<th class="py-3 px-4 text-center">Status</th>
								<th class="py-3 px-4 text-center">Mulai</th>
								<th class="py-3 px-4 text-center">Selesai</th>
								<th class="py-3 px-4 text-center">Nilai</th>
								<th class="py-3 px-4 text-right">Aksi</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(row, idx) in filtered"
								:key="row.userID + row.responseId"
								class="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition group"
								:class="row.responseId && selectedKeys.has(row.responseId) ? 'bg-slate-50' : ''"
							>
								<td class="p-4 text-center">
									<input
										v-if="row.responseId"
										type="checkbox"
										:checked="selectedKeys.has(row.responseId)"
										@change="toggleSelect(row.responseId)"
										class="accent-slate-600 w-4 h-4 rounded cursor-pointer"
									/>
								</td>
								<td class="p-4 text-center text-xs text-slate-400 font-bold">
									{{ idx + 1 }}
								</td>
								<td class="p-4">
									<div class="flex items-center gap-3">
										<div
											class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200 uppercase flex-shrink-0"
										>
											{{ (row.nama || "?").charAt(0) }}
										</div>
										<div>
											<p class="font-semibold text-slate-700 text-sm">
												{{ row.nama }}
											</p>
											<p
												class="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 rounded inline-block"
											>
												{{ row.userID }}
											</p>
										</div>
									</div>
								</td>
								<td class="p-4 text-sm text-slate-600">
									{{ row.kelas || "-" }}
								</td>
								<td class="p-4 text-center">
									<span
										class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase"
										:class="statusCfg[row._status]?.cls"
									>
										{{ statusCfg[row._status]?.label }}
									</span>
									<span
										v-if="row.violations > 0"
										:title="row.violDetail"
										class="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200 cursor-help"
									>
										⚠ {{ row.violations }}x
									</span>
								</td>
								<td class="p-4 text-center text-xs text-slate-500 tabular-nums">
									{{ row.startTime || "–" }}
								</td>
								<td class="p-4 text-center text-xs text-slate-500 tabular-nums">
									{{ row.submitTime || "–" }}
								</td>
								<td class="p-4 text-center">
									<span
										v-if="row._status === 'belumLogin'"
										class="text-slate-300 text-sm"
										>–</span
									>
									<span
										v-else
										class="font-bold text-sm"
										:class="scoreColor(row.score)"
									>
										{{
											row.score !== "-" && row.score != null ? row.score : "–"
										}}
									</span>
								</td>
								<td class="p-4 text-right">
									<div
										class="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition"
									>
										<button
											v-if="row._status === 'curang' && row.responseId"
											@click="unlockAttempt(row)"
											class="w-7 h-7 flex items-center justify-center rounded-lg text-green-600 hover:text-white hover:bg-green-500 border border-transparent hover:shadow transition text-xs"
											title="Buka Blokir Siswa"
										>
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
												<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
											</svg>
										</button>
										<button
											v-if="row.responseId"
											@click="resetAttempt(row)"
											class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-red-500 border border-transparent hover:shadow transition text-xs"
											title="Reset Ujian Siswa"
										>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												class="w-4 h-4"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
												/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- Footer summary -->
				<div
					v-if="filtered.length > 0"
					class="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between"
				>
					<span>{{ filtered.length }} dari {{ totalVisible }} siswa</span>
					<span
						v-if="
							filtered.filter((r) => r._status === 'mengerjakan').length > 0
						"
						class="text-amber-600 font-bold animate-pulse"
					>
						{{
							filtered.filter((r) => r._status === "mengerjakan").length
						}}
						sedang mengerjakan
					</span>
				</div>
			</div>
		</template>

		<!-- Empty state sebelum pilih ujian -->
		<div
			v-else-if="!selectedExamId"
			class="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center text-slate-400"
		>
			<svg
				class="w-14 h-14 mx-auto mb-4 text-slate-200"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
				/>
			</svg>
			<p class="font-semibold text-slate-500">
				Pilih ujian untuk memulai monitoring
			</p>
			<p class="text-sm mt-1">
				Hanya ujian dengan status Aktif atau Selesai yang dapat dimonitor.
			</p>
		</div>

		<div
			v-else-if="loadingData"
			class="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center text-slate-400"
		>
			<svg
				class="w-10 h-10 mx-auto mb-3 animate-spin text-blue-400"
				viewBox="0 0 24 24"
				fill="none"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				/>
			</svg>
			<p class="text-sm">Memuat data monitor...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const examList = ref([]);
const selectedExamId = ref("");
const rawData = ref(null);
const kelasList = ref([]);
const mapelList = ref([]);
const loadingData = ref(false);
const lastUpdate = ref("");
const activeTab = ref("semua");
const filterKelas = ref("");
const filterMapel = ref("");
const searchQuery = ref("");
const filtered = ref([]);
const selectedKeys = ref(new Set());

let autoRefreshTimer = null;

const statCards = [
	{
		key: "belumLogin",
		label: "Belum Mulai",
		sub: "Belum ada response",
		numColor: "text-slate-500",
		iconBg: "bg-slate-100 text-slate-500",
		ringClass: "border-slate-400",
		icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
	},
	{
		key: "sudahLogin",
		label: "Sudah Login",
		sub: "Belum mulai ujian",
		numColor: "text-sky-600",
		iconBg: "bg-sky-100 text-sky-600",
		ringClass: "border-sky-400",
		icon: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75",
	},
	{
		key: "mengerjakan",
		label: "Mengerjakan",
		sub: "Sedang dalam ujian",
		numColor: "text-amber-600",
		iconBg: "bg-amber-100 text-amber-600",
		ringClass: "border-amber-400",
		icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z",
	},
	{
		key: "selesai",
		label: "Selesai",
		sub: "Ujian dikumpulkan",
		numColor: "text-emerald-600",
		iconBg: "bg-emerald-100 text-emerald-600",
		ringClass: "border-emerald-400",
		icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
	},
	{
		key: "curang",
		label: "Pelanggaran",
		sub: "Melebihi batas",
		numColor: "text-red-600",
		iconBg: "bg-red-100 text-red-600",
		ringClass: "border-red-400",
		icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z",
	},
];

const tabs = [
	{ key: "semua", label: "Semua" },
	{ key: "belumLogin", label: "Belum Mulai" },
	{ key: "sudahLogin", label: "Sudah Login" },
	{ key: "mengerjakan", label: "Mengerjakan" },
	{ key: "selesai", label: "Selesai" },
	{ key: "curang", label: "Pelanggaran" },
];

const statusCfg = {
	belumLogin: {
		label: "Belum Mulai",
		cls: "bg-slate-50 text-slate-500 border-slate-200",
	},
	sudahLogin: {
		label: "Login",
		cls: "bg-sky-50 text-sky-700 border-sky-200",
	},
	mengerjakan: {
		label: "Mengerjakan",
		cls: "bg-amber-50 text-amber-700 border-amber-200",
	},
	selesai: {
		label: "Selesai",
		cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
	},
	curang: {
		label: "Pelanggaran",
		cls: "bg-red-50 text-red-700 border-red-200",
	},
};

const counts = computed(() => {
	if (!rawData.value)
		return { belumLogin: 0, sudahLogin: 0, mengerjakan: 0, selesai: 0, curang: 0 };
	return {
		belumLogin: (rawData.value.belumLogin || []).length,
		sudahLogin: (rawData.value.sudahLogin || []).length,
		mengerjakan: (rawData.value.mengerjakan || []).length,
		selesai: (rawData.value.selesai || []).length,
		curang: (rawData.value.curang || []).length,
	};
});

const totalVisible = computed(() => {
	if (!rawData.value) return 0;
	return (
		(rawData.value.belumLogin || []).length +
		(rawData.value.sudahLogin || []).length +
		(rawData.value.mengerjakan || []).length +
		(rawData.value.selesai || []).length +
		(rawData.value.curang || []).length
	);
});

const allFilteredKeys = computed(() =>
	filtered.value
		.filter((r) => r.responseId)
		.map((r) => r.responseId)
);

function tagData(arr, status) {
	return (arr || []).map((e) => ({ ...e, _status: status }));
}

function applyFilters() {
	if (!rawData.value) {
		filtered.value = [];
		return;
	}

	let pool = [];
	if (activeTab.value === "semua") {
		pool = [
			...tagData(rawData.value.belumLogin, "belumLogin"),
			...tagData(rawData.value.sudahLogin || [], "sudahLogin"),
			...tagData(rawData.value.mengerjakan, "mengerjakan"),
			...tagData(rawData.value.selesai, "selesai"),
			...tagData(rawData.value.curang, "curang"),
		];
	} else {
		pool = tagData(rawData.value[activeTab.value] || [], activeTab.value);
	}

	const kelas = filterKelas.value.toLowerCase();
	const mapel = filterMapel.value.toLowerCase();
	const q = searchQuery.value.toLowerCase().trim();

	filtered.value = pool.filter((e) => {
		const matchK = !kelas || (e.kelas || "").toLowerCase() === kelas;
		const matchM = !mapel || (e.mapel || "").toLowerCase() === mapel;
		const matchQ =
			!q ||
			(e.nama || "").toLowerCase().includes(q) ||
			(e.userID || "").toLowerCase().includes(q);
		return matchK && matchM && matchQ;
	});
}

async function loadExamList() {
	try {
		const res = await api.get("/monitor");
		examList.value = res.data.exams || [];
	} catch (_) {}
}

async function loadMonitorData() {
	if (!selectedExamId.value) return;
	loadingData.value = true;
	try {
		const res = await api.get(`/monitor?examId=${selectedExamId.value}`);
		rawData.value = res.data.data;
		kelasList.value = res.data.meta?.dropdownKelas || [];
		mapelList.value = res.data.meta?.dropdownMapel || [];
		lastUpdate.value = "Update: " + new Date().toLocaleTimeString("id-ID");
		selectedKeys.value = new Set();
		applyFilters();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal memuat data monitor.",
			confirmButtonColor: "#2563eb",
		});
	} finally {
		loadingData.value = false;
	}
}

function scoreColor(score) {
	if (score == null || score === "-") return "text-slate-400";
	const n = parseFloat(score);
	if (n >= 75) return "text-emerald-600";
	if (n >= 60) return "text-yellow-600";
	return "text-red-600";
}

function toggleSelect(key) {
	const s = new Set(selectedKeys.value);
	if (s.has(key)) s.delete(key);
	else s.add(key);
	selectedKeys.value = s;
}

function toggleSelectAll(checked) {
	if (checked) {
		selectedKeys.value = new Set(allFilteredKeys.value);
	} else {
		selectedKeys.value = new Set();
	}
}

async function unlockAttempt(row) {
	const { isConfirmed } = await Swal.fire({
		icon: "question",
		title: "Buka Blokir?",
		html: `Siswa <b>${row.nama}</b> akan dapat login kembali dan melanjutkan ujian.`,
		showCancelButton: true,
		confirmButtonText: "Ya, Buka Blokir",
		cancelButtonText: "Batal",
		confirmButtonColor: "#16a34a",
	});
	if (!isConfirmed) return;
	try {
		await api.post(`/responses/${row.responseId}/unlock`);
		Swal.fire({ icon: "success", title: "Berhasil!", text: "Akses siswa telah dibuka.", timer: 1500, showConfirmButton: false });
		await loadMonitorData();
	} catch (err) {
		Swal.fire({ icon: "error", title: "Gagal", text: err.response?.data?.message || "Terjadi kesalahan.", confirmButtonColor: "#2563eb" });
	}
}

async function bulkUnlock() {
	const curangIds = filtered.value
		.filter((r) => r._status === "curang" && r.responseId && selectedKeys.value.has(r.responseId))
		.map((r) => r.responseId);
	if (curangIds.length === 0) {
		Swal.fire("Info", "Tidak ada siswa berstatus Pelanggaran yang dipilih.", "info");
		return;
	}
	const { isConfirmed } = await Swal.fire({
		title: "Buka Blokir Kolektif?",
		html: `<b>${curangIds.length} siswa</b> yang terdeteksi curang akan dibuka blokirnya.`,
		icon: "question",
		showCancelButton: true,
		confirmButtonText: `Ya, Buka ${curangIds.length} Siswa`,
		cancelButtonText: "Batal",
		confirmButtonColor: "#16a34a",
	});
	if (!isConfirmed) return;
	try {
		await api.post("/responses/bulk-unlock", { ids: curangIds });
		Swal.fire({ icon: "success", title: "Berhasil!", text: `${curangIds.length} siswa berhasil dibuka blokirnya.`, timer: 2000, showConfirmButton: false });
		await loadMonitorData();
	} catch (err) {
		Swal.fire({ icon: "error", title: "Gagal", text: err.response?.data?.message || "Terjadi kesalahan.", confirmButtonColor: "#2563eb" });
	}
}

async function bulkReset() {
	const ids = filtered.value
		.filter((r) => r.responseId && selectedKeys.value.has(r.responseId))
		.map((r) => r.responseId);
	if (ids.length === 0) {
		Swal.fire("Info", "Pilih minimal 1 siswa yang memiliki data ujian.", "info");
		return;
	}
	const { isConfirmed, value } = await Swal.fire({
		title: "Reset Ujian Kolektif?",
		html: `Seluruh jawaban <b>${ids.length} siswa</b> terpilih akan <b class="text-red-600">DIHAPUS PERMANEN</b>.`,
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: `Ya, Reset ${ids.length} Siswa`,
		cancelButtonText: "Batal",
		confirmButtonColor: "#dc2626",
		input: "checkbox",
		inputValue: 0,
		inputPlaceholder: "Saya mengerti tindakan ini tidak dapat dibatalkan",
	});
	if (!isConfirmed || !value) {
		if (isConfirmed && !value) Swal.fire("Dibatalkan", "Centang konfirmasi terlebih dahulu.", "info");
		return;
	}
	try {
		await api.post("/responses/bulk-reset", { ids });
		Swal.fire({ icon: "success", title: "Berhasil!", text: `${ids.length} data ujian berhasil direset.`, timer: 2000, showConfirmButton: false });
		await loadMonitorData();
	} catch (err) {
		Swal.fire({ icon: "error", title: "Gagal", text: err.response?.data?.message || "Terjadi kesalahan.", confirmButtonColor: "#2563eb" });
	}
}

async function resetAttempt(row) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: "Reset Ujian Siswa?",
		html: `Seluruh jawaban dan riwayat ujian <b>${row.nama}</b> akan dihapus.<br>Siswa dapat mengulang ujian dari awal.`,
		showCancelButton: true,
		confirmButtonText: "Ya, Reset",
		cancelButtonText: "Batal",
		confirmButtonColor: "#dc2626",
	});
	if (!isConfirmed) return;
	try {
		await api.post(`/responses/${row.responseId}/reset`);
		Swal.fire({
			icon: "success",
			title: "Berhasil",
			text: "Akses ujian siswa telah direset.",
			timer: 1500,
			showConfirmButton: false,
		});
		await loadMonitorData();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
			confirmButtonColor: "#2563eb",
		});
	}
}

onMounted(async () => {
	await loadExamList();
	// Auto-refresh setiap 30 detik jika ujian dipilih
	autoRefreshTimer = setInterval(() => {
		if (selectedExamId.value && !loadingData.value) loadMonitorData();
	}, 30000);
});

onUnmounted(() => {
	if (autoRefreshTimer) clearInterval(autoRefreshTimer);
});
</script>
