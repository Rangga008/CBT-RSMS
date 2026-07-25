<template>
	<div
		v-if="confirmState.visible"
		class="modal-overlay"
		@click.self="respond(false)"
	>
		<div class="modal max-w-sm w-full">
			<div class="modal-header">
				<h3 class="font-bold text-slate-800">Konfirmasi</h3>
			</div>
			<div class="modal-body">
				<p class="text-slate-700">{{ confirmState.message }}</p>
			</div>
			<div class="modal-footer">
				<button @click="respond(false)" class="btn-secondary">Batal</button>
				<button @click="respond(true)" class="btn-primary">Konfirmasi</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useConfirm } from "@/composables/useConfirm.js";

const { confirmState } = useConfirm();

function respond(value) {
	const resolve = confirmState.value.resolve;
	confirmState.value = { visible: false, message: "", resolve: null };
	resolve?.(value);
}
</script>
