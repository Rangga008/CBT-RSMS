<template>
	<div
		class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
	>
		<transition-group name="toast">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				class="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium max-w-sm pointer-events-auto"
				:class="toastClass(toast.type)"
			>
				<i :class="toastIcon(toast.type)" class="shrink-0"></i>
				<span class="flex-1">{{ toast.message }}</span>
				<button
					@click="dismiss(toast.id)"
					class="ml-1 opacity-70 hover:opacity-100 transition shrink-0"
				>
					<i class="fas fa-times text-xs"></i>
				</button>
			</div>
		</transition-group>
	</div>
</template>

<script setup>
import { useToast } from "@/composables/useToast.js";

const { toasts } = useToast();

function toastClass(type) {
	return (
		{
			success: "bg-emerald-600",
			error: "bg-red-600",
			warn: "bg-amber-500",
			info: "bg-blue-600",
		}[type] || "bg-slate-700"
	);
}

function toastIcon(type) {
	return (
		{
			success: "fas fa-check-circle",
			error: "fas fa-times-circle",
			warn: "fas fa-exclamation-triangle",
			info: "fas fa-info-circle",
		}[type] || "fas fa-bell"
	);
}

function dismiss(id) {
	toasts.value = toasts.value.filter((x) => x.id !== id);
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateX(100%);
}
</style>
