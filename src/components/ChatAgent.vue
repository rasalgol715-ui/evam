<template>
  <div class="agent-wrapper">
    <!-- BULLE -->
    <div class="agent-bubble" @click="open = !open">
      <img src="/images/bot-avatar.svg" alt="assistant" />
    </div>

    <!-- FENÊTRE -->
    <Transition name="slide">
      <div v-if="open" class="agent-panel">
        <header>
          <span>🤖 Prof-Eva</span>
          <button @click="open = false">✕</button>
        </header>

        <div ref="box" class="chat-box">
          <div
            v-for="(m, idx) in messages"
            :key="idx"
            :class="m.isBot ? 'bot' : 'user'"
          >
            <p>{{ m.text }}</p>
            <a v-if="m.link" :href="m.link" class="btn-link">{{ m.linkText }}</a>
          </div>
          <div v-if="typing" class="bot typing">Prof-Eva écrit…</div>
        </div>

        <div class="chat-bar">
          <input
            v-model="question"
            placeholder="Tape ta question…"
            @keydown.enter="send"
          />
          <button @click="send">➤</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { askLlama } from '@/services/ollama.js'

const open = ref(false)
const question = ref('')
const typing = ref(false)
const messages = ref([
  { text: 'Salut 👋 Je suis le prof IA EvaM. Pose-moi n’importe quelle question !', isBot: true }
])

const systemPrompt =
`Tu es "Prof-Eva", assistant pédagogique sénégalais, spécialisé en maths, physique, informatique du collège/lycée.
- Réponses courtes (2-3 phrases), ton amical.
- Si la question est hors-programme : propose de contacter un vrai prof via /contact.`

async function send () {
  if (!question.value.trim()) return
  messages.value.push({ text: question.value, isBot: false })
  typing.value = true
  try {
    const fullPrompt = `${systemPrompt}\nÉlève : ${question.value}\nProf-Eva :`
    const answer = await askLlama(fullPrompt)
    messages.value.push({ text: answer, isBot: true })
  } catch (e) {
    messages.value.push({ text: 'Désolé, le professeur est momentanément indisponible 😅 Contacte-nous sur WhatsApp.', link: 'https://wa.me/221775632268', linkText: 'WhatsApp' })
  }
  typing.value = false
  question.value = ''
  await nextTick(() => (box.value.scrollTop = box.value.scrollHeight))
}
</script>


<style scoped>
.agent-wrapper{position:fixed;bottom:20px;right:20px;z-index:999;font-family:Poppins,sans-serif}
.agent-bubble{width:60px;height:60px;border-radius:50%;background:#0021B5;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.agent-bubble img{width:32px;height:32px}
.agent-panel{width:340px;height:480px;background:#fff;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.2);display:flex;flex-direction:column;overflow:hidden}
header{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#0021B5;color:#fff;font-weight:600}
header button{background:none;border:none;color:#fff;font-size:18px;cursor:pointer}
.chat-box{flex:1;padding:12px;overflow-y:auto}
.chat-box p{margin:0}
.chat-box .bot{background:#f3f4f6;border-radius:12px 12px 12px 0;padding:10px;margin:6px 0;align-self:flex-start}
.chat-box .user{background:#0021B5;color:#fff;border-radius:12px 12px 0 12px;padding:10px;margin:6px 0;align-self:flex-end;max-width:80%}
.btn-link{display:inline-block;margin-top:6px;padding:6px 12px;background:#FE66C4;color:#fff;border-radius:20px;font-size:13px;text-decoration:none}
.chat-bar{display:flex;border-top:1px solid #e5e7eb}
.chat-bar input{flex:1;border:none;padding:12px;outline:none}
.chat-bar button{background:#0021B5;color:#fff;border:none;padding:0 16px;cursor:pointer}
.typing::after{content:'▌';animation:blink 1s infinite}
@keyframes blink{50%{opacity:0}}
</style>

