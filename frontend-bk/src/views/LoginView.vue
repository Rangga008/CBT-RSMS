<template>
	<div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"
		></div>

		<div
			class="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row animate-fade-in"
		>
			<!-- Left panel -->
			<div
				class="w-full lg:w-5/12 relative p-10 flex flex-col justify-between text-white overflow-hidden"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950"
				></div>
				<div
					class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
				></div>
				<div class="relative z-10">
					<div class="flex items-center gap-3 mb-8">
						<div
							class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-xl"
						>
							<i class="fas fa-hands-helping text-2xl text-blue-200"></i>
						</div>
						<div>
							<h1 class="font-bold text-lg tracking-wide">SIAP BK RSMS</h1>
							<p class="text-blue-300 text-xs">
								Sistem Absensi & Bimbingan Konseling
							</p>
						</div>
					</div>
					<h2 class="text-3xl lg:text-4xl font-bold leading-tight mb-4">
						Selamat Datang di<br />
						<span
							class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200"
							>Sistem BK</span
						>
					</h2>
					<p class="text-slate-300 text-sm leading-relaxed">
						Platform terintegrasi untuk manajemen absensi, bimbingan konseling,
						dan perkembangan siswa secara real-time.
					</p>
				</div>
				<div class="relative z-10 flex flex-wrap gap-2 mt-8">
					<div
						v-for="f in features"
						:key="f"
						class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-xs font-medium text-slate-300"
					>
						<i :class="f.icon + ' text-blue-400'"></i> {{ f.text }}
					</div>
				</div>
			</div>

			<!-- Right panel (form) -->
			<div
				class="w-full lg:w-7/12 bg-white p-8 lg:p-12 flex flex-col justify-center"
			>
				<div class="max-w-sm mx-auto w-full">
					<div class="text-center mb-8">
						<h3 class="text-2xl font-bold text-slate-800">Masuk ke Sistem</h3>
						<p class="text-slate-500 text-sm mt-2">
							Silakan masuk menggunakan akun Anda
						</p>
					</div>

					<form @submit.prevent="handleLogin" class="space-y-5">
						<div>
							<label class="label">User ID</label>
							<div class="relative">
								<i
									class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
								></i>
								<input
									v-model="form.userId"
									type="text"
									class="input pl-11"
									placeholder="Contoh: ADM-001"
									autocomplete="username"
									required
								/>
							</div>
						</div>
						<div>
							<label class="label">Password</label>
							<div class="relative">
								<i
									class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
								></i>
								<input
									v-model="form.password"
									:type="showPass ? 'text' : 'password'"
									class="input pl-11 pr-11"
									placeholder="••••••••"
									autocomplete="current-password"
									required
								/>
								<button
									type="button"
									@click="showPass = !showPass"
									class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
								>
									<i :class="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
								</button>
							</div>
						</div>

						<div
							v-if="errorMsg"
							class="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2"
						>
							<i class="fas fa-exclamation-circle shrink-0"></i> {{ errorMsg }}
						</div>

						<button
							type="submit"
							:disabled="loading"
							class="btn-primary w-full btn-lg"
						>
							<i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
							<span>{{ loading ? "Memverifikasi..." : "MASUK SEKARANG" }}</span>
							<i v-if="!loading" class="fas fa-arrow-right"></i>
						</button>
					</form>

					<p class="text-center text-xs text-slate-400 mt-8">
						© {{ new Date().getFullYear() }} SIAP BK RSMS
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();
const router = useRouter();
const form = reactive({ userId: "", password: "" });
const showPass = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const features = [
	{ icon: "fas fa-qrcode", text: "Scan QR Absensi" },
	{ icon: "fas fa-star", text: "Poin Prestasi" },
	{ icon: "fas fa-folder", text: "Kasus Siswa" },
	{ icon: "fas fa-home", text: "Kunjungan Rumah" },
];

async function handleLogin() {
	loading.value = true;
	errorMsg.value = "";
	try {
		await auth.login(form.userId, form.password);
		router.push("/dashboard");
	} catch (e) {
		errorMsg.value =
			e.response?.data?.message || "Login gagal. Periksa User ID dan password.";
	} finally {
		loading.value = false;
	}
}
</script>
