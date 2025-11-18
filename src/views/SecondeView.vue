<template>
  <div class="seconde-page">
    <SimpleBackground />

    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <i class="fas fa-seedling"></i>
            Classe de Seconde
          </div>
          <h1 class="hero-title">Seconde Générale</h1>
          <p class="hero-subtitle">
            Posez des <strong>bases solides</strong> pour réussir votre parcours scientifique et préparer la <strong>Première S</strong>
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ totalModules }}</span>
              <span class="stat-label">Modules</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ totalExercices }}+</span>
              <span class="stat-label">Exercices</span>
            </div>
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Programme SEN</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-elements">
            <i class="floating-icon fas fa-shapes"></i>
            <i class="floating-icon fas fa-atom"></i>
            <i class="floating-icon fas fa-chart-bar"></i>
          </div>
        </div>
      </section>

      <!-- Navigation Matières -->
      <section class="subjects-nav">
        <div class="nav-container">
          <button
            v-for="subject in subjects"
            :key="subject.id"
            :class="['nav-item', { active: activeSubject === subject.id }]"
            @click="setActiveSubject(subject.id)"
          >
            <i :class="subject.icon"></i>
            {{ subject.name }}
          </button>
        </div>
      </section>

      <!-- Modules Grid -->
      <section class="modules-section">
        <div class="section-header">
          <h2 class="section-title">
            <i :class="activeSubjectData.icon"></i>
            {{ activeSubjectData.name }} - Seconde
          </h2>
          <p class="section-description">{{ activeSubjectData.description }}</p>
        </div>

        <div class="modules-grid">
          <div
            v-for="module in filteredModules"
            :key="module.id"
            class="module-card"
            :style="{ '--module-color': module.color }"
          >
            <div class="module-header">
              <div class="module-badge" :style="{ backgroundColor: module.color }">
                {{ module.chapters.length }} chapitres
              </div>
              <div class="module-duration">
                <i class="fas fa-clock"></i>
                {{ module.duration }}
              </div>
            </div>

            <div class="module-content">
              <h3 class="module-title">{{ module.title }}</h3>
              <p class="module-description">{{ module.description }}</p>

              <div class="chapters-list">
                <div
                  v-for="chapter in module.chapters"
                  :key="chapter"
                  class="chapter-item"
                >
                  <i class="fas fa-play-circle"></i>
                  {{ chapter }}
                </div>
              </div>
            </div>

            <div class="module-footer">
              <div class="module-actions">
                <button class="btn-primary" @click="openModule(module)">
                  <i class="fas fa-play"></i>
                  Commencer
                </button>
                <button class="btn-outline" @click="showDetails(module)">
                  <i class="fas fa-info-circle"></i>
                  Détails
                </button>
              </div>
              <div class="module-progress" v-if="module.progress">
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: module.progress + '%', backgroundColor: module.color }"
                  ></div>
                </div>
                <span class="progress-text">{{ module.progress }}% complété</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Orientation Section -->
      <section class="orientation-section">
        <div class="orientation-header">
          <h2 class="section-title">
            <i class="fas fa-compass"></i>
            Préparation Première
          </h2>
          <p>Choisissez la bonne voie pour votre avenir scientifique</p>
        </div>

        <div class="orientation-grid">
          <div class="orientation-card">
            <div class="orientation-icon maths">
              <i class="fas fa-calculator"></i>
            </div>
            <h3>Mathématiques Renforcées</h3>
            <p>Développez votre raisonnement logique pour exceller en Première S</p>
            <ul class="orientation-list">
              <li><i class="fas fa-check"></i> Algèbre fondamentale</li>
              <li><i class="fas fa-check"></i> Géométrie analytique</li>
              <li><i class="fas fa-check"></i> Initiation aux fonctions</li>
            </ul>
          </div>

          <div class="orientation-card">
            <div class="orientation-icon physics">
              <i class="fas fa-flask"></i>
            </div>
            <h3>Physique-Chimie Découverte</h3>
            <p>Explorez les lois de l'univers et les transformations de la matière</p>
            <ul class="orientation-list">
              <li><i class="fas fa-check"></i> Méthode scientifique</li>
              <li><i class="fas fa-check"></i> Mesures et incertitudes</li>
              <li><i class="fas fa-check"></i> Démarche expérimentale</li>
            </ul>
          </div>

          <div class="orientation-card">
            <div class="orientation-icon success">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Réussite Garantie</h3>
            <p>90% de nos élèves de Seconde réussissent leur orientation scientifique</p>
            <ul class="orientation-list">
              <li><i class="fas fa-check"></i> Bilan personnalisé</li>
              <li><i class="fas fa-check"></i> Conseils d'orientation</li>
              <li><i class="fas fa-check"></i> Préparation adaptée</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Méthodologie Section -->
      <section class="methodology-section">
        <div class="methodology-content">
          <div class="methodology-text">
            <h2>Méthode EvaM pour la Seconde</h2>
            <p>Notre approche unique pour construire des bases solides :</p>
            <div class="methodology-points">
              <div class="method-point">
                <i class="fas fa-puzzle-piece"></i>
                <div>
                  <h4>Apprentissage Progressif</h4>
                  <p>Des concepts simples aux situations complexes</p>
                </div>
              </div>
              <div class="method-point">
                <i class="fas fa-brain"></i>
                <div>
                  <h4>Raisonnement Scientifique</h4>
                  <p>Développement de l'esprit critique et analytique</p>
                </div>
              </div>
              <div class="method-point">
                <i class="fas fa-tasks"></i>
                <div>
                  <h4>Auto-évaluation</h4>
                  <p>Quiz et exercices pour mesurer sa progression</p>
                </div>
              </div>
            </div>
          </div>
          <div class="methodology-visual">
            <div class="progress-pyramid">
              <div class="pyramid-level terminale">
                <span>Terminale S</span>
              </div>
              <div class="pyramid-level premiere">
                <span>Première S</span>
              </div>
              <div class="pyramid-level seconde active">
                <span>Seconde</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-card">
          <div class="cta-content">
            <h2>Démarrez du bon pied !</h2>
            <p>Une Seconde réussie ouvre les portes des meilleures filières scientifiques</p>
            <div class="cta-buttons">
              <RouterLink to="/contact" class="btn-cta-primary">
                <i class="fas fa-user-graduate"></i>
                Commencer l'aventure
              </RouterLink>
              <RouterLink to="/premiere" class="btn-cta-secondary">
                Découvrir la Première
              </RouterLink>
            </div>
          </div>
          <div class="cta-visual">
            <div class="success-badge">
              <span class="success-rate">90%</span>
              <span>de réussite en Première</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import SimpleBackground from '@/components/backgrounds/SimpleBackground.vue'

// Données des matières
const subjects = ref([
  {
    id: 'maths',
    name: 'Mathématiques',
    icon: 'fas fa-calculator',
    description: 'Fondamentaux mathématiques pour construire un raisonnement solide'
  },
  {
    id: 'pc',
    name: 'Physique-Chimie',
    icon: 'fas fa-flask',
    description: 'Découverte des sciences physiques et de la démarche scientifique'
  }
])

// Modules de Seconde (adaptés au programme sénégalais)
const modules = ref([
  // MATHÉMATIQUES - Seconde
  {
    id: 1,
    subject: 'maths',
    title: 'Ensembles de Nombres',
    description: 'Découverte des différents ensembles numériques et leurs propriétés',
    duration: '8h',
    color: '#0021B5',
    progress: 25,
    chapters: [
      'Nombres entiers et décimaux',
      'Nombres rationnels',
      'Nombres réels',
      'Intervalles',
      'Valeur absolue'
    ]
  },
  {
    id: 2,
    subject: 'maths',
    title: 'Calcul Algébrique',
    description: 'Maîtrise des outils algébriques fondamentaux',
    duration: '10h',
    color: '#1E90FF',
    progress: 15,
    chapters: [
      'Calcul littéral',
      'Développement et factorisation',
      'Équations du 1er degré',
      'Inéquations',
      'Systèmes d\'équations'
    ]
  },
  {
    id: 3,
    subject: 'maths',
    title: 'Fonctions de Référence',
    description: 'Étude des premières fonctions et de leurs représentations',
    duration: '12h',
    color: '#4A90E2',
    progress: 0,
    chapters: [
      'Notion de fonction',
      'Fonction affine',
      'Fonction carrée',
      'Fonction inverse',
      'Représentation graphique'
    ]
  },
  {
    id: 4,
    subject: 'maths',
    title: 'Géométrie Plane',
    description: 'Configurations du plan et raisonnement géométrique',
    duration: '14h',
    color: '#6366F1',
    progress: 0,
    chapters: [
      'Configurations du plan',
      'Vecteurs et translations',
      'Coordonnées dans le plan',
      'Équations de droites',
      'Cercles et angles'
    ]
  },

  // PHYSIQUE-CHIMIE - Seconde
  {
    id: 5,
    subject: 'pc',
    title: 'L\'Univers et la Matière',
    description: 'Découverte de la structure de l\'univers et de la matière',
    duration: '11h',
    color: '#FE66C4',
    progress: 20,
    chapters: [
      'Structure de l\'Univers',
      'Le système solaire',
      'Constitution de la matière',
      'Atomes et molécules',
      'États de la matière'
    ]
  },
  {
    id: 6,
    subject: 'pc',
    title: 'Mouvement et Interactions',
    description: 'Introduction à la mécanique et aux forces',
    duration: '13h',
    color: '#FF6B9D',
    progress: 0,
    chapters: [
      'Description du mouvement',
      'Relativité du mouvement',
      'Forces et interactions',
      'Principe d\'inertie',
      'Poids et masse'
    ]
  },
  {
    id: 7,
    subject: 'pc',
    title: 'Transformations Chimiques',
    description: 'Premières réactions chimiques et leurs applications',
    duration: '15h',
    color: '#FF8AC8',
    progress: 0,
    chapters: [
      'Réactions chimiques',
      'Équations-bilans',
      'Tests de reconnaissance',
      'Synthèse chimique',
      'Sécurité au laboratoire'
    ]
  },
  {
    id: 8,
    subject: 'pc',
    title: 'Ondes et Signaux',
    description: 'Propagation des ondes et phénomènes lumineux',
    duration: '10h',
    color: '#E91E63',
    progress: 0,
    chapters: [
      'Ondes mécaniques',
      'Ondes sonores',
      'Lumière et vision',
      'Couleurs des objets',
      'Instruments d\'optique'
    ]
  }
])

// État actif
const activeSubject = ref('maths')

// Computed properties
const activeSubjectData = computed(() => {
  return subjects.value.find(s => s.id === activeSubject.value)
})

const filteredModules = computed(() => {
  return modules.value.filter(module => module.subject === activeSubject.value)
})

const totalModules = computed(() => {
  return modules.value.length
})

const totalExercices = computed(() => {
  return modules.value.reduce((total, module) => {
    return total + (module.chapters ? module.chapters.length * 5 : 0)
  }, 0)
})

// Méthodes
const setActiveSubject = (subjectId) => {
  activeSubject.value = subjectId
}

const openModule = (module) => {
  console.log('Ouvrir le module:', module)
}

const showDetails = (module) => {
  console.log('Détails du module:', module)
}

onMounted(() => {
  // Initialisation si nécessaire
})
</script>

<style scoped>
.seconde-page {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  min-height: 60vh;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-subtitle strong {
  color: var(--text-dark);
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #4CAF50;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
}

.hero-visual {
  position: relative;
  height: 300px;
}

.floating-elements {
  position: relative;
  height: 100%;
}

.floating-icon {
  position: absolute;
  font-size: 4rem;
  color: rgba(76, 175, 80, 0.3);
  animation: float 6s ease-in-out infinite;
  text-shadow: 0 0 25px rgba(76, 175, 80, 0.6);
}

.floating-icon:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-icon:nth-child(2) {
  top: 60%;
  left: 70%;
  animation-delay: 2s;
}

.floating-icon:nth-child(3) {
  top: 40%;
  left: 40%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Navigation Matières */
.subjects-nav {
  margin: 2rem 0;
}

.nav-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid transparent;
  border-radius: 15px;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-item i {
  color: #4CAF50;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}

.nav-item.active i {
  color: white;
}

/* Modules Section */
.modules-section {
  margin: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.section-description {
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.module-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--module-color), transparent);
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
}

.module-badge {
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.module-duration {
  color: var(--text-light);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.module-content {
  padding: 0 1.5rem 1.5rem;
}

.module-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.module-description {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chapter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-dark);
  font-size: 0.9rem;
}

.chapter-item i {
  color: var(--module-color);
}

.module-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.02);
}

.module-actions {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--module-color);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid var(--module-color);
  color: var(--module-color);
  padding: 0.8rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--module-color);
  color: white;
}

.module-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 600;
}

/* Orientation Section */
.orientation-section {
  margin: 6rem 0;
}

.orientation-header {
  text-align: center;
  margin-bottom: 3rem;
}

.orientation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.orientation-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.orientation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.orientation-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.orientation-icon.maths {
  background: linear-gradient(135deg, #0021B5, #0044ff);
}

.orientation-icon.physics {
  background: linear-gradient(135deg, #FE66C4, #FF8AC8);
}

.orientation-icon.success {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
}

.orientation-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.orientation-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.orientation-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.orientation-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.orientation-list li i {
  color: #4CAF50;
}

/* Méthodologie Section */
.methodology-section {
  margin: 6rem 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 4rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.methodology-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.methodology-text h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.methodology-text > p {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.methodology-points {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.method-point {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.method-point i {
  font-size: 1.5rem;
  color: #4CAF50;
  margin-top: 0.2rem;
}

.method-point h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.method-point p {
  color: var(--text-light);
  line-height: 1.5;
}

.progress-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pyramid-level {
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  width: 200px;
  transition: all 0.3s ease;
}

.pyramid-level.terminale {
  background: linear-gradient(135deg, #0021B5, #0044ff);
  color: white;
}

.pyramid-level.premiere {
  background: linear-gradient(135deg, #FF6B35, #FF8E53);
  color: white;
}

.pyramid-level.seconde {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

/* CTA Section */
.cta-section {
  margin: 6rem 0;
}

.cta-card {
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  border-radius: 30px;
  padding: 4rem;
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 20px 60px rgba(76, 175, 80, 0.3);
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-cta-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #4CAF50;
  padding: 1rem 2rem;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-cta-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cta-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-badge {
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.success-rate {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-stats {
    justify-content: center;
  }

  .nav-container {
    flex-direction: column;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }

  .module-actions {
    flex-direction: column;
  }

  .orientation-grid {
    grid-template-columns: 1fr;
  }

  .methodology-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .method-point {
    flex-direction: column;
    text-align: center;
  }

  .cta-card {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }

  .methodology-section {
    padding: 2rem;
  }
}
</style>
