<template>
	<div class="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
		<!-- Sidebar Overlay (mobile) -->
		<div
			v-if="sidebarOpen && isMobile"
			@click="sidebarOpen = false"
			class="fixed inset-0 bg-black/50 z-20 lg:hidden"
		></div>

		<!-- Sidebar -->
		<aside
			:class="[
				'sidebar-bg flex-shrink-0 flex flex-col transition-all duration-300 z-30',
				sidebarOpen ? 'w-64' : 'w-0 lg:w-16',
				'fixed inset-y-0 left-0 lg:relative',
			]"
		>
			<!-- Logo / App name -->
			<div
				class="flex items-center gap-3 px-4 py-4 border-b border-white/10 h-16 flex-shrink-0"
			>
				<div
					class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-700 font-black text-xs flex-shrink-0 shadow-sm overflow-hidden"
				>
					<img
						v-if="appLogo"
						:src="appLogo"
						alt="Logo Aplikasi"
						class="w-full h-full object-cover"
					/>
					<span v-else>CBT</span>
				</div>
				<div v-if="sidebarOpen" class="min-w-0">
					<p class="text-white font-bold text-sm leading-tight truncate">
						{{ appName }}
					</p>
					<p class="text-white/40 text-xs truncate">{{ appSubtitle }}</p>
				</div>
			</div>

			<!-- Nav Items -->
			<nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
				<template v-for="item in navItems" :key="item.to">
					<!-- Group header -->
					<div v-if="item.group" class="px-4 pt-4 pb-1">
						<span
							v-if="sidebarOpen"
							class="text-white/40 text-xs font-semibold uppercase tracking-wider"
						>
							{{ item.group }}
						</span>
						<div v-else class="h-px bg-white/10 mx-1"></div>
					</div>

					<!-- Nav link -->
					<router-link
						v-if="!item.group && canAccess(item)"
						:to="item.to"
						class="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl transition-all duration-150 text-sm group"
						:class="
							isActive(item.to)
								? 'bg-white/20 text-white shadow-sm'
								: 'text-white/60 hover:text-white hover:bg-white/10'
						"
						:title="!sidebarOpen ? item.label : undefined"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							class="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								:d="item.iconD"
							/>
						</svg>
						<span v-if="sidebarOpen" class="font-medium whitespace-nowrap">{{
							item.label
						}}</span>
					</router-link>
				</template>
			</nav>

			<!-- User info & Logout -->
			<div class="border-t border-white/10 p-3">
				<div
					v-if="sidebarOpen"
					class="flex items-center gap-3 mb-2 px-1 py-2 rounded-xl bg-white/5"
				>
					<div
						class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow"
					>
						{{ auth.user?.nama?.charAt(0) || "?" }}
					</div>
					<div class="min-w-0">
						<p class="text-white text-sm font-semibold truncate leading-tight">
							{{ auth.user?.nama }}
						</p>
						<p class="text-white/40 text-xs truncate">{{ auth.user?.role }}</p>
					</div>
				</div>
				<button
					@click="handleLogout"
					class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-red-500/20 transition-colors"
					:title="!sidebarOpen ? 'Keluar' : undefined"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						class="w-5 h-5 flex-shrink-0"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
					<span v-if="sidebarOpen" class="text-sm font-medium">Keluar</span>
				</button>
			</div>
		</aside>

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col min-w-0 overflow-hidden">
			<!-- Top Header -->
			<header
				class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-4 flex-shrink-0 shadow-sm"
			>
				<!-- Toggle Sidebar -->
				<button
					@click="sidebarOpen = !sidebarOpen"
					class="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors"
				>
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<!-- Breadcrumb / Page Title -->
				<div class="flex-1 min-w-0">
					<h2
						class="text-slate-700 dark:text-slate-200 font-semibold text-base truncate"
					>
						{{ currentPageTitle }}
					</h2>
				</div>

				<!-- Right side: user avatar + clock + dark toggle -->
				<div class="flex items-center gap-2 flex-shrink-0">
					<span
						class="text-slate-400 dark:text-slate-500 text-sm font-mono hidden sm:block"
						>{{ clock }}</span
					>
					<!-- Dark mode toggle -->
					<button
						@click="toggleDark"
						class="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors"
						:title="isDark ? 'Mode Terang' : 'Mode Gelap'"
					>
						<!-- Sun icon: switch to light -->
						<svg
							v-if="isDark"
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>
						<!-- Moon icon: switch to dark -->
						<svg
							v-else
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
							/>
						</svg>
					</button>

					<div
						class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-default select-none"
						:title="`${auth.user?.nama} (${auth.user?.role})`"
					>
						{{ auth.user?.nama?.charAt(0) || "?" }}
					</div>
				</div>
			</header>

			<!-- Router View -->
			<main class="flex-1 overflow-y-auto p-4 md:p-6">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useDarkMode } from "@/composables/useDarkMode.js";
import api from "@/services/api.js";
import Swal from "sweetalert2";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const { isDark, toggle: toggleDark } = useDarkMode();

const sidebarOpen = ref(window.innerWidth >= 1024);
const isMobile = computed(() => window.innerWidth < 1024);
const clock = ref("");
const appName = ref("CBT RSMS");
const appSubtitle = ref("Sistem Ujian Online");
const appLogo = ref("");

const navItems = [
	{
		to: "/dashboard",
		iconD:
			"M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
		label: "Dashboard",
		roles: ["Admin", "Guru"],
	},
	{ group: "Manajemen" },
	{
		to: "/dashboard/exams",
		iconD:
			"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
		label: "Ujian",
		roles: ["Admin", "Guru"],
	},
	{
		to: "/dashboard/questions",
		iconD:
			"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",
		label: "Soal",
		roles: ["Admin", "Guru"],
	},
	{
		to: "/dashboard/responses",
		iconD:
			"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
		label: "Hasil Ujian",
		roles: ["Admin", "Guru"],
	},
	{
		to: "/dashboard/monitor",
		iconD:
			"M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
		label: "Monitor Ujian",
		roles: ["Admin", "Guru"],
	},
	{
		to: "/dashboard/users",
		iconD:
			"M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
		label: "Pengguna",
		roles: ["Admin"],
	},
	{
		to: "/dashboard/kartu-siswa",
		iconD:
			"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
		label: "Kartu Siswa",
		roles: ["Admin", "Guru"],
	},
	{ group: "Pengaturan" },
	{
		to: "/dashboard/ip-management",
		iconD:
			"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
		label: "Manajemen IP",
		roles: ["Admin"],
	},
	{
		to: "/dashboard/master-data",
		iconD:
			"M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
		label: "Data Master",
		roles: ["Admin"],
	},
	{
		to: "/dashboard/images",
		iconD:
			"M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
		label: "Perpustakaan Gambar",
		roles: ["Admin", "Guru"],
	},
	{
		to: "/dashboard/config",
		iconD:
			"M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
		label: "Konfigurasi",
		roles: ["Admin"],
	},
];

const currentPageTitle = computed(() => {
	const found =
		navItems.find(
			(n) => n.to && route.path.startsWith(n.to) && n.to !== "/dashboard",
		) ||
		navItems.find((n) => n.to === "/dashboard" && route.path === "/dashboard");
	return found?.label || "Dashboard";
});

function canAccess(item) {
	if (!item.roles) return true;
	return item.roles.includes(auth.user?.role);
}

function isActive(to) {
	if (to === "/dashboard") return route.path === "/dashboard";
	return route.path.startsWith(to);
}

async function handleLogout() {
	const result = await Swal.fire({
		icon: "question",
		title: "Keluar?",
		text: "Apakah Anda yakin ingin keluar?",
		showCancelButton: true,
		confirmButtonText: "Ya, Keluar",
		cancelButtonText: "Batal",
		confirmButtonColor: "#ef4444",
	});
	if (result.isConfirmed) {
		await auth.logout();
		router.push("/");
	}
}

let clockInterval;
const updateClock = () => {
	clock.value = new Date().toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

// --- SESSION TIMER (3 jam) ---
const ADMIN_SESSION_DURATION_MS = 3 * 60 * 60 * 1000;
let sessionTimer = null;

function startSessionTimer() {
	if (sessionTimer) clearInterval(sessionTimer);
	sessionTimer = setInterval(async () => {
		const loginTime = parseInt(localStorage.getItem("cbt_login_time") || "0");
		if (!loginTime) return;
		const role = auth.user?.role;
		if (role !== "Admin" && role !== "Guru") return;
		const elapsed = Date.now() - loginTime;
		if (elapsed >= ADMIN_SESSION_DURATION_MS) {
			clearInterval(sessionTimer);
			sessionTimer = null;
			await auth.logout();
			await Swal.fire({
				icon: "warning",
				title: "Sesi Berakhir",
				html: "<p>Sesi Anda telah berakhir karena sudah <b>3 jam</b>.</p><p style='font-size:0.85em;margin-top:8px;'>Silakan login kembali untuk melanjutkan.</p>",
				confirmButtonText: "Login Kembali",
				confirmButtonColor: "#2563eb",
				allowOutsideClick: false,
			});
			router.push("/");
		}
	}, 30000); // cek setiap 30 detik
}

// Handle window resize
const onResize = () => {
	if (window.innerWidth >= 1024) sidebarOpen.value = true;
};

async function loadAppConfig() {
	try {
		const res = await api.get("/config");
		const cfg = res.data?.data || {};
		if (cfg.app_name) appName.value = cfg.app_name;
		if (cfg.app_subtitle) appSubtitle.value = cfg.app_subtitle;
		if (cfg.logo_url || cfg.app_logo) appLogo.value = cfg.logo_url || cfg.app_logo;
	} catch {
		// keep defaults
	}
}

onMounted(async () => {
	await loadAppConfig();
	updateClock();
	clockInterval = setInterval(updateClock, 1000);
	window.addEventListener("resize", onResize);
	startSessionTimer();
});
onUnmounted(() => {
	clearInterval(clockInterval);
	if (sessionTimer) clearInterval(sessionTimer);
	window.removeEventListener("resize", onResize);
});
</script>
