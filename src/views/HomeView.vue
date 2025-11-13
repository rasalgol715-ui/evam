<template>
  <div class="home-view">
    <!-- Canvas particules -->
    <canvas ref="particles" class="particles"></canvas>

    <!-- Formules défilantes -->
    <div class="formulas">
      <div class="formula">∫_{-∞}^{+∞} e^{-x²} dx = √π</div>
      <div class="formula">∇ ⋅ E = ρ / ε₀</div>
      <div class="formula">lim_{x→0} (sin x)/x = 1</div>
      <div class="formula">E = mc²</div>
      <div class="formula">∑_{n=1}^{∞} 1/n² = π²/6</div>
      <div class="formula">F = ma</div>
    </div>

    <!-- CONTENU PRINCIPAL -->
    <div class="content">
      <!-- HERO SECTION -->
      <section class="hero-section-dark">
        <div class="hero-content">
          <div class="typing-container">
            <h1>EvaM Group</h1>
          </div>
          <p class="hero-subheadline">Maîtrisez vos cours avec nous.</p>
          <p class="hero-description">
            Des ressources complètes pour exceller en Maths, Physique et Info.
          </p>
          <div class="hero-buttons">
            <RouterLink to="/categories" class="btn btn-primary">Découvrir les cours</RouterLink>
            <RouterLink to="/contact" class="btn btn-secondary">Nous contacter</RouterLink>
          </div>
        </div>
      </section>

      <!-- ACADÉMIE IA -->
      <section class="ia-showcase-section">
        <div class="ia-showcase-container">
          <div class="ia-showcase-text">
            <h2>Découvrez notre Académie IA</h2>
            <p class="section-intro">
              L'intelligence Artificielle transforme le monde. Ne restez pas spectateur.
              Nous formons les étudiants sénégalais aux métiers de demain :
            </p>
            <ul class="ia-features-list">
              <li><i class="fas fa-check-circle"></i> Ingénieur Prompt & IA Générative</li>
              <li><i class="fas fa-check-circle"></i> Analyste de Données (Data Analyst) IA</li>
              <li><i class="fas fa-check-circle"></i> Développeur IA / Machine Learning</li>
            </ul>
            <div class="hero-buttons">
              <RouterLink to="/academie-ia" class="btn btn-primary">Explorer les Parcours IA</RouterLink>
            </div>
          </div>
          <div class="ia-showcase-image">
            <img src="/images/etudiant-en-ligne.png" alt="Étudiant apprenant l'IA en ligne">
          </div>
        </div>
      </section>

      <!-- POURQUOI EVAM -->
      <section class="features-section">
        <h2>Pourquoi choisir EvaM Group ?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-book-reader"></i>
            <h3>Contenu riche</h3>
            <p>Des explications claires, des exercices corrigés et des fascicules téléchargeables.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-chalkboard-teacher"></i>
            <h3>Professeurs experts</h3>
            <p>Apprenez avec des enseignants passionnés et expérimentés.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-laptop-code"></i>
            <h3>Apprentissage flexible</h3>
            <p>Accédez à vos cours à tout moment, de n'importe où.</p>
          </div>
        </div>
      </section>

      <!-- VIDÉOS & ANIMATIONS -->
      <section class="video-showcase-section">
        <div class="video-showcase-container">
          <h2>Découvrez nos cours en action</h2>
          <p class="section-intro">
            Voyez par vous-même comment nous rendons les concepts difficiles faciles à comprendre.
          </p>
          <div class="video-grid">
            <div class="video-main">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Vidéo de présentation EvaM Group"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
            <div class="animation-grid">
              <div class="animation-card">
                <img src="" alt="Animation Python">
                <h4>Info Terminale : Python</h4>
                <p>Découvrez les boucles, les fonctions et les structures de données.</p>
              </div>
              <div class="animation-card">
                <img src="" alt="Animation Algorithmes">
                <h4>Info Première : Algorithmes</h4>
                <p>Comprenez la logique et la structure d'un algorithme efficace.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NOUVEAUTÉS -->
      <section class="new-modules-section">
        <h2>Nouveautés</h2>
        <div class="modules-grid">
          <div class="module-item">
            <img src="/images/math_tle_cover.png" alt="Module Maths Terminale">
            <h3>Maths Terminale : Nombres Complexes</h3>
            <p>Découvrez les nombres complexes et leurs applications géométriques.</p>
            <RouterLink :to="{ path: '/terminale', hash: '#module-3' }" class="btn btn-small">Voir le module</RouterLink>
          </div>
          <div class="module-item">
            <img src="/images/math_1ere_cover.png" alt="Module PC Première">
            <h3>PC Première : Mouvement et Forces</h3>
            <p>Comprenez les lois de Newton et la cinématique des solides.</p>
            <RouterLink :to="{ path: '/premiere', hash: '#module-5' }" class="btn btn-small">Voir le module</RouterLink>
          </div>
          <div class="module-item">
            <img src="/images/pc_tle_cover.png" alt="Module Info Terminale">
            <h3>Info Terminale : Programmation Python</h3>
            <p>Initiation à la programmation et aux algorithmes avec Python.</p>
            <RouterLink to="/terminale" class="btn btn-small">Voir le module</RouterLink>
          </div>
        </div>
      </section>

      <!-- PRÉVISUALISATION FASCICULES -->
      <section id="preview-fascicules" class="preview-section">
        <div class="preview-container">
          <div class="section-title-container">
            <i class="fas fa-eye"></i>
            <h2>Prévisualisez nos Fascicules</h2>
            <p>Cliquez sur une couverture pour voir un extrait du contenu.</p>
          </div>
          <div class="preview-grid">
            <div class="fascicule-selector-list">
              <div
                v-for="fascicule in listeFascicules"
                :key="fascicule.id"
                class="fascicule-selector-item"
                :class="{ active: fascicule.id === fasciculeEnPreview.id }"
                @click="changerPreview(fascicule)"
              >
                <img :src="fascicule.coverImg" :alt="'Couverture ' + fascicule.nom">
                <h4>{{ fascicule.nom }}</h4>
              </div>
            </div>
            <div class="fascicule-preview-area">
              <transition name="fade" mode="out-in">
                <div class="preview-content" :key="fasciculeEnPreview.id">
                  <img
                    :src="fasciculeEnPreview.coverImg"
                    :alt="'Aperçu ' + fasciculeEnPreview.nom"
                    class="preview-cover-img"
                  >
                  <div class="preview-text-content">
                    <h3>Extrait : {{ fasciculeEnPreview.nom }}</h3>
                    <div v-html="fasciculeEnPreview.previewHtml"></div>
                    <a href="#commande-fascicules" class="btn-commander-extrait">
                      Commander ce fascicule <i class="fas fa-arrow-down"></i>
                    </a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- COMMANDE FASCICULES -->
      <section id="commande-fascicules" class="order-section">
        <div class="order-container">
          <h2><i class="fas fa-qrcode"></i> Commander vos Fascicules EvaM</h2>
          <p>
            Accès direct à la réussite. Remplissez le formulaire ci-dessous
            pour recevoir vos fascicules.
          </p>
          <form v-if="!formSubmitted" @submit.prevent="handleOrder" class="order-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="nom">Nom complet</label>
                <input type="text" id="nom" v-model="commande.nom" placeholder="Ex: Moussa Diop" required>
              </div>
              <div class="form-group">
                <label for="classe">Votre Classe</label>
                <select id="classe" v-model="commande.classe" required>
                  <option disabled value="">-- Sélectionnez votre niveau --</option>
                  <option>6ème</option>
                  <option>5ème</option>
                  <option>4ème</option>
                  <option>3ème</option>
                  <option>Seconde</option>
                  <option>Première</option>
                  <option>Terminale</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="telephone">Numéro de téléphone (WhatsApp)</label>
              <input type="tel" id="telephone" v-model="commande.telephone" placeholder="Ex: 77 123 45 67" required>
            </div>
            <div class="form-group">
              <label>Quels fascicules souhaitez-vous ?</label>
              <div class="fascicule-options">
                <div v-for="fascicule in listeFascicules" :key="fascicule.id" class="option">
                  <input
                    type="checkbox"
                    :id="fascicule.id"
                    :value="fascicule.nom"
                    v-model="commande.selection"
                  >
                  <label :for="fascicule.id">
                    {{ fascicule.nom }} <span>({{ fascicule.prix }} FCFA)</span>
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn-submit-order">
              Passer la commande
            </button>
          </form>
          <div v-if="formSubmitted" class="success-message">
            <h3>Merci pour votre commande !</h3>
            <p>
              Nous avons bien reçu votre demande. Un agent EvaM vous contactera
              très prochainement sur le numéro <strong>{{ commande.telephone }}</strong>
              pour finaliser la livraison.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'

/* ---------- PARTICULES ---------- */
const particles = ref(null)
let ctx, w, h, frameId
const particleCount = 80
const particlesArray = ref([])   // ← ICI

class Particle {
  constructor() {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 1.5 + 0.5
    this.speedX = Math.random() * 0.4 - 0.2
    this.speedY = Math.random() * 0.4 - 0.2
    this.opacity = Math.random() * 0.5 + 0.1
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x > w || this.x < 0) this.speedX *= -1
    if (this.y > h || this.y < 0) this.speedY *= -1
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h)
  particlesArray.value.forEach(p => {
    p.update()
    p.draw()
  })
  frameId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  w = particles.value.width = particles.value.offsetWidth
  h = particles.value.height = particles.value.offsetHeight
  particlesArray.value.length = 0
  for (let i = 0; i < particleCount; i++) particlesArray.value.push(new Particle())
}



onUnmounted(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resizeCanvas)
})

/* ---------- COMMANDE FASCICULES ---------- */
const EMAILJS_SERVICE_ID = 'service_dtj373m'
const EMAILJS_TEMPLATE_COMMANDE = 'template_2ggmqlo'
const EMAILJS_PUBLIC_KEY = 'kSSYiauK7yBL9LRZV'

const listeFascicules = ref([
  {
    id: 'math_tle',
    nom: 'Maths Terminale',
    prix: 5000,
    coverImg: '/images/math_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : Les Limites et la Continuité</h4><p>...'
  },
  {
    id: 'pc_tle',
    nom: 'PC Terminale',
    prix: 5000,
    coverImg: '/images/pc_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : La Mécanique Newtonienne</h4><p>...'
  },
  {
    id: 'math_1ere',
    nom: 'Maths Première',
    prix: 4500,
    coverImg: '/images/math_1ere_cover.jpg',
    previewHtml: '<h4>Chapitre 1 : Le Second Degré</h4><p>...'
  },
  {
    id: 'math_2nde',
    nom: 'Maths Seconde',
    prix: 4000,
    coverImg: '/images/pc_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : Les Ensembles de Nombres</h4><p>...'
  }
])

const fasciculeEnPreview = ref(listeFascicules.value[0])
function changerPreview(fascicule) {
  fasciculeEnPreview.value = fascicule
}

const commande = ref({
  nom: '',
  classe: '',
  telephone: '',
  selection: []
})
const formSubmitted = ref(false)

function handleOrder() {
  const templateParams = {
    nom: commande.value.nom,
    classe: commande.value.classe,
    telephone: commande.value.telephone,
    selection: commande.value.selection.join(', ')
  }

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_COMMANDE,
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
    .then(() => {
      console.log('Commande envoyée !')
      formSubmitted.value = true
    })
    .catch(err => {
      console.error('Échec...', err)
      alert("Erreur lors de l'envoi de la commande.")
    })
}
</script>

<style scoped>
/* ========== FOND & PARTICULES ========== */
.home-view {
  position: relative;
  min-height: 100vh;
  background: #0b0f19;
  overflow: hidden;
  color: #f9fafb;
}

.particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.formulas {
  position: absolute;
  inset: 0;
  z-index: 2;
  font-family: 'Courier New', monospace;
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.06);
  user-select: none;
  pointer-events: none;
}

.formula {
  position: absolute;
  white-space: nowrap;
  animation: scroll 20s linear infinite;
}
.formula:nth-child(1) { top: 10%; animation-duration: 18s; }
.formula:nth-child(2) { top: 25%; animation-duration: 22s; }
.formula:nth-child(3) { top: 40%; animation-duration: 20s; }
.formula:nth-child(4) { top: 55%; animation-duration: 24s; }
.formula:nth-child(5) { top: 70%; animation-duration: 19s; }
.formula:nth-child(6) { top: 85%; animation-duration: 21s; }

@keyframes scroll {
  from { transform: translateX(100vw); }
  to   { transform: translateX(-100%); }
}

.content {
  position: relative;
  z-index: 3;
}

/* ========== HERO SECTION ========== */
.hero-section-dark {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: #111827;
  padding: 0 2rem;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.typing-container h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  border-right: 4px solid #FE66C4;
  animation: typing 2.5s steps(10, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #FE66C4; }
}

.hero-subheadline {
  font-size: 1.5rem;
  color: #f3f4f6;
  margin-bottom: 0.5rem;
  animation: fadeIn 1.5s ease-in-out 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.hero-description {
  font-size: 1.2rem;
  color: #9ca3af;
  margin-bottom: 2.5rem;
  animation: fadeIn 1.5s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1.5s ease-in-out 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #0021B5;
  color: white;
  border: 2px solid #0021B5;
}

.btn-primary:hover {
  background-color: #001699;
  border-color: #001699;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #0021B5;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .typing-container h1 {
    font-size: 2.5rem;
    animation: typing 2.5s steps(10, end), blink-caret 0.75s step-end infinite;
  }
  .hero-subheadline {
    font-size: 1.2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .hero-buttons {
    flex-direction: column;
  }
}

/* ========== SECTIONS SUIVANTES ========== */
.ia-showcase-section,
.features-section,
.new-modules-section,
.video-showcase-section,
.preview-section,
.order-section {
  width: 100%;
  padding: 4rem 2rem;
  background-color: #fff;
  text-align: center;
}

.ia-showcase-container,
.video-showcase-container,
.preview-container,
.order-container {
  max-width: 1200px;
  margin: 0 auto;
}

.ia-showcase-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.ia-showcase-text h2 {
  font-size: 2.2rem;
  color: #0021B5;
  margin-bottom: 1rem;
  font-weight: 700;
}

.ia-showcase-text .section-intro {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.ia-features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
}

.ia-features-list li {
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.ia-features-list li i {
  color: #0021B5;
  margin-right: 10px;
  font-size: 1.2rem;
}

.ia-showcase-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.ia-showcase-section .hero-buttons {
  animation: none;
  opacity: 1;
  justify-content: flex-start;
}

.ia-showcase-section .btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.ia-showcase-section .btn-primary {
  background-color: #0021B5;
  color: white;
  border: 2px solid #0021B5;
}

.ia-showcase-section .btn-primary:hover {
  background-color: #001699;
  border-color: #001699;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.features-section h2,
.video-showcase-section h2,
.new-modules-section h2,
.preview-section h2,
.order-section h2 {
  font-size: 2.2rem;
  color: #0021B5;
  margin-bottom: 3rem;
  font-weight: 700;
}

.features-grid,
.modules-grid,
.video-grid,
.preview-grid {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.features-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.modules-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.video-grid {
  grid-template-columns: 2fr 1fr;
  align-items: flex-start;
}

.video-main {
  position: relative;
  padding-top: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.video-main iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.animation-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.animation-card {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: all 0.3s ease;
}

.animation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.animation-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #eee;
}

.animation-card h4 {
  font-size: 1.2rem;
  color: #111827;
  font-weight: 600;
}

.animation-card p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 900px) {
  .ia-showcase-container {
    grid-template-columns: 1fr;
  }
  .ia-showcase-image {
    order: -1;
    margin-bottom: 2rem;
  }
  .video-grid {
    grid-template-columns: 1fr;
  }
  .animation-grid {
    flex-direction: row;
  }
}

@media (max-width: 600px) {
  .animation-grid {
    flex-direction: column;
  }
}

/* ---------- PREVIEW FASCICULES ---------- */
.preview-section {
  padding: 4rem 2rem;
  background-color: #ffe6f2;
}

.preview-container {
  max-width: 1200px;
  margin: auto;
}

.preview-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  background-color: #ffe6f2;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.preview-cover-img {
  width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.preview-text-content h3 {
  font-size: 1.5rem;
  color: #0021B5;
  margin-bottom: 1rem;
}

.preview-text-content :deep(h4) {
  font-size: 1.2rem;
  color: #111827;
  margin-top: 1rem;
}

.preview-text-content :deep(p) {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

.btn-commander-extrait {
  display: inline-block;
  margin-top: 2rem;
  padding: 10px 20px;
  background-color: #0021B5;
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-commander-extrait:hover {
  background-color: #001699;
  transform: translateY(-2px);
}

.btn-commander-extrait i {
  margin-left: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------- COMMANDE FASCICULES ---------- */
.order-section {
  padding: 4rem 2rem;
  background-color: #ffe6f2;
}

.order-container {
  max-width: 800px;
  margin: auto;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-top: 5px solid #0021B5;
}

.order-container h2 {
  text-align: center;
  color: #0021B5;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.order-container h2 i {
  margin-right: 10px;
  color: #111827;
}

.order-container p {
  text-align: center;
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group select {
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0021B5;
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}

.fascicule-options .option {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.fascicule-options .option:hover {
  background-color: #e0f7fa;
}

.fascicule-options input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
  margin-right: 12px;
  accent-color: #0021B5;
}

.fascicule-options label {
  margin-bottom: 0;
  font-weight: 500;
  flex-grow: 1;
}

.fascicule-options label span {
  float: right;
  font-weight: 600;
  color: #0021B5;
}

.btn-submit-order {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background-color: #0021B5;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit-order:hover {
  background-color: #001699;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.success-message {
  text-align: center;
  padding: 2rem;
  background-color: #e6fffa;
  border: 1px solid #3ddc97;
  border-radius: 16px;
}

.success-message h3 {
  color: #23765a;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .order-container {
    padding: 1.5rem;
  }
}
</style>
