import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/LoginView.vue"),
			meta: { public: true },
		},
		{
			path: "/",
			component: () => import("@/layouts/AdminLayout.vue"),
			meta: { requiresAuth: true },
			children: [
				{ path: "", redirect: "/dashboard" },
				{
					path: "dashboard",
					name: "dashboard",
					component: () => import("@/views/DashboardView.vue"),
				},
				{
					path: "siswa",
					name: "siswa",
					component: () => import("@/views/SiswaView.vue"),
				},
				{
					path: "users",
					name: "users",
					component: () => import("@/views/UsersView.vue"),
					meta: { adminOnly: true },
				},
				{
					path: "absensi",
					name: "absensi",
					component: () => import("@/views/AbsensiView.vue"),
				},
				{
					path: "absensi/rekap",
					name: "absensi-rekap",
					component: () => import("@/views/RekapAbsensiView.vue"),
				},
				// BK
				{
					path: "bk/poin",
					name: "bk-poin",
					component: () => import("@/views/bk/PoinSiswaView.vue"),
				},
				{
					path: "bk/kasus",
					name: "bk-kasus",
					component: () => import("@/views/bk/KasusSiswaView.vue"),
				},
				{
					path: "bk/kunjungan",
					name: "bk-kunjungan",
					component: () => import("@/views/bk/KunjunganRumahView.vue"),
				},
				{
					path: "bk/jenis-pelanggaran",
					name: "bk-jenis-pelanggaran",
					component: () => import("@/views/bk/JenisPelanggaranView.vue"),
				},
				{
					path: "bk/jenis-prestasi",
					name: "bk-jenis-prestasi",
					component: () => import("@/views/bk/JenisPrestasiView.vue"),
				},
				{
					path: "bk/jenis-kasus",
					name: "bk-jenis-kasus",
					component: () => import("@/views/bk/JenisKasusView.vue"),
				},
				{
					path: "bk/profil/:nisn",
					name: "bk-profil-siswa",
					component: () => import("@/views/bk/ProfilSiswaView.vue"),
				},
				// Config
				{
					path: "config",
					name: "config",
					component: () => import("@/views/ConfigView.vue"),
					meta: { adminOnly: true },
				},
			],
		},
		{
			path: "/:pathMatch(.*)*",
			component: () => import("@/views/NotFoundView.vue"),
		},
	],
	scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to, from, next) => {
	const auth = useAuthStore();
	if (to.meta.requiresAuth && !auth.isLoggedIn) return next("/login");
	if (to.meta.adminOnly && !auth.isAdmin) return next("/dashboard");
	if (to.path === "/login" && auth.isLoggedIn) return next("/dashboard");
	next();
});

export default router;
