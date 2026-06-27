<template>
  <div class="min-h-screen flex items-center justify-center p-4 overflow-hidden bg-slate-950 relative">
    <!-- Background blobs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-700 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-700 rounded-full filter blur-[128px] opacity-20 animate-pulse" style="animation-delay:2s"></div>
    </div>

    <div class="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row animate-fade-in">
      <!-- Left branding panel -->
      <div class="w-full lg:w-5/12 relative p-10 flex flex-col justify-between text-white overflow-hidden" style="background:linear-gradient(135deg,#1a2756 0%,#0d3b46 100%)">
        <div>
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20"><i class="fas fa-school text-teal-300 text-xl"></i></div>
            <span class="font-bold tracking-wider text-sm text-blue-100/90">BK RSMS</span>
          </div>
          <h1 class="text-4xl font-bold leading-tight mb-4 text-white">Sistem Absensi<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">&amp; BK Digital</span></h1>
          <p class="text-slate-300 text-sm leading-relaxed font-light">Platform manajemen kehadiran dan bimbingan konseling siswa yang terintegrasi dan real-time.</p>
        </div>
        <div class="flex flex-wrap gap-3 mt-8 text-xs font-medium text-slate-300">
          <div class="px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 flex items-center gap-2"><i class="fas fa-qrcode text-teal-400"></i> QR Absensi</div>
          <div class="px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 flex items-center gap-2"><i class="fas fa-chart-line text-blue-400"></i> Real-time</div>
          <div class="px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 flex items-center gap-2"><i class="fas fa-shield-alt text-emerald-400"></i> Aman</div>
        </div>
      </div>

      <!-- Right login panel -->
      <div class="w-full lg:w-7/12 bg-white p-8 lg:p-12 flex flex-col justify-center">
        <div class="max-w-md mx-auto w-full">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-800">Selamat Datang</h2>
            <p class="text-slate-500 text-sm mt-1">Masuk sesuai peran Anda</p>
          </div>

          <!-- Tab switcher -->
          <div class="bg-slate-100 p-1.5 rounded-xl flex mb-8 border border-slate-200">
            <button @click="tab = 'siswa'" :class="['flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2', tab === 'siswa' ? 'bg-white shadow text-blue-700 ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700']">
              <i class="fas fa-user-graduate"></i> Siswa
            </button>
            <button @click="tab = 'admin'" :class="['flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2', tab === 'admin' ? 'bg-white shadow text-blue-700 ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700']">
              <i class="fas fa-chalkboard-teacher"></i> Guru / Admin
            </button>
          </div>

          <!-- Siswa form (NISN only) -->
          <form v-if="tab === 'siswa'" @submit.prevent="handleNisnLogin" class="space-y-5 animate-fade-in" key="siswa">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">NISN Siswa</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors"><i class="far fa-id-card text-lg"></i></div>
                <input v-model="nisn" type="text" inputmode="numeric" class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400" placeholder="Masukkan Nomor Induk Siswa" autofocus />
              </div>
              <p class="text-xs text-slate-400 mt-2 ml-1"><i class="fas fa-info-circle mr-1"></i>Siswa cukup memasukkan NISN tanpa password</p>
            </div>
            <button type="submit" :disabled="loading" class="w-full py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] text-sm flex justify-center items-center gap-2">
              <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
              <span v-else>MASUK SEBAGAI SISWA <i class="fas fa-arrow-right ml-1"></i></span>
            </button>
          </form>

          <!-- Admin/Guru form (username + password) -->
          <form v-else @submit.prevent="handleLogin" class="space-y-5 animate-fade-in" key="admin">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Username</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors"><i class="far fa-user text-lg"></i></div>
                <input v-model="userId" type="text" class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400" placeholder="Username akun" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors"><i class="fas fa-lock text-lg"></i></div>
                <input v-model="password" :type="showPass ? 'text' : 'password'" class="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400" placeholder="••••••••" />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-blue-600 transition-colors" @click="showPass = !showPass">
                  <i :class="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </div>
              </div>
            </div>
            <button type="submit" :disabled="loading" class="w-full py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] text-sm flex justify-center items-center gap-2">
              <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
              <span v-else>MASUK SEKARANG <i class="fas fa-arrow-right ml-1"></i></span>
            </button>
          </form>

          <!-- Error -->
          <div v-if="error" class="mt-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-fade-in">
            <div class="p-2 bg-red-100 rounded-full text-red-600 shrink-0"><i class="fas fa-exclamation-triangle text-xs"></i></div>
            <div><h4 class="text-sm font-bold text-red-700">Akses Ditolak</h4><p class="text-xs text-red-600 mt-0.5">{{ error }}</p></div>
          </div>
        </div>
      </div>
    </div>

    <p class="absolute bottom-5 text-slate-500 text-xs opacity-60">© {{ new Date().getFullYear() }} Tim IT 129 RSMS</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();
const tab = ref("siswa");
const nisn = ref("");
const userId = ref("");
const password = ref("");
const showPass = ref(false);
const loading = ref(false);
const error = ref("");

async function handleNisnLogin() {
  if (!nisn.value.trim()) { error.value = "NISN tidak boleh kosong."; return; }
  error.value = "";
  loading.value = true;
  try {
    await authStore.loginNisn(nisn.value.trim());
    router.push("/dashboard");
  } catch (e) {
    error.value = e.response?.data?.message || "Login gagal. Coba lagi.";
  } finally { loading.value = false; }
}

async function handleLogin() {
  if (!userId.value || !password.value) { error.value = "Lengkapi username dan password."; return; }
  error.value = "";
  loading.value = true;
  try {
    await authStore.login(userId.value, password.value);
    router.push("/dashboard");
  } catch (e) {
    error.value = e.response?.data?.message || "Login gagal. Coba lagi.";
  } finally { loading.value = false; }
}
</script>
