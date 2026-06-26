<template>
	<div class="space-y-6 animate-fade-in">
		<!-- Header profil -->
		<div class="card">
			<div
				v-if="summary"
				class="flex flex-col sm:flex-row items-start sm:items-center gap-5"
			>
				<div
					class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg"
				>
					{{ summary.siswa.nama?.[0]?.toUpperCase() }}
				</div>
				<div class="flex-1">
					<h2 class="text-2xl font-bold text-slate-800">
						{{ summary.siswa.nama }}
					</h2>
					<div class="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
						<span
							><i class="fas fa-school mr-1"></i>{{ summary.siswa.kelas }}</span
						>
						<span
							><i class="fas fa-id-card mr-1"></i>NISN:
							{{ summary.siswa.nisn }}</span
						>
						<span
							><i class="fas fa-venus-mars mr-1"></i
							>{{
								summary.siswa.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"
							}}</span
						>
					</div>
				</div>
				<button @click="$router.back()" class="btn-secondary btn-sm">
					<i class="fas fa-arrow-left"></i> Kembali
				</button>
			</div>
		</div>

		<!-- Stats cards -->
		<div v-if="summary" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="card-sm text-center">
				<div class="text-3xl font-bold text-emerald-600">
					{{ summary.poin.prestasi }}
				</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					Total Poin Prestasi
				</div>
			</div>
			<div class="card-sm text-center">
				<div class="text-3xl font-bold text-red-600">
					{{ summary.poin.pelanggaran }}
				</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					Total Poin Pelanggaran
				</div>
			</div>
			<div class="card-sm text-center">
				<div
					:class="[
						'text-3xl font-bold',
						summary.poin.net >= 0 ? 'text-blue-600' : 'text-orange-600',
					]"
				>
					{{ summary.poin.net >= 0 ? "+" : "" }}{{ summary.poin.net }}
				</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					Net Poin
				</div>
			</div>
			<div class="card-sm text-center">
				<div class="text-3xl font-bold text-amber-600">
					{{ summary.kasusAktif }}
				</div>
				<div class="text-xs font-bold text-slate-500 uppercase mt-1">
					Kasus Aktif
				</div>
			</div>
		</div>

		<!-- Absensi summary -->
		<div v-if="summary" class="card">
			<h3 class="font-bold text-slate-700 mb-3 flex items-center gap-2">
				<i class="fas fa-calendar-check text-blue-500"></i> Rekap Absensi
			</h3>
			<div class="grid grid-cols-4 gap-3">
				<div class="text-center">
					<div class="text-2xl font-bold text-emerald-600">
						{{ summary.absensi.hadir }}
					</div>
					<div class="text-xs text-slate-500">Hadir</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-yellow-600">
						{{ summary.absensi.sakit }}
					</div>
					<div class="text-xs text-slate-500">Sakit</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-blue-600">
						{{ summary.absensi.izin }}
					</div>
					<div class="text-xs text-slate-500">Izin</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-red-600">
						{{ summary.absensi.alpa }}
					</div>
					<div class="text-xs text-slate-500">Alpa</div>
				</div>
			</div>
		</div>

		<!-- Tabs -->
		<div class="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
			<button
				v-for="t in tabs"
				:key="t.key"
				@click="activeTab = t.key"
				:class="[
					'px-4 py-2 rounded-lg text-sm font-bold transition',
					activeTab === t.key
						? 'bg-white shadow text-blue-700'
						: 'text-slate-500',
				]"
			>
				<i :class="t.icon + ' mr-1'"></i>{{ t.label }}
			</button>
		</div>

		<!-- Poin list -->
		<div v-if="activeTab === 'poin'" class="card">
			<div class="flex items-center justify-between mb-3">
				<h3 class="font-bold text-slate-700">Riwayat Poin</h3>
				<div class="flex gap-2">
					<button
						@click="filterPoinTipe = ''"
						:class="[
							'btn-sm',
							!filterPoinTipe ? 'btn-primary' : 'btn-secondary',
						]"
					>
						Semua
					</button>
					<button
						@click="filterPoinTipe = 'PRESTASI'"
						:class="[
							'btn-sm',
							filterPoinTipe === 'PRESTASI' ? 'btn-success' : 'btn-secondary',
						]"
					>
						Prestasi
					</button>
					<button
						@click="filterPoinTipe = 'PELANGGARAN'"
						:class="[
							'btn-sm',
							filterPoinTipe === 'PELANGGARAN' ? 'btn-danger' : 'btn-secondary',
						]"
					>
						Pelanggaran
					</button>
				</div>
			</div>
			<div class="space-y-2 max-h-80 overflow-y-auto">
				<div
					v-for="p in filteredPoin"
					:key="p.id"
					class="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-100 transition"
				>
					<div
						:class="[
							'w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0',
							p.tipe === 'PRESTASI'
								? 'bg-emerald-100 text-emerald-600'
								: 'bg-red-100 text-red-600',
						]"
					>
						<i
							:class="
								p.tipe === 'PRESTASI'
									? 'fas fa-star'
									: 'fas fa-exclamation-triangle'
							"
						></i>
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold text-slate-700">
							{{
								p.jenisPrestasi?.nama ||
								p.jenisPelanggaran?.nama ||
								"Poin Manual"
							}}
						</p>
						<p class="text-xs text-slate-400">
							{{ formatDate(p.tanggal) }}
							<span v-if="p.deskripsi">— {{ p.deskripsi }}</span>
						</p>
					</div>
					<div
						:class="[
							'text-xl font-bold shrink-0',
							p.tipe === 'PRESTASI' ? 'text-emerald-600' : 'text-red-600',
						]"
					>
						{{ p.tipe === "PRESTASI" ? "+" : "-" }}{{ p.poin }}
					</div>
				</div>
				<div
					v-if="!filteredPoin.length"
					class="text-center py-6 text-slate-400 text-sm"
				>
					Tidak ada data poin
				</div>
			</div>
		</div>

		<!-- Kasus list -->
		<div v-if="activeTab === 'kasus'" class="card">
			<h3 class="font-bold text-slate-700 mb-3">Riwayat Kasus</h3>
			<div class="space-y-2 max-h-80 overflow-y-auto">
				<div
					v-for="k in kasusList"
					:key="k.id"
					class="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
				>
					<div class="flex items-center justify-between mb-1">
						<span class="font-semibold text-sm text-slate-700">{{
							k.nomor
						}}</span>
						<span :class="statusClass(k.status)">{{ k.status }}</span>
					</div>
					<p class="text-xs text-slate-500 line-clamp-2">{{ k.deskripsi }}</p>
					<p class="text-[10px] text-slate-400 mt-1">
						{{ formatDate(k.tanggal) }} · {{ k.jenisKasus?.nama || "Umum" }}
					</p>
				</div>
				<div
					v-if="!kasusList.length"
					class="text-center py-6 text-slate-400 text-sm"
				>
					Tidak ada kasus
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api.js";

const route = useRoute();
const summary = ref(null);
const poinData = ref({ data: [], total: {} });
const kasusList = ref([]);
const activeTab = ref("poin");
const filterPoinTipe = ref("");

const tabs = [
	{ key: "poin", label: "Poin", icon: "fas fa-star" },
	{ key: "kasus", label: "Kasus", icon: "fas fa-folder" },
];

const filteredPoin = computed(() => {
	if (!filterPoinTipe.value) return poinData.value.data;
	return poinData.value.data.filter((p) => p.tipe === filterPoinTipe.value);
});

function statusClass(s) {
	const map = {
		Baru: "status-baru",
		Proses: "status-proses",
		Selesai: "status-selesai",
		Ditutup: "status-ditutup",
	};
	return map[s] || "badge-gray";
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

onMounted(async () => {
	const nisn = route.params.nisn;
	const [summaryRes, poinRes, kasusRes] = await Promise.all([
		api.get(`/siswa/${nisn}/summary`),
		api.get(`/bk/poin/siswa/${nisn}`),
		api.get("/bk/kasus", { params: { nisn } }),
	]);
	summary.value = summaryRes.data.data;
	poinData.value = poinRes.data;
	kasusList.value = kasusRes.data.data;
});
</script>
