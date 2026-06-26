<template>
	<MasterDataView
		title="Jenis Kasus"
		subtitle="Kelola kategori kasus bimbingan konseling"
		endpoint="/bk/jenis-kasus"
		icon="fas fa-tags"
		icon-color="text-purple-500"
		:columns="columns"
		:form-fields="formFields"
	/>
</template>
<script setup>
import MasterDataView from "@/components/MasterDataView.vue";
const columns = [
	{ key: "kode", label: "Kode" },
	{ key: "nama", label: "Nama Jenis Kasus" },
	{ key: "deskripsi", label: "Deskripsi" },
];
const formFields = [
	{ key: "nama", label: "Nama Jenis Kasus", type: "text", required: true },
	{ key: "deskripsi", label: "Deskripsi", type: "textarea" },
];
</script>
