<template>
	<router-view />
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/services/api.js";
import { useDarkMode } from "@/composables/useDarkMode.js";

// Initialize dark mode singleton (reads localStorage / prefers-color-scheme)
useDarkMode();

onMounted(async () => {
	try {
		const res = await api.get("/config");
		const cfg = res.data.data || {};
		if (cfg.app_name) document.title = cfg.app_name;
		if (cfg.favicon_url) {
			let link = document.querySelector("link[rel~='icon']");
			if (!link) {
				link = document.createElement("link");
				link.rel = "icon";
				document.head.appendChild(link);
			}
			link.href = cfg.favicon_url;
		}
	} catch (_) {}
});
</script>
