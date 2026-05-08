<template>
	<div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
		<div
			class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-md w-full"
		>
			<p class="text-7xl mb-4">404</p>
			<h1 class="text-2xl font-bold text-slate-800 mb-2">
				Halaman Tidak Ditemukan
			</h1>
			<p class="text-slate-500 mb-6">
				Halaman yang Anda cari tidak ada atau telah dipindahkan.
			</p>
			<router-link to="/dashboard" class="btn-primary"
				>🏠 Kembali ke Dashboard</router-link
			>
		</div>
	</div>
</template>
