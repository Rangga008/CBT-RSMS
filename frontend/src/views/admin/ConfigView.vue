<template>
	<div class="space-y-6">
		<h2 class="text-xl font-bold text-slate-800">Konfigurasi Aplikasi</h2>
		<div
			class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-3xl"
		>
			<div v-if="loading" class="text-slate-400 text-center py-8">
				Memuat konfigurasi...
			</div>
			<form v-else @submit.prevent="save" class="space-y-6">
				<!-- Nama & Subtitle -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="label-field">Nama Aplikasi</label>
						<input
							v-model="cfg.app_name"
							type="text"
							class="input-field"
							placeholder="Ujian Online V.3"
						/>
					</div>
					<div>
						<label class="label-field">Sub-Judul / Deskripsi</label>
						<input
							v-model="cfg.app_subtitle"
							type="text"
							class="input-field"
							placeholder="Tahun Ajaran 2025/2026"
						/>
					</div>
				</div>

				<!-- Nama Sekolah -->
				<div>
					<label class="label-field">Nama Sekolah / Instansi</label>
					<input
						v-model="cfg.school_name"
						type="text"
						class="input-field"
						placeholder="RSMS"
					/>
				</div>

				<div class="border-t border-slate-100 pt-2"></div>

				<!-- Logo -->
				<div>
					<label class="label-field">URL Logo Aplikasi</label>
					<div class="flex gap-3 items-start">
						<input
							v-model="cfg.logo_url"
							type="url"
							class="input-field flex-1"
							placeholder="https://..."
						/>
						<button
							type="button"
							@click="openImagePicker('logo')"
							class="shrink-0 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
						>
							📁 Pilih dari Library
						</button>
						<div
							class="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0"
						>
							<img
								v-if="cfg.logo_url"
								:src="cfg.logo_url"
								class="max-w-full max-h-full object-contain"
								@error="cfg.logo_url = ''"
								alt="Logo"
							/>
							<span
								v-else
								class="text-[10px] text-slate-400 text-center leading-tight"
								>Preview</span
							>
						</div>
					</div>
					<p class="text-xs text-slate-400 mt-1">
						URL gambar logo untuk halaman login.
					</p>
				</div>

				<!-- Background -->
				<div>
					<label class="label-field">URL Gambar Latar Login</label>
					<div class="flex gap-3 items-start">
						<input
							v-model="cfg.background_url"
							type="url"
							class="input-field flex-1"
							placeholder="https://..."
						/>
						<button
							type="button"
							@click="openImagePicker('background')"
							class="shrink-0 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
						>
							📁 Pilih dari Library
						</button>
						<div
							class="w-28 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative"
						>
							<img
								v-if="cfg.background_url"
								:src="cfg.background_url"
								class="w-full h-full object-cover"
								@error="cfg.background_url = ''"
								alt="Background"
							/>
							<span
								v-else
								class="text-[10px] text-slate-400 absolute inset-0 flex items-center justify-center text-center leading-tight"
								>Preview</span
							>
						</div>
					</div>
					<p class="text-xs text-slate-400 mt-1">
						Disarankan gambar orientasi landscape.
					</p>
				</div>

				<!-- Favicon -->
				<div>
					<label class="label-field">URL Favicon (Ikon Tab Browser)</label>
					<div class="flex gap-3 items-start">
						<input
							v-model="cfg.favicon_url"
							type="url"
							class="input-field flex-1"
							placeholder="https://... (file .ico / .png)"
						/>
						<div
							class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0"
						>
							<img
								v-if="cfg.favicon_url"
								:src="cfg.favicon_url"
								class="max-w-full max-h-full object-contain"
								@error="cfg.favicon_url = ''"
								alt="Favicon"
							/>
							<span
								v-else
								class="text-[10px] text-slate-400 text-center leading-tight"
								>Ikon</span
							>
						</div>
					</div>
					<p class="text-xs text-slate-400 mt-1">
						Ikon yang muncul di tab browser. Kosongkan untuk menggunakan
						default.
					</p>
				</div>

				<div class="border-t border-slate-100 pt-2"></div>

				<!-- Template Kartu Ujian -->
				<div class="space-y-4">
					<div>
						<p class="text-sm font-bold text-slate-700">Template Kartu Ujian</p>
						<p class="text-xs text-slate-400 mt-1">
							Isi data ini agar tampilan kartu ujian menyerupai format kartu
							sekolah.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label class="label-field">Baris Header 1</label>
							<input
								v-model="cfg.card_header_line1"
								type="text"
								class="input-field"
								placeholder="KEMENTERIAN AGAMA"
							/>
						</div>
						<div>
							<label class="label-field">Baris Header 2</label>
							<input
								v-model="cfg.card_header_line2"
								type="text"
								class="input-field"
								placeholder="PANITIA PENERIMAAN PESERTA DIDIK BARU"
							/>
						</div>
						<div>
							<label class="label-field">Baris Header 3</label>
							<input
								v-model="cfg.card_header_line3"
								type="text"
								class="input-field"
								placeholder="MADRASAH TSANAWIYAH NEGERI AMBON"
							/>
						</div>
						<div>
							<label class="label-field">Alamat Header</label>
							<input
								v-model="cfg.card_header_address"
								type="text"
								class="input-field"
								placeholder="Jl. Jend. Sudirman..."
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label class="label-field">Logo Kiri (URL)</label>
							<div class="flex gap-2">
								<input
									v-model="cfg.card_logo_left_url"
									type="text"
									class="input-field"
									placeholder="/uploads/... atau https://..."
								/>
								<button
									type="button"
									@click="openImagePicker('card_logo_left_url')"
									class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
								>
									📁 Library
								</button>
							</div>
						</div>
						<div>
							<label class="label-field">Logo Kanan (URL)</label>
							<div class="flex gap-2">
								<input
									v-model="cfg.card_logo_right_url"
									type="text"
									class="input-field"
									placeholder="/uploads/... atau https://..."
								/>
								<button
									type="button"
									@click="openImagePicker('card_logo_right_url')"
									class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
								>
									📁 Library
								</button>
							</div>
						</div>
						<div>
							<label class="label-field">Stempel (URL, opsional)</label>
							<div class="flex gap-2">
								<input
									v-model="cfg.card_stamp_url"
									type="text"
									class="input-field"
									placeholder="/uploads/... atau https://..."
								/>
								<button
									type="button"
									@click="openImagePicker('card_stamp_url')"
									class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
								>
									📁 Library
								</button>
							</div>
						</div>
						<div>
							<label class="label-field">Foto Placeholder (URL)</label>
							<div class="flex gap-2">
								<input
									v-model="cfg.card_photo_placeholder_url"
									type="text"
									class="input-field"
									placeholder="/uploads/... atau https://..."
								/>
								<button
									type="button"
									@click="openImagePicker('card_photo_placeholder_url')"
									class="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition whitespace-nowrap"
								>
									📁 Library
								</button>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label class="label-field">Lokasi/Tanggal TTD</label>
							<input
								v-model="cfg.card_signature_location"
								type="text"
								class="input-field"
								placeholder="Ambon, 4 Mei 2026"
							/>
						</div>
						<div>
							<label class="label-field">Jabatan Penandatangan</label>
							<input
								v-model="cfg.card_signature_title"
								type="text"
								class="input-field"
								placeholder="Ketua Panitia"
							/>
						</div>
						<div>
							<label class="label-field">Nama Penandatangan</label>
							<input
								v-model="cfg.card_signature_name"
								type="text"
								class="input-field"
								placeholder="Yusran, S.Pd"
							/>
						</div>
						<div>
							<label class="label-field">NIP Penandatangan</label>
							<input
								v-model="cfg.card_signature_nip"
								type="text"
								class="input-field"
								placeholder="NIP. 19740613..."
							/>
						</div>
					</div>
				</div>

				<div class="border-t border-slate-100 pt-2"></div>

				<!-- Tampilkan Hasil -->
				<div>
					<label class="label-field">Pengaturan Hasil Ujian</label>
					<div
						class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 mt-1"
					>
						<div>
							<p class="text-sm font-semibold text-slate-700">
								Tampilkan Hasil ke Siswa
							</p>
							<p class="text-xs text-slate-400 mt-0.5">
								Jika dinonaktifkan, siswa tidak dapat melihat nilai &amp;
								pembahasan setelah ujian.
							</p>
						</div>
						<label
							class="relative inline-flex items-center cursor-pointer ml-4 shrink-0"
						>
							<input
								type="checkbox"
								v-model="showResultBool"
								class="sr-only peer"
							/>
							<div
								class="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 after:shadow"
							></div>
						</label>
					</div>
				</div>

				<!-- Maks. Pelanggaran -->
				<div>
					<label class="label-field">Maks. Pelanggaran Kecurangan</label>
					<input
						v-model.number="cfg.max_violations"
						type="number"
						min="1"
						max="20"
						class="input-field w-32"
						placeholder="2"
					/>
					<p class="text-xs text-slate-400 mt-1">
						Jumlah tab-switch sebelum ujian otomatis dikumpulkan.
					</p>
				</div>

				<div class="pt-2">
					<button type="submit" :disabled="saving" class="btn-primary">
						{{ saving ? "Menyimpan..." : "💾 Simpan Perubahan" }}
					</button>
				</div>
			</form>
		</div>
	</div>

	<!-- Image Picker Modal -->
	<teleport to="body">
		<div
			v-if="showImagePicker"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
			@click.self="showImagePicker = false"
		>
			<div
				class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
			>
				<!-- Header -->
				<div
					class="flex items-center justify-between px-6 py-4 border-b border-slate-100"
				>
					<h3 class="text-base font-bold text-slate-800">
						📁 Pilih Gambar dari Library
					</h3>
					<button
						@click="showImagePicker = false"
						class="text-slate-400 hover:text-slate-600 text-xl leading-none"
					>
						✕
					</button>
				</div>
				<!-- Search -->
				<div class="px-6 py-3 border-b border-slate-100">
					<input
						v-model="pickerSearch"
						type="text"
						class="input-field"
						placeholder="Cari nama gambar..."
						autocomplete="off"
					/>
				</div>
				<!-- Grid -->
				<div class="overflow-y-auto flex-1 p-4">
					<div v-if="pickerLoading" class="text-center text-slate-400 py-10">
						Memuat gambar...
					</div>
					<div
						v-else-if="filteredPickerImages.length === 0"
						class="text-center text-slate-400 py-10"
					>
						Tidak ada gambar ditemukan.
					</div>
					<div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-3">
						<div
							v-for="img in filteredPickerImages"
							:key="img.id"
							@click="selectPickerImage(img)"
							class="group cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-400 transition"
						>
							<div class="aspect-square bg-slate-100 overflow-hidden">
								<img
									:src="img.url"
									class="w-full h-full object-cover group-hover:scale-105 transition"
								/>
							</div>
							<p
								class="text-[10px] text-slate-600 truncate px-1 py-1 font-medium"
							>
								{{ img.name }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api.js";
import Swal from "sweetalert2";

// --- Image Picker ---
const showImagePicker = ref(false);
const imagePickerTarget = ref("");
const pickerImages = ref([]);
const pickerSearch = ref("");
const pickerLoading = ref(false);

async function openImagePicker(target) {
	imagePickerTarget.value = target;
	pickerSearch.value = "";
	showImagePicker.value = true;
	if (!pickerImages.value.length) {
		pickerLoading.value = true;
		try {
			const res = await api.get("/images?limit=500");
			pickerImages.value = res.data.data || [];
		} catch (_) {
		} finally {
			pickerLoading.value = false;
		}
	}
}

const filteredPickerImages = computed(() => {
	if (!pickerSearch.value) return pickerImages.value;
	return pickerImages.value.filter((img) =>
		img.name.toLowerCase().includes(pickerSearch.value.toLowerCase()),
	);
});

function selectPickerImage(img) {
	if (imagePickerTarget.value === "logo") cfg.value.logo_url = img.url;
	else if (imagePickerTarget.value === "background")
		cfg.value.background_url = img.url;
	else cfg.value[imagePickerTarget.value] = img.url;
	showImagePicker.value = false;
	pickerSearch.value = "";
}

const cfg = ref({});
const loading = ref(true);
const saving = ref(false);

const showResultBool = computed({
	get: () => cfg.value.show_exam_result !== "false",
	set: (v) => {
		cfg.value.show_exam_result = v ? "true" : "false";
	},
});

async function load() {
	loading.value = true;
	try {
		const res = await api.get("/config");
		cfg.value = res.data.data || {};
		if (!cfg.value.show_exam_result) cfg.value.show_exam_result = "true";
		if (!cfg.value.max_violations) cfg.value.max_violations = "2";
	} catch (_) {
	} finally {
		loading.value = false;
	}
}

async function save() {
	saving.value = true;
	try {
		// Stringify all values — backend z.record(z.string()) requires strings
		const payload = Object.fromEntries(
			Object.entries(cfg.value).map(([k, v]) => [k, String(v ?? "")]),
		);
		// Keep old/new config keys consistent in database.
		if (Object.prototype.hasOwnProperty.call(payload, "background_url")) {
			payload.app_background = payload.background_url;
		}
		if (Object.prototype.hasOwnProperty.call(payload, "logo_url")) {
			payload.app_logo = payload.logo_url;
		}
		await api.patch("/config", payload);
		// Apply title and favicon immediately
		if (cfg.value.app_name) document.title = cfg.value.app_name;
		if (cfg.value.favicon_url) {
			let link = document.querySelector("link[rel~='icon']");
			if (!link) {
				link = document.createElement("link");
				link.rel = "icon";
				document.head.appendChild(link);
			}
			link.href = cfg.value.favicon_url;
		}
		Swal.fire({
			icon: "success",
			title: "Konfigurasi disimpan",
			timer: 1500,
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

onMounted(load);
</script>
