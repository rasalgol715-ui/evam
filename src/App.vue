<script setup>
// 1. On importe notre composant Header
import AppHeader from './components/AppHeader.vue'

// 2. On importe notre NOUVEAU composant Footer
import AppFooter from './components/AppFooter.vue'

// 3. On importe le composant "fenêtre" de Vue Router
import { RouterView } from 'vue-router'
</script>
<script setup>
import ChatAgent from '@/components/ChatAgent.vue'
</script>

<template>
  <AppHeader />

  <main class="page-content"></main>
    <RouterView />

  <AppFooter />
</template>

/* src/App.vue */
<style scoped>
.page-content {
  position: relative; /* Crée un contexte d'empilement */
  z-index: 1;      /* Force ce contenu à être en dessous du header (qui a z-index: 100) */
}
</style>
<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <ChatAgent />
</template>


