<template>
	<div
		class="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-start justify-center p-3 sm:p-4 pt-8 sm:pt-10 overflow-x-hidden"
	>
		<div class="w-full max-w-3xl">
			<!-- Loading -->
			<div v-if="loading" class="bg-white rounded-2xl shadow p-10 text-center">
				<div
					class="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-3"
				></div>
				<p class="text-slate-400">Memuat hasil ujian...</p>
			</div>

			<div v-else-if="result" class="space-y-6 pb-10">
				<!-- CASE: showResult = false → hanya tampilkan pesan selesai, tanpa nilai -->
				<div
					v-if="!result.showResult"
					class="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center fade-in"
				>
					<div
						class="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100"
					>
						<svg
							class="w-10 h-10 text-emerald-500"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h1 class="text-2xl font-bold text-slate-800 mb-2">
						Ujian Berhasil Dikumpulkan!
					</h1>
					<p class="text-slate-600 font-medium mb-1">
						{{ result.exam?.subject }}
					</p>
					<p class="text-slate-400 text-sm mb-6">
						Nilai dan detail jawaban akan diumumkan oleh guru/admin.<br />Terima
						kasih sudah mengerjakan ujian dengan jujur.
					</p>
					<div
						class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 mb-6 max-w-xs mx-auto"
					>
						<div class="flex justify-between mb-1">
							<span class="text-slate-400">Peserta</span>
							<span class="font-semibold">{{ result.user?.nama }}</span>
						</div>
						<div class="flex justify-between mb-1">
							<span class="text-slate-400">Kelas</span>
							<span class="font-semibold">{{ result.user?.kelas }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-slate-400">Dikumpulkan</span>
							<span class="font-semibold">{{
								fmtDate(result.submitTime)
							}}</span>
						</div>
					</div>
					<router-link
						to="/siswa"
						class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-md"
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
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
						Kembali ke Halaman Siswa
					</router-link>
				</div>

				<!-- CASE: showResult = true → tampilkan nilai dan detail -->
				<template v-else>
					<!-- Score Card -->
					<div
						class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center fade-in"
					>
						<p
							class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
						>
							Hasil Ujian
						</p>
						<h1 class="text-xl font-bold text-slate-800 mb-1">
							{{ result.exam?.subject }}
						</h1>
						<p class="text-slate-500 text-sm mb-6">
							{{ result.user?.nama }} · {{ result.user?.kelas }}
						</p>

						<!-- Score Circle -->
						<div class="inline-flex flex-col items-center mb-5">
							<div
								class="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black shadow-xl mb-2"
								:class="scoreCircleClass"
							>
								{{ result.score ?? "–" }}
							</div>
							<p class="text-slate-400 text-xs">dari 100</p>
						</div>

						<div class="mt-2">
							<span class="badge text-sm px-4 py-1.5" :class="statusBadge">{{
								statusLabel
							}}</span>
						</div>

						<div
							v-if="result.status === 'Submitted'"
							class="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3 text-orange-700 text-sm"
						>
							Soal esai belum dinilai. Nilai final tersedia setelah guru
							menyelesaikan penilaian.
						</div>

						<!-- Meta -->
						<div
							class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-500"
						>
							<div class="bg-slate-50 rounded-xl p-3">
								<p class="font-semibold text-slate-700 text-xs mb-1">Mulai</p>
								<p class="text-xs">{{ fmtDate(result.startTime) }}</p>
							</div>
							<div class="bg-slate-50 rounded-xl p-3">
								<p class="font-semibold text-slate-700 text-xs mb-1">Selesai</p>
								<p class="text-xs">{{ fmtDate(result.submitTime) }}</p>
							</div>
							<div class="bg-slate-50 rounded-xl p-3">
								<p class="font-semibold text-slate-700 text-xs mb-1">Durasi</p>
								<p class="text-xs">{{ duration }}</p>
							</div>
						</div>
					</div>

					<!-- Detail Answers -->
					<div
						v-if="result.questions?.length > 0"
						class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden fade-in"
					>
						<div
							class="px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2"
						>
							<h2 class="font-bold text-slate-700 text-sm">
								Detail Jawaban Per Soal
							</h2>
							<div class="flex gap-2 text-xs font-semibold flex-wrap">
								<span
									class="px-2 py-0.5 rounded-full bg-green-100 text-green-700"
								>
									✓ {{ correctCount }} Benar
								</span>
								<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700">
									✗ {{ wrongCount }} Salah
								</span>
								<span
									v-if="essayCount > 0"
									class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700"
								>
									{{ essayCount }} Esai
								</span>
							</div>
						</div>

						<div class="divide-y divide-slate-100">
							<div v-for="(q, i) in result.questions" :key="q.id" class="p-5">
								<div class="flex items-start gap-3">
									<div class="flex-shrink-0 mt-0.5">
										<span
											class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
											:class="
												getQuestionStatus(q, i) === 'correct'
													? 'bg-green-100 text-green-700'
													: getQuestionStatus(q, i) === 'wrong'
														? 'bg-red-100 text-red-700'
														: 'bg-slate-100 text-slate-500'
											"
										>
											{{ i + 1 }}
										</span>
									</div>
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2 mb-2">
											<span class="badge text-xs" :class="typeBadge(q.type)">{{
												q.type
											}}</span>
										</div>
										<div
											class="prose prose-sm max-w-none text-slate-700 mb-3"
											v-html="sanitize(q.content)"
										></div>

										<!-- Non-esai: jawaban + kunci -->
										<div
											v-if="q.type !== 'Esai'"
											class="flex flex-wrap gap-2 text-sm"
										>
											<span
												class="px-3 py-1.5 rounded-lg border text-xs"
												:class="
													getQuestionStatus(q, i) === 'correct'
														? 'bg-green-50 border-green-200 text-green-700'
														: 'bg-red-50 border-red-200 text-red-700'
												"
											>
												Jawaban Anda:
												<b>{{
													formatStudentAnswer(q, result.answersJson?.[q.id])
												}}</b>
											</span>
											<span
												class="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs"
											>
												Kunci: <b>{{ formatCorrectAnswer(q) }}</b>
											</span>
										</div>

										<!-- Esai -->
										<div
											v-else
											class="text-sm bg-slate-50 rounded-lg p-3 text-slate-600 border border-slate-200"
										>
											<p class="text-xs font-semibold text-slate-400 mb-1">
												Jawaban Esai:
											</p>
											<p>
												{{ result.answersJson?.[q.id] || "(tidak dijawab)" }}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Actions -->
					<div class="flex flex-col sm:flex-row gap-3 justify-center">
						<router-link
							to="/siswa"
							class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-md"
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
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
							Kembali ke Halaman Siswa
						</router-link>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DOMPurify from "dompurify";
import api from "@/services/api.js";

const route = useRoute();
const result = ref(null);
const loading = ref(true);

const sanitize = (html) => DOMPurify.sanitize(html || "");
const fmtDate = (d) =>
	d
		? new Date(d).toLocaleString("id-ID", {
				day: "2-digit",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		: "-";

const scoreCircleClass = computed(() => {
	const s = result.value?.score;
	if (s == null) return "bg-slate-200 text-slate-500";
	if (s >= 75)
		return "bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-emerald-200";
	if (s >= 60)
		return "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-amber-200";
	return "bg-gradient-to-br from-red-400 to-rose-600 text-white shadow-red-200";
});

const statusBadge = computed(
	() =>
		({
			Submitted: "bg-orange-100 text-orange-700",
			Graded: "bg-green-100 text-green-700",
			InProgress: "bg-yellow-100 text-yellow-700",
		})[result.value?.status] || "bg-slate-100 text-slate-500",
);

const statusLabel = computed(
	() =>
		({
			Submitted: "Menunggu Penilaian Esai",
			Graded: "Sudah Dinilai",
			InProgress: "Belum Selesai",
		})[result.value?.status] || "-",
);

const duration = computed(() => {
	if (!result.value?.startTime || !result.value?.submitTime) return "-";
	const ms =
		new Date(result.value.submitTime) - new Date(result.value.startTime);
	const m = Math.floor(ms / 60000);
	const s = Math.floor((ms % 60000) / 1000);
	return `${m} menit ${s} detik`;
});

const typeBadge = (t) =>
	({
		PG: "bg-blue-100 text-blue-700",
		BS: "bg-purple-100 text-purple-700",
		JODOH: "bg-orange-100 text-orange-700",
		Esai: "bg-slate-100 text-slate-600",
	})[t] || "bg-slate-100 text-slate-500";

const correctCount = computed(() => {
	if (!result.value?.questions) return 0;
	return result.value.questions.filter(
		(q, i) => getQuestionStatus(q, i) === "correct",
	).length;
});
const wrongCount = computed(() => {
	if (!result.value?.questions) return 0;
	return result.value.questions.filter(
		(q, i) => getQuestionStatus(q, i) === "wrong",
	).length;
});
const essayCount = computed(
	() => result.value?.questions?.filter((q) => q.type === "Esai").length || 0,
);

function getQuestionStatus(q, i) {
	if (q.type === "Esai") return "essay";
	const ans = result.value?.answersJson?.[q.id];
	if (ans === undefined || ans === null || ans === "") return "wrong";

	if (q.type === "PG") {
		// correctAnswer stored as option index (e.g. "0"); student answer is option text
		let key = "";
		const correctIdx = parseInt(q.correctAnswer);
		if (
			!isNaN(correctIdx) &&
			Array.isArray(q.options) &&
			q.options[correctIdx] !== undefined
		) {
			key = String(q.options[correctIdx]).toLowerCase();
		} else {
			key = String(q.correctAnswer || "").toLowerCase();
		}
		return key !== "" && String(ans).toLowerCase() === key
			? "correct"
			: "wrong";
	}
	if (q.type === "BS") {
		const key = q.correctAnswer || {};
		const stmtCount = Array.isArray(q.options) ? q.options.length : 0;
		for (let i = 0; i < stmtCount; i++) {
			if (
				String(ans[i] || "").toLowerCase() !==
				String(key[i] || "").toLowerCase()
			)
				return "wrong";
		}
		return "correct";
	}
	if (q.type === "JODOH") {
		const pairs = (q.options || []).filter((p) => p.q);
		if (!ans || typeof ans !== "object") return "wrong";
		for (const pair of pairs) {
			if (String(ans[pair.q] || "") !== String(pair.a)) return "wrong";
		}
		return "correct";
	}
	return "wrong";
}

// Format jawaban siswa untuk display
function formatStudentAnswer(q, ans) {
	if (ans === undefined || ans === null || ans === "") return "(tidak dijawab)";
	if (q.type === "PG") {
		const idx = q.options?.indexOf(ans);
		if (idx !== undefined && idx !== -1)
			return `${String.fromCharCode(65 + idx)}. ${ans}`;
		return String(ans);
	}
	if (q.type === "BS") {
		if (typeof ans !== "object") return String(ans);
		return Object.entries(ans)
			.map(([k, v]) => `${parseInt(k) + 1}: ${v}`)
			.join(", ");
	}
	if (q.type === "JODOH") {
		if (typeof ans !== "object") return "(tidak dijawab)";
		return (q.options || [])
			.filter((p) => p.q)
			.map((p) => `${p.q} → ${ans[p.q] || "?"}`)
			.join(" | ");
	}
	return String(ans);
}

// Format kunci jawaban yang benar
function formatCorrectAnswer(q) {
	if (q.type === "PG") {
		// correctAnswer is option index (e.g. "0")
		const correctIdx = parseInt(q.correctAnswer);
		if (
			!isNaN(correctIdx) &&
			Array.isArray(q.options) &&
			q.options[correctIdx] !== undefined
		) {
			return `${String.fromCharCode(65 + correctIdx)}. ${q.options[correctIdx]}`;
		}
		return String(q.correctAnswer || "-");
	}
	if (q.type === "BS") {
		const key = q.correctAnswer || {};
		if (typeof key !== "object") return String(key);
		return Object.entries(key)
			.map(([k, v]) => `${parseInt(k) + 1}: ${v}`)
			.join(", ");
	}
	if (q.type === "JODOH") {
		return (q.options || [])
			.filter((p) => p.q)
			.map((p) => `${p.q} → ${p.a}`)
			.join(" | ");
	}
	return String(q.correctAnswer || "-");
}

onMounted(async () => {
	try {
		const res = await api.get(`/responses/${route.params.responseId}`);
		result.value = res.data.data;
	} catch (_) {
	} finally {
		loading.value = false;
	}
});
</script>
