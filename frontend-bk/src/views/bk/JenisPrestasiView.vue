<template>
	<MasterDataView
		title="Jenis Prestasi"
		subtitle="Kelola kategori dan poin default prestasi siswa"
		endpoint="/bk/jenis-prestasi"
		icon="fas fa-trophy"
		icon-color="text-yellow-500"
		:columns="columns"
		:form-fields="formFields"
	/>
</template>
<script setup>
import MasterDataView from "@/components/MasterDataView.vue";
const columns = [
	{ key: "kode", label: "Kode" },
	{ key: "nama", label: "Nama Prestasi" },
	{
		key: "kategori",
		label: "Kategori",
		badge: true,
		badgeMap: {
			akademik: "badge-blue",
			non_akademik: "badge-purple",
			olahraga: "badge-green",
			seni: "badge bg-pink-100 text-pink-700",
			keagamaan: "badge bg-teal-100 text-teal-700",
			organisasi: "badge-yellow",
		},
	},
	{ key: "poin", label: "Poin", suffix: " poin" },
];
const formFields = [
	{ key: "nama", label: "Nama Prestasi", type: "text", required: true },
	{
		key: "kategori",
		label: "Kategori",
		type: "select",
		options: [
			"akademik",
			"non_akademik",
			"olahraga",
			"seni",
			"keagamaan",
			"organisasi",
		],
		required: true,
	},
	{
		key: "poin",
		label: "Poin Default",
		type: "number",
		required: true,
		default: 10,
	},
	{ key: "deskripsi", label: "Deskripsi", type: "textarea" },
];
</script>
