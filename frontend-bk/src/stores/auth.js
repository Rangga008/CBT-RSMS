import { defineStore } from "pinia";
import { ref, computed } from "vue";
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
		try {
			await api.post("/auth/logout");
		} catch {
			/* ignore */
		}
		token.value = "";
		user.value = null;
		localStorage.removeItem("bk_token");
		localStorage.removeItem("bk_user");
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
