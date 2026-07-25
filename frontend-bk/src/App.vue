<template>
	<router-view />
	<AppToast />
	<ConfirmModal />
</template>

<script setup>
import AppToast from "@/components/AppToast.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
</script>
