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
		const originalRequest = error.config || {};
		const isUnauthorized = error.response?.status === 401;
		const isAuthEndpoint =
			originalRequest.url?.includes("/auth/login") ||
			originalRequest.url?.includes("/auth/refresh") ||
			originalRequest.url?.includes("/auth/logout");

		if (isUnauthorized && !originalRequest._retry && !isAuthEndpoint) {
			originalRequest._retry = true;
			try {
				const refreshRes = await api.post("/auth/refresh");
				const newToken = refreshRes.data?.accessToken;
				if (newToken) {
					const authStore = useAuthStore();
					authStore.token = newToken;
					localStorage.setItem("cbt_token", newToken);
					api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
					originalRequest.headers = originalRequest.headers || {};
					originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
					return api(originalRequest);
				}
			} catch (_) {
				// refresh gagal -> lanjut logout di bawah
			}
		}

		if (isUnauthorized) {
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
