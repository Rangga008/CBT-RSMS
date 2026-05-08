import { nextTick } from "vue";

/**
 * Composable untuk render ulang MathJax setelah konten Vue dirender.
 * Panggil typesetMath() setelah data diload / berubah.
 */
export function useMathJax() {
	async function typesetMath(el = document.body) {
		await nextTick();
		if (window.MathJax?.typesetPromise) {
			try {
				await window.MathJax.typesetPromise(el ? [el] : undefined);
			} catch (_) {}
		}
	}
	return { typesetMath };
}
