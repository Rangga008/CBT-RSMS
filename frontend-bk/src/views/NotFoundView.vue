<template>
	<div class="min-h-screen flex items-center justify-center bg-slate-50">
		<div class="text-center">
			<div class="text-8xl font-black text-slate-200 mb-2">404</div>
			<h2 class="text-2xl font-bold text-slate-700">Halaman Tidak Ditemukan</h2>
			<p class="text-slate-400 mt-2 mb-6">
				Halaman yang Anda cari tidak ada atau sudah dipindahkan.
			</p>
			<router-link
				to="/dashboard"
				class="btn-primary inline-flex items-center gap-2"
			>
				<i class="fas fa-home"></i> Kembali ke Dashboard
			</router-link>
		</div>
	</div>
</template>
