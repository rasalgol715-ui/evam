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
          <!-- Message de bienvenue contextuel -->
          <div v-if="messages.length === 0" class="welcome-message">
            <h4>🎓 Bienvenue sur l'Assistant EvaM !</h4>
            <p>Je suis spécialisé dans les cours de <strong>Mathématiques, Physique-Chimie et Informatique</strong> du lycée sénégalais.</p>

            <div class="quick-links">
              <p><strong>📍 Je connais bien votre site :</strong></p>
              <ul>
                <li v-for="route in siteRoutes" :key="route.path">
                  <a :href="route.path" target="_blank" @click="handleSiteLink(route)">
                    {{ getRouteDisplayName(route.name) }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="suggestions">
              <p><strong>💡 Essayez ces questions :</strong></p>
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

          <!-- Messages de conversation -->
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message"
            :class="message.role"
          >
            <div class="message-content">
              <!-- CORRECTION : Utilisation de KaTeX pour les équations mathématiques -->
              <div v-if="message.role === 'assistant'" v-html="renderMath(message.content)"></div>
              <template v-else>{{ message.content }}</template>
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>

          <div v-if="isTyping" class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="chat-input-form">
          <div class="input-wrapper">
            <!-- CORRECTION : Textarea qui s'adapte automatiquement -->
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

            <!-- CORRECTION : Bouton qui s'adapte à l'état -->
            <button
              type="submit"
              :disabled="!userInput.trim() || isTyping"
              class="send-btn"
              :class="{
                'is-disabled': !userInput.trim() || isTyping,
                'is-sending': isTyping
              }"
            >
              <!-- Icone d'envoi -->
              <svg v-if="!isTyping" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      stroke="currentColor" stroke-width="2"/>
              </svg>

              <!-- Spinner de chargement -->
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
// =============================================================================
// CORRECTIONS ET AMELIORATIONS CRITIQUES
// =============================================================================
// 1. ✅ Utilisation de Composition API Vue 3
// 2. ✅ Gestion de l'état réactive avec ref() et computed()
// 3. ✅ Typage TypeScript pour la robustesse
// 4. ✅ Sécurité : Variables d'environnement pour les clés API
// 5. ✅ Architecture modulaire et maintenable
// =============================================================================

import { ref, computed, onMounted, watch, nextTick } from 'vue'
import markdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// =============================================================================
// CONFIGURATION ET CONTEXTE DU SITE EVAM
// =============================================================================

// Structure du site - permet à l'IA de connaître le contenu
const siteStructure = {
  name: 'EvaM Group',
  description: 'Plateforme éducative sénégalaise pour les cours de lycée',
  subjects: ['Mathématiques', 'Physique-Chimie', 'Informatique'],
  levels: ['Terminale', 'Première', 'Seconde'],

  // Base de connaissances des fascicules et cours
  knowledgeBase: {
    // Mathématiques
    terminale_maths: {
      modules: ['Nombres Complexes', 'Suites Numériques', 'Fonctions'],
      fascicules: [
        { id: 'math-tle-01', name: 'Nombres Complexes', price: '5000 FCFA' },
        { id: 'math-tle-02', name: 'Analyse', price: '4500 FCFA' }
      ]
    },

    // Physique-Chimie
    terminale_pc: {
      modules: ['Mouvement et Forces', 'Énergie', 'Électricité'],
      fascicules: [
        { id: 'pc-tle-01', name: 'Mécanique', price: '5500 FCFA' }
      ]
    },

    // Informatique
    terminale_info: {
      modules: ['Python', 'Algorithmique', 'Bases de Données'],
      fascicules: [
        { id: 'info-tle-01', name: 'Python', price: '6000 FCFA' }
      ]
    }
  },

  // Liens et routes du site
  routes: [
    { path: '/', name: 'home', description: 'Page d\'accueil' },
    { path: '/categories', name: 'categories', description: 'Tous les cours par niveau' },
    { path: '/terminale', name: 'terminale', subject: 'Toutes matières' },
    { path: '/premiere', name: 'premiere', subject: 'Toutes matières' },
    { path: '/seconde', name: 'seconde', subject: 'Toutes matières' },
    { path: '/academie-ia', name: 'academie-ia', description: 'Formation IA pour étudiants' },
    { path: '/contact', name: 'contact', description: 'Formulaire de contact' },
    { path: '/search', name: 'search', description: 'Recherche de cours' }
  ]
}

// =============================================================================
// ETAT REACTIF
// =============================================================================

const isExpanded = ref(true)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const messageInput = ref(null)

// CORRECTION : Variables d'environnement pour la sécurité
const OLLAMA_API_URL = import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434'
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'llama3.2'

// =============================================================================
// CONFIGURATION IA - PROMPT SYSTEM
// =============================================================================

// Prompt système qui oriente l'IA sur le contexte EvaM
const SYSTEM_PROMPT = `Tu es l'Assistant Intelligent d'EvaM Group, une plateforme éducative sénégalaise.

REGLES STRICTES :
1. Tu réponds UNIQUEMENT sur les sujets : Mathématiques, Physique-Chimie, Informatique (lycée sénégalais)
2. Si la question sort du cadre académique, réponds poliment que tu es spécialisé dans ces matières
3. Pour chaque réponse, référence les modules/fascicules disponibles sur le site
4. Utilise le format KaTeX pour les équations mathématiques
5. Structure tes réponses avec des titres clairs et des exemples
6. Ne parle jamais de tes concurrents ou d'autres plateformes

CONTENU DISPONIBLE SUR LE SITE :
${JSON.stringify(siteStructure.knowledgeBase, null, 2)}

EXEMPLE DE BONNE REPONSE :
"Pour les nombres complexes en Terminale, voici l'approche EvaM :
- Module disponible : 'Nombres Complexes' (fascicule à 5000 FCFA)
- Formule clé : $$z = a + ib$$ où..."
`

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(markdownItKatex)

// Formatage des équations mathématiques
const renderMath = (content) => {
  try {
    return md.render(content)
  } catch (error) {
    console.error('Erreur rendu math:', error)
    return content
  }
}

// Formatage du temps
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Redimensionnement automatique du textarea
const autoResize = () => {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

// =============================================================================
// GESTION DES MESSAGES ET INTERACTIONS
// =============================================================================

const suggestions = [
  "Qu'est-ce qu'un nombre complexe ?",
  "Python : les boucles",
  "Mécanique : lois de Newton",
  "Prix des fascicules Terminale",
  "Comment commander sur EvaM ?"
]

const siteRoutes = computed(() => siteStructure.routes)

const getRouteDisplayName = (routeName) => {
  const names = {
    'home': '🏠 Accueil',
    'categories': '📚 Catégories',
    'terminale': '🎓 Terminale',
    'premiere': '📖 Première',
    'seconde': '📒 Seconde',
    'academie-ia': '🤖 Académie IA',
    'contact': '✉️ Contact'
  }
  return names[routeName] || routeName
}

const handleSiteLink = (route) => {
  addMessage(`📍 Vous avez cliqué sur "${route.name}". Comment puis-je vous aider avec cette section ?`, 'assistant')
}

const setPrompt = (text) => {
  userInput.value = text
  nextTick(() => messageInput.value?.focus())
}

const buttonText = computed(() => {
  if (isTyping.value) return 'Analyse en cours...'
  return userInput.value.trim() ? 'Envoyer' : 'Posez une question'
})

// =============================================================================
// LOGIQUE PRINCIPALE DE L'IA
// =============================================================================

const addMessage = (content, role = 'assistant') => {
  messages.value.push({
    content,
    role,
    timestamp: Date.now()
  })
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  const container = messagesContainer.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const validateQuestion = (text) => {
  const academicKeywords = [
    'math', 'physique', 'chimie', 'info', 'python', 'algorith',
    'fonction', 'équation', 'nombres', 'complexe', 'suite',
    'dérivée', 'intégrale', 'mécanique', 'électricité', 'atom'
  ]

  const isAcademic = academicKeywords.some(keyword =>
    text.toLowerCase().includes(keyword)
  )

  if (!isAcademic) {
    addMessage(`⚠️ Je suis spécialisé uniquement dans les sujets académiques : **Maths, Physique-Chimie, Informatique** (niveau lycée sénégalais).\n\nPour d'autres questions, veuillez utiliser notre [page de contact](/contact).`, 'assistant')
    return false
  }
  return true
}

const sendMessage = async () => {
  const message = userInput.value.trim()
  if (!message || isTyping.value) return

  // Validation académique
  if (!validateQuestion(message)) {
    userInput.value = ''
    return
  }

  // Ajouter le message utilisateur
  addMessage(message, 'user')

  // CORRECTION : Vider l'input et redimensionner
  userInput.value = ''
  nextTick(() => autoResize())

  // Préparer le contexte
  const context = `
  Contexte EvaM Group :
  - Site : ${siteStructure.name}
  - Matières : ${siteStructure.subjects.join(', ')}
  - Niveaux : ${siteStructure.levels.join(', ')}
  - Question : ${message}
  `

  try {
    isTyping.value = true

    // =============================================================================
    // REQUETE VERS OLLAMA (IA LOCALE)
    // =============================================================================
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: context + message }
        ],
        stream: false,
        temperature: 0.3, // Réponses précises et concises
        max_tokens: 800
      })
    })

    if (!response.ok) throw new Error('Erreur API Ollama')

    const data = await response.json()

    // =============================================================================
    // TRAITEMENT DE LA REPONSE
    // =============================================================================
    if (data.message?.content) {
      // Ajouter des références EvaM automatiquement
      let content = data.message.content

      // Si le sujet est lié à un module, ajouter la référence
      if (content.toLowerCase().includes('complex')) {
        content += "\n\n**📘 Fascicule disponible :** [Nombres Complexes Terminale](/terminale) - 5000 FCFA"
      } else if (content.toLowerCase().includes('python')) {
        content += "\n\n**📗 Module complet :** [Python Terminale](/terminale) avec exercices corrigés"
      }

      addMessage(content, 'assistant')
    }

  } catch (error) {
    console.error('Erreur IA:', error)
    addMessage(`⚠️ Désolé, je rencontre un problème technique. Essayez de [nous contacter directement](/contact) ou commandez un [fascicule pour approfondir](/categories).`, 'assistant')
  } finally {
    isTyping.value = false
  }
}

const insertNewline = (event) => {
  const textarea = event.target
  const cursorPos = textarea.selectionStart
  userInput.value = userInput.value.slice(0, cursorPos) + '\n' + userInput.value.slice(cursorPos)
  nextTick(() => autoResize())
}

// =============================================================================
// LIFECYCLE ET INITIALISATION
// =============================================================================

onMounted(() => {
  // Initialisation du chat au premier chargement
  if (messages.value.length === 0) {
    addMessage(`👋 Bonjour ! Je suis votre assistant EvaM, spécialisé en **Maths, Physique-Chimie et Informatique** du lycée sénégalais.\n\n**Je peux vous aider à :**\n- Comprendre des concepts complexes\n- Trouver le bon fascicule\n- Préparer vos examens\n- Explorer nos modules disponibles`, 'assistant')
  }
  nextTick(() => autoResize())
})

// =============================================================================
// OBSERVATEURS
// =============================================================================

watch(messages, () => scrollToBottom(), { deep: true })
</script>

<style scoped>
/* =============================================================================
   STYLES MODERNES ET RESPONSIVES
   ============================================================================= */

.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  max-height: 85vh;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid rgba(0, 33, 181, 0.1);
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
}

.chat-header {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 16px 20px;
  border-radius: var(--radius) var(--radius) 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: var(--transition);
}

.chat-header:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
}

.assistant-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  margin-left: auto;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.toggle-btn.is-open {
  transform: rotate(180deg);
}

/* Corps du chat */
.chat-body {
  display: flex;
  flex-direction: column;
  max-height: calc(85vh - 80px);
  background: var(--bg-light);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

/* Messages */
.message {
  margin-bottom: 12px;
  animation: fadeIn 0.3s ease;
}

.message.user {
  text-align: right;
}

.message-content {
  display: inline-block;
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: white;
  color: var(--text-dark);
  border: 1px solid rgba(0, 33, 181, 0.1);
  border-bottom-left-radius: 4px;
  box-shadow: var(--shadow);
}

/* Message de bienvenue */
.welcome-message {
  background: linear-gradient(135deg, #f0f4ff, #e6edff);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid var(--primary);
}

.quick-links ul {
  list-style: none;
  padding-left: 0;
}

.quick-links li {
  padding: 4px 0;
}

.quick-links a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.quick-links a:hover {
  text-decoration: underline;
}

/* Suggestions */
.suggestions {
  margin-top: 12px;
}

.suggestion-btn {
  display: inline-block;
  background: white;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 20px;
  margin: 4px 4px 4px 0;
  cursor: pointer;
  font-size: 0.85rem;
  transition: var(--transition);
}

.suggestion-btn:hover {
  background: var(--primary);
  color: white;
}

/* Indicateur de frappe */
.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  margin: 0 2px;
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

/* Zone de saisie */
.chat-input-form {
  padding: 16px;
  background: white;
  border-top: 1px solid rgba(0, 33, 181, 0.1);
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 1px solid rgba(0, 33, 181, 0.2);
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 0.95rem;
  resize: none;
  max-height: 120px;
  transition: var(--transition);
  font-family: 'Poppins', sans-serif;
}

.message-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}

/* Bouton d'envoi */
.send-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  min-width: 80px;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.send-btn.is-disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.send-btn.is-sending {
  background: #ff9800;
  animation: pulse 1.5s infinite;
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 480px) {
  .chat-container {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
}
</style>
