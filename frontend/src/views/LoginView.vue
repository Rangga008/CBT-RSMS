<template>
	<div
		class="min-h-screen relative flex items-center justify-center overflow-hidden"
		:style="bgStyle"
	>
		<!-- Background fallback gradient when no image -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-800 z-0"
		></div>
		<!-- Overlay: lighter if bg image exists -->
		<div
			v-if="config.background_url"
			class="absolute inset-0 bg-black/40 z-0"
		></div>
		<!-- Decorative circles -->
		<div
			class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"
		></div>
		<div
			class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0"
		></div>

		<!-- Login Card -->
		<div class="relative z-10 w-full max-w-sm mx-4">
			<!-- Header branding above card -->
			<div class="flex flex-col items-center mb-5">
				<div
					class="w-16 h-16 rounded-2xl shadow-xl mb-3 overflow-hidden flex-shrink-0"
				>
					<img
						v-if="config.logo_url"
						:src="config.logo_url"
						alt="Logo"
						class="w-full h-full object-cover"
					/>
					<div
						v-else
						class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl"
					>
						U
					</div>
				</div>
				<h1 class="text-2xl font-heading font-bold text-white text-center">
					{{ config.app_name || "Ujian Online V.3" }}
				</h1>
				<p class="text-blue-200/70 text-sm mt-0.5">
					{{ config.school_name || "RSMS" }}
				</p>
				<p v-if="config.app_subtitle" class="text-blue-200/60 text-xs mt-0.5">
					{{ config.app_subtitle }}
				</p>
				<div
					class="mt-2 text-white font-mono text-lg tracking-widest bg-white/10 px-4 py-1 rounded-full border border-white/10"
				>
					{{ clock }}
				</div>
			</div>

			<!-- Card -->
			<div
				class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
			>
				<!-- Toggle tabs -->
				<div class="flex bg-slate-100 p-1 m-4 rounded-2xl">
					<button
						@click="mode = 'siswa'"
						class="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
						:class="
							mode === 'siswa'
								? 'bg-white text-blue-700 shadow-sm'
								: 'text-slate-400 hover:text-slate-600'
						"
					>
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
						Peserta
					</button>
					<button
						@click="mode = 'admin'"
						class="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
						:class="
							mode === 'admin'
								? 'bg-white text-blue-700 shadow-sm'
								: 'text-slate-400 hover:text-slate-600'
						"
					>
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
							/>
						</svg>
						Admin / Guru
					</button>
				</div>

				<!-- Form -->
				<form @submit.prevent="handleLogin" class="px-6 pb-6 space-y-4">
					<div>
						<label class="label-field">ID Pengguna</label>
						<input
							v-model="form.userId"
							type="text"
							placeholder="Masukkan ID pengguna"
							autocomplete="username"
							class="input-field"
							:disabled="loading"
						/>
					</div>

					<div>
						<label class="label-field">Kata Sandi</label>
						<div class="relative">
							<input
								v-model="form.password"
								:type="showPassword ? 'text' : 'password'"
								placeholder="Masukkan kata sandi"
								autocomplete="current-password"
								class="input-field pr-10"
								:disabled="loading"
							/>
							<button
								type="button"
								@click="showPassword = !showPassword"
								class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
							>
								<svg
									v-if="showPassword"
									class="w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
									/>
								</svg>
								<svg
									v-else
									class="w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</button>
						</div>
					</div>

					<!-- PIN hanya untuk peserta -->
					<div v-if="mode === 'siswa'" class="relative">
						<label class="label-field">
							PIN Ujian
							<span
								class="text-slate-400 normal-case font-normal tracking-normal ml-1"
								>(opsional)</span
							>
						</label>
						<input
							v-model="form.pin"
							type="text"
							maxlength="20"
							placeholder="Masukkan PIN jika sudah ada"
							class="input-field"
							:disabled="loading"
						/>
					</div>

					<!-- Error message -->
					<p
						v-if="errorMsg"
						class="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2"
					>
						{{ errorMsg }}
					</p>

					<button
						type="submit"
						class="w-full py-3 rounded-2xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm"
						:class="
							loading
								? 'bg-blue-400 cursor-not-allowed'
								: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 shadow-lg shadow-blue-500/30'
						"
						:disabled="loading"
					>
						<svg
							v-if="loading"
							class="animate-spin w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								class="opacity-25"
							/>
							<path
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								class="opacity-75"
							/>
						</svg>
						<span>{{ loading ? "Memproses..." : "Masuk" }}</span>
					</button>
				</form>
			</div>

			<p class="text-center text-white/30 text-xs mt-4">
				&copy; {{ new Date().getFullYear() }}
				{{ config.app_name || "CBT RSMS" }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import api from "@/services/api.js";

const router = useRouter();
const auth = useAuthStore();

const mode = ref("siswa");
const loading = ref(false);
const showPassword = ref(false);
const config = ref({});
const clock = ref("");
const errorMsg = ref("");

const form = ref({ userId: "", password: "", pin: "" });

const bgStyle = computed(() => {
	if (config.value.background_url) {
		return {
			backgroundImage: `url(${config.value.background_url})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
		};
	}
	return {};
});

let clockInterval;
const updateClock = () => {
	const now = new Date();
	clock.value = now.toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

onMounted(async () => {
	updateClock();
	clockInterval = setInterval(updateClock, 1000);
	try {
		const res = await api.get("/config");
		config.value = res.data.data || {};
	} catch (_) {}
});
onUnmounted(() => clearInterval(clockInterval));

async function handleLogin() {
	errorMsg.value = "";
	if (!form.value.userId || !form.value.password) {
		errorMsg.value = "ID pengguna dan kata sandi wajib diisi.";
		return;
	}
	loading.value = true;
	try {
		await auth.login(form.value.userId, form.value.password);
		const role = auth.user?.role;
		if (role === "Siswa") {
			// Jika ada PIN, langsung validate dan masuk ujian
			if (form.value.pin && form.value.pin.trim()) {
				try {
					const res = await api.post("/exams/validate-pin", {
						pin: form.value.pin.trim(),
					});
					const exam = res.data.data;
					if (!res.data.viewResultsOnly) {
						router.push(`/exam/${exam.id}`);
						return;
					}
				} catch (pinErr) {
					// PIN gagal, lanjut ke halaman siswa dengan PIN di field
				}
			}
			router.push("/siswa");
		} else {
			router.push("/dashboard");
		}
	} catch (err) {
		errorMsg.value = err.response?.data?.message || "ID atau kata sandi salah.";
	} finally {
		loading.value = false;
	}
}
</script>
