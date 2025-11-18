<template>
  <div class="terminale-page">
    <SimpleBackground />

    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <i class="fas fa-graduation-cap"></i>
            Baccalauréat Sénégalais
          </div>
          <h1 class="hero-title">Terminale Scientifique</h1>
          <p class="hero-subtitle">
            Préparez votre <strong>Bac S</strong> avec des cours complets,
            des exercices corrigés et des annales
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
            <i class="floating-icon fas fa-calculator"></i>
            <i class="floating-icon fas fa-flask"></i>
            <i class="floating-icon fas fa-atom"></i>
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
            {{ activeSubjectData.name }} - Terminale S
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

      <!-- Ressources Bac -->
      <section class="bac-resources">
        <div class="resources-header">
          <h2 class="section-title">
            <i class="fas fa-trophy"></i>
            Ressources Bac S
          </h2>
          <p>Sujets corrigés, conseils et méthodologie</p>
        </div>

        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-icon annals">
              <i class="fas fa-file-alt"></i>
            </div>
            <h3>Annales Bac</h3>
            <p>Sujets des 5 dernières années avec corrigés détaillés</p>
            <button class="btn-resource">
              <i class="fas fa-download"></i>
              Télécharger
            </button>
          </div>

          <div class="resource-card">
            <div class="resource-icon methods">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3>Méthodologie</h3>
            <p>Conseils pour réussir l'épreuve et gérer son temps</p>
            <button class="btn-resource">
              <i class="fas fa-book-open"></i>
              Consulter
            </button>
          </div>

          <div class="resource-card">
            <div class="resource-icon revision">
              <i class="fas fa-brain"></i>
            </div>
            <h3>Fiches de Révision</h3>
            <p>Résumés de cours et formules essentielles</p>
            <button class="btn-resource">
              <i class="fas fa-print"></i>
              Imprimer
            </button>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-card">
          <div class="cta-content">
            <h2>Prêt à exceller au Bac S ?</h2>
            <p>Rejoignez des centaines d'élèves qui préparent leur bac avec EvaM</p>
            <div class="cta-buttons">
              <RouterLink to="/contact" class="btn-cta-primary">
                <i class="fas fa-user-graduate"></i>
                Demander un accompagnement
              </RouterLink>
              <RouterLink to="/categories" class="btn-cta-secondary">
                Voir tous les cours
              </RouterLink>
            </div>
          </div>
          <div class="cta-visual">
            <div class="success-badge">
              <span class="success-rate">92%</span>
              <span>de réussite</span>
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
    description: 'Algèbre, analyse, géométrie et probabilités pour le Bac S'
  },
  {
    id: 'pc',
    name: 'Physique-Chimie',
    icon: 'fas fa-flask',
    description: 'Mécanique, ondes, transformations chimiques et électrochimie'
  }
])

// Modules par matière (adaptés au programme sénégalais)
const modules = ref([
  // MATHÉMATIQUES
  {
    id: 1,
    subject: 'maths',
    title: 'Analyse - Limites et Continuité',
    description: 'Maîtrisez les concepts fondamentaux des limites et de la continuité',
    duration: '8h',
    color: '#0021B5',
    progress: 25,
    chapters: [
      'Limites de fonctions',
      'Continuité en un point',
      'Théorème des valeurs intermédiaires',
      'Fonctions composées',
      'Exercices types Bac'
    ]
  },
  {
    id: 2,
    subject: 'maths',
    title: 'Dérivation et Applications',
    description: 'Applications de la dérivation à l\'étude des fonctions',
    duration: '10h',
    color: '#1E90FF',
    progress: 0,
    chapters: [
      'Nombre dérivé',
      'Fonction dérivée',
      'Variations des fonctions',
      'Optimisation',
      'Problèmes concrets'
    ]
  },
  {
    id: 3,
    subject: 'maths',
    title: 'Nombres Complexes',
    description: 'Nombres complexes et leurs applications géométriques',
    duration: '12h',
    color: '#4A90E2',
    progress: 0,
    chapters: [
      'Forme algébrique',
      'Conjugué et module',
      'Forme trigonométrique',
      'Applications géométriques',
      'Équations complexes'
    ]
  },
  {
    id: 4,
    subject: 'maths',
    title: 'Probabilités et Statistiques',
    description: 'Probabilités conditionnelles et lois de probabilité',
    duration: '14h',
    color: '#6366F1',
    progress: 0,
    chapters: [
      'Probabilités conditionnelles',
      'Variables aléatoires',
      'Lois binomiale et normale',
      'Échantillonnage',
      'Intervalle de fluctuation'
    ]
  },

  // PHYSIQUE-CHIMIE
  {
    id: 5,
    subject: 'pc',
    title: 'Mécanique Newtonienne',
    description: 'Lois de Newton et applications aux mouvements',
    duration: '15h',
    color: '#FE66C4',
    progress: 10,
    chapters: [
      'Forces et mouvement',
      'Lois de Newton',
      'Énergie mécanique',
      'Mouvements plans',
      'Systèmes mécaniques'
    ]
  },
  {
    id: 6,
    subject: 'pc',
    title: 'Ondes et Lumière',
    description: 'Propagation des ondes et phénomènes lumineux',
    duration: '12h',
    color: '#FF6B9D',
    progress: 0,
    chapters: [
      'Ondes mécaniques',
      'Ondes sonores',
      'Lumière et couleurs',
      'Lentilles et instruments',
      'Interférences'
    ]
  },
  {
    id: 7,
    subject: 'pc',
    title: 'Transformations Chimiques',
    description: 'Cinétique chimique et transformations en solution',
    duration: '16h',
    color: '#FF8AC8',
    progress: 0,
    chapters: [
      'Vitesse de réaction',
      'Facteurs cinétiques',
      'Acides et bases',
      'Titrages',
      'Oxydoréduction'
    ]
  },
  {
    id: 8,
    subject: 'pc',
    title: 'Électrochimie',
    description: 'Piles et électrolyse pour le Bac S',
    duration: '10h',
    color: '#E91E63',
    progress: 0,
    chapters: [
      'Piles électrochimiques',
      'Électrolyse',
      'Lois de Faraday',
      'Applications industrielles',
      'Problèmes types Bac'
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
  // Navigation vers le module
  console.log('Ouvrir le module:', module)
  // Implémenter la navigation réelle
}

const showDetails = (module) => {
  // Afficher les détails du module
  console.log('Détails du module:', module)
}

onMounted(() => {
  // Initialisation si nécessaire
})
</script>

<style scoped>
.terminale-page {
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
  background: linear-gradient(135deg, #0021B5, #FE66C4);
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
  background: linear-gradient(135deg, #0021B5, #FE66C4);
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
  color: var(--primary);
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
  color: rgba(255, 255, 255, 0.3);
  animation: float 6s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); /* 🔥 Ajout d'un glow */

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
  background: rgba(255, 255, 255, 0.95); /* 🔥 Fond plus opaque */
  border: 2px solid transparent;
  border-radius: 15px;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 🔥 Ombre pour détacher */
}

.nav-item i {
  color: var(--primary); /* 🔥 Couleur spécifique pour les icônes */
  font-size: 1.2rem;
}

.nav-item.active i {
  color: white; /* 🔥 Icônes blanches sur fond actif */
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  border-color: var(--primary);
  background: var(--primary);
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
  color: var(--pink);
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

/* Ressources Bac */
.bac-resources {
  margin: 6rem 0;
}

.resources-header {
  text-align: center;
  margin-bottom: 3rem;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.resource-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.resource-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* 🔥 Ombre pour détacher */
}

.resource-icon.annals {
  background: linear-gradient(135deg, #0021B5, #0044ff);
}

.resource-icon.methods {
  background: linear-gradient(135deg, #FE66C4, #ff8ac8);
}

.resource-icon.revision {
  background: linear-gradient(135deg, #00D4FF, #00a8cc);
}

.resource-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.resource-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn-resource {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-resource:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* CTA Section */
.cta-section {
  margin: 6rem 0;
}

.cta-card {
  background: linear-gradient(135deg, #0021B5, #FE66C4);
  border-radius: 30px;
  padding: 4rem;
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 20px 60px rgba(0, 33, 181, 0.3);
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
  color: var(--primary);
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

  .resources-grid {
    grid-template-columns: 1fr;
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
}
</style>
