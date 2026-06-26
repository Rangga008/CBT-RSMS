<template>
	<MasterDataView
		title="Jenis Pelanggaran"
		subtitle="Kelola kategori dan poin default pelanggaran siswa"
		endpoint="/bk/jenis-pelanggaran"
		icon="fas fa-exclamation-triangle"
		icon-color="text-red-500"
		:columns="columns"
		:form-fields="formFields"
	/>
</template>
<script setup>
import MasterDataView from "@/components/MasterDataView.vue";
const columns = [
	{ key: "kode", label: "Kode" },
	{ key: "nama", label: "Nama Pelanggaran" },
	{
		key: "kategori",
		label: "Kategori",
		badge: true,
		badgeMap: {
			ringan: "badge-green",
			sedang: "badge-yellow",
			berat: "badge-red",
			sangat_berat: "badge bg-purple-100 text-purple-700",
		},
	},
	{ key: "poin", label: "Poin", suffix: " poin" },
	{ key: "deskripsi", label: "Deskripsi" },
];
const formFields = [
	{ key: "nama", label: "Nama Pelanggaran", type: "text", required: true },
	{
		key: "kategori",
		label: "Kategori",
		type: "select",
		options: ["ringan", "sedang", "berat", "sangat_berat"],
		required: true,
	},
	{
		key: "poin",
		label: "Poin Default",
		type: "number",
		required: true,
		default: 5,
	},
	{ key: "deskripsi", label: "Deskripsi", type: "textarea" },
];
</script>
