<template>
	<div class="flex h-screen overflow-hidden bg-slate-100">
		<!-- Sidebar -->
		<aside
			:class="[
				'fixed inset-y-0 left-0 z-40 flex flex-col h-full w-64 transition-transform duration-300 shadow-2xl',
				sidebarOpen ? 'translate-x-0' : '-translate-x-full',
				'md:translate-x-0',
			]"
			style="background: linear-gradient(180deg, #0f2460 0%, #1e3a8a 100%)"
		>
			<!-- Header -->
			<div
				class="h-16 flex items-center px-5 border-b border-white/10 shrink-0"
			>
				<div
					class="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center mr-3 shrink-0"
				>
					<i class="fas fa-hands-helping text-blue-200 text-sm"></i>
				</div>
				<div>
					<h1 class="font-bold text-white text-sm tracking-wide leading-tight">
						SIAP BK RSMS
					</h1>
					<p
						class="text-blue-300 text-[9px] uppercase tracking-widest font-semibold"
					>
						Sistem Absensi & BK
					</p>
				</div>
			</div>

			<!-- User card -->
			<div class="px-4 py-3 border-b border-white/10 shrink-0">
				<div class="flex items-center gap-3 p-2.5 bg-white/10 rounded-xl">
					<div
						class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0"
					>
						{{ auth.user?.nama?.[0]?.toUpperCase() || "U" }}
					</div>
					<div class="min-w-0">
						<p class="text-white text-xs font-semibold truncate">
							{{ auth.user?.nama }}
						</p>
						<span :class="roleBadgeClass">{{ roleLabel }}</span>
					</div>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 overflow-y-auto scrollbar-hide px-3 py-2 space-y-0.5">
				<p class="nav-section">Utama</p>
				<router-link
					to="/dashboard"
					class="nav-item"
					:class="{ active: $route.path === '/dashboard' }"
					@click="closeSidebar"
				>
					<i class="fas fa-chart-pie w-4 text-center"></i> Dashboard
				</router-link>
				<router-link
					to="/absensi"
					class="nav-item"
					:class="{
						active:
							$route.path.startsWith('/absensi') && $route.path === '/absensi',
					}"
					@click="closeSidebar"
				>
					<i class="fas fa-qrcode w-4 text-center"></i> Absensi Harian
				</router-link>
				<router-link
					to="/absensi/rekap"
					class="nav-item"
					:class="{ active: $route.path === '/absensi/rekap' }"
					@click="closeSidebar"
				>
					<i class="fas fa-calendar-check w-4 text-center"></i> Rekap Absensi
				</router-link>
				<router-link
					to="/siswa"
					class="nav-item"
					:class="{ active: $route.path === '/siswa' }"
					@click="closeSidebar"
				>
					<i class="fas fa-user-graduate w-4 text-center"></i> Data Siswa
				</router-link>

				<p class="nav-section mt-3">Bimbingan Konseling</p>
				<router-link
					to="/bk/poin"
					class="nav-item"
					:class="{ active: $route.path === '/bk/poin' }"
					@click="closeSidebar"
				>
					<i class="fas fa-star w-4 text-center"></i> Poin Siswa
				</router-link>
				<router-link
					to="/bk/kasus"
					class="nav-item"
					:class="{ active: $route.path === '/bk/kasus' }"
					@click="closeSidebar"
				>
					<i class="fas fa-folder-open w-4 text-center"></i> Kasus Siswa
				</router-link>
				<router-link
					to="/bk/kunjungan"
					class="nav-item"
					:class="{ active: $route.path === '/bk/kunjungan' }"
					@click="closeSidebar"
				>
					<i class="fas fa-home w-4 text-center"></i> Kunjungan Rumah
				</router-link>

				<p class="nav-section mt-3">Master Data BK</p>
				<router-link
					to="/bk/jenis-pelanggaran"
					class="nav-item"
					:class="{ active: $route.path === '/bk/jenis-pelanggaran' }"
					@click="closeSidebar"
				>
					<i class="fas fa-exclamation-triangle w-4 text-center"></i> Jenis
					Pelanggaran
				</router-link>
				<router-link
					to="/bk/jenis-prestasi"
					class="nav-item"
					:class="{ active: $route.path === '/bk/jenis-prestasi' }"
					@click="closeSidebar"
				>
					<i class="fas fa-trophy w-4 text-center"></i> Jenis Prestasi
				</router-link>
				<router-link
					to="/bk/jenis-kasus"
					class="nav-item"
					:class="{ active: $route.path === '/bk/jenis-kasus' }"
					@click="closeSidebar"
				>
					<i class="fas fa-tags w-4 text-center"></i> Jenis Kasus
				</router-link>

				<template v-if="auth.isAdmin">
					<p class="nav-section mt-3">Pengaturan</p>
					<router-link
						to="/users"
						class="nav-item"
						:class="{ active: $route.path === '/users' }"
						@click="closeSidebar"
					>
						<i class="fas fa-users-cog w-4 text-center"></i> Manajemen User
					</router-link>
					<router-link
						to="/config"
						class="nav-item"
						:class="{ active: $route.path === '/config' }"
						@click="closeSidebar"
					>
						<i class="fas fa-sliders-h w-4 text-center"></i> Konfigurasi
					</router-link>
				</template>
			</nav>

			<!-- Logout -->
			<div class="p-3 border-t border-white/10 shrink-0">
				<button
					@click="handleLogout"
					class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-300 hover:text-white hover:bg-red-500/20 text-sm font-medium transition-all"
				>
					<i class="fas fa-sign-out-alt w-4 text-center"></i> Keluar Aplikasi
				</button>
			</div>
		</aside>

		<!-- Overlay mobile -->
		<div
			v-if="sidebarOpen"
			@click="closeSidebar"
			class="fixed inset-0 bg-black/60 z-30 md:hidden"
		/>

		<!-- Main content -->
		<main class="flex-1 flex flex-col md:ml-64 h-screen overflow-hidden">
			<!-- Top bar -->
			<header
				class="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 shadow-sm z-10"
			>
				<button
					@click="sidebarOpen = !sidebarOpen"
					class="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
				>
					<i class="fas fa-bars text-base"></i>
				</button>
				<div class="flex-1 min-w-0">
					<h2 class="text-base font-bold text-slate-800 truncate">
						{{ pageTitle }}
					</h2>
				</div>
				<!-- Realtime indicator -->
				<div class="flex items-center gap-1.5 text-xs text-slate-500">
					<span
						:class="[
							'w-2 h-2 rounded-full',
							realtimeConnected
								? 'bg-emerald-400 animate-pulse'
								: 'bg-slate-300',
						]"
					></span>
					<span class="hidden sm:inline">{{
						realtimeConnected ? "Realtime" : "Offline"
					}}</span>
				</div>
				<div class="text-right hidden sm:block">
					<p class="text-xs font-semibold text-slate-700">{{ currentDate }}</p>
				</div>
			</header>

			<!-- Page content -->
			<div class="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
				<router-view />
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);
const realtimeConnected = ref(false);
let sseSource = null;

const roleLabel = computed(() => {
	const map = { admin: "Admin", bk: "Guru BK", guru: "Guru", siswa: "Siswa" };
	return map[auth.user?.role] || auth.user?.role;
});
const roleBadgeClass = computed(() => {
	const map = { admin: "badge-red", bk: "badge-blue", guru: "badge-green" };
	return `badge text-[9px] ${map[auth.user?.role] || "badge-gray"}`;
});

const pageTitleMap = {
	"/dashboard": "Dashboard",
	"/siswa": "Data Siswa",
	"/absensi": "Absensi Harian",
	"/absensi/rekap": "Rekap Absensi",
	"/bk/poin": "Poin Siswa",
	"/bk/kasus": "Kasus Siswa",
	"/bk/kunjungan": "Kunjungan Rumah",
	"/bk/jenis-pelanggaran": "Jenis Pelanggaran",
	"/bk/jenis-prestasi": "Jenis Prestasi",
	"/bk/jenis-kasus": "Jenis Kasus",
	"/users": "Manajemen User",
	"/config": "Konfigurasi",
};
const pageTitle = computed(() => pageTitleMap[route.path] || "SIAP BK RSMS");

const currentDate = computed(() =>
	new Date().toLocaleDateString("id-ID", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	}),
);

function closeSidebar() {
	if (window.innerWidth < 768) sidebarOpen.value = false;
}

async function handleLogout() {
	if (confirm("Yakin ingin keluar?")) await auth.logout();
}

function connectSSE() {
	if (!auth.token) return;
	sseSource = new EventSource(`/api/v1/absensi/stream`);
	sseSource.onopen = () => {
		realtimeConnected.value = true;
	};
	sseSource.onerror = () => {
		realtimeConnected.value = false;
		setTimeout(connectSSE, 5000);
	};
}

onMounted(() => {
	connectSSE();
});
onUnmounted(() => {
	sseSource?.close();
});
</script>
