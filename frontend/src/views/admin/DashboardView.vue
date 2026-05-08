<template>
	<div class="space-y-6">
		<!-- Stats Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
			<div v-for="stat in stats" :key="stat.label" class="dash-card">
				<div class="flex items-center justify-between">
					<div>
						<p
							class="text-slate-400 text-xs font-semibold uppercase tracking-wide"
						>
							{{ stat.label }}
						</p>
						<p class="text-3xl font-black text-slate-800 mt-2 tracking-tight">
							{{ stat.value }}
						</p>
					</div>
					<div class="stat-icon" :class="stat.iconClass">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								:d="stat.iconD"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Row: Ujian Aktif + Hasil Terbaru -->
		<div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
			<!-- Ujian Aktif -->
			<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700 flex items-center gap-2">
						<span
							class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"
						></span>
						Ujian Aktif
					</h3>
					<router-link
						to="/dashboard/exams"
						class="text-xs text-blue-600 hover:text-blue-700 font-medium"
						>Lihat semua →</router-link
					>
				</div>
				<!-- Quick status pills -->
				<div class="flex gap-2 mb-4 flex-wrap">
					<router-link
						to="/dashboard/responses?status=InProgress"
						class="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-100 transition"
					>
						<span
							class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block"
						></span>
						{{ inProgressCount }} Sedang Ujian
					</router-link>
					<router-link
						v-if="pendingGradeCount > 0"
						to="/dashboard/responses?status=Submitted"
						class="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-100 transition"
					>
						✍ {{ pendingGradeCount }} Perlu Dinilai
					</router-link>
				</div>
				<div
					v-if="loadingExams"
					class="py-8 text-center text-slate-300 text-sm"
				>
					Memuat...
				</div>
				<div
					v-else-if="activeExams.length === 0"
					class="py-8 text-center text-slate-300 text-sm"
				>
					Tidak ada ujian aktif
				</div>
				<ul v-else class="space-y-2">
					<li
						v-for="exam in activeExams"
						:key="exam.id"
						class="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100"
					>
						<div class="min-w-0">
							<p class="font-semibold text-slate-700 text-sm truncate">
								{{ exam.subject }}
							</p>
							<p class="text-xs text-slate-400 mt-0.5">
								{{ exam.kelas }} &middot; {{ exam.duration }} menit &middot;
								PIN: <b class="font-mono text-slate-600">{{ exam.pin }}</b>
							</p>
						</div>
						<span
							class="badge bg-emerald-100 text-emerald-700 ml-3 flex-shrink-0 whitespace-nowrap"
							>Aktif</span
						>
					</li>
				</ul>
			</div>

			<!-- Hasil Terbaru -->
			<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-semibold text-slate-700 flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
						Hasil Terbaru
					</h3>
					<router-link
						to="/dashboard/responses"
						class="text-xs text-blue-600 hover:text-blue-700 font-medium"
						>Lihat semua →</router-link
					>
				</div>
				<div
					v-if="loadingResponses"
					class="py-8 text-center text-slate-300 text-sm"
				>
					Memuat...
				</div>
				<div
					v-else-if="recentResponses.length === 0"
					class="py-8 text-center text-slate-300 text-sm"
				>
					Belum ada hasil ujian
				</div>
				<ul v-else class="space-y-2">
					<li
						v-for="resp in recentResponses"
						:key="resp.id"
						class="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition-colors"
					>
						<div class="min-w-0">
							<p class="font-semibold text-slate-700 text-sm truncate">
								{{ resp.user?.nama }}
							</p>
							<p class="text-xs text-slate-400 mt-0.5">
								{{ resp.exam?.subject }}
							</p>
						</div>
						<div class="text-right flex-shrink-0 ml-3">
							<p class="text-sm font-bold" :class="scoreColor(resp.score)">
								{{ resp.score != null ? resp.score : "–" }}
							</p>
							<p class="text-xs text-slate-400">
								{{
									{
										InProgress: "Berlangsung",
										Submitted: "Perlu Dinilai",
										Graded: "Selesai",
									}[resp.status] || resp.status
								}}
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- Info Sistem -->
		<div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
			<h3 class="font-semibold text-slate-700 mb-4 flex items-center gap-2">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.75"
					class="w-4 h-4 text-blue-500"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>
				Informasi Sistem
			</h3>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
				<div class="bg-slate-50 rounded-xl p-3 text-sm">
					<p
						class="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1"
					>
						Mode IP Filter
					</p>
					<p class="font-semibold text-slate-700 capitalize">{{ ipMode }}</p>
				</div>
				<div class="bg-slate-50 rounded-xl p-3 text-sm">
					<p
						class="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1"
					>
						Versi Aplikasi
					</p>
					<p class="font-semibold text-slate-700">1.0.0</p>
				</div>
				<div class="bg-slate-50 rounded-xl p-3 text-sm">
					<p
						class="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1"
					>
						Login Sebagai
					</p>
					<p class="font-semibold text-slate-700 truncate">
						{{ auth.user?.nama }}
						<span class="text-slate-400 font-normal"
							>({{ auth.user?.role }})</span
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import api from "@/services/api.js";

const auth = useAuthStore();

const stats = ref([
	{
		label: "Total Pengguna",
		value: "-",
		iconD:
			"M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
		iconClass: "bg-blue-50 text-blue-500",
	},
	{
		label: "Total Ujian",
		value: "-",
		iconD:
			"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
		iconClass: "bg-violet-50 text-violet-500",
	},
	{
		label: "Hasil Masuk",
		value: "-",
		iconD:
			"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
		iconClass: "bg-emerald-50 text-emerald-500",
	},
	{
		label: "IP Terdaftar",
		value: "-",
		iconD:
			"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
		iconClass: "bg-orange-50 text-orange-500",
	},
]);
const activeExams = ref([]);
const recentResponses = ref([]);
const ipMode = ref("-");
const loadingExams = ref(true);
const loadingResponses = ref(true);
const inProgressCount = ref(0);
const pendingGradeCount = ref(0);

function scoreColor(score) {
	if (score == null) return "text-slate-400";
	if (score >= 75) return "text-green-600";
	if (score >= 60) return "text-yellow-600";
	return "text-red-600";
}

onMounted(async () => {
	const [usersRes, examsRes, responsesRes, ipRes, activeRes, pendingRes] =
		await Promise.allSettled([
			api.get("/users?limit=1"),
			api.get("/exams?limit=5&status=Aktif"),
			api.get("/responses?limit=5"),
			api.get("/ip-management"),
			api.get("/responses?status=InProgress&limit=1"),
			api.get("/responses?status=Submitted&limit=1"),
		]);

	if (usersRes.status === "fulfilled")
		stats.value[0].value = usersRes.value.data.total ?? "-";
	if (examsRes.status === "fulfilled") {
		stats.value[1].value = examsRes.value.data.total ?? "-";
		activeExams.value = (examsRes.value.data.data || []).slice(0, 5);
		loadingExams.value = false;
	} else loadingExams.value = false;

	if (responsesRes.status === "fulfilled") {
		stats.value[2].value = responsesRes.value.data.total ?? "-";
		recentResponses.value = responsesRes.value.data.data?.slice(0, 5) || [];
		loadingResponses.value = false;
	} else loadingResponses.value = false;

	if (ipRes.status === "fulfilled") {
		stats.value[3].value = ipRes.value.data.total ?? "-";
		ipMode.value = ipRes.value.data.mode ?? "-";
	}

	// Extra stats
	if (activeRes.status === "fulfilled")
		inProgressCount.value = activeRes.value.data.total ?? 0;
	if (pendingRes.status === "fulfilled")
		pendingGradeCount.value = pendingRes.value.data.total ?? 0;
});
</script>
