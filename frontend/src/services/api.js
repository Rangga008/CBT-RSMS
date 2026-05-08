import axios from "axios";
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/auth.js";

const api = axios.create({
	baseURL: "/api/v1",
	timeout: 30000,
	withCredentials: true,
});

// Response interceptor — handle 401
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const authStore = useAuthStore();
			authStore.user = null;
			authStore.token = null;
			localStorage.removeItem("cbt_user");
			localStorage.removeItem("cbt_token");
			router.push("/");
		}
		return Promise.reject(error);
	},
);

export default api;
