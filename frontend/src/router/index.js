import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import("@/views/LoginView.vue"),
		meta: { requiresGuest: true },
	},
	{
		path: "/siswa",
		name: "SiswaDashboard",
		component: () => import("@/views/SiswaView.vue"),
		meta: { requiresAuth: true, roles: ["Siswa"] },
	},
	{
		path: "/dashboard",
		component: () => import("@/layouts/AdminLayout.vue"),
		meta: { requiresAuth: true, roles: ["Admin", "Guru"] },
		children: [
			{
				path: "",
				name: "Dashboard",
				component: () => import("@/views/admin/DashboardView.vue"),
			},
			{
				path: "users",
				name: "Users",
				component: () => import("@/views/admin/UsersView.vue"),
				meta: { roles: ["Admin"] },
			},
			{
				path: "kartu-siswa",
				name: "KartuSiswa",
				component: () => import("@/views/admin/KartuSiswaView.vue"),
			},
			{
				path: "exams",
				name: "Exams",
				component: () => import("@/views/admin/ExamsView.vue"),
			},
			{
				path: "questions",
				name: "Questions",
				component: () => import("@/views/admin/QuestionsView.vue"),
			},
			{
				path: "responses",
				name: "Responses",
				component: () => import("@/views/admin/ResponsesView.vue"),
			},
			{
				path: "monitor",
				name: "Monitor",
				component: () => import("@/views/admin/MonitorView.vue"),
			},
			{
				path: "ip-management",
				name: "IpManagement",
				component: () => import("@/views/admin/IpManagementView.vue"),
				meta: { roles: ["Admin"] },
			},
			{
				path: "config",
				name: "Config",
				component: () => import("@/views/admin/ConfigView.vue"),
				meta: { roles: ["Admin"] },
			},
			{
				path: "master-data",
				name: "MasterData",
				component: () => import("@/views/admin/MasterDataView.vue"),
				meta: { roles: ["Admin"] },
			},
			{
				path: "images",
				name: "Images",
				component: () => import("@/views/admin/ImagesView.vue"),
				meta: { roles: ["Admin", "Guru"] },
			},
		],
	},
	{
		path: "/exam/:examId",
		name: "ExamSession",
		component: () => import("@/views/ExamView.vue"),
		meta: { requiresAuth: true, roles: ["Siswa"] },
	},
	{
		path: "/result/:responseId",
		name: "ExamResult",
		component: () => import("@/views/ResultView.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/views/NotFoundView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const role = authStore.user?.role;

	// Guest-only pages: redirect logged-in users to their home
	if (to.meta.requiresGuest && authStore.isLoggedIn) {
		if (role === "Siswa") return next("/siswa");
		return next("/dashboard");
	}

	// Auth required: redirect to login if not logged in
	if (to.meta.requiresAuth && !authStore.isLoggedIn) {
		return next("/");
	}

	// Role check: redirect to appropriate home if wrong role
	if (to.meta.roles && !to.meta.roles.includes(role)) {
		if (role === "Siswa") return next("/siswa");
		if (role === "Admin" || role === "Guru") return next("/dashboard");
		return next("/");
	}

	next();
});

export default router;
