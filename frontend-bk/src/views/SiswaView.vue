<template>
	<div class="space-y-6 animate-fade-in">
		<div
			class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-800">Data Siswa</h2>
				<p class="text-sm text-slate-500">
					Kelola database siswa untuk sistem BK & Absensi
				</p>
			</div>
			<div class="flex gap-2 flex-wrap">
				<a
					:href="templateUrl"
					download="template-import-siswa.csv"
					class="btn-secondary"
					title="Download template CSV"
				>
					<i class="fas fa-download"></i> Template
				</a>
				<button @click="triggerImport" class="btn-secondary">
					<i class="fas fa-file-excel"></i> Import Excel/CSV
				</button>
				<input
					ref="importFileInput"
					type="file"
					accept=".xlsx,.xls,.csv"
					class="hidden"
					@change="handleImportFile"
				/>
				<button
					@click="printQrCards"
					:disabled="printingQr"
					class="btn-secondary"
					title="Cetak kartu QR per kelas"
				>
					<i v-if="printingQr" class="fas fa-circle-notch fa-spin"></i>
					<i v-else class="fas fa-qrcode"></i>
					Kartu QR
				</button>
				<button @click="openAdd" class="btn-primary">
					<i class="fas fa-user-plus"></i> Tambah Siswa
				</button>
			</div>
		</div>

		<!-- Filters -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div class="flex-1 min-w-[160px]">
				<label class="label">Cari</label>
				<input
					v-model="search"
					@input="debouncedLoad"
					type="text"
					class="input"
					placeholder="Nama / NISN..."
				/>
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" @change="load" class="input w-32">
					<option value="">Semua</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<span class="text-sm text-slate-500 self-end pb-2.5"
				>{{ siswaList.length }} siswa</span
			>
		</div>

		<div class="card">
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>NISN</th>
							<th>Nama</th>
							<th>Kelas</th>
							<th>L/P</th>
							<th>No. HP Ortu</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="s in siswaList" :key="s.nisn">
							<td class="font-mono text-xs">{{ s.nisn }}</td>
							<td
								class="font-semibold cursor-pointer hover:text-blue-600"
								@click="$router.push('/bk/profil/' + s.nisn)"
							>
								{{ s.nama }}
							</td>
							<td>{{ s.kelas }}</td>
							<td>
								<span
									:class="
										s.jenisKelamin === 'L'
											? 'badge-blue'
											: 'badge bg-pink-100 text-pink-700'
									"
									>{{ s.jenisKelamin }}</span
								>
							</td>
							<td class="text-xs">{{ s.noHp || "-" }}</td>
							<td>
								<div class="flex gap-2">
									<button
										@click="$router.push('/bk/profil/' + s.nisn)"
										class="text-purple-400 hover:text-purple-600 transition"
										title="Profil BK"
									>
										<i class="fas fa-user-circle"></i>
									</button>
									<button
										@click="openEdit(s)"
										class="text-blue-400 hover:text-blue-600 transition"
									>
										<i class="fas fa-pencil-alt"></i>
									</button>
									<button
										v-if="authStore.isAdmin"
										@click="deleteSiswa(s.nisn)"
										class="text-red-400 hover:text-red-600 transition"
									>
										<i class="fas fa-trash-alt"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr v-if="!siswaList.length">
							<td colspan="6" class="text-center py-8 text-slate-400">
								Tidak ada data
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
			<div class="modal modal-lg">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">
						{{ editing ? "Edit" : "Tambah" }} Siswa
					</h3>
					<button @click="showModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label class="label">NISN *</label
						><input
							v-model="form.nisn"
							type="text"
							class="input"
							:disabled="!!editing"
						/>
					</div>
					<div>
						<label class="label">Nama Lengkap *</label
						><input v-model="form.nama" type="text" class="input" />
					</div>
					<div>
						<label class="label">Kelas *</label
						><input
							v-model="form.kelas"
							type="text"
							class="input"
							placeholder="X-RPL"
						/>
					</div>
					<div>
						<label class="label">Jenis Kelamin *</label>
						<select v-model="form.jenisKelamin" class="input">
							<option value="L">Laki-laki</option>
							<option value="P">Perempuan</option>
						</select>
					</div>
					<div>
						<label class="label">Tanggal Lahir</label
						><input v-model="form.tanggalLahir" type="date" class="input" />
					</div>
					<div>
						<label class="label">Agama</label
						><input v-model="form.agama" type="text" class="input" />
					</div>
					<div>
						<label class="label">Nama Ayah</label
						><input v-model="form.namaAyah" type="text" class="input" />
					</div>
					<div>
						<label class="label">Nama Ibu</label
						><input v-model="form.namaIbu" type="text" class="input" />
					</div>
					<div>
						<label class="label">No. HP Orang Tua</label
						><input v-model="form.noHp" type="text" class="input" />
					</div>
					<div class="sm:col-span-2">
						<label class="label">Alamat</label
						><textarea v-model="form.alamat" rows="2" class="input"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showModal = false" class="btn-secondary">
						Batal
					</button>
					<button
						@click="saveSiswa"
						:disabled="saveLoading"
						class="btn-primary"
					>
						<i v-if="saveLoading" class="fas fa-circle-notch fa-spin"></i>
						Simpan
					</button>
				</div>
			</div>
		</div>
		<!-- Import Modal -->
		<div
			v-if="showImportModal"
			class="modal-overlay"
			@click.self="showImportModal = false"
		>
			<div class="modal modal-lg">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">
						<i class="fas fa-file-excel text-green-500"></i> Import Siswa dari
						Excel
					</h3>
					<button @click="showImportModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div
						class="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-3 text-sm"
					>
						<p class="font-semibold mb-1">
							Format kolom Excel yang diperlukan:
						</p>
						<p class="font-mono text-xs">
							NISN | Nama | Kelas | JenisKelamin (L/P) | TanggalLahir (opsional)
							| Agama | NamaAyah | NamaIbu | NoHP | Alamat
						</p>
					</div>
					<div v-if="importPreview.length">
						<p class="text-sm text-slate-600 mb-2">
							Preview
							<strong>{{ importPreview.length }}</strong> data:
						</p>
						<div class="table-wrap max-h-64">
							<table class="table text-xs">
								<thead>
									<tr>
										<th>NISN</th>
										<th>Nama</th>
										<th>Kelas</th>
										<th>L/P</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, i) in importPreview.slice(0, 10)" :key="i">
										<td class="font-mono">{{ row.nisn }}</td>
										<td>{{ row.nama }}</td>
										<td>{{ row.kelas }}</td>
										<td>{{ row.jenisKelamin }}</td>
									</tr>
									<tr v-if="importPreview.length > 10">
										<td colspan="4" class="text-center text-slate-400">
											... dan {{ importPreview.length - 10 }} data lainnya
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div
						v-if="importResult"
						class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700"
					>
						<i class="fas fa-check-circle"></i>
						Import selesai:
						<strong>{{ importResult.ditambah }}</strong> ditambah,
						<strong>{{ importResult.diperbarui }}</strong> diperbarui (total
						{{ importResult.total }})
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showImportModal = false" class="btn-secondary">
						Tutup
					</button>
					<button
						v-if="importPreview.length && !importResult"
						@click="confirmImport"
						:disabled="importLoading"
						class="btn-primary"
					>
						<i v-if="importLoading" class="fas fa-circle-notch fa-spin"></i>
						Konfirmasi Import {{ importPreview.length }} Siswa
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api.js";
import { useAuthStore } from "@/stores/auth.js";
import { useToast } from "@/composables/useToast.js";
import { useConfirm } from "@/composables/useConfirm.js";
const toast = useToast();
const { confirm } = useConfirm();

const authStore = useAuthStore();

const templateUrl = computed(
	() => `${import.meta.env.VITE_API_URL || ""}/api/v1/siswa/import-template`,
);
const siswaList = ref([]);
const kelasList = ref([]);
const search = ref("");
const filterKelas = ref("");
const showModal = ref(false);
const editing = ref(null);
const saveLoading = ref(false);
const form = ref({});

// Import state
const importFileInput = ref(null);
const showImportModal = ref(false);
const importPreview = ref([]);
const importResult = ref(null);
const importLoading = ref(false);

let debounceTimer = null;

function debouncedLoad() {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(load, 400);
}

async function load() {
	const params = {};
	if (search.value) params.search = search.value;
	if (filterKelas.value) params.kelas = filterKelas.value;
	const { data } = await api.get("/siswa", { params });
	siswaList.value = data.data;
}

function openAdd() {
	editing.value = null;
	form.value = {
		nisn: "",
		nama: "",
		jenisKelamin: "L",
		kelas: "",
		tanggalLahir: "",
		agama: "",
		namaAyah: "",
		namaIbu: "",
		noHp: "",
		alamat: "",
	};
	showModal.value = true;
}

function openEdit(s) {
	editing.value = s;
	form.value = {
		...s,
		tanggalLahir: s.tanggalLahir ? s.tanggalLahir.split("T")[0] : "",
	};
	showModal.value = true;
}

function triggerImport() {
	importPreview.value = [];
	importResult.value = null;
	importFileInput.value.click();
}

async function handleImportFile(e) {
	const file = e.target.files[0];
	if (!file) return;
	e.target.value = "";
	try {
		const { read, utils } = await import("xlsx");
		const buf = await file.arrayBuffer();
		const wb = read(buf);
		const ws = wb.Sheets[wb.SheetNames[0]];
		const rows = utils.sheet_to_json(ws, { defval: "" });

		// Normalize column names (case-insensitive)
		const normalize = (key) => key.toLowerCase().replace(/[\s_\-\.]/g, "");

		importPreview.value = rows
			.map((row) => {
				const entry = {};
				Object.entries(row).forEach(([k, v]) => {
					entry[normalize(k)] = String(v || "").trim();
				});
				return {
					nisn: entry.nisn || entry.nis || "",
					nama: entry.nama || entry.namalengkap || entry.namasiswa || "",
					kelas: entry.kelas || entry.rombel || "",
					jenisKelamin: ["p", "perempuan"].includes(
						(entry.jeniskelamin || entry.jk || entry.l || "L").toLowerCase(),
					)
						? "P"
						: "L",
					tanggalLahir: entry.tanggallahir || entry.tgllahir || null,
					agama: entry.agama || null,
					namaAyah: entry.namaayah || entry.ayah || null,
					namaIbu: entry.namaibu || entry.ibu || null,
					noHp: entry.nohp || entry.hp || entry.telp || null,
					alamat: entry.alamat || null,
				};
			})
			.filter((r) => r.nisn && r.nama && r.kelas);
		showImportModal.value = true;
	} catch (err) {
		toast.error("Gagal membaca file: " + err.message);
	}
}

async function confirmImport() {
	importLoading.value = true;
	try {
		const { data } = await api.post("/siswa/import", {
			data: importPreview.value,
		});
		importResult.value = data.data;
		await load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal import");
	} finally {
		importLoading.value = false;
	}
}

async function saveSiswa() {
	saveLoading.value = true;
	try {
		const payload = { ...form.value };
		if (!payload.tanggalLahir) payload.tanggalLahir = null;
		if (editing.value) await api.put(`/siswa/${editing.value.nisn}`, payload);
		else await api.post("/siswa", payload);
		showModal.value = false;
		load();
	} catch (e) {
		toast.error(e.response?.data?.message || "Gagal");
	} finally {
		saveLoading.value = false;
	}
}

async function deleteSiswa(nisn) {
	if (
		!(await confirm(
			"Hapus siswa ini? Semua data absensi dan BK terkait akan terhapus!",
		))
	)
		return;
	await api.delete(`/siswa/${nisn}`);
	load();
}

// ── QR Card PDF (per kelas or all) ───────────────────────────────────────────
const printingQr = ref(false);

async function printQrCards() {
	const currentKelas = filterKelas.value;
	printingQr.value = true;
	try {
		// Fetch siswa (apply current kelas filter)
		const params = { active: "all" };
		if (currentKelas) params.kelas = currentKelas;
		const { data } = await api.get("/siswa", { params });
		const siswaBatch = data.data || [];
		if (!siswaBatch.length) {
			toast.warn("Tidak ada siswa untuk dicetak.");
			return;
		}

		// Generate QR data URLs
		const { default: QRCode } = await import("qrcode");
		const cards = await Promise.all(
			siswaBatch.map(async (s) => ({
				...s,
				qrDataUrl: await QRCode.toDataURL(s.nisn, {
					width: 160,
					margin: 1,
					errorCorrectionLevel: "H",
				}),
			})),
		);

		// Build print window
		const schoolName = document.title || "SIAP BK RSMS";
		const html = `<!DOCTYPE html>
<html><head><title>Kartu QR Absensi</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; padding: 10px; background: #fff; }
  .grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .card { width: 85.6mm; min-height: 54mm; border: 1px solid #ccc; border-radius: 6px;
          padding: 8px; display: flex; gap: 8px; align-items: center; page-break-inside: avoid; }
  .qr img { width: 80px; height: 80px; }
  .info { flex: 1; }
  .school { font-size: 7px; color: #666; margin-bottom: 2px; }
  .nama { font-size: 11px; font-weight: bold; line-height: 1.2; }
  .kelas { font-size: 9px; color: #333; margin-top: 2px; }
  .nisn { font-size: 8px; color: #999; margin-top: 4px; }
  @media print { @page { margin: 8mm; } }
</style></head><body>
<div class="grid">
${cards
	.map(
		(s) => `<div class="card">
  <div class="qr"><img src="${s.qrDataUrl}" alt="QR" /></div>
  <div class="info">
    <p class="school">${schoolName}</p>
    <p class="nama">${s.nama}</p>
    <p class="kelas">${s.kelas}</p>
    <p class="nisn">NISN: ${s.nisn}</p>
  </div>
</div>`,
	)
	.join("")}
</div>
<script>window.onload=()=>{ window.print(); window.onafterprint=()=>window.close(); }<\/script>
</body></html>`;

		const win = window.open("", "_blank", "width=900,height=700");
		win.document.write(html);
		win.document.close();
	} finally {
		printingQr.value = false;
	}
}

onMounted(async () => {
	await Promise.all([
		load(),
		api.get("/siswa/kelas-list").then(({ data }) => {
			kelasList.value = data.data;
		}),
	]);
});
</script>
