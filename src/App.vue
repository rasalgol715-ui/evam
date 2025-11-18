<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { RouterView } from 'vue-router'
import ChatAgent from '@/components/ChatAgent.vue'
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
