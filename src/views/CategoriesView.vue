<template>
  <div class="categories-page">
    <!-- Fond sobre pour les pages de contenu -->
    <SimpleBackground />

    <div class="container">
      <header class="page-header">
        <h1 class="page-title">Cours Collège & Lycée</h1>
        <p class="page-intro">
          Programmes scolaires officiels en Mathématiques et Physique-Chimie.
          <RouterLink to="/academie-ia" class="academy-link">
            Voir les modules Informatique & IA →
          </RouterLink>
        </p>
      </header>

      <div v-for="category in categories" :key="category.level" class="level-section">
        <div class="level-header">
          <h2 class="level-title" :style="{
            background: category.level === 'Lycée'
              ? 'linear-gradient(135deg, #0021B5 0%, #0044ff 100%)'
              : 'linear-gradient(135deg, #FE66C4 0%, #ff8ac8 100%)'
          }">
            {{ category.level }}
            <span class="level-badge">{{ category.sections.length }} matières</span>
          </h2>
          <p class="level-intro">{{ category.intro }}</p>
        </div>

        <div class="subject-grid">
          <div
            v-for="section in category.sections"
            :key="section.subject"
            class="subject-card"
            :style="{ '--subject-color': section.color }"
          >
            <div class="subject-header">
              <div class="subject-icon" :style="{ backgroundColor: section.color + '20' }">
                <i :class="section.icon" :style="{ color: section.color }"></i>
              </div>
              <div class="subject-info">
                <h3>{{ section.subject }}</h3>
                <span class="level-count">{{ section.levels.length }} niveaux</span>
              </div>
            </div>

            <div class="subject-content">
              <ul class="level-list">
                <li v-for="level in section.levels" :key="level">
                  <RouterLink
                    :to="getLevelRoute(level)"
                    class="level-link"
                  >
                    <span class="level-name">{{ level }}</span>
                    <i class="fas fa-arrow-right link-arrow"></i>
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="subject-footer">
              <RouterLink
                :to="getSubjectRoute(section.slug)"
                class="btn-view-all"
              >
                Voir tous les cours
                <i class="fas fa-external-link-alt"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Académie IA -->
      <div class="academy-cta">
        <div class="academy-card">
          <div class="academy-icon">
            <i class="fas fa-robot"></i>
          </div>
          <div class="academy-content">
            <h3>Découvrez l'Académie IA</h3>
            <p>Modules de programmation, intelligence artificielle et développement web</p>
            <RouterLink to="/academie-ia" class="btn-academy">
              Explorer l'Académie IA
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Section vide state -->
      <div v-if="categories.length === 0" class="empty-state">
        <i class="fas fa-search empty-icon"></i>
        <h3>Aucune matière trouvée</h3>
        <p>Aucun résultat pour votre recherche. Essayez avec d'autres critères.</p>
        <RouterLink to="/categories" class="btn btn-primary">
          Voir toutes les matières
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SimpleBackground from '@/components/backgrounds/SimpleBackground.vue'

const route = useRoute()

// Liste principale des catégories (Collège & Lycée seulement)
const allCategories = ref([
  {
    level: "Lycée",
    intro: "Cours et fascicules pour la 2nde, la Première et la Terminale.",
    sections: [
      {
        subject: "Mathématiques",
        slug: "maths",
        color: "#0021B5",
        icon: "fas fa-calculator",
        levels: ["Terminale", "Première", "Seconde"]
      },
      {
        subject: "Physique-Chimie",
        slug: "pc",
        color: "#1E90FF",
        icon: "fas fa-flask",
        levels: ["Terminale", "Première", "Seconde"]
      }
    ]
  },
  {
    level: "Collège",
    intro: "Cours et modules pour la 6ème, la 5ème, la 4ème et la 3ème.",
    sections: [
      {
        subject: "Mathématiques",
        slug: "maths",
        color: "#0021B5",
        icon: "fas fa-square-root-alt",
        levels: ["3ème", "4ème", "5ème", "6ème"]
      },
      {
        subject: "Physique-Chimie",
        slug: "pc",
        color: "#1E90FF",
        icon: "fas fa-atom",
        levels: ["3ème", "4ème"]
      }
    ]
  }
])

// Fonctions utilitaires pour les routes
const getLevelRoute = (level) => {
  const routes = {
    'Terminale': '/terminale',
    'Première': '/premiere',
    'Seconde': '/seconde',
    '3ème': '/categories?niveau=3eme',
    '4ème': '/categories?niveau=4eme',
    '5ème': '/categories?niveau=5eme',
    '6ème': '/categories?niveau=6eme'
  }
  return routes[level] || '/categories'
}

const getSubjectRoute = (slug) => {
  return `/categories?matiere=${slug}`
}

// Variable calculée pour le filtrage
const categories = computed(() => {
  const matiereFiltre = route.query.matiere
  if (!matiereFiltre) {
    return allCategories.value
  }

  const filteredList = allCategories.value
    .map(category => {
      const filteredSections = category.sections.filter(section =>
        section.slug === matiereFiltre
      )
      return { ...category, sections: filteredSections }
    })
    .filter(category => category.sections.length > 0)

  return filteredList
})
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  color: var(--text-dark);
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #0021B5 0%, #FE66C4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-intro {
  color: var(--text-light);
  font-size: 1.3rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.academy-link {
  display: block;
  margin-top: 1rem;
  color: #FE66C4;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.academy-link:hover {
  color: #0021B5;
}

/* Level Sections */
.level-section {
  margin-bottom: 5rem;
}

.level-header {
  margin-bottom: 3rem;
}

.level-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.level-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.level-intro {
  color: var(--text-light);
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
}

/* Subject Grid */
.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.subject-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--subject-color), transparent);
}

.subject-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* Subject Header */
.subject-header {
  padding: 2rem 2rem 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.subject-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.subject-icon i {
  font-size: 1.8rem;
}

.subject-info {
  flex: 1;
}

.subject-info h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.level-count {
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Level List */
.subject-content {
  padding: 0 2rem;
}

.level-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.level-list li {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.level-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: var(--text-dark);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.level-link:hover {
  color: var(--subject-color);
  transform: translateX(5px);
}

.level-name {
  font-size: 1rem;
}

.link-arrow {
  font-size: 0.9rem;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.level-link:hover .link-arrow {
  color: var(--subject-color);
  transform: translateX(5px);
}

/* Subject Footer */
.subject-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.02);
}

.btn-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--subject-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-view-all:hover {
  gap: 0.8rem;
}

/* Academy CTA Section */
.academy-cta {
  margin-top: 4rem;
  padding: 2rem;
}

.academy-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem;
  color: white;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.academy-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.academy-content {
  flex: 1;
}

.academy-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.academy-content p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.btn-academy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-academy:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 4rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-light);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .page-intro {
    font-size: 1.1rem;
  }

  .subject-grid {
    grid-template-columns: 1fr;
  }

  .level-title {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .subject-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .subject-content {
    padding: 0 1.5rem;
  }

  .subject-footer {
    padding: 1rem 1.5rem;
  }

  .academy-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .academy-icon {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .subject-card {
    margin: 0 0.5rem;
  }
}
</style>
