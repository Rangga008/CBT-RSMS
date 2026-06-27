<template>
	<div class="space-y-6 animate-fade-in">
		<div>
			<h2 class="text-xl font-bold text-slate-800">Rekap Absensi</h2>
			<p class="text-sm text-slate-500">
				Laporan kehadiran siswa per rentang waktu
			</p>
		</div>

		<!-- Filter -->
		<div class="card-sm flex flex-wrap gap-3 items-end">
			<div>
				<label class="label">Dari Tanggal</label
				><input v-model="dari" type="date" class="input" />
			</div>
			<div>
				<label class="label">Sampai Tanggal</label
				><input v-model="sampai" type="date" class="input" />
			</div>
			<div>
				<label class="label">Kelas</label>
				<select v-model="filterKelas" class="input w-32">
					<option value="">Semua Kelas</option>
					<option v-for="k in kelasList" :key="k">{{ k }}</option>
				</select>
			</div>
			<div>
				<label class="label">Siswa (NISN)</label
				><input
					v-model="filterNisn"
					type="text"
					class="input w-36"
					placeholder="Opsional"
				/>
			</div>
			<button @click="loadRekap" :disabled="loading" class="btn-primary">
				<i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
				<i v-else class="fas fa-search"></i> Tampilkan
			</button>
			<template v-if="rekap.length">
				<div>
					<label class="label">Mode Export</label>
					<select v-model="modeExport" class="input">
						<option value="ringkasan_siswa">Rekap per Siswa</option>
						<option value="per_kelas_multisheet">
							Per Kelas (multi-sheet)
						</option>
						<option value="per_tanggal">Per Tanggal (semua kelas)</option>
						<option value="per_tanggal_kelas">Per Tanggal + Kelas</option>
						<option value="per_bulan">Per Bulan</option>
					</select>
				</div>
				<button
					@click="exportExcel"
					:disabled="exportLoading"
					class="btn-secondary"
				>
					<i v-if="exportLoading" class="fas fa-circle-notch fa-spin"></i>
					<i v-else class="fas fa-file-excel"></i> Export Excel
				</button>
			</template>
		</div>

		<!-- Summary stats -->
		<div v-if="rekap.length" class="grid grid-cols-4 gap-3">
			<div class="card-sm text-center">
				<div class="text-2xl font-bold text-emerald-600">
					{{ totals.hadir }}
				</div>
				<div class="text-xs text-slate-500">Total Hadir</div>
			</div>
			<div class="card-sm text-center">
				<div class="text-2xl font-bold text-yellow-600">{{ totals.sakit }}</div>
				<div class="text-xs text-slate-500">Total Sakit</div>
			</div>
			<div class="card-sm text-center">
				<div class="text-2xl font-bold text-blue-600">{{ totals.izin }}</div>
				<div class="text-xs text-slate-500">Total Izin</div>
			</div>
			<div class="card-sm text-center">
				<div class="text-2xl font-bold text-red-600">{{ totals.alpa }}</div>
				<div class="text-xs text-slate-500">Total Alpa</div>
			</div>
		</div>

		<!-- Table -->
		<div v-if="rekap.length" class="card">
			<div class="table-wrap">
				<table class="table" id="rekap-table">
					<thead>
						<tr>
							<th>NISN</th>
							<th>Nama Siswa</th>
							<th>Kelas</th>
							<th class="text-emerald-600">Hadir</th>
							<th class="text-yellow-600">Sakit</th>
							<th class="text-blue-600">Izin</th>
							<th class="text-red-600">Alpa</th>
							<th>Total Hari</th>
							<th>% Kehadiran</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="r in rekap" :key="r.nisn">
							<td class="font-mono text-xs">{{ r.nisn }}</td>
							<td
								class="font-semibold cursor-pointer hover:text-blue-600"
								@click="$router.push('/bk/profil/' + r.nisn)"
							>
								{{ r.nama }}
							</td>
							<td>{{ r.kelas }}</td>
							<td class="text-emerald-600 font-bold">{{ r.hadir }}</td>
							<td class="text-yellow-600 font-bold">{{ r.sakit }}</td>
							<td class="text-blue-600 font-bold">{{ r.izin }}</td>
							<td class="text-red-600 font-bold">{{ r.alpa }}</td>
							<td>{{ r.total }}</td>
							<td>
								<div class="flex items-center gap-2">
									<div
										class="flex-1 bg-slate-100 rounded-full h-2 max-w-[80px]"
									>
										<div
											:style="`width:${r.persen}%`"
											:class="[
												'h-2 rounded-full',
												r.persen >= 80
													? 'bg-emerald-500'
													: r.persen >= 60
														? 'bg-yellow-500'
														: 'bg-red-500',
											]"
										></div>
									</div>
									<span
										:class="[
											'text-sm font-bold',
											r.persen >= 80
												? 'text-emerald-600'
												: r.persen >= 60
													? 'text-yellow-600'
													: 'text-red-600',
										]"
										>{{ r.persen }}%</span
									>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div
			v-if="!rekap.length && !loading"
			class="card text-center py-12 text-slate-400"
		>
			<i class="fas fa-calendar-alt text-4xl mb-3 opacity-30"></i>
			<p>Pilih rentang tanggal dan klik Tampilkan</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api.js";

const dari = ref(new Date(new Date().setDate(1)).toISOString().split("T")[0]);
const sampai = ref(new Date().toISOString().split("T")[0]);
const filterKelas = ref("");
const filterNisn = ref("");
const kelasList = ref([]);
const rekap = ref([]);
const loading = ref(false);
const modeExport = ref("ringkasan_siswa");
const exportLoading = ref(false);

const totals = computed(() => ({
	hadir: rekap.value.reduce((s, r) => s + r.hadir, 0),
	sakit: rekap.value.reduce((s, r) => s + r.sakit, 0),
	izin: rekap.value.reduce((s, r) => s + r.izin, 0),
	alpa: rekap.value.reduce((s, r) => s + r.alpa, 0),
}));

async function loadRekap() {
	loading.value = true;
	try {
		const params = { dari: dari.value, sampai: sampai.value };
		if (filterKelas.value) params.kelas = filterKelas.value;
		if (filterNisn.value) params.nisn = filterNisn.value;
		const { data } = await api.get("/absensi/rekap", { params });
		rekap.value = (data.data || []).map((r) => ({
			...r,
			total: r.hadir + r.sakit + r.izin + r.alpa,
			persen:
				r.hadir + r.sakit + r.izin + r.alpa > 0
					? Math.round((r.hadir / (r.hadir + r.sakit + r.izin + r.alpa)) * 100)
					: 0,
		}));
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
}

async function exportExcel() {
	exportLoading.value = true;
	try {
		const { utils, writeFile } = await import("xlsx");
		const wb = utils.book_new();
		const filename = `Rekap_Absensi_${dari.value}_${sampai.value}.xlsx`;

		if (modeExport.value === "ringkasan_siswa") {
			const ws = utils.json_to_sheet(
				rekap.value.map((r) => ({
					NISN: r.nisn,
					Nama: r.nama,
					Kelas: r.kelas,
					Hadir: r.hadir,
					Sakit: r.sakit,
					Izin: r.izin,
					Alpa: r.alpa,
					"Total Hari": r.total,
					"% Kehadiran": r.persen + "%",
				})),
			);
			utils.book_append_sheet(wb, ws, "Rekap Absensi");
		} else if (modeExport.value === "per_kelas_multisheet") {
			const kelasBuckets = {};
			rekap.value.forEach((r) => {
				if (!kelasBuckets[r.kelas]) kelasBuckets[r.kelas] = [];
				kelasBuckets[r.kelas].push(r);
			});
			const sortedKelas = Object.keys(kelasBuckets).sort();
			if (!sortedKelas.length) sortedKelas.push("Semua");
			sortedKelas.forEach((kelas) => {
				const rows = kelasBuckets[kelas] || [];
				const ws = utils.json_to_sheet(
					rows.map((r) => ({
						NISN: r.nisn,
						Nama: r.nama,
						Hadir: r.hadir,
						Sakit: r.sakit,
						Izin: r.izin,
						Alpa: r.alpa,
						"Total Hari": r.total,
						"% Kehadiran": r.persen + "%",
					})),
				);
				utils.book_append_sheet(wb, ws, kelas.substring(0, 31));
			});
		} else if (
			modeExport.value === "per_tanggal" ||
			modeExport.value === "per_tanggal_kelas"
		) {
			const params = { dari: dari.value, sampai: sampai.value };
			if (filterKelas.value) params.kelas = filterKelas.value;
			const { data } = await api.get("/absensi/rekap-harian", { params });
			const rows = data.data || [];

			if (modeExport.value === "per_tanggal") {
				const byDate = {};
				rows.forEach((r) => {
					if (!byDate[r.tanggal])
						byDate[r.tanggal] = {
							Tanggal: r.tanggal,
							Hadir: 0,
							Sakit: 0,
							Izin: 0,
							Alpa: 0,
						};
					byDate[r.tanggal].Hadir += r.hadir;
					byDate[r.tanggal].Sakit += r.sakit;
					byDate[r.tanggal].Izin += r.izin;
					byDate[r.tanggal].Alpa += r.alpa;
				});
				const ws = utils.json_to_sheet(Object.values(byDate));
				utils.book_append_sheet(wb, ws, "Per Tanggal");
			} else {
				const ws = utils.json_to_sheet(
					rows.map((r) => ({
						Tanggal: r.tanggal,
						Kelas: r.kelas,
						Hadir: r.hadir,
						Sakit: r.sakit,
						Izin: r.izin,
						Alpa: r.alpa,
					})),
				);
				utils.book_append_sheet(wb, ws, "Per Tanggal & Kelas");
			}
		} else if (modeExport.value === "per_bulan") {
			const params = { dari: dari.value, sampai: sampai.value };
			if (filterKelas.value) params.kelas = filterKelas.value;
			const { data } = await api.get("/absensi/rekap-harian", { params });
			const rows = data.data || [];
			const byBulan = {};
			rows.forEach((r) => {
				const bulan = r.tanggal.substring(0, 7);
				if (!byBulan[bulan])
					byBulan[bulan] = {
						Bulan: bulan,
						Hadir: 0,
						Sakit: 0,
						Izin: 0,
						Alpa: 0,
					};
				byBulan[bulan].Hadir += r.hadir;
				byBulan[bulan].Sakit += r.sakit;
				byBulan[bulan].Izin += r.izin;
				byBulan[bulan].Alpa += r.alpa;
			});
			const ws = utils.json_to_sheet(Object.values(byBulan));
			utils.book_append_sheet(wb, ws, "Per Bulan");
		}

		writeFile(wb, filename);
	} catch (e) {
		alert("Gagal export: " + (e.message || e));
	} finally {
		exportLoading.value = false;
	}
}

onMounted(() => {
	api.get("/siswa/kelas-list").then(({ data }) => {
		kelasList.value = data.data;
	});
});
</script>
