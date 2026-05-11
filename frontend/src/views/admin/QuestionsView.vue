<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between flex-wrap gap-3">
			<div>
				<h2 class="text-xl font-bold text-slate-800">Bank Soal</h2>
				<p v-if="activeExamName" class="text-slate-500 text-sm mt-0.5">
					Ujian: <b>{{ activeExamName }}</b>
				</p>
			</div>
			<div class="flex gap-2 flex-wrap">
				<button
					@click="showCopyModal = true"
					:disabled="!activeExamId || exams.length < 2"
					class="btn-outline"
				>
					📋 Salin Soal
				</button>
				<button
					@click="showExcelModal = true"
					:disabled="!activeExamId"
					class="btn-outline"
				>
					📊 Import Excel
				</button>
				<button
					@click="showBulkModal = true"
					:disabled="!activeExamId"
					class="btn-outline"
				>
					📥 Impor Massal
				</button>
				<button
					@click="openCreate"
					:disabled="!activeExamId"
					class="btn-primary"
				>
					+ Tambah Soal
				</button>
			</div>
		</div>

		<!-- Exam Selector dropdown (standalone atau URL) -->
		<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
			<label class="block text-xs font-bold text-slate-500 uppercase mb-2"
				>Pilih Mata Pelajaran / Ujian</label
			>
			<select
				v-model="activeExamId"
				@change="onExamChange"
				class="input-field w-full md:w-1/2"
			>
				<option value="">-- Pilih Ujian --</option>
				<option v-for="e in exams" :key="e.id" :value="e.id">
					{{ e.subject }} — {{ e.kelas }} ({{ e.status }})
				</option>
			</select>
		</div>

		<!-- Stats -->
		<div v-if="activeExamId" class="grid grid-cols-2 sm:grid-cols-5 gap-4">
			<div
				v-for="t in ['PG', 'PG_KOMPLEKS', 'BS', 'JODOH', 'Esai']"
				:key="t"
				class="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm text-center"
			>
				<p class="text-2xl font-bold text-slate-800">{{ countByType(t) }}</p>
				<p class="text-sm text-slate-500">{{ t }}</p>
			</div>
		</div>

		<!-- Questions List -->
		<div v-if="activeExamId" class="space-y-3">
			<!-- Bulk Toolbar -->
			<div
				v-if="selectedQ.size > 0"
				class="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm"
			>
				<span class="font-bold text-red-700"
					>{{ selectedQ.size }} soal dipilih</span
				>
				<button
					@click="bulkDeleteQ"
					class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold transition text-xs"
				>
					🗑 Hapus Terpilih
				</button>
				<button
					@click="selectedQ.clear()"
					class="text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium transition"
				>
					✕ Batalkan
				</button>
				<label
					class="ml-auto flex items-center gap-2 text-xs text-slate-500 cursor-pointer"
				>
					<input
						type="checkbox"
						:checked="
							selectedQ.size === questions.length && questions.length > 0
						"
						@change="toggleSelectAllQ($event.target.checked)"
						class="w-4 h-4 rounded border-gray-300 text-red-600 cursor-pointer"
					/>
					Pilih Semua
				</label>
			</div>
			<div v-if="loading" class="p-8 text-center text-slate-400">
				Memuat soal...
			</div>
			<div
				v-else-if="questions.length === 0"
				class="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400"
			>
				Belum ada soal. Klik "Tambah Soal" untuk mulai.
			</div>
			<div
				v-for="(q, idx) in questions"
				:key="q.id"
				class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-blue-200 transition-colors"
				:class="{ 'border-red-300 bg-red-50': selectedQ.has(q.id) }"
			>
				<div class="flex items-start gap-3">
					<input
						type="checkbox"
						:checked="selectedQ.has(q.id)"
						@change="toggleSelectQ(q.id)"
						class="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 flex-shrink-0 cursor-pointer"
					/>
					<span class="text-slate-400 font-mono text-sm pt-0.5 flex-shrink-0"
						>{{ idx + 1 }}.</span
					>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2 mb-2">
							<span class="badge" :class="typeBadge(q.type)">{{ q.type }}</span>
							<span class="text-xs text-slate-400 font-mono">{{
								q.questionCode
							}}</span>
						</div>
						<!-- Content -->
						<div
							class="text-slate-700 text-sm prose prose-sm max-w-none"
							v-html="sanitize(q.content)"
						></div>
						<!-- Preview opsi -->
						<!-- PG -->
						<div
							v-if="q.type === 'PG' && q.options?.length"
							class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1"
						>
							<div
								v-for="(opt, oi) in q.options"
								:key="oi"
								class="text-xs px-2 py-1 rounded border"
								:class="
									String(oi) === String(q.correctAnswer)
										? 'border-green-300 bg-green-50 text-green-700 font-medium'
										: 'border-slate-100 bg-slate-50 text-slate-600'
								"
							>
								{{ String.fromCharCode(65 + oi) }}. {{ opt }}
							</div>
						</div>
						<!-- PG_KOMPLEKS -->
						<div
							v-if="q.type === 'PG_KOMPLEKS' && q.options?.length"
							class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1"
						>
							<div
								v-for="(opt, oi) in q.options"
								:key="oi"
								class="text-xs px-2 py-1 rounded border"
								:class="
									(() => {
										let keys = q.correctAnswer;
										if (typeof keys === 'string') {
											try {
												keys = JSON.parse(keys);
											} catch {
												keys = [];
											}
										}
										return Array.isArray(keys) && keys.includes(opt)
											? 'border-green-300 bg-green-50 text-green-700 font-medium'
											: 'border-slate-100 bg-slate-50 text-slate-600';
									})()
								"
							>
								{{ String.fromCharCode(65 + oi) }}. {{ opt }}
							</div>
						</div>
						<!-- BS (Benar/Salah) -->
						<div
							v-if="q.type === 'BS' && q.options?.length"
							class="mt-2 flex flex-col gap-1"
						>
							<div
								v-for="(stmt, si) in q.options"
								:key="si"
								class="text-xs px-2 py-1 rounded border border-slate-100 bg-slate-50 text-slate-700 flex items-center justify-between gap-2"
							>
								<span>{{ si + 1 }}. {{ stmt }}</span>
								<span
									class="font-semibold px-1.5 rounded"
									:class="
										(() => {
											let keys = q.correctAnswer;
											if (typeof keys === 'string') {
												try {
													keys = JSON.parse(keys);
												} catch {
													keys = {};
												}
											}
											return (keys && keys[String(si)]) === 'Benar'
												? 'text-green-700 bg-green-50'
												: 'text-red-600 bg-red-50';
										})()
									"
								>
									{{
										(() => {
											let keys = q.correctAnswer;
											if (typeof keys === "string") {
												try {
													keys = JSON.parse(keys);
												} catch {
													keys = {};
												}
											}
											return (keys && keys[String(si)]) || "?";
										})()
									}}
								</span>
							</div>
						</div>
						<!-- JODOH -->
						<div
							v-if="q.type === 'JODOH' && q.options?.length"
							class="mt-2 flex flex-col gap-1"
						>
							<div
								v-for="(pair, pi) in q.options.filter((p) => p && p.q)"
								:key="pi"
								class="text-xs px-2 py-1 rounded border border-slate-100 bg-slate-50 text-slate-700 flex items-center gap-2"
							>
								<span class="font-medium text-slate-800">{{ pair.q }}</span>
								<span class="text-slate-400">→</span>
								<span class="text-green-700 font-medium">{{ pair.a }}</span>
							</div>
						</div>
					</div>
					<div class="flex gap-2 flex-shrink-0">
						<button
							@click="openPreview(q)"
							class="btn-icon text-teal-500 hover:bg-teal-50"
							title="Preview Soal"
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
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</button>
						<button @click="openEdit(q)" class="btn-icon" title="Edit">
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
							@click="confirmDelete(q)"
							class="btn-icon-danger"
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
				</div>
			</div>
		</div>

		<!-- Modal Salin Soal -->
		<div
			v-if="showCopyModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		>
			<div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
				<div
					class="px-6 py-4 border-b bg-sky-50 flex items-center justify-between"
				>
					<div>
						<h3 class="text-lg font-bold text-slate-800">
							📋 Salin Soal Antar Ujian
						</h3>
						<p class="text-xs text-slate-500 mt-0.5">
							Duplikasi semua soal dari satu ujian ke ujian lain.
						</p>
					</div>
					<button
						@click="showCopyModal = false"
						class="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 flex items-center justify-center transition"
					>
						✕
					</button>
				</div>
				<div class="p-6 space-y-4">
					<div
						class="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-700"
					>
						Semua soal dari ujian <b>sumber</b> akan diduplikasi ke ujian
						<b>tujuan</b>. Soal lama di tujuan tidak akan terhapus.
					</div>
					<div>
						<label class="label-field">1. Salin Dari (Sumber)</label>
						<select v-model="copySource" class="input-field w-full">
							<option value="">-- Pilih ujian sumber --</option>
							<option v-for="e in exams" :key="e.id" :value="e.id">
								{{ e.subject }} — {{ e.kelas }}
							</option>
						</select>
					</div>
					<div>
						<label class="label-field">2. Tempel Ke (Tujuan)</label>
						<select v-model="copyDest" class="input-field w-full">
							<option value="">-- Pilih ujian tujuan --</option>
							<option
								v-for="e in exams.filter((x) => x.id !== copySource)"
								:key="e.id"
								:value="e.id"
							>
								{{ e.subject }} — {{ e.kelas }}
							</option>
						</select>
					</div>
				</div>
				<div class="px-6 py-4 border-t bg-slate-50 flex gap-3">
					<button
						@click="doCopyQuestions"
						:disabled="!copySource || !copyDest || copySaving"
						class="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-bold shadow transition disabled:opacity-50"
					>
						{{ copySaving ? "Menyalin..." : "🚀 Mulai Salin" }}
					</button>
					<button @click="showCopyModal = false" class="btn-outline px-6">
						Batal
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Import Excel -->
		<div
			v-if="showExcelModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		>
			<div class="bg-white rounded-2xl w-full max-w-xl shadow-2xl">
				<div
					class="px-6 py-4 border-b bg-green-50 flex items-center justify-between"
				>
					<div>
						<h3 class="text-lg font-bold text-slate-800">
							📊 Import Soal dari Excel
						</h3>
						<p class="text-xs text-slate-500 mt-0.5">
							Upload file .xlsx untuk import soal PG secara massal.
						</p>
					</div>
					<button
						@click="
							showExcelModal = false;
							excelFile = null;
							excelPreview = [];
						"
						class="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 flex items-center justify-center transition"
					>
						✕
					</button>
				</div>
				<div class="p-6 space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label class="label-field">Bobot Default Impor</label>
							<input
								v-model.number="excelDefaultBobot"
								type="number"
								min="0.1"
								step="0.1"
								class="input-field"
							/>
							<p class="text-xs text-slate-400 mt-1">
								Dipakai jika kolom bobot di Excel kosong/tidak valid.
							</p>
						</div>
					</div>
					<div
						class="bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-slate-600"
					>
						<p class="font-bold text-green-700 mb-2">📋 Format Kolom Excel:</p>
						<ul class="list-disc list-inside space-y-1">
							<li>
								Kolom A: <b>Tipe</b> (PG / PG_KOMPLEKS / BS / JODOH / Esai)
							</li>
							<li>Kolom B: <b>Pertanyaan</b></li>
							<li>
								Kolom C–G: <b>Opsi A–E</b> (teks; untuk JODOH:
								<code>Kiri=Kanan</code>)
							</li>
							<li>
								Kolom H: <b>Kunci Jawaban</b> (PG: teks opsi; BS: Benar/Salah;
								JODOH: Auto)
							</li>
							<li>Kolom I: <b>Bobot</b> (angka, opsional, default 1)</li>
							<li>
								Baris pertama = header (diabaikan). Unduh ⬇️ Template untuk
								contoh.
							</li>
						</ul>
					</div>
					<div>
						<label class="label-field">Pilih File Excel (.xlsx / .xls)</label>
						<input
							type="file"
							accept=".xlsx,.xls"
							@change="onExcelFileChange"
							ref="excelFileInput"
							class="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer border border-slate-200 rounded-xl bg-slate-50 p-2"
						/>
					</div>
					<div
						v-if="excelPreview.length"
						class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
					>
						<p class="font-bold text-slate-600 mb-2">
							Preview ({{ excelPreview.length }} soal terdeteksi):
						</p>
						<div
							v-for="(q, i) in excelPreview.slice(0, 3)"
							:key="i"
							class="text-slate-500 mb-1"
						>
							{{ i + 1 }}. [{{ q.type }}] {{ q.content.substring(0, 80)
							}}{{ q.content.length > 80 ? "..." : "" }}
						</div>
						<p v-if="excelPreview.length > 3" class="text-slate-400 italic">
							... dan {{ excelPreview.length - 3 }} soal lainnya
						</p>
					</div>
				</div>
				<div class="px-6 py-4 border-t bg-slate-50 flex flex-wrap gap-3">
					<button
						@click="downloadQuestionTemplate"
						class="btn-outline px-4 text-xs gap-1 flex items-center"
						title="Download template Excel"
					>
						⬇️ Template
					</button>
					<button
						@click="saveExcelQuestions"
						:disabled="!excelPreview.length || excelSaving"
						class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow transition disabled:opacity-50"
					>
						{{
							excelSaving
								? "Menyimpan..."
								: `💾 Simpan ${excelPreview.length} Soal`
						}}
					</button>
					<button
						@click="
							showExcelModal = false;
							excelFile = null;
							excelPreview = [];
						"
						class="btn-outline px-6"
					>
						Batal
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Impor Massal -->
		<div
			v-if="showBulkModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
			>
				<div
					class="px-6 py-4 border-b bg-slate-50 flex items-center justify-between"
				>
					<div>
						<h3 class="text-lg font-bold text-slate-800">
							📥 Impor Soal Massal (PG)
						</h3>
						<p class="text-xs text-slate-500 mt-0.5">
							Tempel teks soal, sistem akan otomatis membaca formatnya.
						</p>
					</div>
					<button
						@click="showBulkModal = false"
						class="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 flex items-center justify-center transition"
					>
						✕
					</button>
				</div>
				<div class="flex-1 overflow-y-auto p-6 space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label class="label-field">Bobot Default Impor</label>
							<input
								v-model.number="bulkDefaultBobot"
								type="number"
								min="0.1"
								step="0.1"
								class="input-field"
							/>
							<p class="text-xs text-slate-400 mt-1">
								Semua soal hasil parsing akan memakai bobot ini.
							</p>
						</div>
					</div>
					<!-- Format panduan -->
					<div
						class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700 space-y-1"
					>
						<p class="font-bold text-sm mb-2">
							📋 Format Teks (pisahkan antar soal dengan baris kosong):
						</p>
						<pre
							class="font-mono bg-white border border-blue-100 rounded-lg p-3 text-[11px] whitespace-pre-wrap"
						>
1. Apa ibu kota Indonesia?
A. Surabaya
B. Jakarta
C. Bandung
D. Medan
Jawaban: B

2. Planet terdekat dari Matahari?
A. Venus
B. Mars
C. Merkurius
D. Bumi
Jawaban: C</pre
						>
					</div>
					<!-- Textarea input -->
					<div>
						<label class="label-field">Tempel Soal Di Sini</label>
						<textarea
							v-model="bulkText"
							@input="updateBulkPreview"
							class="input-field min-h-48 resize-y font-mono text-sm"
							placeholder="Tempel teks soal di sini..."
						></textarea>
					</div>
					<!-- Preview count -->
					<div
						v-if="bulkPreview.valid > 0 || bulkPreview.errors > 0"
						class="flex gap-2 flex-wrap"
					>
						<span
							v-if="bulkPreview.valid > 0"
							class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold"
						>
							✓ {{ bulkPreview.valid }} soal valid
						</span>
						<span
							v-if="bulkPreview.errors > 0"
							class="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold"
						>
							⚠ {{ bulkPreview.errors }} soal bermasalah
						</span>
					</div>
					<!-- Preview list -->
					<div v-if="bulkParsed.length" class="space-y-2">
						<p class="text-xs font-bold text-slate-500 uppercase">
							Preview Soal Terdeteksi:
						</p>
						<div
							v-for="(q, i) in bulkParsed"
							:key="i"
							class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
						>
							<p class="font-bold text-slate-700">
								{{ i + 1 }}. {{ q.content.substring(0, 100)
								}}{{ q.content.length > 100 ? "..." : "" }}
							</p>
							<p class="text-slate-500 mt-1">
								Opsi:
								{{
									q.options
										.map((o, oi) => String.fromCharCode(65 + oi) + ". " + o)
										.join(" | ")
								}}
							</p>
							<p class="text-emerald-700 font-semibold mt-0.5">
								🔑 Kunci: {{ q.correctAnswer || "(tidak ada)" }}
							</p>
						</div>
					</div>
				</div>
				<div class="px-6 py-4 border-t bg-slate-50 flex gap-3">
					<button
						@click="saveBulkQuestions"
						:disabled="bulkParsed.length === 0 || bulkSaving"
						class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold shadow transition disabled:opacity-50"
					>
						{{
							bulkSaving
								? "Menyimpan..."
								: `💾 Simpan ${bulkParsed.length} Soal`
						}}
					</button>
					<button
						@click="
							showBulkModal = false;
							bulkText = '';
							bulkParsed = [];
							bulkPreview = { valid: 0, errors: 0 };
						"
						class="btn-outline px-6"
					>
						Batal
					</button>
				</div>
			</div>
		</div>

		<!-- Modal Tambah/Edit Soal -->
		<div
			v-if="showModal"
			class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
		>
			<div
				class="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
			>
				<h3 class="text-lg font-bold text-slate-800 mb-4">
					{{ editId ? "Edit Soal" : "Tambah Soal" }}
				</h3>
				<form @submit.prevent="save" class="space-y-4">
					<!-- Tipe Soal -->
					<div>
						<label class="label-field">Tipe Soal</label>
						<div class="flex gap-2 flex-wrap">
							<button
								v-for="t in ['PG', 'PG_KOMPLEKS', 'BS', 'JODOH', 'Esai']"
								:key="t"
								type="button"
								@click="changeType(t)"
								class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
								:class="
									form.type === t
										? 'bg-blue-600 text-white border-blue-600'
										: 'border-slate-200 text-slate-600 hover:border-blue-300'
								"
							>
								{{ t }}
							</button>
						</div>
					</div>

					<!-- Content -->
					<div>
						<label class="label-field"
							>Pertanyaan <span class="text-red-500">*</span></label
						>
						<textarea
							v-model="form.content"
							class="input-field min-h-24 resize-y"
							required
							placeholder="Tulis pertanyaan..."
						></textarea>
					</div>

					<!-- Image URL with autocomplete -->
					<div>
						<label class="label-field">Gambar Soal (Opsional)</label>
						<div class="relative">
							<input
								v-model="imageSearch"
								type="text"
								class="input-field"
								placeholder="Ketik nama gambar dari library..."
								@input="onImageSearch"
								@focus="onImageSearch"
								@blur="hideImageDropdown"
								autocomplete="off"
							/>
							<!-- Dropdown -->
							<div
								v-if="showImageDropdown && imageSearchResults.length > 0"
								class="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto"
							>
								<div
									v-for="img in imageSearchResults"
									:key="img.id"
									@mousedown.prevent="selectImage(img)"
									class="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition"
								>
									<img
										:src="img.url"
										class="w-10 h-10 rounded bg-slate-100 object-cover border border-slate-200 shrink-0"
									/>
									<div class="overflow-hidden">
										<p class="text-xs font-bold text-slate-700 truncate">
											{{ img.name }}
										</p>
										<p class="text-[10px] text-slate-400 truncate font-mono">
											...{{ img.url?.slice(-20) }}
										</p>
									</div>
								</div>
							</div>
						</div>
						<!-- Preview gambar terpilih -->
						<div
							v-if="form.imageUrl"
							class="mt-2 flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200"
						>
							<img
								:src="form.imageUrl"
								class="h-16 rounded object-contain border border-slate-200 bg-white"
							/>
							<button
								type="button"
								@click="
									form.imageUrl = '';
									imageSearch = '';
								"
								class="text-xs text-red-500 hover:text-red-700 font-medium"
							>
								✕ Hapus gambar
							</button>
						</div>
					</div>

					<!-- PG_KOMPLEKS Options (multiple correct answers) -->
					<div v-if="form.type === 'PG_KOMPLEKS'">
						<label class="label-field"
							>Pilihan Jawaban (centang yang benar, min. 2)</label
						>
						<div
							v-for="(opt, i) in form.options"
							:key="i"
							class="flex gap-2 mb-2 items-center"
						>
							<span class="w-6 text-slate-400 text-sm font-bold flex-shrink-0"
								>{{ String.fromCharCode(65 + i) }}.</span
							>
							<input
								v-model="form.options[i]"
								type="text"
								class="input-field flex-1"
								:placeholder="`Opsi ${String.fromCharCode(65 + i)}`"
							/>
							<label
								class="flex items-center gap-1 flex-shrink-0 cursor-pointer"
							>
								<input
									type="checkbox"
									:value="String(i)"
									:checked="
										Array.isArray(form.correctAnswer) &&
										form.correctAnswer.includes(String(i))
									"
									@change="togglePGKAnswer(String(i))"
									class="accent-indigo-600"
								/>
								Benar
							</label>
							<button
								type="button"
								@click="form.options.splice(i, 1)"
								class="text-red-400 hover:text-red-600"
								:disabled="form.options.length <= 2"
							>
								✕
							</button>
						</div>
						<button
							type="button"
							@click="form.options.push('')"
							class="text-sm text-indigo-600 hover:underline"
							:disabled="form.options.length >= 5"
						>
							+ Tambah opsi
						</button>
					</div>

					<!-- PG Options -->
					<div v-if="form.type === 'PG'">
						<label class="label-field">Pilihan Jawaban (min. 2)</label>
						<div
							v-for="(opt, i) in form.options"
							:key="i"
							class="flex gap-2 mb-2 items-center"
						>
							<span class="w-6 text-slate-400 text-sm font-bold flex-shrink-0"
								>{{ String.fromCharCode(65 + i) }}.</span
							>
							<input
								v-model="form.options[i]"
								type="text"
								class="input-field flex-1"
								:placeholder="`Opsi ${String.fromCharCode(65 + i)}`"
							/>
							<label
								class="flex items-center gap-1 flex-shrink-0 cursor-pointer"
							>
								<input
									type="radio"
									:value="String(i)"
									v-model="form.correctAnswer"
									class="accent-blue-600"
								/>
								Benar
							</label>
							<button
								type="button"
								@click="form.options.splice(i, 1)"
								class="text-red-400 hover:text-red-600"
								:disabled="form.options.length <= 2"
							>
								✕
							</button>
						</div>
						<button
							type="button"
							@click="form.options.push('')"
							class="text-sm text-blue-600 hover:underline"
							:disabled="form.options.length >= 5"
						>
							+ Tambah opsi
						</button>
					</div>

					<!-- BS (Benar/Salah) -->
					<div v-if="form.type === 'BS'">
						<label class="label-field">Pernyataan (Benar/Salah)</label>
						<div
							v-for="(s, i) in form.options"
							:key="i"
							class="flex gap-2 mb-2 items-center"
						>
							<span class="w-5 text-slate-400 text-xs flex-shrink-0"
								>{{ i + 1 }}.</span
							>
							<input
								v-model="form.options[i]"
								type="text"
								class="input-field flex-1"
								:placeholder="`Pernyataan ${i + 1}`"
							/>
							<select
								:value="form.correctAnswer?.[i]"
								@change="
									form.correctAnswer = {
										...form.correctAnswer,
										[i]: $event.target.value,
									}
								"
								class="input-field w-28"
							>
								<option value="Benar">Benar</option>
								<option value="Salah">Salah</option>
							</select>
							<button
								type="button"
								@click="form.options.splice(i, 1)"
								class="text-red-400 hover:text-red-600"
							>
								✕
							</button>
						</div>
						<button
							type="button"
							@click="
								form.options.push('');
								form.correctAnswer = {
									...(form.correctAnswer || {}),
									[form.options.length - 1]: 'Benar',
								};
							"
							class="text-sm text-blue-600 hover:underline"
						>
							+ Tambah pernyataan
						</button>
					</div>

					<!-- JODOH (Matching) -->
					<div v-if="form.type === 'JODOH'">
						<label class="label-field">Pasangan (Kolom A → Kolom B)</label>
						<div
							v-for="(pair, i) in form.options"
							:key="i"
							class="flex gap-2 mb-2 items-center"
						>
							<input
								v-model="form.options[i].q"
								type="text"
								class="input-field flex-1"
								:placeholder="`Kolom A ${i + 1}`"
							/>
							<span class="text-slate-400">→</span>
							<input
								v-model="form.options[i].a"
								type="text"
								class="input-field flex-1"
								:placeholder="`Kolom B ${i + 1}`"
							/>
							<button
								type="button"
								@click="form.options.splice(i, 1)"
								class="text-red-400 hover:text-red-600"
							>
								✕
							</button>
						</div>
						<button
							type="button"
							@click="form.options.push({ q: '', a: '' })"
							class="text-sm text-blue-600 hover:underline"
						>
							+ Tambah pasangan
						</button>
						<!-- Pengacoh (Distractors) -->
						<div class="mt-4 border-t border-orange-100 pt-3">
							<label class="label-field flex items-center gap-2">
								Pengacoh (Opsi Kolom B Tambahan)
								<span class="text-xs font-normal text-slate-400"
									>— muncul di dropdown tapi tidak bisa dijawab benar</span
								>
							</label>
							<div
								v-for="(_, pi) in form.pengacoh"
								:key="pi"
								class="flex gap-2 mb-2 items-center"
							>
								<input
									v-model="form.pengacoh[pi]"
									type="text"
									class="input-field flex-1"
									:placeholder="`Pengacoh ${pi + 1}`"
								/>
								<button
									type="button"
									@click="form.pengacoh.splice(pi, 1)"
									class="text-red-400 hover:text-red-600"
								>
									✕
								</button>
							</div>
							<button
								type="button"
								@click="form.pengacoh.push('')"
								class="text-sm text-orange-600 hover:underline"
							>
								+ Tambah pengacoh
							</button>
						</div>
					</div>

					<!-- Esai: tidak ada opsi -->
					<div
						v-if="form.type === 'Esai'"
						class="text-sm text-slate-500 bg-slate-50 rounded-lg p-3"
					>
						Soal esai memerlukan penilaian manual oleh guru.
					</div>

					<!-- Bobot -->
					<div>
						<label class="label-field">Bobot Soal</label>
						<input
							v-model.number="form.bobot"
							type="number"
							min="0.1"
							max="10"
							step="0.1"
							class="input-field w-32"
						/>
						<p class="text-xs text-slate-400 mt-1">
							Nilai default 1. Gunakan untuk soal dengan bobot berbeda.
						</p>
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
	</div>

	<!-- Modal Preview Soal -->
	<div
		v-if="showPreviewModal"
		class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
		@click.self="showPreviewModal = false"
	>
		<div
			class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
		>
			<div
				class="px-6 py-4 border-b bg-teal-50 flex items-center justify-between sticky top-0"
			>
				<div>
					<h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
						<svg
							class="w-5 h-5 text-teal-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						Preview Soal
					</h3>
					<p class="text-xs text-slate-500 mt-0.5" v-if="previewQ">
						Tipe:
						<span class="font-bold text-teal-700">{{ previewQ.type }}</span>
					</p>
				</div>
				<button
					@click="showPreviewModal = false"
					class="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 flex items-center justify-center transition"
				>
					✕
				</button>
			</div>
			<div class="p-6 space-y-4" v-if="previewQ">
				<!-- Gambar -->
				<div v-if="previewQ.imageUrl" class="flex justify-center">
					<img
						:src="previewQ.imageUrl"
						class="max-h-56 rounded-lg border border-slate-200 shadow object-contain"
						alt="Gambar Soal"
					/>
				</div>
				<!-- Konten Soal -->
				<div
					class="text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200"
					v-html="sanitize(previewQ.content)"
				></div>
				<!-- Opsi PG / PG_KOMPLEKS -->
				<div
					v-if="previewQ.type === 'PG' || previewQ.type === 'PG_KOMPLEKS'"
					class="space-y-2"
				>
					<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
						Pilihan Jawaban
					</p>
					<div
						v-for="(opt, i) in parseOptions(previewQ)"
						:key="i"
						class="flex items-start gap-3 px-4 py-2.5 rounded-lg border text-sm"
						:class="
							isCorrectOption(previewQ, i)
								? 'border-green-300 bg-green-50 text-green-800 font-medium'
								: 'border-slate-200 bg-white text-slate-700'
						"
					>
						<span
							class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
							:class="
								isCorrectOption(previewQ, i)
									? 'bg-green-500 text-white'
									: 'bg-slate-200 text-slate-600'
							"
						>
							{{ String.fromCharCode(65 + i) }}
						</span>
						<span v-html="sanitize(String(opt))"></span>
						<span
							v-if="isCorrectOption(previewQ, i)"
							class="ml-auto text-green-600 text-xs font-bold"
							>✓ Benar</span
						>
					</div>
				</div>
				<!-- Esai -->
				<div v-else-if="previewQ.type === 'Esai'" class="space-y-2">
					<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
						Kunci Jawaban (Esai)
					</p>
					<div
						class="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800"
						v-html="sanitize(previewQ.correctAnswer || previewQ.key || '-')"
					></div>
				</div>
				<!-- BS (Benar Salah) -->
				<div v-else-if="previewQ.type === 'BS'" class="space-y-2">
					<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
						Pernyataan Benar/Salah
					</p>
					<div
						v-for="(item, i) in parseBsOptions(previewQ)"
						:key="i"
						class="flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm"
						:class="
							item.correct
								? 'border-green-200 bg-green-50'
								: 'border-red-100 bg-red-50'
						"
					>
						<span
							class="font-bold"
							:class="item.correct ? 'text-green-700' : 'text-red-500'"
							>{{ item.correct ? "B" : "S" }}</span
						>
						<span class="text-slate-700" v-html="sanitize(item.text)"></span>
					</div>
				</div>
				<!-- JODOH -->
				<div v-else-if="previewQ.type === 'JODOH'" class="space-y-2">
					<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
						Pasangan Jawaban
					</p>
					<div
						v-for="(pair, i) in parseJodohPairs(previewQ)"
						:key="i"
						class="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-teal-200 bg-teal-50 text-sm"
					>
						<span
							class="text-slate-700 flex-1"
							v-html="sanitize(pair.q)"
						></span>
						<svg
							class="w-4 h-4 text-teal-400 flex-shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
						<span class="font-bold text-teal-700">{{ pair.a }}</span>
					</div>
					<!-- Show distractors -->
					<div
						v-if="
							(previewQ.options || []).filter((p) => !p.q && p.a).length > 0
						"
						class="mt-2 pt-2 border-t border-teal-100"
					>
						<p class="text-xs font-semibold text-slate-400 mb-1">
							Pengacoh:
							{{
								(previewQ.options || [])
									.filter((p) => !p.q && p.a)
									.map((p) => p.a)
									.join(", ")
							}}
						</p>
					</div>
				</div>
				<!-- Wajib badge -->
				<div
					class="flex items-center gap-2 text-xs pt-2 border-t border-slate-100"
				>
					<span
						v-if="String(previewQ.isRequired).toUpperCase() === 'TRUE'"
						class="px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 font-bold uppercase"
						>Soal Wajib</span
					>
					<span v-else class="text-slate-400">Soal tidak wajib</span>
				</div>
			</div>
			<div class="px-6 py-4 border-t flex justify-end gap-3">
				<button
					@click="
						openEdit(previewQ);
						showPreviewModal = false;
					"
					class="btn-primary flex items-center gap-2"
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
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
						/>
					</svg>
					Edit Soal
				</button>
				<button @click="showPreviewModal = false" class="btn-outline px-6">
					Tutup
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";
import api from "@/services/api.js";
import Swal from "sweetalert2";
import { useMathJax } from "@/composables/useMathJax.js";
const route = useRoute();
const examId = computed(() => route.query.examId || null);
const examName = computed(() =>
	route.query.examName ? decodeURIComponent(route.query.examName) : "",
);

// Active exam (either from URL param or dropdown selection)
const activeExamId = ref(route.query.examId || "");
const activeExamName = computed(() => {
	if (examName.value && activeExamId.value === examId.value)
		return examName.value;
	return exams.value.find((e) => e.id === activeExamId.value)?.subject || "";
});

// Exams list for dropdown
const exams = ref([]);

async function loadExams() {
	try {
		const res = await api.get("/exams?limit=200");
		exams.value = res.data.data || [];
	} catch (_) {}
}

function onExamChange() {
	load();
}

// Copy soal state
const showCopyModal = ref(false);
const copySource = ref("");
const copyDest = ref("");
const copySaving = ref(false);

async function doCopyQuestions() {
	if (!copySource.value || !copyDest.value) return;
	copySaving.value = true;
	try {
		const res = await api.post("/questions/copy", {
			sourceExamId: copySource.value,
			destinationExamId: copyDest.value,
		});
		showCopyModal.value = false;
		copySource.value = "";
		copyDest.value = "";
		if (activeExamId.value === copyDest.value) await load();
		Swal.fire({
			icon: "success",
			title: `${res.data.count} soal berhasil disalin!`,
			timer: 2000,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	} finally {
		copySaving.value = false;
	}
}

// Excel import state
const showExcelModal = ref(false);
const excelFile = ref(null);
const excelPreview = ref([]);
const excelSaving = ref(false);
const excelFileInput = ref(null);
const excelDefaultBobot = ref(1);

function onExcelFileChange(e) {
	const file = e.target.files?.[0];
	if (!file) return;
	excelFile.value = file;
	const reader = new FileReader();
	reader.onload = (ev) => {
		try {
			const wb = XLSX.read(ev.target.result, { type: "array" });
			const ws = wb.Sheets[wb.SheetNames[0]];
			const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
			const parsed = [];
			for (let i = 1; i < rows.length; i++) {
				const row = rows[i];
				if (!row[1]) continue; // skip empty rows
				const type = String(row[0] || "PG")
					.trim()
					.toUpperCase();
				const content = String(row[1] || "").trim();
				// Columns C-G = options (indices 2-6)
				const rawOpts = [row[2], row[3], row[4], row[5], row[6]]
					.map((v) => String(v ?? "").trim())
					.filter(Boolean);
				const correctAnswer = row[7] ? String(row[7]).trim() : null;
				const parsedBobot = row[8] ? parseFloat(row[8]) : NaN;
				const bobot =
					Number.isFinite(parsedBobot) && parsedBobot > 0
						? parsedBobot
						: Number(excelDefaultBobot.value) > 0
							? Number(excelDefaultBobot.value)
							: 1;

				let options = [];
				if (type === "JODOH") {
					// Each option is "Kiri=Kanan" pair; also supports distractors without "=" prefix mark
					options = rawOpts.map((v) => {
						const eqIdx = v.indexOf("=");
						if (eqIdx > 0) {
							return {
								q: v.slice(0, eqIdx).trim(),
								a: v.slice(eqIdx + 1).trim(),
							};
						}
						// Distractor: no "=" or starts with "="
						return { q: "", a: v.replace(/^=/, "").trim() };
					});
				} else if (type === "PG_KOMPLEKS") {
					// Options like normal PG; correctAnswer is comma-separated
					options = rawOpts;
				} else {
					options = rawOpts;
				}

				if (content)
					parsed.push({
						type,
						content,
						options,
						correctAnswer,
						isRequired: true,
						bobot,
						order: 0,
					});
			}
			excelPreview.value = parsed;
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Gagal baca file",
				text: "Pastikan file format Excel yang valid.",
			});
			excelPreview.value = [];
		}
	};
	reader.readAsArrayBuffer(file);
}

function downloadQuestionTemplate() {
	const headers = [
		"Tipe",
		"Pertanyaan",
		"Opsi_A",
		"Opsi_B",
		"Opsi_C",
		"Opsi_D",
		"Opsi_E",
		"Kunci_Jawaban",
		"Bobot",
	];
	const sample = [
		[
			"PG",
			"Apa warna langit pada siang hari?",
			"Merah",
			"Biru",
			"Hijau",
			"Kuning",
			"Hitam",
			"Biru",
			1,
		],
		[
			"PG_KOMPLEKS",
			"Mana saja yang termasuk bilangan prima?",
			"2",
			"3",
			"4",
			"5",
			"6",
			"2,3,5",
			2,
		],
		[
			"BS",
			"Bumi mengelilingi Matahari.",
			"Benar",
			"Salah",
			"",
			"",
			"",
			"Benar",
			1,
		],
		[
			"Esai",
			"Jelaskan pengertian ekosistem secara singkat.",
			"",
			"",
			"",
			"",
			"",
			"",
			3,
		],
		[
			"JODOH",
			"Pasangkan negara dengan ibu kotanya.",
			"Indonesia=Jakarta",
			"Jepang=Tokyo",
			"Inggris=London",
			"Berlin",
			"",
			"Auto",
			2,
		],
	];
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet([headers, ...sample]);
	ws["!cols"] = [10, 40, 20, 20, 20, 20, 20, 20, 8].map((wch) => ({ wch }));
	XLSX.utils.book_append_sheet(wb, ws, "Template");
	XLSX.writeFile(wb, "Template_Soal.xlsx");
}

async function saveExcelQuestions() {
	if (!excelPreview.value.length) return;
	excelSaving.value = true;
	try {
		const res = await api.post(
			`/exams/${activeExamId.value}/questions/bulk`,
			excelPreview.value,
		);
		showExcelModal.value = false;
		excelFile.value = null;
		excelPreview.value = [];
		await load();
		Swal.fire({
			icon: "success",
			title: `${res.data.count || excelPreview.value.length} soal berhasil ditambahkan!`,
			timer: 2000,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal Impor",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	} finally {
		excelSaving.value = false;
	}
}

const questions = ref([]);
const loading = ref(false);
const showModal = ref(false);
const showBulkModal = ref(false);
const bulkText = ref("");
const bulkParsed = ref([]);
const bulkPreview = ref({ valid: 0, errors: 0 });
const bulkSaving = ref(false);
const bulkDefaultBobot = ref(1);

function parseBulkText(raw, defaultBobot = 1) {
	const results = [];
	const errors = [];
	const blocks = raw.trim().split(/\n\s*\n/);
	for (const [bi, block] of blocks.entries()) {
		const lines = block
			.trim()
			.split("\n")
			.map((l) => l.trim())
			.filter(Boolean);
		if (!lines.length) continue;
		let content = "";
		const options = [];
		const optionMap = {};
		let answerLetter = "";
		for (const line of lines) {
			if (/^(jawaban|kunci|answer|jawab)\s*:/i.test(line)) {
				const m = line.match(/:\s*([A-Ea-e])/);
				if (m) answerLetter = m[1].toUpperCase();
				continue;
			}
			const optMatch = line.match(/^([A-Ea-e])[.)]\s+(.+)/);
			if (optMatch) {
				optionMap[optMatch[1].toUpperCase()] = optMatch[2].trim();
				options.push(optMatch[2].trim());
				continue;
			}
			const numMatch = line.match(/^(?:No\.?\s*)?\d+[.)]\s+(.+)/);
			if (numMatch) {
				content = numMatch[1].trim();
				continue;
			}
			if (content && !options.length) content += "\n" + line;
		}
		if (!content) {
			errors.push(`Blok ${bi + 1}: teks soal tidak ditemukan`);
			continue;
		}
		if (options.length < 2) {
			errors.push(
				`Blok ${bi + 1}: opsi kurang (min 2) — "${content.substring(0, 40)}..."`,
			);
			continue;
		}
		const correctAnswer =
			answerLetter && optionMap[answerLetter]
				? optionMap[answerLetter]
				: answerLetter
					? null
					: "";
		if (answerLetter && !optionMap[answerLetter]) {
			errors.push(`Blok ${bi + 1}: kunci "${answerLetter}" tidak ada di opsi`);
			continue;
		}
		results.push({
			type: "PG",
			content,
			options,
			correctAnswer: correctAnswer || "",
			isRequired: true,
			bobot: Number(defaultBobot) > 0 ? Number(defaultBobot) : 1,
			order: 0,
		});
	}
	return { results, errors };
}

function updateBulkPreview() {
	if (!bulkText.value.trim()) {
		bulkParsed.value = [];
		bulkPreview.value = { valid: 0, errors: 0 };
		return;
	}
	const { results, errors } = parseBulkText(
		bulkText.value,
		bulkDefaultBobot.value,
	);
	bulkParsed.value = results;
	bulkPreview.value = { valid: results.length, errors: errors.length };
}

async function saveBulkQuestions() {
	if (!bulkParsed.value.length) return;
	bulkSaving.value = true;
	try {
		const res = await api.post(
			`/exams/${activeExamId.value}/questions/bulk`,
			bulkParsed.value,
		);
		showBulkModal.value = false;
		bulkText.value = "";
		bulkParsed.value = [];
		bulkPreview.value = { valid: 0, errors: 0 };
		await load();
		Swal.fire({
			icon: "success",
			title: `${res.data.count} soal berhasil ditambahkan!`,
			timer: 2000,
			showConfirmButton: false,
		});
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal Impor",
			text: err.response?.data?.message || "Terjadi kesalahan.",
		});
	} finally {
		bulkSaving.value = false;
	}
}
const saving = ref(false);
const editId = ref(null);
const selectedQ = reactive(new Set());

const defaultForm = () => ({
	type: "PG",
	content: "",
	imageUrl: "",
	options: ["", "", "", "", ""],
	correctAnswer: "0",
	isRequired: true,
	bobot: 1,
	order: 0,
	pengacoh: [], // distractors for JODOH type
});
const form = ref(defaultForm());

const sanitize = (html) => DOMPurify.sanitize(html || "");
const { typesetMath } = useMathJax();

const countByType = (t) => questions.value.filter((q) => q.type === t).length;

const typeBadge = (t) =>
	({
		PG: "bg-blue-100 text-blue-700",
		PG_KOMPLEKS: "bg-indigo-100 text-indigo-700",
		BS: "bg-purple-100 text-purple-700",
		JODOH: "bg-orange-100 text-orange-700",
		Esai: "bg-slate-100 text-slate-600",
	})[t] || "bg-slate-100 text-slate-500";

async function load() {
	if (!activeExamId.value) return;
	loading.value = true;
	try {
		const res = await api.get(`/exams/${activeExamId.value}/questions`);
		questions.value = res.data.data || [];
		selectedQ.clear();
		typesetMath();
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

function toggleSelectQ(id) {
	if (selectedQ.has(id)) selectedQ.delete(id);
	else selectedQ.add(id);
}
function toggleSelectAllQ(checked) {
	if (checked) questions.value.forEach((q) => selectedQ.add(q.id));
	else selectedQ.clear();
}
async function bulkDeleteQ() {
	if (!selectedQ.size) return;
	const count = selectedQ.size;
	const result = await Swal.fire({
		title: `Hapus ${count} Soal?`,
		html: `<span class="text-red-600 font-bold">${count} soal</span> akan <b>dihapus permanen</b>.`,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		confirmButtonText: `Ya, Hapus ${count} Soal`,
		cancelButtonText: "Batal",
	});
	if (!result.isConfirmed) return;
	try {
		Swal.fire({
			title: "Menghapus...",
			allowOutsideClick: false,
			didOpen: () => Swal.showLoading(),
		});
		const res = await api.delete("/questions/bulk", {
			data: { ids: Array.from(selectedQ) },
		});
		Swal.fire({
			icon: "success",
			title: "Berhasil!",
			text: `${res.data.deleted} soal dihapus.`,
			timer: 1800,
			showConfirmButton: false,
		});
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal menghapus.",
		});
	}
}

function changeType(t) {
	if (form.value.type === t) return;
	form.value.type = t;
	if (t === "JODOH") {
		form.value.options = [
			{ q: "", a: "" },
			{ q: "", a: "" },
			{ q: "", a: "" },
		];
		form.value.pengacoh = [];
		form.value.correctAnswer = "Auto";
	} else if (t === "BS") {
		form.value.options = [""];
		form.value.correctAnswer = { 0: "Benar" };
	} else if (t === "PG_KOMPLEKS") {
		form.value.options = ["", "", "", "", ""];
		form.value.correctAnswer = [];
	} else {
		form.value.options = ["", "", "", "", ""];
		form.value.correctAnswer = "0";
	}
}

function openCreate() {
	editId.value = null;
	form.value = defaultForm();
	imageSearch.value = "";
	showModal.value = true;
}

// Toggle PG_KOMPLEKS correct answer (stores array of option indices as strings)
function togglePGKAnswer(idx) {
	const current = Array.isArray(form.value.correctAnswer)
		? [...form.value.correctAnswer]
		: [];
	const pos = current.indexOf(idx);
	if (pos === -1) current.push(idx);
	else current.splice(pos, 1);
	form.value.correctAnswer = current;
}

function openEdit(q) {
	editId.value = q.id;
	const rawOpts = Array.isArray(q.options) ? q.options : [];
	const realPairs = q.type === "JODOH" ? rawOpts.filter((p) => p.q) : rawOpts;
	const pengacohList =
		q.type === "JODOH" ? rawOpts.filter((p) => !p.q).map((p) => p.a) : [];
	let correctAnswer = q.correctAnswer;
	if (q.type === "PG_KOMPLEKS") {
		const caArr = Array.isArray(correctAnswer)
			? correctAnswer
			: typeof correctAnswer === "string"
				? (() => {
						try {
							return JSON.parse(correctAnswer);
						} catch {
							return [];
						}
					})()
				: [];
		correctAnswer = caArr
			.map((v) => String(rawOpts.indexOf(v)))
			.filter((v) => v !== "-1");
	}
	form.value = {
		type: q.type,
		content: q.content,
		imageUrl: q.imageUrl || "",
		options: q.type === "JODOH" ? realPairs : [...rawOpts],
		correctAnswer,
		isRequired: q.isRequired,
		bobot: q.bobot ?? 1,
		order: q.order,
		pengacoh: pengacohList,
	};
	imageSearch.value = q.imageUrl
		? allImages.value.find((i) => i.url === q.imageUrl)?.name || q.imageUrl
		: "";
	showModal.value = true;
}

async function save() {
	saving.value = true;
	try {
		const payload = { ...form.value };
		// Convert empty imageUrl to null (backend validates as URL or null)
		if (!payload.imageUrl) payload.imageUrl = null;
		if (payload.type === "JODOH") {
			// Combine real pairs with distractors (q = "" marks a distractor)
			const distractors = (form.value.pengacoh || [])
				.filter((v) => v.trim())
				.map((v) => ({ q: "", a: v.trim() }));
			payload.options = [
				...payload.options.filter((p) => p.q || p.a),
				...distractors,
			];
			delete payload.pengacoh;
		} else if (payload.type === "PG" || payload.type === "PG_KOMPLEKS") {
			payload.options = payload.options.filter((o) => o !== "");
			// For PG_KOMPLEKS, resolve correctAnswer indices to option text values
			if (
				payload.type === "PG_KOMPLEKS" &&
				Array.isArray(payload.correctAnswer)
			) {
				payload.correctAnswer = payload.correctAnswer
					.map((idx) => payload.options[Number(idx)])
					.filter(Boolean);
			}
			delete payload.pengacoh;
		} else {
			delete payload.pengacoh;
		}
		if (editId.value) {
			await api.patch(`/questions/${editId.value}`, payload);
		} else {
			await api.post(`/exams/${activeExamId.value}/questions`, payload);
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

async function confirmDelete(q) {
	const { isConfirmed } = await Swal.fire({
		icon: "warning",
		title: "Hapus soal?",
		showCancelButton: true,
		confirmButtonText: "Hapus",
		confirmButtonColor: "#ef4444",
	});
	if (!isConfirmed) return;
	try {
		await api.delete(`/questions/${q.id}`);
		await load();
	} catch (err) {
		Swal.fire({
			icon: "error",
			title: "Gagal",
			text: err.response?.data?.message || "Gagal menghapus.",
		});
	}
}

// --- Image autocomplete ---
const allImages = ref([]);
const imageSearch = ref("");
const showImageDropdown = ref(false);
const imageSearchResults = ref([]);

async function loadImages() {
	try {
		const res = await api.get("/images?limit=500");
		allImages.value = res.data.data || [];
	} catch (_) {}
}

function onImageSearch() {
	const term = imageSearch.value.toLowerCase().trim();
	if (!term) {
		imageSearchResults.value = allImages.value.slice(0, 10);
	} else {
		imageSearchResults.value = allImages.value
			.filter((img) => img.name.toLowerCase().includes(term))
			.slice(0, 10);
	}
	showImageDropdown.value = imageSearchResults.value.length > 0;
}

function selectImage(img) {
	form.value.imageUrl = img.url;
	imageSearch.value = img.name;
	showImageDropdown.value = false;
}
function hideImageDropdown() {
	setTimeout(() => {
		showImageDropdown.value = false;
	}, 200);
}

watch(examId, (val) => {
	if (val) {
		activeExamId.value = val;
		load();
	}
});
onMounted(() => {
	loadExams();
	loadImages();
	load();
});

// ── Preview Modal ──────────────────────────────────────────────
const showPreviewModal = ref(false);
const previewQ = ref(null);

function openPreview(q) {
	previewQ.value = q;
	showPreviewModal.value = true;
}

function parseOptions(q) {
	if (!q) return [];
	if (Array.isArray(q.options)) return q.options;
	try {
		return JSON.parse(q.options || "[]");
	} catch {
		return [];
	}
}

function isCorrectOption(q, i) {
	if (q.type === "PG") return String(i) === String(q.correctAnswer);
	if (q.type === "PG_KOMPLEKS") {
		try {
			const keys = Array.isArray(q.correctAnswer)
				? q.correctAnswer
				: typeof q.correctAnswer === "string"
					? JSON.parse(q.correctAnswer || "[]")
					: [];
			const opts = parseOptions(q);
			return Array.isArray(keys) && keys.includes(opts[i]);
		} catch {
			return false;
		}
	}
	return false;
}

function parseBsOptions(q) {
	try {
		const opts = Array.isArray(q.options)
			? q.options
			: typeof q.options === "string"
				? JSON.parse(q.options || "[]")
				: [];
		let keys = {};
		if (
			q.correctAnswer !== null &&
			typeof q.correctAnswer === "object" &&
			!Array.isArray(q.correctAnswer)
		) {
			keys = q.correctAnswer;
		} else if (typeof q.correctAnswer === "string") {
			try {
				keys = JSON.parse(q.correctAnswer);
			} catch {
				keys = {};
			}
		}
		return opts.map((text, i) => ({
			text,
			correct: keys[String(i)] === "Benar",
		}));
	} catch {
		return [];
	}
}

function parseJodohPairs(q) {
	try {
		const opts =
			typeof q.options === "string" ? JSON.parse(q.options) : q.options || [];
		return opts.filter((p) => p && p.q);
	} catch {
		return [];
	}
}
</script>
