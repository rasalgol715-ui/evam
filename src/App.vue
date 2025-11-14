<script setup>
import KimiChat from './components/KimiChat.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <KimiChat />
</template>

<style scoped>
.page-content {
  position: relative;
  z-index: 1;
}
</style>
