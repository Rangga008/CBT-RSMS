<template>
	<div class="space-y-6 animate-fade-in">
		<!-- Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<div
				v-for="stat in stats"
				:key="stat.key"
				class="card-sm flex items-center gap-4"
			>
				<div
					:class="[
						'w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0',
						stat.bg,
					]"
				>
					<i :class="stat.icon + ' ' + stat.color"></i>
				</div>
				<div>
					<p class="text-xs font-bold text-slate-500 uppercase tracking-wide">
						{{ stat.label }}
					</p>
					<h3 class="text-2xl font-bold text-slate-800">{{ stat.value }}</h3>
				</div>
			</div>
		</div>

		<!-- Row 2 -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Absensi hari ini -->
			<div class="card lg:col-span-2">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-bold text-slate-700 flex items-center gap-2">
						<i class="fas fa-chart-bar text-blue-500"></i> Absensi Hari Ini
					</h3>
					<span
						class="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-semibold"
					>
						<i class="fas fa-circle text-emerald-400 text-[8px] mr-1"></i>Live
					</span>
				</div>
				<div class="grid grid-cols-4 gap-3">
					<div
						v-for="(item, key) in absensiHariIni"
						:key="key"
						:class="['rounded-xl p-3 text-center', item.bg]"
					>
						<div :class="['text-2xl font-bold', item.textColor]">
							{{ item.count }}
						</div>
						<div :class="['text-xs font-semibold', item.textColor]">
							{{ item.label }}
						</div>
					</div>
				</div>
			</div>

			<!-- Kasus aktif -->
			<div class="card">
				<h3 class="font-bold text-slate-700 flex items-center gap-2 mb-4">
					<i class="fas fa-folder-open text-amber-500"></i> Status Kasus
				</h3>
				<div class="space-y-2">
					<div
						v-for="(count, status) in kasusStats"
						:key="status"
						class="flex items-center justify-between"
					>
						<span :class="statusClass(status)">{{ status }}</span>
						<span class="font-bold text-slate-700">{{ count }}</span>
					</div>
					<div
						v-if="!Object.keys(kasusStats).length"
						class="text-center text-slate-400 text-sm py-4"
					>
						Tidak ada kasus
					</div>
				</div>
			</div>
		</div>

		<!-- Row 3 -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Siswa alpa terbanyak -->
			<div class="card">
				<h3 class="font-bold text-slate-700 flex items-center gap-2 mb-4">
					<i class="fas fa-user-times text-red-500"></i> Siswa Alpa Terbanyak
				</h3>
				<div class="space-y-2">
					<div
						v-for="(s, i) in siswaAlpa"
						:key="s.nisn"
						class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
						@click="goProfil(s.nisn)"
					>
						<div
							:class="[
								'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0',
								i < 3 ? 'bg-red-500' : 'bg-slate-400',
							]"
						>
							{{ i + 1 }}
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-semibold text-slate-700 truncate">
								{{ s.nama }}
							</p>
							<p class="text-xs text-slate-400">{{ s.kelas }}</p>
						</div>
						<span class="badge-red">{{ s.totalAlpa }}x alpa</span>
					</div>
					<div
						v-if="!siswaAlpa.length"
						class="text-center text-slate-400 text-sm py-4"
					>
						Data tidak tersedia
					</div>
				</div>
			</div>

			<!-- Kasus terbaru -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-bold text-slate-700 flex items-center gap-2">
						<i class="fas fa-clock text-purple-500"></i> Kasus Terbaru
					</h3>
					<router-link
						to="/bk/kasus"
						class="text-xs text-blue-600 hover:underline"
						>Lihat semua</router-link
					>
				</div>
				<div class="space-y-2">
					<div
						v-for="k in kasusTerbaru"
						:key="k.id"
						class="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
						@click="$router.push('/bk/kasus')"
					>
						<div
							class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 text-xs mt-0.5"
						>
							<i class="fas fa-folder"></i>
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-xs font-semibold text-slate-700 truncate">
								{{ k.siswa?.nama }}
								<span class="text-slate-400 font-normal"
									>({{ k.siswa?.kelas }})</span
								>
							</p>
							<p class="text-xs text-slate-500 truncate">
								{{ k.jenisKasus?.nama || "Kasus Umum" }}
							</p>
							<p class="text-[10px] text-slate-400">
								{{ formatDate(k.createdAt) }}
							</p>
						</div>
						<span :class="statusClass(k.status)">{{ k.status }}</span>
					</div>
					<div
						v-if="!kasusTerbaru.length"
						class="text-center text-slate-400 text-sm py-4"
					>
						Tidak ada kasus terbaru
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api.js";

const router = useRouter();
const dashData = ref(null);
const loading = ref(true);

const stats = computed(() => {
	const d = dashData.value;
	if (!d) return [];
	return [
		{
			key: "siswa",
			label: "Total Siswa",
			value: d.totalSiswa,
			icon: "fas fa-user-graduate",
			bg: "bg-blue-50",
			color: "text-blue-600",
		},
		{
			key: "kasus",
			label: "Kasus Aktif",
			value: (d.kasus?.Baru || 0) + (d.kasus?.Proses || 0),
			icon: "fas fa-folder",
			bg: "bg-amber-50",
			color: "text-amber-600",
		},
		{
			key: "kunjungan",
			label: "Kunjungan",
			value: Object.values(d.kunjungan || {}).reduce((a, b) => a + b, 0),
			icon: "fas fa-home",
			bg: "bg-purple-50",
			color: "text-purple-600",
		},
		{
			key: "pelanggaran",
			label: "Total Poin Pelanggaran",
			value: d.poin?.totalPelanggaran || 0,
			icon: "fas fa-exclamation-triangle",
			bg: "bg-red-50",
			color: "text-red-600",
		},
	];
});

const absensiHariIni = computed(() => {
	const a = dashData.value?.absensiHariIni || {};
	return {
		Hadir: {
			count: a.Hadir || 0,
			label: "Hadir",
			bg: "bg-emerald-50",
			textColor: "text-emerald-700",
		},
		Sakit: {
			count: a.Sakit || 0,
			label: "Sakit",
			bg: "bg-yellow-50",
			textColor: "text-yellow-700",
		},
		Izin: {
			count: a.Izin || 0,
			label: "Izin",
			bg: "bg-blue-50",
			textColor: "text-blue-700",
		},
		Alpa: {
			count: a.Alpa || 0,
			label: "Alpa",
			bg: "bg-red-50",
			textColor: "text-red-700",
		},
	};
});
const kasusStats = computed(() => dashData.value?.kasus || {});
const siswaAlpa = computed(() => dashData.value?.siswaAlpaTerbanyak || []);
const kasusTerbaru = computed(() => dashData.value?.kasusTerbaru || []);

function statusClass(status) {
	const map = {
		Baru: "status-baru",
		Proses: "status-proses",
		Selesai: "status-selesai",
		Ditutup: "status-ditutup",
		Rencana: "status-rencana",
		Berlangsung: "status-berlangsung",
		Dibatalkan: "status-dibatalkan",
	};
	return map[status] || "badge-gray";
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
function goProfil(nisn) {
	router.push(`/bk/profil/${nisn}`);
}

onMounted(async () => {
	try {
		const { data } = await api.get("/bk/dashboard");
		dashData.value = data.data;
	} finally {
		loading.value = false;
	}
});
</script>
