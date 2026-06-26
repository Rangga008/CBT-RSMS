<template>
	<div class="space-y-6 animate-fade-in">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
					<i :class="iconColor + ' ' + icon"></i> {{ title }}
				</h2>
				<p class="text-sm text-slate-500">{{ subtitle }}</p>
			</div>
			<button @click="openAdd" class="btn-primary">
				<i class="fas fa-plus"></i> Tambah
			</button>
		</div>

		<div class="card">
			<div class="table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th v-for="col in columns" :key="col.key">{{ col.label }}</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list" :key="item.id">
							<td v-for="col in columns" :key="col.key">
								<template v-if="col.badge">
									<span
										:class="col.badgeMap?.[item[col.key]] || 'badge-gray'"
										>{{ item[col.key] }}</span
									>
								</template>
								<template v-else
									>{{ item[col.key] }}{{ col.suffix || "" }}</template
								>
							</td>
							<td>
								<div class="flex gap-2">
									<button
										@click="openEdit(item)"
										class="text-blue-400 hover:text-blue-600 transition"
									>
										<i class="fas fa-pencil-alt"></i>
									</button>
									<button
										@click="deleteItem(item.id)"
										class="text-red-400 hover:text-red-600 transition"
									>
										<i class="fas fa-trash-alt"></i>
									</button>
								</div>
							</td>
						</tr>
						<tr v-if="!list.length">
							<td
								:colspan="columns.length + 1"
								class="text-center py-8 text-slate-400"
							>
								Tidak ada data
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
			<div class="modal">
				<div class="modal-header">
					<h3 class="font-bold text-slate-800">
						{{ editing ? "Edit" : "Tambah" }} {{ title }}
					</h3>
					<button @click="showModal = false" class="text-slate-400">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal-body space-y-4">
					<div v-for="field in formFields" :key="field.key">
						<label class="label">{{ field.label }}</label>
						<textarea
							v-if="field.type === 'textarea'"
							v-model="form[field.key]"
							rows="3"
							class="input"
							:placeholder="field.label"
						></textarea>
						<select
							v-else-if="field.type === 'select'"
							v-model="form[field.key]"
							class="input"
						>
							<option v-for="opt in field.options" :key="opt" :value="opt">
								{{ opt }}
							</option>
						</select>
						<input
							v-else
							v-model="form[field.key]"
							:type="field.type || 'text'"
							class="input"
							:placeholder="field.label"
						/>
					</div>
				</div>
				<div class="modal-footer">
					<button @click="showModal = false" class="btn-secondary">
						Batal
					</button>
					<button @click="saveItem" :disabled="loading" class="btn-primary">
						<i v-if="loading" class="fas fa-circle-notch fa-spin"></i> Simpan
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api.js";

const props = defineProps({
	title: String,
	subtitle: String,
	endpoint: String,
	icon: { type: String, default: "fas fa-list" },
	iconColor: { type: String, default: "text-blue-500" },
	columns: { type: Array, default: () => [] },
	formFields: { type: Array, default: () => [] },
});

const list = ref([]);
const showModal = ref(false);
const editing = ref(null);
const loading = ref(false);
const form = ref({});

async function load() {
	const { data } = await api.get(props.endpoint, {
		params: { active: "false" },
	});
	list.value = data.data;
}

function openAdd() {
	editing.value = null;
	form.value = {};
	props.formFields.forEach((f) => {
		form.value[f.key] = f.default ?? (f.type === "number" ? 0 : "");
	});
	showModal.value = true;
}

function openEdit(item) {
	editing.value = item;
	form.value = { ...item };
	showModal.value = true;
}

async function saveItem() {
	loading.value = true;
	try {
		const payload = { ...form.value };
		props.formFields.forEach((f) => {
			if (f.type === "number") payload[f.key] = Number(payload[f.key]);
		});
		if (editing.value)
			await api.put(`${props.endpoint}/${editing.value.id}`, payload);
		else await api.post(props.endpoint, payload);
		showModal.value = false;
		load();
	} catch (e) {
		alert(e.response?.data?.message || "Gagal");
	} finally {
		loading.value = false;
	}
}

async function deleteItem(id) {
	if (!confirm("Hapus data ini?")) return;
	await api.delete(`${props.endpoint}/${id}`);
	load();
}

onMounted(load);
</script>
