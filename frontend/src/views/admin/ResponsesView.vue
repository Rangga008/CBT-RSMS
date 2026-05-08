<template>
	<div class="space-y-6">
		<!-- Header -->
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
		>
			<h2 class="text-xl font-bold text-slate-800">Hasil Ujian</h2>
			<div class="flex items-center gap-2 flex-wrap">
				<button
					@click="printRekapPDF"
					:disabled="responses.length === 0"
					class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl shadow transition"
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
					Rekap PDF
				</button>
				<button
					@click="exportExcel"
					:disabled="exporting || responses.length === 0"
					class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl shadow transition"
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
							d="M9 13h6m-3-3v6m5.25 5.25H6.75A2.25 2.25 0 014.5 19V5.25A2.25 2.25 0 016.75 3h6.879a1.5 1.5 0 011.06.44l4.371 4.371a1.5 1.5 0 01.44 1.06V19A2.25 2.25 0 0117.25 21.25z"
						/>
					</svg>
					{{ exporting ? "Mengekspor..." : "Export Excel" }}
				</button>
			</div>
		</div>

		<!-- Filter -->
		<div
			class="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 flex-wrap shadow-sm"
		>
			<div class="flex items-center gap-2">
				<label class="text-xs font-semibold text-slate-500 whitespace-nowrap"
					>Tampilkan</label
				>
				<select
					v-model.number="limit"
					@change="
						page = 1;
						load();
					"
					class="input-field w-24"
				>
					<option :value="10">10</option>
					<option :value="25">25</option>
					<option :value="50">50</option>
					<option :value="100">100</option>
					<option :value="500">500</option>
				</select>
			</div>
			<input
				v-model="search"
				@input="debouncedLoad"
				placeholder="Cari nama siswa..."
				class="input-field flex-1 min-w-48"
			/>
			<select v-model="filterStatus" @change="load" class="input-field w-40">
				<option value="">Semua Status</option>
				<option value="InProgress">Sedang Berlangsung</option>
				<option value="Submitted">Perlu Dinilai</option>
				<option value="Graded">Sudah Dinilai</option>
			</select>
			<select v-model="filterExam" @change="load" class="input-field w-52">
				<option value="">Semua Ujian</option>
				<option v-for="e in examList" :key="e.id" :value="e.id">
					{{ e.subject }}
				</option>
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
				v-else-if="responses.length === 0"
				class="p-8 text-center text-slate-400"
			>
				Belum ada hasil ujian ditemukan.
			</div>
			<table v-else class="w-full text-sm">
				<thead class="bg-slate-50 border-b border-slate-200">
					<tr>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">#</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Siswa
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Kelas
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Ujian
						</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-600">
							Selesai
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							Nilai
						</th>
						<th class="px-4 py-3 text-center font-semibold text-slate-600">
							Pelanggaran
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
						v-for="(r, i) in responses"
						:key="r.id"
						class="hover:bg-slate-50 transition-colors"
					>
						<td class="px-4 py-3 text-slate-400 text-xs">
							{{ (page - 1) * limit + i + 1 }}
						</td>
						<td class="px-4 py-3 font-medium text-slate-800">
							{{ r.user?.nama }}
						</td>
						<td class="px-4 py-3 text-slate-500 text-xs">
							{{ r.user?.kelas || "-" }}
						</td>
						<td class="px-4 py-3 text-slate-600 text-xs max-w-[180px] truncate">
							{{ r.exam?.subject }}
						</td>
						<td class="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
							{{ fmtDate(r.submitTime) }}
						</td>
						<td class="px-4 py-3 text-center">
							<span class="font-bold text-base" :class="scoreColor(r.score)">{{
								r.score ?? "–"
							}}</span>
						</td>
						<td class="px-4 py-3 text-center">
							<span
								class="text-xs font-semibold"
								:class="r.violations > 0 ? 'text-red-600' : 'text-slate-300'"
							>
								{{ r.violations ?? 0 }}×
							</span>
						</td>
						<td class="px-4 py-3 text-center">
							<span class="badge text-xs" :class="statusBadge(r.status)">{{
								statusLabel(r.status)
							}}</span>
						</td>
						<td class="px-4 py-3">
							<div class="flex items-center justify-center gap-1.5 flex-wrap">
								<!-- Detail jawaban -->
								<button
									v-if="r.status === 'Submitted' || r.status === 'Graded'"
									@click="viewAnswers(r)"
									class="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-lg transition-colors font-semibold"
									title="Lihat detail jawaban siswa"
								>
									👁 Detail
								</button>
								<!-- Excel -->
								<button
									v-if="r.status === 'Submitted' || r.status === 'Graded'"
									@click="downloadStudentExcel(r)"
									class="w-7 h-7 flex items-center justify-center rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
									title="Download Excel"
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
											d="M9 13h6m-3-3v6m5.25 5.25H6.75A2.25 2.25 0 014.5 19V5.25A2.25 2.25 0 016.75 3h6.879a1.5 1.5 0 011.06.44l4.371 4.371a1.5 1.5 0 01.44 1.06V19A2.25 2.25 0 0117.25 21.25z"
										/>
									</svg>
								</button>
								<!-- Print PDF -->
								<button
									v-if="r.status === 'Submitted' || r.status === 'Graded'"
									@click="printStudentPDF(r)"
									class="w-7 h-7 flex items-center justify-center rounded-lg text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all"
									title="Print PDF"
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
											d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
										/>
									</svg>
								</button>
								<!-- Buka Akses (jika terblokir) -->
								<button
									v-if="r.violations >= 2"
									@click="unlockAttempt(r)"
									class="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-lg transition-colors font-semibold"
									title="Buka akses tanpa menghapus jawaban"
								>
									Buka
								</button>
								<!-- Nilai Esai -->
								<button
									v-if="r.status === 'Submitted' || r.status === 'Graded'"
									@click="openGrade(r)"
									class="text-xs bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-lg transition-colors font-semibold"
									title="Beri nilai soal esai"
								>
									Esai
								</button>
								<!-- Hitung Ulang (icon) -->
								<button
									v-if="r.status === 'Submitted' || r.status === 'Graded'"
									@click="recalculate(r)"
									class="w-7 h-7 flex items-center justify-center rounded-lg text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-all font-bold text-sm"
									title="Hitung ulang nilai berdasarkan kunci jawaban saat ini"
								>
									↻
								</button>
								<!-- Reset -->
								<button
									@click="resetAttempt(r)"
									class="text-xs bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded-lg transition-colors font-semibold"
									title="Reset / hapus jawaban siswa"
								>
									Reset
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
				<span
					>{{ (page - 1) * limit + 1 }}–{{ Math.min(page * limit, total) }} dari
					<b>{{ total }}</b> hasil</span
				>
				<div class="flex gap-2 items-center">
					<button
						@click="
							page--;
							load();
						"
						:disabled="page <= 1"
						class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold transition"
					>
						‹ Prev
					</button>
					<span class="text-xs font-bold text-slate-600">{{ page }}</span>
					<button
						@click="
							page++;
							load();
						"
						:disabled="page * limit >= total"
						class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold transition"
					>
						Next ›
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Lihat Jawaban -->
		<div
			v-if="answersModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
			>
				<div
					class="px-6 py-4 border-b bg-teal-50 flex items-center justify-between rounded-t-2xl"
				>
					<div class="flex items-center gap-3">
						<div
							class="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm"
						>
							📋
						</div>
						<div>
							<h3 class="font-bold text-teal-900">Detail Jawaban Siswa</h3>
							<p class="text-xs text-teal-700">
								{{ answersTarget?.user?.nama }} ·
								{{ answersTarget?.user?.kelas }} ·
								{{ answersTarget?.exam?.subject }}
							</p>
						</div>
					</div>
					<button
						@click="answersModal = false"
						class="w-8 h-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition"
					>
						✕
					</button>
				</div>
				<div class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
					<div v-if="answersLoading" class="text-center text-slate-400 py-10">
						Memuat jawaban...
					</div>
					<div
						v-else-if="allAnswers.length === 0"
						class="text-center text-slate-400 py-10 text-sm"
					>
						Tidak ada data jawaban.
					</div>
					<div
						v-for="item in allAnswers"
						:key="item.no"
						class="bg-white rounded-xl border shadow-sm overflow-hidden"
						:class="
							item.isCorrect === true
								? 'border-green-300'
								: item.isCorrect === false
									? 'border-red-300'
									: 'border-slate-200'
						"
					>
						<div
							class="flex items-center justify-between px-4 py-2 border-b"
							:class="
								item.isCorrect === true
									? 'bg-green-50'
									: item.isCorrect === false
										? 'bg-red-50'
										: 'bg-slate-50'
							"
						>
							<span class="text-xs font-bold text-slate-500"
								>Soal {{ item.no }}</span
							>
							<div class="flex items-center gap-2">
								<span
									class="text-xs px-2 py-0.5 rounded-full font-semibold"
									:class="typeBadge(item.type)"
									>{{ item.type }}</span
								>
								<span
									v-if="item.isCorrect === true"
									class="text-xs font-bold text-green-600"
									>✓ Benar</span
								>
								<span
									v-else-if="item.isCorrect === false && item.ratio > 0"
									class="text-xs font-bold text-amber-600"
									>~ Parsial ({{ Math.round(item.ratio * 100) }}%)</span
								>
								<span
									v-else-if="item.isCorrect === false"
									class="text-xs font-bold text-red-500"
									>✗ Salah</span
								>
								<span
									v-else-if="item.type === 'Esai'"
									class="text-xs font-bold text-orange-500"
									>Esai (manual)</span
								>
								<span
									v-if="item.pointEarned !== null"
									class="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono"
									>{{ item.pointEarned.toFixed(1) }}/{{ item.bobot }}</span
								>
							</div>
						</div>
						<div class="p-4 space-y-3">
							<div
								class="text-sm text-slate-700 prose prose-sm max-w-none"
								v-html="sanitize(item.content)"
							></div>
							<img
								v-if="item.imageUrl"
								:src="item.imageUrl"
								alt=""
								class="rounded-lg max-h-40 object-contain border border-slate-200"
							/>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
								<div
									class="bg-slate-50 rounded-lg px-3 py-2 border border-slate-200"
								>
									<p
										class="text-[10px] font-bold text-slate-400 uppercase mb-1"
									>
										Jawaban Siswa
									</p>
									<p
										class="text-sm font-semibold break-words"
										:class="
											item.isCorrect === true
												? 'text-green-700'
												: item.isCorrect === false
													? 'text-red-600'
													: 'text-slate-700'
										"
									>
										{{
											formatAnswer(item.answer, item.type) || "(tidak dijawab)"
										}}
									</p>
								</div>
								<div
									v-if="item.type !== 'Esai'"
									class="bg-green-50 rounded-lg px-3 py-2 border border-green-200"
								>
									<p
										class="text-[10px] font-bold text-green-500 uppercase mb-1"
									>
										Kunci Jawaban
									</p>
									<p class="text-sm font-semibold text-green-700 break-words">
										{{ formatCorrectAnswer(item) }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div
						v-if="!answersLoading && allAnswers.length > 0"
						class="bg-white rounded-xl border border-slate-200 p-4 text-center"
					>
						<p class="text-sm text-slate-500">
							Nilai Akhir:
							<span
								class="text-2xl font-black"
								:class="scoreColor(answersTarget?.score)"
								>{{ answersTarget?.score ?? "–" }}</span
							>
						</p>
					</div>
				</div>
				<div
					class="px-6 py-4 border-t bg-white flex justify-between items-center rounded-b-2xl"
				>
					<button
						@click="printStudentPDF(answersTarget)"
						class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm transition flex items-center gap-2"
					>
						🖨 Print PDF
					</button>
					<button
						@click="answersModal = false"
						class="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-sm transition"
					>
						Tutup
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Nilai Esai -->
		<div
			v-if="gradeModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
			>
				<!-- Header -->
				<div
					class="px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
				>
					<div>
						<h3 class="text-lg font-bold text-slate-800">
							Koreksi Jawaban Esai
						</h3>
						<p class="text-xs text-slate-500">
							{{ gradeTarget?.user?.nama }} · {{ gradeTarget?.user?.kelas }} ·
							Nilai Otomatis: <b>{{ gradeTarget?.score ?? "-" }}</b>
						</p>
					</div>
					<button
						@click="gradeModal = false"
						class="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 flex items-center justify-center transition"
					>
						✕
					</button>
				</div>
				<!-- Essay Answers -->
				<div class="flex-1 overflow-y-auto p-6 space-y-4">
					<div v-if="gradeLoading" class="text-center text-slate-400 py-6">
						Memuat jawaban...
					</div>
					<div
						v-for="(item, i) in essayAnswers"
						:key="item.id"
						class="bg-slate-50 rounded-xl border border-slate-200 p-4"
					>
						<div class="flex items-center justify-between mb-1">
							<p class="text-xs font-bold text-slate-400 uppercase">
								Soal Esai {{ i + 1 }}
							</p>
							<span class="text-xs text-slate-500"
								>Bobot: <b>{{ item.bobot }}</b></span
							>
						</div>
						<div
							class="text-sm text-slate-700 mb-3 prose prose-sm"
							v-html="sanitize(item.content)"
						></div>
						<div class="bg-white border border-slate-200 rounded-lg p-3 mb-3">
							<p class="text-xs font-semibold text-slate-400 mb-1">
								Jawaban Siswa:
							</p>
							<p class="text-sm text-slate-700 whitespace-pre-wrap">
								{{ item.answer || "(tidak dijawab)" }}
							</p>
						</div>
						<div
							class="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
						>
							<label class="text-xs font-semibold text-yellow-800 flex-1"
								>Nilai (0–{{ item.bobot }}):</label
							>
							<input
								v-model.number="essayScores[item.id]"
								type="number"
								:min="0"
								:max="item.bobot"
								step="0.5"
								class="w-20 px-2 py-1 border border-slate-300 rounded-lg text-right font-bold focus:ring-2 focus:ring-blue-500 outline-none text-sm"
								placeholder="0"
							/>
							<span class="text-xs text-slate-400">/ {{ item.bobot }}</span>
						</div>
					</div>
					<div
						v-if="!gradeLoading && essayAnswers.length === 0"
						class="text-center text-slate-400 py-4 text-sm"
					>
						Tidak ada soal esai ditemukan.
					</div>
				</div>
				<!-- Footer -->
				<div class="px-6 py-4 border-t bg-slate-50 space-y-3">
					<div
						class="text-xs text-slate-500 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2"
					>
						💡 Nilai esai memengaruhi bobot total. Nilai akhir dihitung ulang
						otomatis setelah disimpan.
					</div>
					<button
						@click="submitGrade"
						:disabled="grading"
						class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow transition disabled:opacity-70"
					>
						{{ grading ? "Menyimpan..." : "💾 Simpan & Hitung Ulang Nilai" }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api.js";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import * as XLSX from "xlsx";

const route = useRoute();
const sanitize = (html) => DOMPurify.sanitize(html || "");
const responses = ref([]);
const total = ref(0);
const page = ref(1);
const limit = ref(50);
const loading = ref(true);
const search = ref("");
const filterStatus = ref("");
const filterExam = ref("");
const examList = ref([]);
const gradeModal = ref(false);
const answersModal = ref(false);
const answersTarget = ref(null);
const answersLoading = ref(false);
const allAnswers = ref([]);
const gradeTarget = ref(null);
const essayScores = ref({});
const grading = ref(false);
const gradeLoading = ref(false);
const essayAnswers = ref([]);
const exporting = ref(false);

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
const scoreColor = (s) =>
	s == null
		? "text-slate-400"
		: s >= 75
			? "text-green-600"
			: s >= 60
				? "text-yellow-600"
				: "text-red-600";
const statusBadge = (s) =>
	({
		InProgress: "bg-yellow-100 text-yellow-700",
		Submitted: "bg-orange-100 text-orange-700",
		Graded: "bg-green-100 text-green-700",
	})[s] || "bg-slate-100 text-slate-500";
const statusLabel = (s) =>
	({
		InProgress: "Berlangsung",
		Submitted: "Perlu Dinilai",
		Graded: "Selesai",
	})[s] || s;

let debounceTimer;
const debouncedLoad = () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(load, 400);
};

async function load() {
	loading.value = true;
	try {
		const params = new URLSearchParams({
			page: page.value,
			limit: limit.value,
		});
		if (filterStatus.value) params.set("status", filterStatus.value);
		if (filterExam.value) params.set("examId", filterExam.value);
		if (search.value) params.set("search", search.value);
		const res = await api.get(`/responses?${params}`);
		responses.value = res.data.data || [];
		total.value = res.data.total || 0;
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

async function openGrade(r) {
	gradeTarget.value = r;
	essayScores.value = {};
	essayAnswers.value = [];
	gradeModal.value = true;
	gradeLoading.value = true;
	try {
		const res = await api.get(`/responses/${r.id}`);
		const data = res.data.data;
		const qs = data.questions || [];
		const ans = data.answersJson || {};
		const savedScores = ans._essayScores || {};
		essayAnswers.value = qs
			.filter((q) => q.type === "Esai")
			.map((q) => ({
				id: q.id,
				content: q.content,
				bobot: typeof q.bobot === "number" ? q.bobot : 1,
				answer: ans[q.id],
			}));
		const newScores = {};
		for (const item of essayAnswers.value) {
			newScores[item.id] = savedScores[item.id] ?? 0;
		}
		essayScores.value = newScores;
	} catch (_) {
	} finally {
		gradeLoading.value = false;
	}
}

async function submitGrade() {
	grading.value = true;
	try {
		// Convert score values to numbers and clamp to [0, bobot]
		const scores = {};
		for (const item of essayAnswers.value) {
			const raw = Number(essayScores.value[item.id]) || 0;
			scores[item.id] = Math.max(0, Math.min(item.bobot, raw));
		}
		await api.patch(`/responses/${gradeTarget.value.id}/grade-essay`, {
			essayScores: scores,
		});
		gradeModal.value = false;
		await load();
		Swal.fire({
			icon: "success",
			title: "Nilai disimpan",
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
		grading.value = false;
	}
}

async function recalculate(r) {
	try {
		const res = await api.post(`/responses/${r.id}/recalculate`);
		await load();
		Swal.fire({
			icon: "success",
			title: `Nilai diperbarui: ${res.data.newScore}`,
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

async function exportExcel() {
	exporting.value = true;
	try {
		// Fetch ALL results for export
		const params = new URLSearchParams({ page: 1, limit: 9999 });
		if (filterStatus.value) params.set("status", filterStatus.value);
		if (filterExam.value) params.set("examId", filterExam.value);
		if (search.value) params.set("search", search.value);
		const res = await api.get(`/responses?${params}`);
		const data = res.data.data || [];

		const headers = [
			"No",
			"ID Siswa",
			"Nama Siswa",
			"Kelas",
			"Ujian",
			"Waktu Mulai",
			"Waktu Selesai",
			"Nilai",
			"Pelanggaran",
			"Status",
		];
		const rows = data.map((r, i) => [
			i + 1,
			r.user?.userId || r.userId || "-",
			r.user?.nama || "-",
			r.user?.kelas || "-",
			r.exam?.subject || "-",
			r.startTime ? new Date(r.startTime).toLocaleString("id-ID") : "-",
			r.submitTime ? new Date(r.submitTime).toLocaleString("id-ID") : "-",
			r.score ?? "-",
			r.violations ?? 0,
			statusLabel(r.status),
		]);

		const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
		ws["!cols"] = [
			{ wpx: 35 },
			{ wpx: 90 },
			{ wpx: 160 },
			{ wpx: 80 },
			{ wpx: 130 },
			{ wpx: 130 },
			{ wpx: 130 },
			{ wpx: 60 },
			{ wpx: 80 },
			{ wpx: 90 },
		];
		const wb = XLSX.utils.book_new();
		const examLabel = filterExam.value
			? examList.value.find((e) => e.id === filterExam.value)?.subject ||
				"Ujian"
			: "Semua";
		XLSX.utils.book_append_sheet(wb, ws, "Rekap Hasil");
		XLSX.writeFile(
			wb,
			`Rekap_Hasil_${examLabel}_${new Date().toISOString().slice(0, 10)}.xlsx`,
		);
	} catch (_) {
		Swal.fire({
			icon: "error",
			title: "Gagal Export",
			text: "Terjadi kesalahan saat mengekspor data.",
		});
	} finally {
		exporting.value = false;
	}
}

async function unlockAttempt(r) {
	const { isConfirmed } = await Swal.fire({
		icon: "question",
		title: "Buka Akses Ujian?",
		html: `Siswa <b>${r.user?.nama}</b> akan diizinkan melanjutkan ujian tanpa kehilangan jawaban sebelumnya.`,
		showCancelButton: true,
		confirmButtonText: "Ya, Buka Akses",
		confirmButtonColor: "#2563eb",
		cancelButtonText: "Batal",
	});
	if (!isConfirmed) return;
	try {
		await api.post(`/responses/${r.id}/unlock`);
		await load();
		Swal.fire({
			icon: "success",
			title: "Akses dibuka",
			text: "Silakan minta siswa login kembali.",
			timer: 1800,
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

const typeBadge = (t) =>
	({
		PG: "bg-blue-100 text-blue-700",
		PG_KOMPLEKS: "bg-purple-100 text-purple-700",
		BS: "bg-green-100 text-green-700",
		JODOH: "bg-orange-100 text-orange-700",
		Esai: "bg-rose-100 text-rose-700",
	})[t] || "bg-slate-100 text-slate-600";

const stripHtml = (v) =>
	String(v || "")
		.replace(/<[^>]*>/g, "")
		.trim();

const formatAnswer = (val, type) => {
	if (val == null || val === "") return "";
	if (type === "PG_KOMPLEKS" && Array.isArray(val)) return val.join(", ");
	if (type === "BS" && typeof val === "object") {
		return Object.entries(val)
			.map(([k, v]) => `${Number(k) + 1}. ${v}`)
			.join(" | ");
	}
	if (type === "JODOH" && typeof val === "object") {
		return Object.entries(val)
			.map(([k, v]) => `${k} → ${v}`)
			.join(" | ");
	}
	if (typeof val === "object") return JSON.stringify(val);
	return String(val);
};

const formatCorrectAnswer = (q) => {
	const val = q.correctAnswer;
	if (val == null || val === "") return "-";
	if (q.type === "PG") {
		// correctAnswer is option index
		const correctIdx = parseInt(val);
		if (
			!isNaN(correctIdx) &&
			Array.isArray(q.options) &&
			q.options[correctIdx] !== undefined
		) {
			return `${String.fromCharCode(65 + correctIdx)}. ${q.options[correctIdx]}`;
		}
		return String(val);
	}
	if (q.type === "PG_KOMPLEKS" && Array.isArray(val)) return val.join(", ");
	if (q.type === "BS" && typeof val === "object") {
		const opts = Array.isArray(q.options) ? q.options : [];
		return opts
			.map((s, i) => `${i + 1}. ${stripHtml(s)}: ${val[i] || "?"}`)
			.join(" | ");
	}
	if (q.type === "JODOH") {
		const pairs = Array.isArray(q.options) ? q.options.filter((p) => p.q) : [];
		return pairs.map((p) => `${p.q} → ${p.a}`).join(" | ");
	}
	if (typeof val === "object") return JSON.stringify(val);
	return String(val);
};

function computeIsCorrect(q, studentAns) {
	if (q.type === "PG") {
		// correctAnswer is option index (e.g. "0"), studentAns is option text
		let key = "";
		const correctIdx = parseInt(q.correctAnswer);
		if (
			!isNaN(correctIdx) &&
			Array.isArray(q.options) &&
			q.options[correctIdx] !== undefined
		) {
			key = stripHtml(String(q.options[correctIdx]));
		} else {
			key = stripHtml(q.correctAnswer);
		}
		const a = stripHtml(studentAns);
		return key !== "" && a !== "" && a.toLowerCase() === key.toLowerCase();
	}
	if (q.type === "PG_KOMPLEKS") {
		const keyArr = Array.isArray(q.correctAnswer)
			? q.correctAnswer.map(stripHtml)
			: [];
		const ansArr = Array.isArray(studentAns) ? studentAns.map(stripHtml) : [];
		if (keyArr.length === 0 || ansArr.length === 0) return false;
		const matches = keyArr.filter((k) =>
			ansArr.some((a) => a.toLowerCase() === k.toLowerCase()),
		).length;
		const wrong = ansArr.filter(
			(a) => !keyArr.some((k) => k.toLowerCase() === a.toLowerCase()),
		).length;
		return matches === keyArr.length && wrong === 0;
	}
	if (q.type === "BS") {
		const key = q.correctAnswer || {};
		const sAns = studentAns || {};
		const stmts = Array.isArray(q.options) ? q.options : [];
		if (stmts.length === 0) return null;
		return stmts.every(
			(_, idx) => String(sAns[idx] || "") === String(key[idx] || ""),
		);
	}
	if (q.type === "JODOH") {
		const pairs = Array.isArray(q.options) ? q.options.filter((p) => p.q) : [];
		if (pairs.length === 0 || !studentAns || typeof studentAns !== "object")
			return null;
		return pairs.every(
			(p) => String(studentAns[p.q] || "").trim() === String(p.a).trim(),
		);
	}
	return null; // Esai
}

function computeRatio(q, studentAns) {
	if (q.type === "PG") return computeIsCorrect(q, studentAns) ? 1 : 0;
	if (q.type === "PG_KOMPLEKS") {
		const keyArr = Array.isArray(q.correctAnswer)
			? q.correctAnswer.map(stripHtml)
			: [];
		const ansArr = Array.isArray(studentAns) ? studentAns.map(stripHtml) : [];
		if (keyArr.length === 0 || ansArr.length === 0) return 0;
		const matches = keyArr.filter((k) =>
			ansArr.some((a) => a.toLowerCase() === k.toLowerCase()),
		).length;
		const wrong = ansArr.filter(
			(a) => !keyArr.some((k) => k.toLowerCase() === a.toLowerCase()),
		).length;
		return Math.max(0, (matches - wrong) / keyArr.length);
	}
	if (q.type === "BS") {
		const key = q.correctAnswer || {};
		const sAns = studentAns || {};
		const stmts = Array.isArray(q.options) ? q.options : [];
		if (stmts.length === 0) return 0;
		return (
			stmts.filter(
				(_, idx) => String(sAns[idx] || "") === String(key[idx] || ""),
			).length / stmts.length
		);
	}
	if (q.type === "JODOH") {
		const pairs = Array.isArray(q.options) ? q.options.filter((p) => p.q) : [];
		if (pairs.length === 0 || !studentAns) return 0;
		return (
			pairs.filter(
				(p) => String(studentAns[p.q] || "").trim() === String(p.a).trim(),
			).length / pairs.length
		);
	}
	return 0;
}

async function viewAnswers(r) {
	answersTarget.value = r;
	allAnswers.value = [];
	answersModal.value = true;
	answersLoading.value = true;
	try {
		const res = await api.get(`/responses/${r.id}`);
		const data = res.data.data;
		const qs = data.questions || [];
		const ans = data.answersJson || {};
		const savedEssayScores = ans._essayScores || {};
		allAnswers.value = qs.map((q, i) => {
			const studentAns = ans[q.id];
			const isCorrect = computeIsCorrect(q, studentAns);
			const ratio = computeRatio(q, studentAns);
			const bobot = typeof q.bobot === "number" ? q.bobot : 1;
			const pointEarned =
				q.type !== "Esai"
					? bobot * ratio
					: savedEssayScores[q.id] != null
						? Number(savedEssayScores[q.id])
						: null;
			return {
				no: i + 1,
				content: q.content,
				type: q.type,
				imageUrl: q.imageUrl,
				correctAnswer: q.correctAnswer,
				options: q.options,
				bobot,
				answer: studentAns,
				isCorrect,
				ratio,
				pointEarned,
			};
		});
	} catch (_) {
	} finally {
		answersLoading.value = false;
	}
}

async function printStudentPDF(r) {
	try {
		const res = await api.get(`/responses/${r.id}`);
		const data = res.data.data;
		const qs = data.questions || [];
		const ans = data.answersJson || {};
		const savedEssayScores = ans._essayScores || {};
		const nama = r.user?.nama || "-";
		const kelas = r.user?.kelas || "-";
		const mapel = r.exam?.subject || "-";
		const nilai = r.score ?? "-";
		const tgl = r.submitTime
			? new Date(r.submitTime).toLocaleString("id-ID")
			: "-";

		const rowsHtml = qs
			.map((q, i) => {
				const studentAns = ans[q.id];
				const isCorrect = computeIsCorrect(q, studentAns);
				const ratio = computeRatio(q, studentAns);
				const bobot = typeof q.bobot === "number" ? q.bobot : 1;
				const pointEarned =
					q.type !== "Esai"
						? bobot * ratio
						: savedEssayScores[q.id] != null
							? Number(savedEssayScores[q.id])
							: null;
				const plainAns = formatAnswer(studentAns, q.type) || "(tidak dijawab)";
				const plainCorrect = q.type !== "Esai" ? formatCorrectAnswer(q) : "-";
				const rowBg =
					isCorrect === true
						? "#f0fdf4"
						: isCorrect === false
							? ratio > 0
								? "#fffbeb"
								: "#fef2f2"
							: "#ffffff";
				const plain = q.content.replace(/<[^>]+>/g, "");
				const statusLabel =
					isCorrect === true
						? "✓"
						: isCorrect === false && ratio > 0
							? `~${Math.round(ratio * 100)}%`
							: isCorrect === false
								? "✗"
								: "Esai";
				const statusColor =
					isCorrect === true
						? "#16a34a"
						: isCorrect === false && ratio > 0
							? "#d97706"
							: isCorrect === false
								? "#dc2626"
								: "#f59e0b";
				return `<tr style="background:${rowBg};border-bottom:1px solid #e2e8f0">
				<td style="padding:8px 10px;text-align:center;color:#94a3b8;font-weight:600">${i + 1}</td>
				<td style="padding:8px 10px;font-size:11px;color:#64748b">${q.type}</td>
				<td style="padding:8px 10px;font-size:12px">${plain}</td>
				<td style="padding:8px 10px;font-size:12px;font-weight:600">${plainAns}</td>
				<td style="padding:8px 10px;font-size:12px;color:#15803d">${plainCorrect}</td>
				<td style="padding:8px 10px;text-align:center;font-size:11px;font-weight:700;color:${statusColor}">${statusLabel}</td>
				<td style="padding:8px 10px;text-align:center;font-size:11px;color:#475569">${pointEarned !== null ? pointEarned.toFixed(1) + "/" + bobot : "–"}</td>
			</tr>`;
			})
			.join("");

		const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Jawaban - ${nama}</title>
		<style>body{font-family:Arial,sans-serif;margin:20px;color:#1e293b}h2{color:#1e293b}table{width:100%;border-collapse:collapse}th{background:#f1f5f9;padding:8px 10px;text-align:left;font-size:11px;color:#475569;border-bottom:2px solid #cbd5e1}@media print{button{display:none}}</style></head>
		<body>
		<h2 style="margin-bottom:4px">Detail Jawaban Siswa</h2>
		<p style="color:#64748b;font-size:13px;margin-bottom:16px">${nama} &bull; ${kelas} &bull; ${mapel} &bull; Waktu: ${tgl} &bull; <strong>Nilai: ${nilai}</strong></p>
		<table><thead><tr><th style="width:36px">#</th><th style="width:80px">Tipe</th><th>Soal</th><th style="width:150px">Jawaban Siswa</th><th style="width:150px">Kunci</th><th style="width:50px">Status</th><th style="width:60px">Poin</th></tr></thead>
		<tbody>${rowsHtml}</tbody></table>
		<div style="margin-top:20px;text-align:right"><button onclick="window.print()" style="padding:8px 20px;background:#6d28d9;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold">🖨 Print / Save PDF</button> <button onclick="window.close()" style="padding:8px 16px;background:#e2e8f0;border:none;border-radius:8px;cursor:pointer;font-weight:bold">Tutup</button></div>
		</body></html>`;

		const w = window.open("", "_blank", "width=950,height=750");
		if (w) {
			w.document.write(html);
			w.document.close();
		}
	} catch (_) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: "Gagal memuat data untuk PDF.",
		});
	}
}

function printRekapPDF() {
	if (responses.value.length === 0) return;
	const examLabel =
		examList.value.find((e) => e.id === filterExam.value)?.subject ||
		"Semua Ujian";
	const tanggal = new Date().toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	const rowsHtml = responses.value
		.map((r, i) => {
			const s = r.score ?? "-";
			const scoreColor =
				typeof s === "number"
					? s >= 75
						? "#16a34a"
						: s >= 60
							? "#d97706"
							: "#dc2626"
					: "#94a3b8";
			return `<tr style="border-bottom:1px solid #e2e8f0">
			<td style="padding:7px 10px;text-align:center;color:#94a3b8">${i + 1}</td>
			<td style="padding:7px 10px;font-weight:600">${r.user?.nama || "-"}</td>
			<td style="padding:7px 10px;color:#64748b">${r.user?.kelas || "-"}</td>
			<td style="padding:7px 10px;font-size:12px;color:#64748b">${r.exam?.subject || "-"}</td>
			<td style="padding:7px 10px;text-align:center;font-weight:900;color:${scoreColor}">${s}</td>
			<td style="padding:7px 10px;text-align:center;font-size:11px">${statusLabel(r.status)}</td>
			<td style="padding:7px 10px;text-align:center;color:${r.violations > 0 ? "#dc2626" : "#94a3b8"}">${r.violations ?? 0}</td>
		</tr>`;
		})
		.join("");

	const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Rekap Hasil Ujian</title>
	<style>body{font-family:Arial,sans-serif;margin:20px;color:#1e293b}h2{margin-bottom:4px}table{width:100%;border-collapse:collapse}th{background:#f1f5f9;padding:8px 10px;text-align:left;font-size:11px;color:#475569;border-bottom:2px solid #cbd5e1}@media print{button{display:none}}</style></head>
	<body>
	<h2>Rekap Hasil Ujian</h2>
	<p style="color:#64748b;font-size:13px;margin-bottom:16px">${examLabel} &bull; Dicetak: ${tanggal} &bull; Total: ${responses.value.length} siswa</p>
	<table><thead><tr><th style="width:36px">#</th><th>Nama Siswa</th><th style="width:80px">Kelas</th><th>Ujian</th><th style="width:60px">Nilai</th><th style="width:90px">Status</th><th style="width:70px">Pelanggaran</th></tr></thead>
	<tbody>${rowsHtml}</tbody></table>
	<div style="margin-top:20px;text-align:right"><button onclick="window.print()" style="padding:8px 20px;background:#dc2626;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold">🖨 Print / Save PDF</button> <button onclick="window.close()" style="padding:8px 16px;background:#e2e8f0;border:none;border-radius:8px;cursor:pointer;font-weight:bold">Tutup</button></div>
	</body></html>`;

	const w = window.open("", "_blank", "width=950,height=750");
	if (w) {
		w.document.write(html);
		w.document.close();
	}
}

async function downloadStudentExcel(r) {
	try {
		const res = await api.get(`/responses/${r.id}`);
		const data = res.data.data;
		const qs = data.questions || [];
		const ans = data.answersJson || {};
		const nama = r.user?.nama || data.user?.nama || "Siswa";
		const kelas = r.user?.kelas || data.user?.kelas || "-";
		const mapel = r.exam?.subject || data.exam?.subject || "Ujian";
		const score = r.score ?? data.score ?? "-";
		const tanggal = new Date().toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});

		// Detail rows per question
		const tableRows = qs.map((q, i) => {
			const studentAns = ans[q.id];
			const bobot = typeof q.bobot === "number" ? q.bobot : 1;
			let status = "";
			let poinStr = "";
			if (q.type === "Esai") {
				status = "Esai (Manual)";
				poinStr = "-";
			} else {
				const ratio = computeRatio(q, studentAns);
				const pointEarned = bobot * ratio;
				if (studentAns == null || studentAns === "") status = "Tidak Dijawab";
				else if (ratio === 1) status = "Benar";
				else if (ratio > 0)
					status = `Benar Sebagian (${Math.round(ratio * 100)}%)`;
				else status = "Salah";
				poinStr = `${Number(pointEarned.toFixed(2))} / ${bobot}`;
			}
			return [
				i + 1,
				q.type,
				stripHtml(q.content),
				formatAnswer(studentAns, q.type),
				q.type !== "Esai" ? formatCorrectAnswer(q) : "-",
				status,
				poinStr,
			];
		});

		const totalWeight = qs
			.filter((q) => q.type !== "Esai")
			.reduce((s, q) => s + (typeof q.bobot === "number" ? q.bobot : 1), 0);
		const earnedWeight = qs
			.filter((q) => q.type !== "Esai")
			.reduce((s, q) => {
				const a = ans[q.id];
				return (
					s + (typeof q.bobot === "number" ? q.bobot : 1) * computeRatio(q, a)
				);
			}, 0);

		const sheetData = [
			["LAPORAN HASIL UJIAN"],
			[""],
			["Nama Siswa", nama, "", "Mata Pelajaran", mapel],
			["Kelas", kelas, "", "Nilai Akhir", score],
			["Tanggal Cetak", tanggal],
			[""],
			[
				"No",
				"Tipe Soal",
				"Pertanyaan",
				"Jawaban Siswa",
				"Kunci Jawaban",
				"Status",
				"Poin",
			],
			...tableRows,
			[""],
			[
				"",
				"",
				"",
				"",
				"",
				"Total Poin Diperoleh",
				Number(earnedWeight.toFixed(2)),
			],
			["", "", "", "", "", "Total Bobot Maks", totalWeight],
			["", "", "", "", "", "Nilai Akhir", score],
		];

		const ws = XLSX.utils.aoa_to_sheet(sheetData);
		ws["!cols"] = [
			{ wpx: 35 },
			{ wpx: 80 },
			{ wpx: 320 },
			{ wpx: 180 },
			{ wpx: 180 },
			{ wpx: 130 },
			{ wpx: 90 },
		];
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Laporan Jawaban");
		const cleanNama = nama.replace(/[^a-zA-Z0-9_\- ]/g, "");
		XLSX.writeFile(wb, `Laporan_${cleanNama}_${mapel}.xlsx`);
	} catch (_) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: "Gagal mengunduh data jawaban.",
		});
	}
}

async function resetAttempt(r) {
	const { isConfirmed } = await Swal.fire({
		icon: "question",
		title: "Reset Akses Ujian?",
		html: `Hapus data ujian <b>${r.user?.nama}</b> agar siswa bisa mengulang ujian dari awal.<br><br><span class="text-red-500 text-sm font-semibold">⚠ Semua jawaban & nilai akan terhapus permanen.</span>`,
		showCancelButton: true,
		confirmButtonText: "Ya, Reset",
		confirmButtonColor: "#ef4444",
		cancelButtonText: "Batal",
	});
	if (!isConfirmed) return;
	try {
		await api.post(`/responses/${r.id}/reset`);
		await load();
		Swal.fire({
			icon: "success",
			title: "Reset berhasil",
			text: `${r.user?.nama} dapat mengikuti ujian kembali.`,
			timer: 2000,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal Reset",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	}
}

onMounted(async () => {
	// Support ?status=xxx query from dashboard links
	if (route.query.status) filterStatus.value = route.query.status;
	const [_, examsRes] = await Promise.all([
		load(),
		api.get("/exams").catch(() => ({ data: { data: [] } })),
	]);
	examList.value = examsRes.data.data || [];
});
</script>
