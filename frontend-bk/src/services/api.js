import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";

const api = axios.create({
	baseURL: "/api/v1",
	withCredentials: true,
	timeout: 30000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		error ? prom.reject(error) : prom.resolve(token);
	});
	failedQueue = [];
};

api.interceptors.request.use((config) => {
	const auth = useAuthStore();
	if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
	return config;
});

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const original = error.config;
		if (error.response?.status === 401 && !original._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					original.headers.Authorization = `Bearer ${token}`;
					return api(original);
				});
			}
			original._retry = true;
			isRefreshing = true;
			try {
				const { data } = await axios.post(
					"/api/v1/auth/refresh",
					{},
					{ withCredentials: true },
				);
				const auth = useAuthStore();
				auth.token = data.token;
				processQueue(null, data.token);
				original.headers.Authorization = `Bearer ${data.token}`;
				return api(original);
			} catch (e) {
				processQueue(e, null);
				const auth = useAuthStore();
				auth.logout();
				return Promise.reject(e);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	},
);

export default api;
