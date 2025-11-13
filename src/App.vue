<script setup>
// 1. Header
import AppHeader from '@/components/AppHeader.vue'
// 2. Footer
import AppFooter from '@/components/AppFooter.vue'
// 3. Router
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <ChatAgent />
</template>

<style scoped>
.page-content {
  position: relative;
  z-index: 1;
}
</style>
