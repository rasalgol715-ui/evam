<template>
  <div class="chat-widget">
    <button class="chat-toggle" @click="toggle">
      {{ open ? '✕' : '💬' }}
    </button>

    <div v-if="open" class="chat-window">
      <div class="chat-header">
        <h3>Assistant IA</h3>
      </div>
      <div class="chat-messages" ref="msgBox">
        <div
          v-for="(m, i) in msgs"
          :key="i"
          :class="['bubble', m.role]"
        >
          <div v-html="renderMessage(m.content)"></div>
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="input"
          @keydown.enter="send"
          placeholder="Tape ton message…"
        />
        <button @click="send">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'  // 👈 CSS KaTeX

const md = new MarkdownIt({
  html: false,        // sécurité : pas de HTML brut
  breaks: true,       // \n → <br>
  linkify: true       // auto-détecte les URLs
})
md.use(mk)            // 👈 ACTIVE LES FORMULES

const open = ref(false)
const input = ref('')
const msgs = ref([
  { role: 'assistant', content: 'Bonjour ! Pose-moi une question avec des maths : \\(x^2 + y^2 = z^2\\)' }
])
const msgBox = ref(null)

const toggle = () => {
  open.value = !open.value
  nextTick(scrollToBottom)
}

const scrollToBottom = () => {
  if (msgBox.value) msgBox.value.scrollTop = msgBox.value.scrollHeight
}

const renderMessage = (text) => {
  return md.render(text)
}

const send = async () => {
  if (!input.value.trim()) return
  const userMsg = { role: 'user', content: input.value }
  msgs.value.push(userMsg, { role: 'assistant', content: '' })
  const currentIndex = msgs.value.length - 1

  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input.value })
  })

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let answer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    answer += decoder.decode(value, { stream: true })
    msgs.value[currentIndex].content = answer
    nextTick(scrollToBottom)
  }
  input.value = ''
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.chat-window {
  width: 350px;
  height: 500px;
  background: #1e1e1e;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  margin-bottom: 10px;
}

.chat-header {
  padding: 12px;
  background: #007bff;
  color: white;
  border-radius: 12px 12px 0 0;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
}

.bubble.user {
  align-self: flex-end;
  background: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}

.bubble.assistant {
  align-self: flex-start;
  background: #2d2d2d;
  color: #e0e0e0;
  border-bottom-left-radius: 4px;
}

:deep(.katex) {
  font-size: 1.1em;
  color: #e0e0e0;
}

.chat-input {
  display: flex;
  padding: 12px;
  border-top: 1px solid #333;
  gap: 8px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background: #2d2d2d;
  color: white;
}

.chat-input button {
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  background: #007bff;
  color: white;
  cursor: pointer;
}
</style>
