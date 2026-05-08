<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <h2 class="text-xl font-bold text-slate-800">Perpustakaan Gambar</h2>
      <button @click="openAdd" class="btn-primary">+ Tambah Gambar</button>
    </div>

    <!-- Filter bar -->
    <div class="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 flex-wrap shadow-sm">
      <input v-model="search" @input="debouncedLoad" placeholder="Cari nama gambar..." class="input-field flex-1 min-w-48" />
      <input v-model="filterCategory" @input="debouncedLoad" placeholder="Filter kategori..." class="input-field w-44" />
      <button @click="search=''; filterCategory=''; load()" class="btn-outline text-sm">Reset</button>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="text-center py-16 text-slate-400">Memuat gambar...</div>
    <div v-else-if="images.length === 0" class="text-center py-16 text-slate-400">
      <svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
      <p class="text-sm">Belum ada gambar. Tambahkan URL gambar untuk digunakan di soal.</p>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="img in images" :key="img.id"
        class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
        <!-- Thumbnail -->
        <div class="aspect-square bg-slate-100 overflow-hidden relative cursor-pointer" @click="preview(img)">
          <img :src="img.url" :alt="img.name" class="w-full h-full object-cover" loading="lazy"
            @error="(e) => e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23f1f5f9\'/%3E%3Ctext x=\'50\' y=\'55\' font-size=\'11\' text-anchor=\'middle\' fill=\'%2394a3b8\'%3EBroken%3C/text%3E%3C/svg%3E'" />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <svg class="w-8 h-8 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" /></svg>
          </div>
        </div>
        <!-- Info -->
        <div class="p-2.5">
          <p class="text-xs font-semibold text-slate-700 truncate" :title="img.name">{{ img.name }}</p>
          <p v-if="img.category" class="text-xs text-indigo-500 truncate mt-0.5">{{ img.category }}</p>
          <div class="flex items-center gap-1.5 mt-2">
            <button @click="copyUrl(img.url)" class="flex-1 text-xs bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-200 rounded-lg py-1 transition" title="Salin URL">
              Salin URL
            </button>
            <button @click="confirmDelete(img)" class="p-1 text-slate-400 hover:text-red-500 transition" title="Hapus">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="total > limit" class="flex items-center justify-between text-sm text-slate-500">
      <span>{{ images.length }} dari {{ total }} gambar</span>
      <div class="flex gap-2 items-center">
        <button @click="page--; load()" :disabled="page <= 1" class="btn-sm-outline">‹</button>
        <span class="px-1">{{ page }}</span>
        <button @click="page++; load()" :disabled="page * limit >= total" class="btn-sm-outline">›</button>
      </div>
    </div>

    <!-- Add Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Tambah Gambar</h3>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="label-field">Nama / Deskripsi <span class="text-red-500">*</span></label>
            <input v-model="form.name" type="text" class="input-field" placeholder="Contoh: Diagram sel tumbuhan" required />
          </div>
          <div>
            <label class="label-field">URL Gambar <span class="text-red-500">*</span></label>
            <input v-model="form.url" type="url" class="input-field" placeholder="https://..." required @input="previewSrc = form.url" />
          </div>
          <!-- Live preview -->
          <div v-if="previewSrc" class="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-h-48 flex items-center justify-center">
            <img :src="previewSrc" class="max-h-48 object-contain" alt="Preview"
              @error="(e) => e.target.style.display='none'" />
          </div>
          <div>
            <label class="label-field">Kategori</label>
            <input v-model="form.category" type="text" class="input-field" placeholder="Biologi, Fisika, dll (opsional)" />
          </div>
          <div class="flex gap-3 pt-1">
            <button type="submit" :disabled="saving" class="btn-primary flex-1">{{ saving ? 'Menyimpan...' : 'Tambah' }}</button>
            <button type="button" @click="showModal = false" class="btn-outline flex-1">Batal</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="previewImg" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="previewImg = null">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div class="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p class="font-semibold text-slate-800">{{ previewImg.name }}</p>
            <p v-if="previewImg.category" class="text-xs text-indigo-500 mt-0.5">{{ previewImg.category }}</p>
          </div>
          <button @click="previewImg = null" class="text-slate-400 hover:text-slate-700">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-4 bg-slate-50 flex justify-center">
          <img :src="previewImg.url" :alt="previewImg.name" class="max-h-[60vh] object-contain rounded-lg" />
        </div>
        <div class="p-4 flex items-center gap-3">
          <code class="flex-1 text-xs bg-slate-100 rounded-lg px-3 py-2 text-slate-600 truncate">{{ previewImg.url }}</code>
          <button @click="copyUrl(previewImg.url)" class="btn-outline text-sm whitespace-nowrap">Salin URL</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api.js'
import Swal from 'sweetalert2'

const images = ref([])
const total = ref(0)
const page = ref(1)
const limit = ref(30)
const loading = ref(true)
const search = ref('')
const filterCategory = ref('')
const showModal = ref(false)
const saving = ref(false)
const previewImg = ref(null)
const previewSrc = ref('')

const defaultForm = () => ({ name: '', url: '', category: '' })
const form = ref(defaultForm())

let debounceTimer
const debouncedLoad = () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(() => { page.value = 1; load() }, 400) }

async function load() {
  loading.value = true
  try {
    const params = new URLSearchParams({ page: page.value, limit: limit.value })
    if (search.value) params.set('search', search.value)
    if (filterCategory.value) params.set('category', filterCategory.value)
    const res = await api.get(`/images?${params}`)
    images.value = res.data.data || []
    total.value = res.data.total || 0
  } catch (_) {}
  finally { loading.value = false }
}

function openAdd() {
  form.value = defaultForm()
  previewSrc.value = ''
  showModal.value = true
}

function preview(img) {
  previewImg.value = img
}

async function copyUrl(url) {
  try {
    await navigator.clipboard.writeText(url)
    Swal.fire({ icon: 'success', title: 'URL disalin!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'info', title: 'URL', text: url })
  }
}

async function save() {
  saving.value = true
  try {
    await api.post('/images', form.value)
    showModal.value = false
    page.value = 1
    await load()
    Swal.fire({ icon: 'success', title: 'Gambar ditambahkan!', timer: 1200, showConfirmButton: false })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Gagal', text: err.response?.data?.message || 'Terjadi kesalahan.' })
  } finally { saving.value = false }
}

async function confirmDelete(img) {
  const { isConfirmed } = await Swal.fire({
    icon: 'warning', title: 'Hapus gambar?', text: `"${img.name}" akan dihapus dari perpustakaan.`,
    showCancelButton: true, confirmButtonText: 'Hapus', confirmButtonColor: '#ef4444', cancelButtonText: 'Batal'
  })
  if (!isConfirmed) return
  try {
    await api.delete(`/images/${img.id}`)
    await load()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Gagal', text: err.response?.data?.message || 'Gagal menghapus.' })
  }
}

onMounted(load)
</script>
