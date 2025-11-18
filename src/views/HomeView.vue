<template>
  <div class="home-view">
    <!-- Fond quantique -->
    <QuantumBackground />

    <!-- Section Hero -->
    <section class="hero-section-dark">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-star"></i>
          <span>Plateforme éducative leader au Sénégal</span>
        </div>

        <h1 class="hero-title">Bienvenue chez EvaM Group</h1>

        <p class="hero-subheadline">L'excellence éducative réinventée</p>

        <p class="hero-description">
          <strong>{{ totalModules }} modules</strong> de cours,
          <strong>{{ totalStudents }}+ étudiants</strong> accompagnés,
          <strong>100% en ligne</strong>
        </p>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{{ totalModules }}+</span>
            <span class="stat-label">Modules</span>
          </div>
          <div class="stat">
            <span class="stat-number">3</span>
            <span class="stat-label">Niveaux</span>
          </div>
          <div class="stat">
            <span class="stat-number">4</span>
            <span class="stat-label">Matières</span>
          </div>
        </div>

        <div class="hero-buttons">
          <RouterLink to="/categories" class="btn btn-primary">
            <i class="fas fa-book-open"></i>
            Découvrir tous les cours
          </RouterLink>
          <RouterLink to="/academie-ia" class="btn btn-secondary">
            <i class="fas fa-robot"></i>
            Académie IA
          </RouterLink>
        </div>
      </div>
    </section>

    <div class="main-content">
      <!-- Section Features -->
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

      <!-- Section Nouveautés avec VRAIS modules -->
      <section class="new-modules-section">
        <div class="section-header">
          <div class="section-badge">
            <i class="fas fa-bolt"></i>
            <span>Nouveautés</span>
          </div>
          <h2>Découvrez nos derniers modules</h2>
          <p class="section-intro">Des cours innovants pour votre réussite académique et professionnelle</p>
        </div>

        <div class="modules-grid">
          <div
            v-for="module in featuredModules"
            :key="module.id"
            class="module-item"
            :style="{ borderTop: `4px solid ${module.color}` }"
          >
            <div class="module-badge" :style="{ backgroundColor: module.color }">
              {{ module.level }}
            </div>
            <div class="module-image-placeholder">
              <i class="fas fa-book" :style="{ color: module.color }"></i>
            </div>
            <h3>{{ module.title }}</h3>
            <p class="module-subject">{{ module.subject }}</p>
            <div class="module-chapters">
              <span v-for="(chapter, index) in module.chapters.slice(0, 2)" :key="index" class="chapter-tag">
                {{ chapter }}
              </span>
              <span v-if="module.chapters.length > 2" class="chapter-more">
                +{{ module.chapters.length - 2 }} autres
              </span>
            </div>
            <RouterLink :to="module.path" class="btn-small">
              Voir le module <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>

        <div class="section-cta">
          <RouterLink to="/categories" class="btn btn-primary">
            <i class="fas fa-th-list"></i>
            Voir tous les modules
          </RouterLink>
        </div>
      </section>

      <!-- Section Vidéo Showcase -->
      <section class="video-showcase-section">
        <div class="video-showcase-container">
          <div class="section-header">
            <div class="section-badge">
              <i class="fas fa-play-circle"></i>
              <span>Démonstration</span>
            </div>
            <h2>Découvrez nos cours en action</h2>
            <p class="section-intro">
              Voyez par vous-même comment nous rendons les concepts difficiles faciles à comprendre.
            </p>
          </div>
          <div class="video-grid">
            <div class="video-main">
              <div class="video-placeholder">
                <i class="fas fa-play"></i>
                <p>Vidéo de présentation EvaM Group</p>
              </div>
            </div>
            <div class="animation-grid">
              <div class="animation-card">
                <div class="animation-placeholder">
                  <i class="fas fa-code"></i>
                </div>
                <h4>Programmation Python</h4>
                <p>Découvrez les boucles, les fonctions et les structures de données.</p>
              </div>
              <div class="animation-card">
                <div class="animation-placeholder">
                  <i class="fas fa-calculator"></i>
                </div>
                <h4>Algorithmes avancés</h4>
                <p>Comprenez la logique et la structure d'un algorithme efficace.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Preview Fascicules -->
      <section id="preview-fascicules" class="preview-section">
        <div class="preview-container">
          <div class="section-header">
            <div class="section-badge">
              <i class="fas fa-eye"></i>
              <span>Extraits</span>
            </div>
            <h2>Prévisualisez nos Fascicules</h2>
            <p class="section-intro">Cliquez sur une couverture pour voir un extrait du contenu</p>
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
                <div class="fascicule-cover">
                  <i class="fas fa-book"></i>
                </div>
                <div class="fascicule-info">
                  <h4>{{ fascicule.nom }}</h4>
                  <span class="fascicule-price">{{ fascicule.prix }} FCFA</span>
                </div>
              </div>
            </div>
            <div class="fascicule-preview-area">
              <transition name="fade" mode="out-in">
                <div class="preview-content" :key="fasciculeEnPreview.id">
                  <div class="preview-cover">
                    <i class="fas fa-book-open"></i>
                  </div>
                  <div class="preview-text-content">
                    <h3>Extrait : {{ fasciculeEnPreview.nom }}</h3>
                    <div v-html="fasciculeEnPreview.previewHtml"></div>
                    <div class="preview-actions">
                      <span class="preview-price">{{ fasciculeEnPreview.prix }} FCFA</span>
                      <a href="#commande-fascicules" class="btn-commander-extrait">
                        Commander <i class="fas fa-arrow-down"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Commande Fascicules -->
      <section id="commande-fascicules" class="order-section">
        <div class="order-container">
          <div class="section-header">
            <div class="section-badge">
              <i class="fas fa-qrcode"></i>
              <span>Commande</span>
            </div>
            <h2>Commandez vos Fascicules EvaM</h2>
            <p class="section-intro">
              Accès direct à la réussite. Remplissez le formulaire ci-dessous pour recevoir vos fascicules.
            </p>
          </div>

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
                    v-model="commande.selection">
                  <label :for="fascicule.id">
                    {{ fascicule.nom }} <span class="price-tag">{{ fascicule.prix }} FCFA</span>
                  </label>
                </div>
              </div>
            </div>

            <div v-if="commande.selection.length > 0" class="order-summary">
              <h4>Récapitulatif de commande</h4>
              <div class="summary-items">
                <div v-for="item in commande.selection" :key="item" class="summary-item">
                  <span>{{ item }}</span>
                  <span>{{ getFasciculePrice(item) }} FCFA</span>
                </div>
              </div>
              <div class="summary-total">
                <span>Total:</span>
                <span class="total-price">{{ calculateTotal() }} FCFA</span>
              </div>
            </div>

            <button type="submit" class="btn-submit-order">
              <i class="fas fa-paper-plane"></i>
              Passer la commande
            </button>
          </form>

          <div v-if="formSubmitted" class="success-message">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Merci pour votre commande !</h3>
            <p>
              Nous avons bien reçu votre demande. Un agent EvaM vous contactera
              très prochainement sur le numéro <strong>{{ commande.telephone }}</strong>
              pour finaliser la livraison.
            </p>
            <button @click="resetForm" class="btn-new-order">
              <i class="fas fa-plus"></i>
              Nouvelle commande
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCourses } from '@/services/courseService'
import emailjs from '@emailjs/browser'
import QuantumBackground from '@/components/QuantumBackground.vue'

const EMAILJS_SERVICE_ID = 'service_dtj373m'
const EMAILJS_TEMPLATE_COMMANDE = 'template_2ggmqlo'
const EMAILJS_PUBLIC_KEY = 'kSSYiauK7yBL9LRZV'

// Utilisation des vrais modules
const { allModules } = useCourses()

// Statistiques dynamiques
const totalStudents = ref(0)
const totalModules = computed(() => allModules.value.length)

// Modules en vedette (les 6 derniers)
const featuredModules = computed(() => {
  return allModules.value
    .slice(-6)
    .reverse()
})

// Animation des statistiques
onMounted(() => {
  // Animation compteur étudiants
  const targetStudents = 2500
  const duration = 2000
  const step = targetStudents / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= targetStudents) {
      totalStudents.value = targetStudents
      clearInterval(timer)
    } else {
      totalStudents.value = Math.floor(current)
    }
  }, 16)
})

// Données des fascicules (améliorées)
const listeFascicules = ref([
  {
    id: 'math_tle',
    nom: 'Maths Terminale',
    prix: 5000,
    previewHtml: '<h4>Chapitre 1 : Les Limites et la Continuité</h4><p>Découvrez les concepts fondamentaux des limites et de la continuité des fonctions avec des exemples concrets et des exercices progressifs.</p><ul><li>Limites finies et infinies</li><li>Continuité sur un intervalle</li><li>Théorème des valeurs intermédiaires</li></ul>'
  },
  {
    id: 'pc_tle',
    nom: 'PC Terminale',
    prix: 5000,
    previewHtml: '<h4>Chapitre 1 : La Mécanique Newtonienne</h4><p>Étudiez les lois de Newton et leurs applications dans des situations réelles avec des démonstrations détaillées.</p><ul><li>Les trois lois de Newton</li><li>Mouvement dans un champ de pesanteur</li><li>Énergie mécanique et conservation</li></ul>'
  },
  {
    id: 'math_1ere',
    nom: 'Maths Première',
    prix: 4500,
    previewHtml: '<h4>Chapitre 1 : Le Second Degré</h4><p>Maîtrisez les fonctions polynômes du second degré, leurs propriétés et leurs représentations graphiques.</p><ul><li>Forme canonique et factorisée</li><li>Signe du trinôme</li><li>Résolution d\'équations et inéquations</li></ul>'
  },
  {
    id: 'math_2nde',
    nom: 'Maths Seconde',
    prix: 4000,
    previewHtml: '<h4>Chapitre 1 : Les Ensembles de Nombres</h4><p>Introduction aux différents ensembles numériques et à leurs propriétés fondamentales.</p><ul><li>Nombres entiers, décimaux, rationnels</li><li>Intervalles et inégalités</li><li>Valeur absolue et distance</li></ul>'
  },
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

function getFasciculePrice(nom) {
  const fascicule = listeFascicules.value.find(f => f.nom === nom)
  return fascicule ? fascicule.prix : 0
}

function calculateTotal() {
  return commande.value.selection.reduce((total, nom) => {
    return total + getFasciculePrice(nom)
  }, 0)
}

function handleOrder() {
  const templateParams = {
    nom: commande.value.nom,
    classe: commande.value.classe,
    telephone: commande.value.telephone,
    selection: commande.value.selection.join(', '),
    total: calculateTotal() + ' FCFA'
  };

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_COMMANDE,
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
  .then((response) => {
     console.log('Commande envoyée !', response.status, response.text);
     formSubmitted.value = true
  }, (err) => {
     console.error('Échec...', err);
     alert("Erreur lors de l'envoi de la commande.");
  });
}

function resetForm() {
  formSubmitted.value = false
  commande.value = {
    nom: '',
    classe: '',
    telephone: '',
    selection: []
  }
  fasciculeEnPreview.value = listeFascicules.value[0]
}
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
}

.main-content {
  position: relative;
  z-index: 1;
}

/* ===== HERO SECTION ===== */
.hero-section-dark {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0 1rem;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 800px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #0021B5, #FE66C4);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  animation: fadeIn 1s ease-in-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffe6f2;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: fadeIn 1s ease-in-out 0.2s both;
}

.hero-subheadline {
  font-size: 1.5rem;
  color: aqua;
  margin-bottom: 0.5rem;
  animation: fadeIn 1.5s ease-in-out 0.5s both;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-description {
  font-size: 1.2rem;
  color: #d1d5db;
  margin-bottom: 2.5rem;
  animation: fadeIn 1.5s ease-in-out 0.8s both;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  animation: fadeIn 1.5s ease-in-out 1s both;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: aqua;
}

.stat-label {
  font-size: 0.9rem;
  color: #d1d5db;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1.5s ease-in-out 1.2s both;
}

/* ===== BOUTONS ===== */
.btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #0021B5;
  color: white;
  border: 2px solid #0021B5;
}

.btn-primary:hover {
  background-color: #001a8c;
  border-color: #001a8c;
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

.btn-small {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-small:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

/* ===== SECTIONS GÉNÉRALES ===== */
section {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #FF6B35, #FE66C4);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.section-intro {
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-cta {
  text-align: center;
  margin-top: 3rem;
}

/* ===== FEATURES SECTION ===== */
.features-section, .new-modules-section {
  width: 100%;
  max-width: 1200px;
  padding: 6rem 2rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  margin: 2rem auto;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.features-section h2, .new-modules-section h2 {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 3rem;
  font-weight: 700;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card i {
  font-size: 3.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.4rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
}

/* ===== MODULES GRID ===== */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.module-item {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  text-align: left;
  transition: transform 0.3s ease;
  position: relative;
  padding: 2rem;
}

.module-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.module-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

.module-image-placeholder {
  height: 120px;
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

.module-image-placeholder i {
  font-size: 3rem;
  opacity: 0.7;
}

.module-item h3 {
  font-size: 1.3rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.module-subject {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.module-chapters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.chapter-tag {
  background: var(--bg-light);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--text-light);
}

.chapter-more {
  font-size: 0.8rem;
  color: var(--primary);
  font-weight: 600;
}

/* ===== VIDEO SHOWCASE ===== */
.video-showcase-section {
  width: 100%;
  padding: 6rem 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  text-align: center;
  margin: 2rem 0;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.video-showcase-container {
  max-width: 1200px;
  margin: 0 auto;
}

.video-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.video-main {
  position: relative;
  padding-top: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: var(--bg-light);
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), #FE66C4);
  color: white;
}

.video-placeholder i {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.animation-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.animation-card {
  background-color: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: left;
  transition: var(--transition);
}

.animation-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.animation-placeholder {
  height: 120px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.animation-placeholder i {
  font-size: 2.5rem;
  color: var(--primary);
}

.animation-card h4 {
  font-size: 1.2rem;
  color: var(--text-dark);
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.animation-card p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
  line-height: 1.5;
}

/* ===== PREVIEW FASCICULES - VERSION CORRIGÉE ===== */
.preview-section {
  padding: 6rem 2rem;
  background-color: rgba(255, 107, 157, 0.1);
  margin: 2rem 0;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.preview-container {
  max-width: 1200px;
  margin: auto;
}

.preview-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.fascicule-selector-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
}

.fascicule-selector-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: var(--transition);
  background-color: white;
  min-height: 90px;
}

.fascicule-selector-item:hover {
  background-color: var(--bg-light);
  transform: translateX(5px);
}

.fascicule-selector-item.active {
  background-color: #e0f7fa;
  border-color: var(--primary);
}

.fascicule-cover-img {
  width: 60px;
  height: 85px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: var(--transition);
  flex-shrink: 0;
}

.fascicule-selector-item:hover .fascicule-cover-img {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.fascicule-selector-item.active .fascicule-cover-img {
  border: 3px solid var(--primary);
  transform: scale(1.05);
}

.fascicule-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fascicule-info h4 {
  font-size: 1rem;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.fascicule-price {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
  background: rgba(0, 33, 181, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  align-self: flex-start;
  white-space: nowrap;
}

.fascicule-preview-area {
  position: relative;
  min-height: 400px;
}

.preview-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.preview-cover-img {
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: var(--shadow);
  flex-shrink: 0;
}

.preview-text-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.preview-text-content h3 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  line-height: 1.3;
  word-wrap: break-word;
}

.preview-text-content :deep(h4) {
  font-size: 1.2rem;
  color: var(--text-dark);
  margin: 1.5rem 0 0.5rem 0;
  line-height: 1.4;
}

.preview-text-content :deep(p) {
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.preview-text-content :deep(ul) {
  color: var(--text-light);
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.preview-text-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.preview-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  gap: 1rem;
}

.preview-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary);
  white-space: nowrap;
}

.btn-commander-extrait {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  background-color: var(--primary);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: var(--transition);
  white-space: nowrap;
}

.btn-commander-extrait:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

/* ===== ORDER SECTION ===== */
.order-section {
  padding: 6rem 2rem;
  background-color: rgba(255, 107, 157, 0.1);
  margin: 2rem 0;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.order-container {
  max-width: 800px;
  margin: auto;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border-top: 5px solid var(--primary);
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
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group select {
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: var(--transition);
  background-color: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}

.fascicule-options .option {
  display: flex;
  align-items: center;
  background-color: var(--bg-light);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: var(--transition);
}

.fascicule-options .option:hover {
  background-color: #e0f7fa;
}

.fascicule-options input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
  margin-right: 12px;
  accent-color: var(--primary);
}

.fascicule-options label {
  margin-bottom: 0;
  font-weight: 500;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.price-tag {
  background: var(--primary);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
}

.order-summary h4 {
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-size: 1.1rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  padding-top: 1rem;
  border-top: 2px solid #dee2e6;
  align-items: center;
}

.total-price {
  color: var(--primary);
}

.btn-submit-order {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--primary);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-submit-order:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

/* ===== SUCCESS MESSAGE ===== */
.success-message {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #e6fffa;
  border: 1px solid #3ddc97;
  border-radius: var(--radius);
}

.success-icon {
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.success-message h3 {
  color: #23765a;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.success-message p {
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-new-order {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-new-order:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .preview-grid {
    grid-template-columns: 280px 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subheadline {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .preview-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .fascicule-selector-list {
    flex-direction: row;
    overflow-x: auto;
    max-height: none;
    padding: 0.5rem;
    gap: 0.8rem;
  }

  .fascicule-selector-item {
    flex-direction: column;
    text-align: center;
    min-width: 120px;
    padding: 0.8rem;
    min-height: auto;
  }

  .fascicule-info h4 {
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  .fascicule-price {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .preview-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .preview-cover-img {
    width: 180px;
    height: 250px;
  }

  .preview-actions {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .order-container {
    padding: 1.5rem;
  }

  .features-section,
  .new-modules-section,
  .video-showcase-section,
  .preview-section,
  .order-section {
    padding: 4rem 1rem;
    margin: 1rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .module-item {
    padding: 1.5rem;
  }

  .animation-grid {
    flex-direction: column;
  }

  .fascicule-options label {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .price-tag {
    align-self: flex-start;
  }

  .preview-cover-img {
    width: 150px;
    height: 210px;
  }

  .fascicule-cover-img {
    width: 45px;
    height: 63px;
  }

  .fascicule-selector-item {
    min-width: 100px;
  }
}

/* ===== SCROLLBAR STYLING ===== */
.fascicule-selector-list::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.fascicule-selector-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.fascicule-selector-list::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
}

.fascicule-selector-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ===== FOCUS STATES ===== */
.btn:focus,
input:focus,
select:focus,
button:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* ===== PRINT STYLES ===== */
@media print {
  .hero-section-dark,
  .quantum-bg {
    display: none;
  }

  .features-section,
  .new-modules-section,
  .video-showcase-section,
  .preview-section,
  .order-section {
    box-shadow: none;
    background: white;
  }
}
</style>
