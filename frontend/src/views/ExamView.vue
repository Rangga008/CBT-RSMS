<template>
	<div
		class="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col overflow-x-hidden"
	>
		<!-- Loading state -->
		<div v-if="loading" class="flex-1 flex items-center justify-center">
			<div class="text-center">
				<div class="animate-spin text-4xl mb-4">⏳</div>
				<p class="text-slate-600">Memuat ujian...</p>
			</div>
		</div>

		<!-- Error state -->
		<div v-else-if="error" class="flex-1 flex items-center justify-center p-4">
			<div class="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
				<p class="text-5xl mb-4">❌</p>
				<h2 class="text-xl font-bold text-slate-800 mb-2">
					Tidak Dapat Memuat Ujian
				</h2>
				<p class="text-slate-500 mb-6">{{ error }}</p>
				<router-link to="/dashboard" class="btn-primary"
					>Kembali ke Dashboard</router-link
				>
			</div>
		</div>

		<!-- Exam Session -->
		<template v-else-if="exam && questions.length">
			<!-- Header -->
			<header class="exam-header sticky top-0 z-30">
				<div
					class="flex items-center lg:items-center justify-between flex-wrap lg:flex-nowrap max-w-6xl mx-auto px-4 py-3 gap-2 sm:gap-3"
				>
					<div class="min-w-0 flex-1">
						<h1 class="text-white font-bold text-base truncate">
							{{ exam.subject }}
						</h1>
						<p class="text-blue-200 text-xs">
							{{ auth.user?.nama }} · {{ auth.user?.userId }}
						</p>
					</div>
					<!-- Timer -->
					<div
						class="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-xl flex-shrink-0 whitespace-nowrap"
					>
						<span class="text-white text-sm">⏱️</span>
						<span
							class="text-white font-mono font-bold text-lg"
							:class="timerColor"
							>{{ timerDisplay }}</span
						>
					</div>
					<!-- Font Size Toggle -->
					<button
						@click="cycleFontSize"
						title="Ubah ukuran teks"
						class="bg-white/20 text-white px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-white/30 transition flex-shrink-0 hidden sm:block"
					>
						A{{ fontSize === "sm" ? "+" : fontSize === "lg" ? "-" : "±" }}
					</button>
					<!-- Dark Mode Toggle -->
					<button
						@click="toggleDark"
						title="Mode gelap"
						class="bg-white/20 text-white p-1.5 rounded-lg hover:bg-white/30 transition flex-shrink-0"
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
					<!-- Submit Button -->
					<button
						@click="confirmSubmit"
						:disabled="submitting"
						class="bg-white text-blue-700 font-bold px-3 sm:px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0 text-sm shadow"
					>
						{{ submitting ? "..." : "Kumpulkan" }}
					</button>
				</div>
			</header>

			<!-- Main Content -->
			<div class="flex-1 flex max-w-6xl mx-auto w-full gap-4 p-4 pb-20 lg:pb-4">
				<!-- Question Navigation Sidebar -->
				<aside class="hidden lg:block w-56 flex-shrink-0">
					<div
						class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24"
					>
						<p
							class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3"
						>
							Navigasi Soal
						</p>
						<div class="grid grid-cols-5 gap-1.5 mb-4">
							<button
								v-for="(q, i) in questions"
								:key="q.id"
								@click="currentIndex = i"
								class="w-8 h-8 text-xs font-medium rounded-lg border transition-colors"
								:class="navButtonClass(i, q)"
							>
								{{ i + 1 }}
							</button>
						</div>
						<!-- Legend -->
						<div class="space-y-1 text-xs text-slate-500">
							<div class="flex items-center gap-2">
								<span class="w-4 h-4 rounded bg-blue-600"></span> Aktif
							</div>
							<div class="flex items-center gap-2">
								<span
									class="w-4 h-4 rounded bg-green-100 border border-green-300"
								></span>
								Dijawab
							</div>
							<div class="flex items-center gap-2">
								<span
									class="w-4 h-4 rounded bg-slate-100 border border-slate-200"
								></span>
								Belum
							</div>
						</div>
						<!-- Progress -->
						<div class="mt-4">
							<div class="flex justify-between text-xs text-slate-500 mb-1">
								<span>Progress</span>
								<span>{{ answeredCount }}/{{ questions.length }}</span>
							</div>
							<div class="w-full bg-slate-100 rounded-full h-2">
								<div
									class="bg-blue-600 h-2 rounded-full transition-all"
									:style="`width: ${progressPct}%`"
								></div>
							</div>
						</div>
					</div>
				</aside>

				<!-- Question Card -->
				<main class="flex-1 min-w-0">
					<div
						class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6"
					>
						<!-- Question Header -->
						<div class="flex items-center gap-3 mb-4">
							<span class="text-blue-600 font-bold text-lg">{{
								currentIndex + 1
							}}</span>
							<span class="badge" :class="typeBadge(currentQuestion?.type)">{{
								currentQuestion?.type
							}}</span>
						</div>

						<!-- Content -->
						<div
							class="text-slate-800 dark:text-slate-100 leading-relaxed mb-6 prose prose-sm max-w-none"
							:class="fontSizeClass"
							v-html="sanitize(currentQuestion?.content)"
						></div>

						<!-- Image -->
						<img
							v-if="currentQuestion?.imageUrl"
							:src="currentQuestion.imageUrl"
							alt="Gambar soal"
							class="w-full max-w-sm rounded-xl border mb-6 shadow-sm"
							loading="lazy"
						/>

						<!-- PG Options -->
						<div v-if="currentQuestion?.type === 'PG'" class="space-y-3">
							<label
								v-for="(opt, oi) in currentQuestion.options"
								:key="oi"
								class="option-label"
								:class="{ selected: answers[currentQuestion.id] === opt }"
							>
								<input
									type="radio"
									:name="`q-${currentQuestion.id}`"
									:value="opt"
									v-model="answers[currentQuestion.id]"
									@change="onAnswer"
									class="accent-blue-600"
								/>
								<span class="font-medium text-blue-600 mr-1"
									>{{ String.fromCharCode(65 + oi) }}.</span
								>
								<span>{{ opt }}</span>
							</label>
						</div>

						<!-- PG_KOMPLEKS Options (multiple select) -->
						<div
							v-if="currentQuestion?.type === 'PG_KOMPLEKS'"
							class="space-y-3"
						>
							<p
								class="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2 mb-2"
							>
								<b>Pilih satu atau lebih jawaban yang benar.</b>
							</p>
							<label
								v-for="(opt, oi) in currentQuestion.options"
								:key="oi"
								class="option-label"
								:class="{ selected: isPGKSelected(opt) }"
							>
								<input
									type="checkbox"
									:value="opt"
									:checked="isPGKSelected(opt)"
									@change="togglePGK(opt)"
									class="accent-indigo-600"
								/>
								<span class="font-medium text-indigo-600 mr-1"
									>{{ String.fromCharCode(65 + oi) }}.</span
								>
								<span>{{ opt }}</span>
							</label>
						</div>

						<!-- BS Options (Benar/Salah) -->
						<div v-if="currentQuestion?.type === 'BS'" class="space-y-3">
							<div
								v-for="(stmt, si) in currentQuestion.options"
								:key="si"
								class="bg-slate-50 rounded-xl p-4 border border-slate-200"
							>
								<p class="text-slate-700 text-sm mb-3">
									<b>{{ si + 1 }}.</b> {{ stmt }}
								</p>
								<div class="flex flex-wrap gap-2">
									<label
										class="flex-1 min-w-[120px] flex items-center justify-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-colors"
										:class="
											getBS(si) === 'Benar'
												? 'bg-green-100 border-green-400 text-green-700'
												: 'border-slate-200 hover:border-green-200'
										"
									>
										<input
											type="radio"
											:name="`bs-${currentQuestion.id}-${si}`"
											value="Benar"
											:checked="getBS(si) === 'Benar'"
											@change="setBS(si, 'Benar')"
											class="accent-green-600"
										/>
										✓ Benar
									</label>
									<label
										class="flex-1 min-w-[120px] flex items-center justify-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-colors"
										:class="
											getBS(si) === 'Salah'
												? 'bg-red-100 border-red-400 text-red-700'
												: 'border-slate-200 hover:border-red-200'
										"
									>
										<input
											type="radio"
											:name="`bs-${currentQuestion.id}-${si}`"
											value="Salah"
											:checked="getBS(si) === 'Salah'"
											@change="setBS(si, 'Salah')"
											class="accent-red-600"
										/>
										✕ Salah
									</label>
								</div>
							</div>
						</div>

						<!-- JODOH (Matching) -->
						<div v-if="currentQuestion?.type === 'JODOH'" class="space-y-1">
							<p class="text-sm text-slate-500 italic mb-4">
								Hubungkan setiap item di kolom kiri dengan pasangan yang tepat.
							</p>
							<div class="overflow-hidden rounded-xl border border-slate-200">
								<div
									class="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 border-b border-slate-200"
								>
									<div
										class="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
									>
										Pernyataan
									</div>
									<div
										class="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
									>
										Pasangan
									</div>
								</div>
								<div
									v-for="pair in currentQuestion.options.filter((p) => p.q)"
									:key="pair.q"
									class="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-100 last:border-b-0"
								>
									<div
										class="px-4 py-3 flex items-center sm:border-r border-slate-100"
									>
										<span class="text-slate-800 text-sm">{{ pair.q }}</span>
									</div>
									<div class="px-3 py-2 flex items-center">
										<select
											:value="getJodoh(pair.q)"
											@change="(e) => setJodoh(pair.q, e.target.value)"
											class="w-full rounded-lg border text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
											:class="
												getJodoh(pair.q)
													? 'border-blue-300 bg-blue-50 text-blue-800'
													: 'border-slate-200 text-slate-500'
											"
										>
											<option value="">— Pilih —</option>
											<option
												v-for="opt in shuffledJodohOptions[currentQuestion.id]"
												:key="opt"
												:value="opt"
											>
												{{ opt }}
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<!-- Esai -->
						<div v-if="currentQuestion?.type === 'Esai'">
							<textarea
								v-model="answers[currentQuestion.id]"
								@input="onAnswer"
								class="input-field min-h-32 resize-y"
								placeholder="Tulis jawaban Anda di sini..."
							></textarea>
						</div>

						<!-- Navigation Buttons -->
						<div
							class="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mt-8"
						>
							<button
								@click="currentIndex--"
								:disabled="currentIndex === 0"
								class="btn-outline"
								:class="
									currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
								"
							>
								← Sebelumnya
							</button>
							<span class="text-slate-400 text-sm self-center"
								>{{ currentIndex + 1 }} / {{ questions.length }}</span
							>
							<button
								v-if="currentIndex < questions.length - 1"
								@click="currentIndex++"
								class="btn-primary"
							>
								Selanjutnya →
							</button>
							<button
								v-else
								@click="confirmSubmit"
								class="bg-green-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-500 transition-colors"
							>
								Kumpulkan ✓
							</button>
						</div>
					</div>
				</main>
			</div>

			<!-- Mobile bottom navigation — single bar with popup -->
			<div
				class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-2 z-20 shadow-lg"
			>
				<div class="flex items-center gap-3">
					<button
						@click="showNavPopup = true"
						class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm"
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
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
						Soal {{ currentIndex + 1 }}/{{ questions.length }}
					</button>
					<span
						class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 py-2 rounded-xl"
					>
						{{ answeredCount }}/{{ questions.length }} dijawab
					</span>
				</div>
			</div>

			<!-- Mobile Nav Popup (bottom sheet) -->
			<Teleport to="body">
				<div
					v-if="showNavPopup"
					class="lg:hidden fixed inset-0 z-50 flex flex-col justify-end"
					@click.self="showNavPopup = false"
				>
					<div
						class="absolute inset-0 bg-black/40 backdrop-blur-sm"
						@click="showNavPopup = false"
					></div>
					<div
						class="relative bg-white dark:bg-slate-800 rounded-t-2xl p-4 shadow-2xl max-h-[70vh] flex flex-col"
					>
						<div class="flex items-center justify-between mb-3">
							<h3 class="font-semibold text-slate-700 dark:text-slate-200">
								Navigasi Soal
							</h3>
							<button
								@click="showNavPopup = false"
								class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
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
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div class="grid grid-cols-7 gap-1.5 overflow-y-auto flex-1">
							<button
								v-for="(q, i) in questions"
								:key="q.id"
								@click="
									currentIndex = i;
									showNavPopup = false;
								"
								class="w-9 h-9 text-xs font-medium rounded-lg border transition-colors"
								:class="navButtonClass(i, q)"
							>
								{{ i + 1 }}
							</button>
						</div>
						<div
							class="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400"
						>
							<div class="flex items-center gap-1.5">
								<span class="w-3 h-3 rounded bg-blue-600 inline-block"></span>
								Aktif
							</div>
							<div class="flex items-center gap-1.5">
								<span
									class="w-3 h-3 rounded bg-green-100 border border-green-300 inline-block"
								></span>
								Dijawab
							</div>
							<div class="flex items-center gap-1.5">
								<span
									class="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block dark:bg-slate-700 dark:border-slate-600"
								></span>
								Belum
							</div>
						</div>
					</div>
				</div>
			</Teleport>
		</template>

		<!-- Violation Warning Overlay -->
		<div
			v-if="showViolationOverlay"
			class="fixed inset-0 bg-red-900/95 z-[100] flex items-center justify-center text-white p-6 text-center backdrop-blur-md"
		>
			<div
				class="max-w-lg w-full border-4 border-yellow-400 p-8 rounded-2xl bg-red-800 shadow-2xl"
			>
				<div
					class="w-20 h-20 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-5"
				>
					<svg
						class="w-12 h-12 text-yellow-400"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
						/>
					</svg>
				</div>
				<h2 class="text-4xl font-extrabold mb-4 uppercase tracking-widest">
					PERINGATAN!
				</h2>
				<p class="text-xl font-bold mb-2">
					DILARANG BERALIH TAB / MEMINIMIZE LAYAR
				</p>
				<p class="text-red-200 mb-5 text-sm">
					Sistem mendeteksi aktivitas mencurigakan. Pelanggaran:
					<b class="text-yellow-300"
						>{{ violationCount }} / {{ maxViolations }}</b
					>
				</p>
				<div class="bg-black/30 p-4 rounded-lg mb-6 border border-white/20">
					<p class="text-yellow-300 font-bold uppercase text-base">
						JIKA DILAKUKAN SEKALI LAGI,<br />UJIAN OTOMATIS DIKUMPULKAN.
					</p>
				</div>
				<button
					@click="dismissViolation"
					class="w-full bg-yellow-400 text-red-900 px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-yellow-300 transition shadow-lg"
				>
					SAYA PAHAM &amp; KEMBALI UJIAN
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useDarkMode } from "@/composables/useDarkMode.js";
import DOMPurify from "dompurify";
import api from "@/services/api.js";
import Swal from "sweetalert2";
import { useMathJax } from "@/composables/useMathJax.js";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { typesetMath } = useMathJax();
const { isDark, toggle: toggleDark } = useDarkMode();

const examId = computed(() => route.params.examId);
const exam = ref(null);
const questions = ref([]);
const answers = ref({});
const loading = ref(true);
const error = ref(null);
const submitting = ref(false);
const currentIndex = ref(0);
const timeLeft = ref(0);
const violationCount = ref(0);
const maxViolations = ref(2);
const showViolationOverlay = ref(false);
const showNavPopup = ref(false);

// Font size
const fontSize = ref(localStorage.getItem("cbt_fontsize") || "md");
const fontSizeClass = computed(
	() =>
		({ sm: "text-sm", md: "text-base", lg: "text-lg" })[fontSize.value] ||
		"text-base",
);
function cycleFontSize() {
	const sizes = ["sm", "md", "lg"];
	const idx = sizes.indexOf(fontSize.value);
	fontSize.value = sizes[(idx + 1) % sizes.length];
	localStorage.setItem("cbt_fontsize", fontSize.value);
}

// Sanitize HTML content
const sanitize = (html) => DOMPurify.sanitize(html || "");

const currentQuestion = computed(() => questions.value[currentIndex.value]);

// Timer display
const timerDisplay = computed(() => {
	const m = Math.floor(timeLeft.value / 60);
	const s = timeLeft.value % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
});

const timerColor = computed(() => {
	if (timeLeft.value <= 300) return "text-red-300 animate-pulse";
	if (timeLeft.value <= 600) return "text-yellow-200";
	return "text-white";
});

const answeredCount = computed(() => {
	return questions.value.filter((q) => {
		if (q.type === "JODOH") {
			const ans = answers.value[q.id];
			const realPairs = (q.options || []).filter((p) => p.q);
			return (
				typeof ans === "object" &&
				ans !== null &&
				realPairs.length > 0 &&
				realPairs.every((pair) => ans[pair.q])
			);
		}
		if (q.type === "PG_KOMPLEKS") {
			const ans = answers.value[q.id];
			return Array.isArray(ans) && ans.length > 0;
		}
		const a = answers.value[q.id];
		return a !== undefined && a !== "" && a !== null;
	}).length;
});

const progressPct = computed(() =>
	questions.value.length
		? Math.round((answeredCount.value / questions.value.length) * 100)
		: 0,
);

const typeBadge = (t) =>
	({
		PG: "bg-blue-100 text-blue-700",
		PG_KOMPLEKS: "bg-indigo-100 text-indigo-700",
		BS: "bg-purple-100 text-purple-700",
		JODOH: "bg-orange-100 text-orange-700",
		Esai: "bg-slate-100 text-slate-600",
	})[t] || "bg-slate-100 text-slate-500";

function navButtonClass(i, q) {
	const realJodohPairs =
		q.type === "JODOH" ? (q.options || []).filter((p) => p.q) : [];
	const isAnswered =
		q.type === "JODOH"
			? typeof answers.value[q.id] === "object" &&
				answers.value[q.id] !== null &&
				realJodohPairs.length > 0 &&
				realJodohPairs.every((pair) => answers.value[q.id][pair.q])
			: q.type === "PG_KOMPLEKS"
				? Array.isArray(answers.value[q.id]) && answers.value[q.id].length > 0
				: answers.value[q.id] !== undefined &&
					answers.value[q.id] !== "" &&
					answers.value[q.id] !== null;
	if (i === currentIndex.value) return "bg-blue-600 text-white border-blue-600";
	if (isAnswered) return "bg-green-100 border-green-300 text-green-700";
	return "bg-slate-100 border-slate-200 text-slate-500 hover:border-blue-200";
}

// BS helper
function getBS(si) {
	const a = answers.value[currentQuestion.value?.id];
	return a?.[si];
}
function setBS(si, val) {
	const id = currentQuestion.value?.id;
	if (!id) return;
	answers.value[id] = { ...(answers.value[id] || {}), [si]: val };
	onAnswer();
}

// PG_KOMPLEKS helper
function isPGKSelected(opt) {
	const id = currentQuestion.value?.id;
	const arr = answers.value[id];
	return Array.isArray(arr) && arr.includes(opt);
}
function togglePGK(opt) {
	const id = currentQuestion.value?.id;
	if (!id) return;
	const arr = Array.isArray(answers.value[id]) ? [...answers.value[id]] : [];
	const idx = arr.indexOf(opt);
	if (idx === -1) arr.push(opt);
	else arr.splice(idx, 1);
	answers.value[id] = arr;
	onAnswer();
}

// JODOH helper
const shuffledJodohOptions = ref({});

function getJodoh(pairQ) {
	const ans = answers.value[currentQuestion.value?.id];
	return typeof ans === "object" && ans !== null ? (ans[pairQ] ?? "") : "";
}

function setJodoh(pairQ, val) {
	const id = currentQuestion.value?.id;
	if (!id) return;
	const current =
		typeof answers.value[id] === "object" ? { ...answers.value[id] } : {};
	answers.value[id] = { ...current, [pairQ]: val };
	onAnswer();
}

// Auto-save every 15 seconds
let syncInterval;
function onAnswer() {
	// immediate sync deferral handled by interval
}

async function syncAnswers() {
	if (!exam.value) return;
	try {
		await api.post("/responses/sync", {
			examId: examId.value,
			answers: answers.value,
			violationCount: violationCount.value,
		});
	} catch (_) {}
}

// Timer countdown
let timerInterval;
function startTimer() {
	timerInterval = setInterval(async () => {
		timeLeft.value--;
		if (timeLeft.value <= 0) {
			clearInterval(timerInterval);
			await handleAutoSubmit(
				"Waktu ujian habis. Jawaban Anda dikumpulkan otomatis.",
			);
		}
	}, 1000);
}

async function handleAutoSubmit(msg) {
	clearInterval(timerInterval);
	clearInterval(syncInterval);
	submitting.value = true;
	await Swal.fire({
		icon: "warning",
		title: "Waktu Habis!",
		text: msg,
		confirmButtonColor: "#2563eb",
	});
	await submit();
}

async function confirmSubmit() {
	const unanswered = questions.value.length - answeredCount.value;
	const msg =
		unanswered > 0 ? `Masih ada ${unanswered} soal belum dijawab. ` : "";
	const { isConfirmed } = await Swal.fire({
		icon: "question",
		title: "Kumpulkan Ujian?",
		text: `${msg}Pastikan semua jawaban sudah benar.`,
		showCancelButton: true,
		confirmButtonText: "Ya, Kumpulkan",
		cancelButtonText: "Periksa Lagi",
		confirmButtonColor: "#16a34a",
	});
	if (isConfirmed) await submit();
}

async function submit() {
	clearInterval(timerInterval);
	clearInterval(syncInterval);
	submitting.value = true;
	const eid = examId.value || exam.value?.id;
	if (!eid) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: "ID ujian tidak ditemukan.",
		});
		submitting.value = false;
		return;
	}
	try {
		const res = await api.post("/responses/submit", {
			examId: eid,
			answers: answers.value,
		});
		router.push(`/result/${res.data.data.responseId}`);
	} catch (err) {
		const msg =
			err.response?.data?.message || "Terjadi kesalahan saat mengumpulkan.";
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: msg,
			confirmButtonColor: "#2563eb",
		});
		submitting.value = false;
	}
}

// WakeLock & Fullscreen
let wakeLock = null;
async function requestWakeLock() {
	try {
		if ("wakeLock" in navigator) {
			wakeLock = await navigator.wakeLock.request("screen");
		}
	} catch (_) {}
}
function releaseWakeLock() {
	if (wakeLock) {
		wakeLock.release().catch(() => {});
		wakeLock = null;
	}
}
function enterFullscreen() {
	const el = document.documentElement;
	if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
	else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

// Violation detection (tab switching + blur)
let visGraceTimer = null;
function handleVisibilityChange() {
	if (document.hidden && exam.value) {
		visGraceTimer = setTimeout(() => {
			if (document.hidden)
				triggerViolation("Berpindah tab atau meminimize browser");
		}, 1500);
	} else {
		if (visGraceTimer) {
			clearTimeout(visGraceTimer);
			visGraceTimer = null;
		}
		// Re-acquire WakeLock if lost
		if (wakeLock === null && exam.value) requestWakeLock();
	}
}
let isKeyboardSafe = false;
function handleFocusIn(e) {
	const tag = e.target?.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")
		isKeyboardSafe = true;
}
function handleFocusOut() {
	setTimeout(() => {
		isKeyboardSafe = false;
	}, 2000);
}
function handleBlur() {
	if (!isKeyboardSafe && exam.value) {
		setTimeout(() => {
			if (!document.hasFocus() && exam.value)
				triggerViolation("Membuka aplikasi lain atau Alt-Tab");
		}, 100);
	}
}

function triggerViolation(reason) {
	if (!exam.value) return;
	violationCount.value++;
	// Log to server async (fire and forget)
	api
		.post("/responses/log-violation", {
			examId: examId.value,
			count: violationCount.value,
			reason,
		})
		.catch(() => {});
	if (violationCount.value >= maxViolations.value) {
		handleAutoSubmit(
			"Terlalu banyak pelanggaran (" +
				reason +
				"). Ujian dikumpulkan otomatis.",
		);
	} else {
		showViolationOverlay.value = true;
	}
}

function dismissViolation() {
	showViolationOverlay.value = false;
	enterFullscreen();
}

onMounted(async () => {
	try {
		// Load exam config for max violations
		const cfgRes = await api
			.get("/config")
			.catch(() => ({ data: { data: {} } }));
		maxViolations.value = parseInt(cfgRes.data.data?.max_violations) || 2;

		// Load exam info
		const examRes = await api.get(`/exams/${examId.value}`);
		exam.value = examRes.data.data;

		// Load questions + saved answers
		let qRes;
		try {
			qRes = await api.get(`/exams/${examId.value}/questions/exam-session`);
		} catch (qErr) {
			const msg = qErr.response?.data?.message || "";
			if (
				qErr.response?.status === 400 &&
				msg.includes("sudah menyelesaikan")
			) {
				// Sudah submit — arahkan ke halaman hasil
				const histRes = await api
					.get("/responses/my")
					.catch(() => ({ data: { data: [] } }));
				const found = (histRes.data.data || []).find(
					(r) => r.examId === examId.value,
				);
				if (found) {
					router.replace(`/result/${found.id}`);
				} else {
					router.replace("/dashboard");
				}
				return;
			}
			throw qErr;
		}
		questions.value = qRes.data.data?.questions || [];

		// Pre-compute shuffled JODOH answer options (stable per session)
		const shuffled = {};
		questions.value.forEach((q) => {
			if (q.type === "JODOH") {
				const arr = [...(q.options || []).map((p) => p.a)];
				for (let i = arr.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[arr[i], arr[j]] = [arr[j], arr[i]];
				}
				shuffled[q.id] = arr;
			}
		});
		shuffledJodohOptions.value = shuffled;

		// Restore saved answers
		const saved = qRes.data.data?.savedAnswers || {};
		answers.value = { ...saved };

		// Render MathJax formulas
		typesetMath();

		// Set timer based on actual elapsed time
		const timing = qRes.data.data?.timing || {};
		const totalDurationSeconds = (exam.value.duration || 90) * 60;

		if (timing.examStartTime && timing.serverTimestamp) {
			// Calculate elapsed time from server
			const elapsedMs = timing.serverTimestamp - timing.examStartTime;
			const elapsedSeconds = Math.floor(elapsedMs / 1000);
			timeLeft.value = Math.max(0, totalDurationSeconds - elapsedSeconds);
		} else {
			// First time — use full duration
			timeLeft.value = totalDurationSeconds;
		}

		startTimer();
		syncInterval = setInterval(syncAnswers, 15000);

		// Anti-cheat
		document.addEventListener("visibilitychange", handleVisibilityChange);
		document.addEventListener("focusin", handleFocusIn);
		document.addEventListener("focusout", handleFocusOut);
		window.addEventListener("blur", handleBlur);
		await requestWakeLock();
		enterFullscreen();
	} catch (err) {
		error.value =
			err.response?.data?.message ||
			"Gagal memuat ujian. Pastikan PIN ujian sudah benar.";
	} finally {
		loading.value = false;
	}
});

onUnmounted(() => {
	clearInterval(timerInterval);
	clearInterval(syncInterval);
	if (visGraceTimer) clearTimeout(visGraceTimer);
	document.removeEventListener("visibilitychange", handleVisibilityChange);
	document.removeEventListener("focusin", handleFocusIn);
	document.removeEventListener("focusout", handleFocusOut);
	window.removeEventListener("blur", handleBlur);
	releaseWakeLock();
});
</script>
