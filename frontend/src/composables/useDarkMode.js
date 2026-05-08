import { ref, watch } from "vue";

// ─── Singleton state ─────────────────────────────────────────────────────────
const isDark = ref(false);
let _initialized = false;

function _init() {
	if (_initialized) return;
	_initialized = true;

	const saved = localStorage.getItem("cbt_theme");
	isDark.value =
		saved === "dark" ||
		(!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

	watch(
		isDark,
		(val) => {
			document.documentElement.classList.toggle("dark", val);
			localStorage.setItem("cbt_theme", val ? "dark" : "light");
		},
		{ immediate: true },
	);
}

// ─── Composable ───────────────────────────────────────────────────────────────
export function useDarkMode() {
	_init();

	function toggle() {
		// Enable smooth transition briefly during switch
		document.documentElement.classList.add("theme-transition");
		isDark.value = !isDark.value;
		setTimeout(
			() => document.documentElement.classList.remove("theme-transition"),
			300,
		);
	}

	return { isDark, toggle };
}
