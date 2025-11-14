<!-- ChatAssistant.vue - Composant IA intégré EvaM -->
<template>
  <div class="chat-container" :class="{ 'chat-expanded': isExpanded }">
    <div class="chat-header" @click="toggleChat">
      <img
        src="https://raw.githubusercontent.com/rasalgol715-ui/evam/main/public/images/evam-logo.png"
        alt="EvaM Assistant"
        class="assistant-avatar"
      />
      <h3>Assistant EvaM</h3>
      <span class="status-badge">Spécialisé Maths-PC-Info</span>
      <button class="toggle-btn" :class="{ 'is-open': isExpanded }">
        <i class="icon-chevron"></i>
      </button>
    </div>

    <transition name="slide-down">
      <div v-show="isExpanded" class="chat-body">
        <div class="chat-messages" ref="messagesContainer">
          <!-- Message de bienvenue -->
          <div v-if="messages.length === 0" class="welcome-message">
            <h4>🎓 Bienvenue sur l'Assistant EvaM !</h4>
            <p>
              Je suis spécialisé dans les cours de
              <strong>Mathématiques, Physique-Chimie et Informatique</strong>.
            </p>

            <div class="quick-links">
              <p><strong>📍 Je connais votre site :</strong></p>
              <ul>
                <li v-for="route in siteRoutes" :key="route.path">
                  <a :href="route.path" @click.prevent="handleSiteLink(route)">
                    {{ getRouteDisplayName(route.name) }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="suggestions">
              <p><strong>💡 Essayez :</strong></p>
              <button
                v-for="suggestion in suggestions"
                :key="suggestion"
                @click="setPrompt(suggestion)"
                class="suggestion-btn"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message"
            :class="message.role"
          >
            <div class="message-content" v-html="renderMath(message.content)"></div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>

          <div v-if="isTyping" class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="chat-input-form">
          <div class="input-wrapper">
            <textarea
              v-model="userInput"
              ref="messageInput"
              placeholder="Posez votre question sur Maths, PC ou Informatique..."
              :disabled="isTyping"
              class="message-input"
              @input="autoResize"
              @keydown.enter.exact.prevent="sendMessage"
              @keydown.enter.shift.exact.prevent="insertNewline"
              rows="1"
            ></textarea>

            <button
              type="submit"
              :disabled="!userInput.trim() || isTyping"
              class="send-btn"
              :class="{
                'is-disabled': !userInput.trim() || isTyping,
                'is-sending': isTyping,
              }"
            >
              <svg v-if="!isTyping" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <div v-else class="spinner"></div>
              <span>{{ buttonText }}</span>
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import markdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Contexte EvaM
const siteStructure = {
  name: 'EvaM Group',
  subjects: ['Mathématiques', 'Physique-Chimie', 'Informatique'],
  levels: ['Terminale', 'Première', 'Seconde'],
  routes: [
    { path: '/', name: 'home' },
    { path: '/categories', name: 'categories' },
    { path: '/terminale', name: 'terminale' },
    { path: '/premiere', name: 'premiere' },
    { path: '/seconde', name: 'seconde' },
    { path: '/academie-ia', name: 'academie-ia' },
    { path: '/contact', name: 'contact' },
  ],
}

// États
const isExpanded = ref(true)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const messageInput = ref(null)

// Ollama config
const OLLAMA_API_URL = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434'
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'llama3.2'

// Markdown + Math
const md = markdownIt({ html: true }).use(markdownItKatex)
const renderMath = (content) => md.render(content)

// Utilitaires
const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
const autoResize = () => {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

// Interaction
const suggestions = [
  "Qu'est-ce qu'un nombre complexe ?",
  'Python : les boucles',
  'Mécanique : lois de Newton',
  'Prix des fascicules Terminale',
]

const siteRoutes = computed(() => siteStructure.routes)
const getRouteDisplayName = (name) =>
  ({
    home: '🏠 Accueil',
    categories: '📚 Catégories',
    terminale: '🎓 Terminale',
    premiere: '📖 Première',
    seconde: '📒 Seconde',
    'academie-ia': '🤖 Académie IA',
  })[name] || name

const handleSiteLink = (route) => {
  addMessage(`📍 Vous avez cliqué sur "${route.name}". Comment puis-je vous aider ?`, 'assistant')
}

const setPrompt = (text) => {
  userInput.value = text
  nextTick(() => messageInput.value?.focus())
}

const buttonText = computed(() => (isTyping.value ? 'Analyse en cours...' : 'Envoyer'))

// Messages
const addMessage = (content, role = 'assistant') => {
  messages.value.push({ content, role, timestamp: Date.now() })
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  const container = messagesContainer.value
  if (container) container.scrollTop = container.scrollHeight
}

// Validation
const validateQuestion = (text) => {
  const academicKeywords = [
    'math',
    'physique',
    'chimie',
    'info',
    'python',
    'algorith',
    'fonction',
    'équation',
    'nombre',
    'complex',
    'suite',
    'dérivée',
    'intégrale',
    'mécanique',
    'électricité',
  ]
  const isAcademic = academicKeywords.some((k) => text.toLowerCase().includes(k))

  if (!isAcademic) {
    addMessage(
      `⚠️ Je suis spécialisé uniquement en **Maths, Physique-Chimie, Informatique**. Pour d'autres questions, [contactez-nous](/contact).`,
      'assistant',
    )
    return false
  }
  return true
}

// Logique IA
const sendMessage = async () => {
  const message = userInput.value.trim()
  if (!message || isTyping.value) return

  if (!validateQuestion(message)) {
    userInput.value = ''
    return
  }

  addMessage(message, 'user')
  userInput.value = ''
  nextTick(() => autoResize())

  try {
    isTyping.value = true
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          {
            role: 'system',
            content: `Tu es l'Assistant EvaM. Réponds UNIQUEMENT sur Maths, Physique, Info. Référence les fascicules EvaM. Utilise KaTeX pour équations.`,
          },
          { role: 'user', content: message },
        ],
        stream: false,
        temperature: 0.3,
      }),
    })

    if (!response.ok) throw new Error('Erreur API')
    const data = await response.json()

    if (data.message?.content) {
      let content = data.message.content
      if (content.includes('complex'))
        content += '\n\n**📘 Fascicule :** [Nombres Complexes](/terminale) - 5000 FCFA'
      if (content.includes('python'))
        content += '\n\n**📗 Module :** [Python Terminale](/terminale)'
      addMessage(content, 'assistant')
    }
  } catch (error) {
    console.error('Erreur IA:', error)
    addMessage(
      `⚠️ Problème technique. [Contactez-nous](/contact) ou commandez un [fascicule](/categories).`,
      'assistant',
    )
  } finally {
    isTyping.value = false
  }
}

const insertNewline = (event) => {
  const cursorPos = event.target.selectionStart
  userInput.value = userInput.value.slice(0, cursorPos) + '\n' + userInput.value.slice(cursorPos)
  nextTick(() => autoResize())
}

// Lifecycle
onMounted(() => {
  if (messages.value.length === 0) {
    addMessage(
      `👋 Bonjour ! Je suis votre assistant EvaM, spécialisé en **Maths, Physique-Chimie et Informatique**.\n\n**Je peux vous aider à :**\n- Comprendre des concepts\n- Trouver le bon fascicule\n- Préparer vos examens`,
      'assistant',
    )
  }
  nextTick(() => autoResize())
})

watch(messages, () => scrollToBottom(), { deep: true })
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  max-height: 85vh;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 33, 181, 0.1);
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
}

.assistant-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}
.chat-header {
  background: linear-gradient(135deg, #0021b5, #001699);
  color: white;
  padding: 16px 20px;
  border-radius: 16px 16px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}
.chat-body {
  display: flex;
  flex-direction: column;
  max-height: calc(85vh - 80px);
  background: #f9fafb;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

.message {
  margin-bottom: 12px;
  animation: fadeIn 0.3s ease;
}
.message.user .message-content {
  background: #0021b5;
  color: white;
  border-bottom-right-radius: 4px;
}
.message.assistant .message-content {
  background: white;
  color: #0021b5;
  border-bottom-left-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.message-content {
  display: inline-block;
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.welcome-message {
  background: linear-gradient(135deg, #f0f4ff, #e6edff);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid #0021b5;
}
.quick-links a {
  color: #0021b5;
  text-decoration: none;
  font-weight: 500;
}
.suggestion-btn {
  display: inline-block;
  background: white;
  border: 1px solid #0021b5;
  color: #0021b5;
  padding: 6px 12px;
  border-radius: 20px;
  margin: 4px;
  cursor: pointer;
}

.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0021b5;
  margin: 0 2px;
  animation: bounce 1.4s infinite;
}

.chat-input-form {
  padding: 16px;
  background: white;
  border-top: 1px solid rgba(0, 33, 181, 0.1);
}
.message-input {
  flex: 1;
  border: 1px solid rgba(0, 33, 181, 0.2);
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 0.95rem;
  resize: none;
  max-height: 120px;
  font-family: 'Poppins', sans-serif;
}
.send-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #0021b5;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
  min-width: 80px;
  justify-content: center;
}
.send-btn.is-disabled {
  background: #ccc;
  cursor: not-allowed;
}
.send-btn.is-sending {
  background: #ff9800;
  animation: pulse 1.5s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .chat-container {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
}
</style>
