import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api.js";

export const useAuthStore = defineStore("auth", () => {
	const user = ref(JSON.parse(localStorage.getItem("cbt_user") || "null"));
	const token = ref(localStorage.getItem("cbt_token") || null);

	const isLoggedIn = computed(() => !!token.value && !!user.value);

	async function login(userId, password) {
		const res = await api.post("/auth/login", { userId, password });
		user.value = res.data.user;
		token.value = res.data.accessToken;
		localStorage.setItem("cbt_user", JSON.stringify(res.data.user));
		localStorage.setItem("cbt_token", res.data.accessToken);
		localStorage.setItem("cbt_login_time", Date.now().toString());
		api.defaults.headers.common["Authorization"] =
			`Bearer ${res.data.accessToken}`;
		return res.data;
	}

	async function logout() {
		try {
			await api.post("/auth/logout");
		} catch (_) {}
		user.value = null;
		token.value = null;
		localStorage.removeItem("cbt_user");
		localStorage.removeItem("cbt_token");
		localStorage.removeItem("cbt_login_time");
		delete api.defaults.headers.common["Authorization"];
	}

	// Restore token on app init
	if (token.value) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
	}

	return { user, token, isLoggedIn, login, logout };
});
