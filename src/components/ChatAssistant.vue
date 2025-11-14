<!-- ChatAssistant.vue - Version corrigée sans erreurs -->
<template>
  <div class="chat-container">
    <h3>Assistant EvaM</h3>
    <div class="chat-messages">
      <div v-for="msg in messages" :key="msg.id">
        <div v-html="renderMath(msg.content)"></div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <textarea v-model="userInput" placeholder="Votre question..."></textarea>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import markdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import katex from 'katex'  // ✅ CRITIQUE : Cette ligne est absente chez vous
import 'katex/dist/katex.min.css'
// Ajoutez dans <script setup>
import siteIndex from '../../server/site-content.json'

// Utilisez-le dans le prompt système
const SYSTEM_PROMPT = `Tu es l'Assistant EvaM. Voici le contenu du site :
${JSON.stringify(siteIndex, null, 2)}

Réponds en te basant SUR CE CONTENU uniquement.`
const md = markdownIt({ html: true }).use(markdownItKatex)
const userInput = ref('')
const messages = ref([])

const renderMath = (content) => md.render(content)

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  messages.value.push({ id: Date.now(), role: 'user', content: userInput.value })
  userInput.value = ''
}
</script>

<style scoped>
.chat-container { position: fixed; bottom: 20px; right: 20px; width: 380px; }
</style>
