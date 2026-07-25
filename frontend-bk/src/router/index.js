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
			path: "/absensi-kios",
			name: "absensi-kios",
			component: () => import("@/views/AbsensiKiosView.vue"),
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
					meta: { staffOnly: true },
				},
				{
					path: "siswa",
					name: "siswa",
					component: () => import("@/views/SiswaView.vue"),
					meta: { staffOnly: true },
				},
				{
					path: "users",
					name: "users",
					component: () => import("@/views/UsersView.vue"),
					meta: { adminOnly: true },
				},
				{
					path: "master-data",
					name: "master-data",
					component: () => import("@/views/MasterDataView.vue"),
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
					meta: { staffOnly: true },
				},
				// BK
				{
					path: "bk/poin",
					name: "bk-poin",
					component: () => import("@/views/bk/PoinSiswaView.vue"),
					meta: { staffOnly: true },
				},
				{
					path: "bk/kasus",
					name: "bk-kasus",
					component: () => import("@/views/bk/KasusSiswaView.vue"),
					meta: { staffOnly: true },
				},
				{
					path: "bk/kunjungan",
					name: "bk-kunjungan",
					component: () => import("@/views/bk/KunjunganRumahView.vue"),
					meta: { staffOnly: true },
				},
				{
					path: "bk/jenis-pelanggaran",
					name: "bk-jenis-pelanggaran",
					component: () => import("@/views/bk/JenisPelanggaranView.vue"),
					meta: { adminOnly: true },
				},
				{
					path: "bk/jenis-prestasi",
					name: "bk-jenis-prestasi",
					component: () => import("@/views/bk/JenisPrestasiView.vue"),
					meta: { adminOnly: true },
				},
				{
					path: "bk/jenis-kasus",
					name: "bk-jenis-kasus",
					component: () => import("@/views/bk/JenisKasusView.vue"),
					meta: { adminOnly: true },
				},
				{
					path: "bk/profil/:nisn",
					name: "bk-profil-siswa",
					component: () => import("@/views/bk/ProfilSiswaView.vue"),
					meta: { staffOnly: true },
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
	if (to.meta.adminOnly && !auth.isAdmin) return next("/absensi");
	// staffOnly: siswa diblokir, redirect ke /absensi
	if (to.meta.staffOnly && auth.isSiswa) return next("/absensi");
	if (to.path === "/login" && auth.isLoggedIn) {
		return next(auth.isSiswa ? "/absensi" : "/dashboard");
	}
	next();
});

export default router;
