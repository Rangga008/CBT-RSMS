import { ref } from "vue";

const toasts = ref([]);
let idCounter = 0;

export function useToast() {
	function show(message, type = "info", duration = 3500) {
		const id = ++idCounter;
		toasts.value.push({ id, message, type });
		setTimeout(() => {
			toasts.value = toasts.value.filter((t) => t.id !== id);
		}, duration);
	}
	return {
		toasts,
		success: (msg, d) => show(msg, "success", d),
		error: (msg, d) => show(msg, "error", d || 5000),
		info: (msg, d) => show(msg, "info", d),
		warn: (msg, d) => show(msg, "warn", d),
	};
}
