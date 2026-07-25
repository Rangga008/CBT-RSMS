import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import api from "@/services/api.js";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", () => {
	const user = ref(JSON.parse(localStorage.getItem("bk_user") || "null"));
	const token = ref(localStorage.getItem("bk_token") || "");

	const isLoggedIn = computed(() => !!token.value && !!user.value);
	const isAdmin = computed(() => user.value?.role === "admin");
	const isBK = computed(
		() => user.value?.role === "bk" || user.value?.role === "admin",
	);
	// siswa = hanya bisa absen sendiri
	const isSiswa = computed(() => user.value?.role === "siswa");
	// staff = semua selain siswa (admin, bk, guru)
	const isStaff = computed(() => !!user.value && user.value?.role !== "siswa");

	async function login(userId, password) {
		const { data } = await api.post("/auth/login", { userId, password });
		token.value = data.token;
		user.value = data.user;
		localStorage.setItem("bk_token", data.token);
		localStorage.setItem("bk_user", JSON.stringify(data.user));
		return data;
	}

	async function loginNisn(nisn) {
		const { data } = await api.post("/auth/login-nisn", { nisn });
		token.value = data.token;
		user.value = data.user;
		localStorage.setItem("bk_token", data.token);
		localStorage.setItem("bk_user", JSON.stringify(data.user));
		return data;
	}

	async function logout() {
		// Clear state FIRST to prevent any retry loops
		const savedToken = token.value;
		token.value = "";
		user.value = null;
		localStorage.removeItem("bk_token");
		localStorage.removeItem("bk_user");
		// Call logout API best-effort using raw axios (bypasses interceptor)
		if (savedToken) {
			try {
				await axios.post(
					"/api/v1/auth/logout",
					{},
					{
						headers: { Authorization: `Bearer ${savedToken}` },
						withCredentials: true,
						timeout: 5000,
					},
				);
			} catch {
				/* ignore */
			}
		}
		router.push("/login");
	}

	return {
		user,
		token,
		isLoggedIn,
		isAdmin,
		isBK,
		isSiswa,
		isStaff,
		login,
		loginNisn,
		logout,
	};
});
