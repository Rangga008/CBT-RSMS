<template>
	<div class="space-y-6">
		<!-- Header -->
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
					<svg
						class="w-5 h-5 text-emerald-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
						/>
					</svg>
					Kartu Ujian Siswa
				</h2>
				<p class="text-sm text-slate-500 mt-1">
					Cetak kartu ujian untuk setiap siswa.
				</p>
			</div>
			<button
				v-if="selected.size > 0"
				@click="printSelected"
				class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition"
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
						d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
					/>
				</svg>
				Cetak Terpilih ({{ selected.size }})
			</button>
		</div>

		<!-- Search + Filter -->
		<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
			<div class="flex flex-col md:flex-row gap-3">
				<div
					class="flex items-center gap-2 text-sm text-slate-600 flex-shrink-0"
				>
					<span>Tampilkan</span>
					<select
						v-model="perPage"
						@change="currentPage = 1"
						class="input-field py-1.5 w-20 text-center"
					>
						<option :value="10">10</option>
						<option :value="25">25</option>
						<option :value="50">50</option>
						<option :value="100">100</option>
						<option value="all">Semua</option>
					</select>
					<span>data</span>
				</div>
				<div class="relative flex-1">
					<svg
						class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
					<input
						v-model="search"
						@input="currentPage = 1"
						type="text"
						placeholder="Cari nama, ID, atau kelas..."
						class="pl-9 input-field"
					/>
				</div>
				<select
					v-model="filterKelas"
					@change="currentPage = 1"
					class="input-field md:w-48"
				>
					<option value="">Semua Kelas</option>
					<option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
				</select>
			</div>
		</div>

		<!-- Table -->
		<div
			class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
		>
			<div
				v-if="loading"
				class="flex items-center justify-center py-16 text-slate-400"
			>
				<div
					class="animate-spin w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full mr-3"
				></div>
				Memuat data siswa...
			</div>
			<div
				v-else-if="filtered.length === 0"
				class="py-16 text-center text-slate-400"
			>
				<svg
					class="w-12 h-12 mx-auto mb-3 text-slate-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M15 19.128a9.38 9.38 0 002.625.372..."
					/>
				</svg>
				<p>Tidak ada siswa ditemukan.</p>
			</div>
			<div v-else>
				<table class="w-full text-left border-collapse">
					<thead>
						<tr
							class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest"
						>
							<th class="py-3 px-4 w-10">
								<input
									type="checkbox"
									:checked="
										selected.size === filtered.length && filtered.length > 0
									"
									@change="
										(e) =>
											e.target.checked
												? filtered.forEach((s) => selected.add(s.id))
												: selected.clear()
									"
									class="accent-emerald-600 w-4 h-4 rounded cursor-pointer"
								/>
							</th>
							<th class="py-3 px-4 w-10">#</th>
							<th class="py-3 px-4">Nama Siswa</th>
							<th class="py-3 px-4">Kelas</th>
							<th class="py-3 px-4 text-center">Status</th>
							<th class="py-3 px-4 text-right">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						<tr
							v-for="(s, i) in paginated"
							:key="s.id"
							class="hover:bg-slate-50 transition"
						>
							<td class="py-3 px-4">
								<input
									type="checkbox"
									:checked="selected.has(s.id)"
									@change="
										(e) =>
											e.target.checked
												? selected.add(s.id)
												: selected.delete(s.id)
									"
									class="accent-emerald-600 w-4 h-4 rounded cursor-pointer"
								/>
							</td>
							<td class="py-3 px-4 text-slate-400 text-sm">
								{{ (currentPage - 1) * perPage + i + 1 }}
							</td>
							<td class="py-3 px-4">
								<div class="flex items-center gap-3">
									<div
										class="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm uppercase"
									>
										{{ s.nama?.charAt(0) || "?" }}
									</div>
									<div>
										<p class="font-semibold text-slate-700 text-sm">
											{{ s.nama }}
										</p>
										<p
											class="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 rounded inline-block mt-0.5"
										>
											{{ s.userId || s.id }}
										</p>
									</div>
								</div>
							</td>
							<td class="py-3 px-4 text-sm text-slate-600">
								{{ s.kelas || "-" }}
							</td>
							<td class="py-3 px-4 text-center">
								<span
									:class="
										s.isActive
											? 'bg-emerald-50 text-emerald-700 border-emerald-100'
											: 'bg-red-50 text-red-700 border-red-100'
									"
									class="px-2 py-0.5 text-xs font-bold rounded-full border"
								>
									{{ s.isActive ? "Aktif" : "Non-Aktif" }}
								</span>
							</td>
							<td class="py-3 px-4 text-right">
								<button
									@click="printOne(s)"
									class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition"
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
											d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
										/>
									</svg>
									Cetak
								</button>
							</td>
						</tr>
					</tbody>
				</table>

				<!-- Pagination -->
				<div
					v-if="perPage !== 'all'"
					class="px-6 py-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500"
				>
					<div>
						Menampilkan {{ (currentPage - 1) * Number(perPage) + 1 }}–{{
							Math.min(currentPage * Number(perPage), filtered.length)
						}}
						dari {{ filtered.length }} siswa
					</div>
					<div class="flex gap-2">
						<button
							:disabled="currentPage === 1"
							@click="currentPage--"
							class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition font-semibold"
						>
							Sebelumnya
						</button>
						<button
							:disabled="currentPage >= totalPages"
							@click="currentPage++"
							class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition font-semibold"
						>
							Selanjutnya
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import api from "@/services/api.js";

const students = ref([]);
const loading = ref(true);
const search = ref("");
const filterKelas = ref("");
const currentPage = ref(1);
const perPage = ref(15);
const selected = reactive(new Set());
const appConfig = ref({
	app_name: "CBT RSMS",
	school_name: "RSMS",
	card_header_line1: "",
	card_header_line2: "",
	card_header_line3: "",
	card_header_address: "",
	card_logo_left_url: "",
	card_logo_right_url: "",
	card_stamp_url: "",
	card_photo_placeholder_url: "",
	card_signature_location: "",
	card_signature_title: "",
	card_signature_name: "",
	card_signature_nip: "",
	logo_url: "",
});

function esc(v) {
	return String(v ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

const uniqueKelas = computed(() => {
	const s = new Set(students.value.map((s) => s.kelas).filter(Boolean));
	return [...s].sort();
});

const filtered = computed(() => {
	const q = search.value.toLowerCase();
	const kelas = filterKelas.value;
	return students.value.filter((s) => {
		const matchSearch =
			!q ||
			s.nama?.toLowerCase().includes(q) ||
			s.id?.toLowerCase().includes(q) ||
			s.kelas?.toLowerCase().includes(q);
		const matchKelas = !kelas || s.kelas === kelas;
		return matchSearch && matchKelas;
	});
});

const totalPages = computed(() => {
	if (perPage.value === "all") return 1;
	return Math.max(1, Math.ceil(filtered.value.length / perPage.value));
});
const paginated = computed(() => {
	if (perPage.value === "all") return filtered.value;
	const pp = Number(perPage.value);
	const start = (currentPage.value - 1) * pp;
	return filtered.value.slice(start, start + pp);
});

function kartuHTML(s) {
	const cfg = appConfig.value || {};
	const appName = cfg.app_name || "CBT RSMS";
	const schoolName = cfg.school_name || "RSMS";
	const headerLine1 = cfg.card_header_line1 || "KEMENTERIAN AGAMA";
	const headerLine2 =
		cfg.card_header_line2 || "PANITIA PENERIMAAN PESERTA DIDIK BARU";
	const headerLine3 = cfg.card_header_line3 || schoolName;
	const headerAddress = cfg.card_header_address || "";
	const logoLeft = cfg.card_logo_left_url || cfg.logo_url || "";
	const logoRight = cfg.card_logo_right_url || cfg.logo_url || "";
	const stampUrl = cfg.card_stamp_url || "";
	const photoUrl = cfg.card_photo_placeholder_url || "";
	const signLocation = cfg.card_signature_location || "";
	const signTitle = cfg.card_signature_title || "Ketua Panitia";
	const signName = cfg.card_signature_name || "Panitia";
	const signNip = cfg.card_signature_nip || "";
	const participantNo = s.userId || s.id || "-";
	const studentName = s.nama || "-";
	const schoolOrigin = s.kelas || "-";
	const displayPassword = s.displayPassword || "-";
	return `
		<div style="width:340px;border:2px solid #111;background:#fff;color:#111;font-family:'Times New Roman',serif;position:relative;break-inside:avoid;page-break-inside:avoid;">
			<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #111;padding:4px 6px;gap:6px;">
				<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
					${logoLeft ? `<img src="${esc(logoLeft)}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : ""}
				</div>
				<div style="flex:1;text-align:center;line-height:1.1;">
					<div style="font-weight:700;font-size:7px;">${esc(headerLine1)}</div>
					<div style="font-weight:700;font-size:8px;">${esc(headerLine2)}</div>
					<div style="font-weight:700;font-size:9px;">${esc(headerLine3)}</div>
					${headerAddress ? `<div style="font-size:6.5px;margin-top:1px;">${esc(headerAddress)}</div>` : ""}
				</div>
				<div style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
					${logoRight ? `<img src="${esc(logoRight)}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : ""}
				</div>
      </div>

			<div style="border-bottom:1px solid #111;text-align:center;font-weight:700;font-size:10px;letter-spacing:.7px;padding:4px 0;">
				KARTU PESERTA UJIAN
			</div>

			<div style="padding:6px 8px 8px;">
				<table style="width:100%;border-collapse:separate;border-spacing:0 4px;font-size:9.2px;line-height:1.2;">
					<tr>
						<td style="width:82px;vertical-align:top;">No Peserta</td>
						<td style="width:8px;">:</td>
						<td style="font-weight:700;">${esc(participantNo)}</td>
					</tr>
					<tr>
						<td style="vertical-align:top;">Nama Lengkap</td>
						<td>:</td>
						<td style="font-weight:700;">${esc(studentName)}</td>
					</tr>
					<tr>
						<td style="vertical-align:top;">Asal/Kelas</td>
						<td>:</td>
						<td style="font-weight:700;">${esc(schoolOrigin)}</td>
					</tr>
					<tr>
						<td style="vertical-align:top;">Password</td>
						<td>:</td>
						<td style="font-weight:700;">${esc(displayPassword)}</td>
					</tr>
				</table>

				<div style="margin-top:7px;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;position:relative;">
					<div style="border:1px solid #111;width:78px;height:96px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">
						${photoUrl ? `<img src="${esc(photoUrl)}" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="font-size:7px;color:#666;text-align:center;line-height:1.3;">Foto<br/>Peserta</div>`}
					</div>

					<div style="flex:1;text-align:left;position:relative;min-height:96px;">
						${signLocation ? `<div style="font-size:8px;">${esc(signLocation)}</div>` : ""}
						<div style="font-size:8px;">${esc(signTitle)},</div>
						${stampUrl ? `<img src="${esc(stampUrl)}" style="position:absolute;left:-18px;top:6px;width:86px;height:86px;object-fit:contain;opacity:.45;" />` : ""}
						<div style="height:42px;"></div>
						<div style="font-size:8.2px;font-weight:700;text-decoration:underline;">${esc(signName)}</div>
						${signNip ? `<div style="font-size:7.6px;">${esc(signNip)}</div>` : ""}
					</div>
          </div>
			</div>

			<div style="border-top:1px solid #111;padding:4px 6px;text-align:center;font-size:7px;">
				${esc(appName)} - ${esc(schoolName)}
			</div>
    </div>
  `;
}

function printOne(s) {
	openPrintWindow([s]);
}

function printSelected() {
	const list = students.value.filter((s) => selected.has(s.id));
	if (list.length > 0) openPrintWindow(list);
}

function openPrintWindow(list) {
	const w = window.open("", "_blank", "width=1000,height=700");
	const cards = list.map((s) => kartuHTML(s)).join("");
	w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kartu Ujian Siswa</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f9; padding: 20px; font-family: 'Segoe UI', sans-serif; }
	        .cards-grid { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-start; align-items: flex-start; }
        @media print {
          body { background: white; padding: 0; }
          .no-print { display: none; }
	          .cards-grid { gap: 8px; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:16px;display:flex;gap:10px;align-items:center;">
        <button onclick="window.print()" style="background:#059669;color:white;border:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;">
          🖨️ Cetak / Simpan PDF
        </button>
        <button onclick="window.close()" style="background:#64748b;color:white;border:none;padding:10px 16px;border-radius:8px;font-size:14px;cursor:pointer;">
          ✕ Tutup
        </button>
        <span style="font-size:12px;color:#64748b;">${list.length} kartu</span>
      </div>
      <div class="cards-grid">${cards}</div>
    </body>
    </html>
  `);
	w.document.close();
}

onMounted(async () => {
	try {
		const [usersRes, cfgRes] = await Promise.all([
			api.get("/users?role=Siswa&limit=500"),
			api.get("/config").catch(() => ({ data: { data: {} } })),
		]);
		students.value = usersRes.data.data || [];
		Object.assign(appConfig.value, cfgRes.data.data || {});
	} catch (_) {
	} finally {
		loading.value = false;
	}
});
</script>
