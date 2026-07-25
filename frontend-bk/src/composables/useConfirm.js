import { ref } from "vue";

const confirmState = ref({
	visible: false,
	message: "",
	resolve: null,
});

export function useConfirm() {
	function confirm(message) {
		return new Promise((resolve) => {
			confirmState.value = { visible: true, message, resolve };
		});
	}
	return { confirmState, confirm };
}
