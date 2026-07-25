<template>
	<div class="relative">
		<input
			ref="inputRef"
			type="text"
			v-model="query"
			:placeholder="placeholder"
			class="input"
			autocomplete="off"
			@input="onInput"
			@keydown.arrow-down.prevent="navigateDown"
			@keydown.arrow-up.prevent="navigateUp"
			@keydown.enter.prevent="selectHighlighted"
			@focus="showDropdown = results.length > 0"
			@blur="onBlur"
		/>
		<div
			v-if="showDropdown && results.length > 0"
			class="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto"
		>
			<div
				v-for="(s, i) in results"
				:key="s.nisn"
				class="px-4 py-2.5 cursor-pointer text-sm hover:bg-blue-50 transition"
				:class="{ 'bg-blue-50': i === highlightedIndex }"
				@mousedown.prevent="selectSiswa(s)"
			>
				<span class="font-semibold">{{ s.nama }}</span>
				<span class="text-slate-500"> — {{ s.kelas }} ({{ s.nisn }}) </span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "@/services/api.js";

const props = defineProps({
	modelValue: { type: String, default: "" },
	placeholder: { type: String, default: "Cari siswa..." },
});
const emit = defineEmits(["update:modelValue", "select"]);

const query = ref("");
const results = ref([]);
const showDropdown = ref(false);
const highlightedIndex = ref(-1);
let debounceTimer = null;

watch(
	() => props.modelValue,
	(val) => {
		if (!val) query.value = "";
	},
);

function onInput() {
	clearTimeout(debounceTimer);
	if (query.value.length < 2) {
		results.value = [];
		showDropdown.value = false;
		return;
	}
	debounceTimer = setTimeout(async () => {
		try {
			const { data } = await api.get("/siswa", {
				params: { search: query.value, take: 10 },
			});
			results.value = data.data?.slice(0, 10) || [];
			showDropdown.value = results.value.length > 0;
			highlightedIndex.value = -1;
		} catch {
			results.value = [];
		}
	}, 300);
}

function selectSiswa(s) {
	query.value = s.nama;
	emit("update:modelValue", s.nisn);
	emit("select", s);
	showDropdown.value = false;
	results.value = [];
}

function navigateDown() {
	if (highlightedIndex.value < results.value.length - 1)
		highlightedIndex.value++;
}
function navigateUp() {
	if (highlightedIndex.value > 0) highlightedIndex.value--;
}
function selectHighlighted() {
	if (highlightedIndex.value >= 0)
		selectSiswa(results.value[highlightedIndex.value]);
}
function onBlur() {
	setTimeout(() => {
		showDropdown.value = false;
	}, 150);
}
</script>
