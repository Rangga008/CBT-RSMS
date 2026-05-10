<template>
	<div
		class="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 flex flex-col overflow-x-hidden"
	>
		<!-- Header -->
		<header
			class="bg-white/5 backdrop-blur border-b border-white/10 px-4 py-3 sticky top-0 z-10"
		>
			<div
				class="max-w-2xl mx-auto flex items-center justify-between gap-2 min-w-0"
			>
				<div class="flex items-center gap-3">
					<div
						class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-700 font-black text-xs shadow overflow-hidden"
					>
						<img
							v-if="appLogo"
							:src="appLogo"
							alt="logo"
							class="w-full h-full object-cover"
						/>
						<span v-else class="text-xs font-black">CBT</span>
					</div>
					<div class="min-w-0">
						<p class="text-white font-bold text-sm leading-tight">
							{{ appName }}
						</p>
						<p
							class="text-white/40 text-xs truncate max-w-[150px] sm:max-w-none"
						>
							{{ appSubtitle }}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-2 shrink-0">
					<!-- Dark Mode Toggle -->
					<button
						@click="toggleDark"
						title="Mode gelap"
						class="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
					>
						<svg
							v-if="isDark"
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 00-1.061 1.06l1.591 1.591a.75.75 0 001.06-1.06l-1.59-1.59z"
							/>
						</svg>
						<svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<div class="text-right hidden sm:block">
						<p class="text-white text-sm font-semibold">
							{{ auth.user?.nama }}
						</p>
						<p class="text-white/40 text-xs">{{ auth.user?.kelas }}</p>
					</div>
					<button
						@click="handleLogout"
						class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
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
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<span class="hidden sm:inline">Keluar</span>
					</button>
				</div>
			</div>
		</header>

		<!-- Main -->
		<main class="flex-1 py-8 px-4">
			<div class="max-w-2xl mx-auto space-y-5">
				<!-- Welcome -->
				<div class="text-center mb-2">
					<p class="text-white/60 text-sm">Selamat datang kembali,</p>
					<h1 class="text-2xl font-bold text-white mt-1">
						{{ auth.user?.nama }}
					</h1>
					<p class="text-blue-300 text-sm mt-1">
						Kelas: {{ auth.user?.kelas }}
					</p>
				</div>

				<!-- PIN Card -->
				<div class="bg-white rounded-2xl shadow-2xl p-6">
					<h2 class="font-semibold text-slate-700 mb-1 flex items-center gap-2">
						<svg
							class="w-4 h-4 text-blue-500"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
							/>
						</svg>
						Masuk dengan PIN
					</h2>
					<p class="text-slate-400 text-xs mb-4">
						Minta PIN ujian dari guru atau pengawas Anda
					</p>
					<form
						@submit.prevent="joinByPin"
						class="flex flex-col sm:flex-row gap-3"
					>
						<input
							v-model="pin"
							type="text"
							maxlength="20"
							placeholder="Masukkan PIN ujian..."
							class="w-full min-w-0 flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-800 text-sm transition-all"
							:disabled="loadingPin"
						/>
						<button
							type="submit"
							:disabled="!pin.trim() || loadingPin"
							class="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
						>
							<span v-if="loadingPin" class="flex items-center gap-1.5">
								<svg
									class="animate-spin w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
										class="opacity-25"
									/>
									<path
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										class="opacity-75"
									/>
								</svg>
								Cek...
							</span>
							<span v-else>Masuk</span>
						</button>
					</form>
				</div>

				<!-- Available Exams -->
				<div class="bg-white rounded-2xl shadow-2xl p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="font-semibold text-slate-700 flex items-center gap-2">
							<svg
								class="w-4 h-4 text-emerald-500"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
								/>
							</svg>
							Ujian Tersedia
						</h2>
						<button
							@click="loadExams"
							:disabled="loading"
							class="text-xs text-blue-600 hover:text-blue-700 font-medium"
						>
							Refresh
						</button>
					</div>

					<!-- Loading -->
					<div
						v-if="loading"
						class="py-10 flex flex-col items-center text-slate-400"
					>
						<svg
							class="animate-spin w-6 h-6 mb-2"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								class="opacity-25"
							/>
							<path
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								class="opacity-75"
							/>
						</svg>
						<span class="text-sm">Memuat ujian...</span>
					</div>

					<!-- Empty -->
					<div v-else-if="exams.length === 0" class="py-10 text-center">
						<svg
							class="w-10 h-10 text-slate-200 mx-auto mb-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
						<p class="text-slate-400 text-sm">
							Tidak ada ujian aktif untuk kelas Anda
						</p>
						<p class="text-slate-300 text-xs mt-1">
							Silakan hubungi guru jika ada ujian yang seharusnya tersedia
						</p>
					</div>

					<!-- Exam List -->
					<div v-else class="space-y-3">
						<div
							v-for="exam in exams"
							:key="exam.id"
							class="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
						>
							<div
								class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4"
							>
								<div class="min-w-0 flex-1">
									<p class="font-semibold text-slate-700 text-sm">
										{{ exam.subject }}
									</p>
									<div class="flex items-center gap-3 mt-1.5 flex-wrap">
										<span
											class="text-xs text-slate-400 flex items-center gap-1"
										>
											<svg
												class="w-3 h-3"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											{{ exam.duration }} menit
										</span>
										<span
											class="text-xs text-slate-400 flex items-center gap-1"
										>
											<svg
												class="w-3 h-3"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8.25 6.75V3m7.5 3.75V3M3.75 9.75h16.5M6 21h12a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0018 5.25H6A2.25 2.25 0 003.75 7.5v11.25A2.25 2.25 0 006 21z"
												/>
											</svg>
											{{ formatDateTime(exam.date) }}
										</span>
										<span v-if="exam.endDate" class="text-xs text-slate-400">
											Selesai: {{ formatDateTime(exam.endDate) }}
										</span>
										<span class="text-xs text-slate-400">{{ exam.kelas }}</span>
										<span class="badge bg-emerald-100 text-emerald-700"
											>Aktif</span
										>
									</div>
								</div>
								<button
									@click="openBriefing(exam)"
									class="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl font-semibold hover:bg-blue-500 active:scale-95 transition-all"
								>
									<svg
										class="w-3.5 h-3.5"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
										/>
									</svg>
									Mulai
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Riwayat Ujian -->
				<div class="bg-white rounded-2xl shadow-2xl p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="font-semibold text-slate-700 flex items-center gap-2">
							<svg
								class="w-4 h-4 text-violet-500"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Riwayat Ujian
						</h2>
						<button
							@click="loadHistory"
							:disabled="loadingHistory"
							class="text-xs text-blue-600 hover:text-blue-700 font-medium"
						>
							Refresh
						</button>
					</div>

					<!-- Loading -->
					<div
						v-if="loadingHistory"
						class="py-8 flex flex-col items-center text-slate-400"
					>
						<svg
							class="animate-spin w-5 h-5 mb-2"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								class="opacity-25"
							/>
							<path
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								class="opacity-75"
							/>
						</svg>
						<span class="text-sm">Memuat riwayat...</span>
					</div>

					<!-- Empty -->
					<div v-else-if="myResponses.length === 0" class="py-8 text-center">
						<p class="text-slate-400 text-sm">
							Belum ada ujian yang dikerjakan
						</p>
					</div>

					<!-- History List -->
					<div v-else class="space-y-3">
						<div
							v-for="resp in myResponses"
							:key="resp.id"
							class="p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
						>
							<div class="min-w-0 flex-1">
								<p class="font-semibold text-slate-700 text-sm">
									{{ resp.exam?.subject || "Ujian" }}
								</p>
								<div class="flex items-center gap-3 mt-1 flex-wrap">
									<span class="text-xs text-slate-400">{{
										resp.exam?.kelas
									}}</span>
									<span
										class="badge text-xs"
										:class="{
											'bg-blue-100 text-blue-700': resp.status === 'Graded',
											'bg-yellow-100 text-yellow-700':
												resp.status === 'Submitted',
											'bg-slate-100 text-slate-500':
												resp.status === 'InProgress',
										}"
									>
										{{
											resp.status === "Graded"
												? "Dinilai"
												: resp.status === "Submitted"
													? "Menunggu Koreksi"
													: "Berlangsung"
										}}
									</span>
									<span
										v-if="showResultConfig && resp.status === 'Graded'"
										class="text-xs font-bold text-emerald-600"
									>
										Nilai: {{ resp.score ?? "-" }}
									</span>
								</div>
							</div>
							<router-link
								v-if="showResultConfig && resp.status === 'Graded'"
								:to="`/result/${resp.id}`"
								class="w-full sm:w-auto text-center flex-shrink-0 text-xs px-3 py-1.5 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-500 transition-colors"
							>
								Lihat Hasil
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Footer -->
		<footer class="py-4 px-4 text-center text-white/20 text-xs break-words">
			&copy; {{ new Date().getFullYear() }} {{ appName }} &mdash;
			{{ appSubtitle }}
		</footer>

		<!-- Pre-Exam Briefing Modal -->
		<Teleport to="body">
			<div
				v-if="showBriefing && briefingExam"
				class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
				@click.self="closeBriefing"
			>
				<div
					class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
				>
					<!-- Header -->
					<div class="bg-blue-600 px-6 py-4 text-white">
						<p
							class="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1"
						>
							Persiapan Ujian
						</p>
						<h2 class="text-lg font-bold leading-tight">
							{{ briefingExam.subject }}
						</h2>
						<div class="flex items-center gap-4 mt-2 text-sm text-blue-200">
							<span>⏱ {{ briefingExam.duration }} menit</span>
							<span>📚 {{ briefingExam.kelas }}</span>
						</div>
					</div>
					<!-- Rules -->
					<div
						class="px-6 py-5 space-y-3 text-sm text-slate-700 dark:text-slate-200"
					>
						<p class="font-semibold text-slate-900 dark:text-slate-100 mb-1">
							Peraturan Ujian:
						</p>
						<ul class="space-y-2">
							<li class="flex gap-2">
								<span class="text-blue-500 mt-0.5">•</span> Pastikan koneksi
								internet stabil dan perangkat tidak berpindah jaringan selama
								ujian.
							</li>
							<li class="flex gap-2">
								<span class="text-orange-500 mt-0.5">•</span>
								<span
									><b
										>Dilarang berpindah tab, membuka aplikasi lain, atau
										meminimize browser</b
									>
									saat ujian berlangsung.</span
								>
							</li>
							<li class="flex gap-2">
								<span class="text-red-500 mt-0.5">•</span> Jika terjadi
								<b>{{ maxViolations }} kali pelanggaran</b>, ujian langsung
								ditutup dan jawaban dikumpulkan otomatis.
							</li>
							<li class="flex gap-2">
								<span class="text-green-500 mt-0.5">•</span> Jawaban disimpan
								automatis setiap 15 detik, namun tetap cek kembali sebelum
								mengumpulkan.
							</li>
							<li class="flex gap-2">
								<span class="text-slate-400 mt-0.5">•</span> Waktu ujian terus
								berjalan. Saat waktu habis, sistem otomatis mengumpulkan jawaban
								Anda.
							</li>
						</ul>
					</div>
					<!-- Actions -->
					<div class="px-6 pb-5 flex flex-col sm:flex-row gap-3">
						<button
							@click="closeBriefing"
							class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
						>
							Batal
						</button>
						<button
							@click="confirmStart"
							class="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors text-sm flex items-center justify-center gap-2"
						>
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
								/>
							</svg>
							Saya Siap, Mulai!
						</button>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useDarkMode } from "@/composables/useDarkMode.js";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const router = useRouter();
const auth = useAuthStore();
const { isDark, toggle: toggleDark } = useDarkMode();

// App config
const appName = ref("CBT RSMS");
const appSubtitle = ref("Sistem Ujian Online");
const appLogo = ref("");
const maxViolations = ref(2);

const exams = ref([]);
const loading = ref(true);
const loadingPin = ref(false);
const pin = ref("");

// Briefing modal
const briefingExam = ref(null);
const showBriefing = ref(false);

function openBriefing(exam) {
	briefingExam.value = exam;
	showBriefing.value = true;
}
function closeBriefing() {
	showBriefing.value = false;
	briefingExam.value = null;
}
function confirmStart() {
	if (!briefingExam.value) return;
	const id = briefingExam.value.id;
	closeBriefing();
	router.push(`/exam/${id}`);
}

function formatDateTime(v) {
	if (!v) return "-";
	const d = new Date(v);
	if (Number.isNaN(d.getTime())) return "-";
	return d.toLocaleString("id-ID", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}

// Riwayat ujian
const myResponses = ref([]);
const loadingHistory = ref(false);
const showResultConfig = ref(true);

onMounted(async () => {
	// Load app config
	try {
		const cfgRes = await api.get("/config");
		const cfg = cfgRes.data.data || {};
		if (cfg.app_name) appName.value = cfg.app_name;
		if (cfg.app_subtitle) appSubtitle.value = cfg.app_subtitle;
		if (cfg.logo_url || cfg.app_logo)
			appLogo.value = cfg.logo_url || cfg.app_logo;
		if (cfg.max_violations)
			maxViolations.value = parseInt(cfg.max_violations) || 2;
	} catch {
		/* ignore */
	}

	// Jika ada PIN dari query string (dari login redirect)
	const urlPin = new URLSearchParams(window.location.search).get("pin");
	if (urlPin) {
		pin.value = urlPin;
		await joinByPin();
		return;
	}
	await Promise.all([loadExams(), loadHistory()]);
});

async function loadExams() {
	loading.value = true;
	try {
		const kelas = auth.user?.kelas || "";
		const res = await api.get("/exams", {
			params: { status: "Aktif", kelas, limit: 20 },
		});
		exams.value = res.data.data || [];
	} catch {
		exams.value = [];
	} finally {
		loading.value = false;
	}
}

async function loadHistory() {
	loadingHistory.value = true;
	try {
		const res = await api.get("/responses/my");
		myResponses.value = res.data.data || [];
		showResultConfig.value = res.data.showResult !== false;
	} catch {
		myResponses.value = [];
	} finally {
		loadingHistory.value = false;
	}
}

async function joinByPin() {
	if (!pin.value.trim()) return;
	loadingPin.value = true;
	try {
		const res = await api.post("/exams/validate-pin", {
			pin: pin.value.trim(),
		});
		const exam = res.data.data;
		if (res.data.viewResultsOnly) {
			// Cari response siswa untuk ujian ini
			let responseId = null;
			// Reload history dulu biar fresh
			await loadHistory();
			const found = myResponses.value.find((r) => r.examId === exam.id);
			if (found) responseId = found.id;

			if (responseId) {
				router.push(`/result/${responseId}`);
			} else {
				Swal.fire({
					icon: "info",
					title: "Ujian Selesai",
					text: "Ujian ini sudah selesai namun hasil belum tersedia.",
					confirmButtonColor: "#2563eb",
				});
			}
			return;
		}
		openBriefing(exam);
	} catch (err) {
		const msg =
			err.response?.data?.message || "PIN tidak valid atau tidak ditemukan.";
		Swal.fire({
			icon: "error",
			title: "PIN Salah",
			text: msg,
			confirmButtonColor: "#2563eb",
		});
	} finally {
		loadingPin.value = false;
	}
}

async function startExam(exam) {
	router.push(`/exam/${exam.id}`);
}

async function handleLogout() {
	await auth.logout();
	router.push("/");
}
</script>
