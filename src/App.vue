<script setup>
import ChatAssistant from './components/ChatAssistant.vue'
import { RouterView } from 'vue-router'
// NOTE: Si AppHeader/AppFooter n'existent pas, commentez les lignes ci-dessous
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <!-- NOTE: Si AppHeader n'existe pas, commentez cette ligne -->
  <AppHeader />

  <!-- Contenu principal des pages -->
  <RouterView />

  <!-- NOTE: Si AppFooter n'existe pas, commentez cette ligne -->
  <AppFooter />

  <!-- 🚀 Assistant IA toujours visible -->
  <ChatAssistant />
</template>

<style scoped>
/* ✅ Style minimale et propre */
#app {
  position: relative;
  min-height: 100vh;
}

/* ✅ Assure que le chat est au-dessus de tout */
:global(.chat-container) {
  z-index: 1000 !important;
}
</style>
