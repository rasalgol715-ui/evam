<template>
  <div class="categories-page">
    <h1 class="page-title">Tableau de bord des Catégories</h1>
    <p class="page-intro">
      Accédez à tous nos cours et modules par niveau et par matière.
    </p>

    <div v-for="category in categories" :key="category.level" class="level-section">

      <h2 class="level-title" :style="{ backgroundColor: category.level === 'Lycée' ? '#0021B5' : '#FE66C4' }">
        {{ category.level }}
      </h2>
      <p class="level-intro">{{ category.intro }}</p>

      <div class="subject-grid">

        <div v-for="section in category.sections" :key="section.subject" class="subject-card">

          <div class="subject-header" :style="{ borderTopColor: section.color }">
            <i :class="section.icon" :style="{ color: section.color }"></i>
            <h3>{{ section.subject }}</h3>
          </div>

          <ul class="level-list">
            <li v-for="level in section.levels" :key="level">

              <RouterLink
                :to="level === 'Terminale' ? '/terminale' :
                     (level === 'Première' ? '/premiere' :
                     (level === 'Seconde' ? '/seconde' : '#'))"
              >
                {{ level }}
                <i class="fas fa-arrow-right"></i>
              </RouterLink>
            </li>
          </ul>

        </div> </div> </div> </div> </template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router' // Importation de useRoute

const route = useRoute() // Permet de lire l'URL actuelle

// C'est notre liste "maître"
const allCategories = ref([
  {
    level: "Lycée",
    intro: "Cours et fascicules pour la 2nde, la Première et la Terminale.",
    sections: [
      { subject: "Mathématiques", slug: "maths", color: "#0021B5", icon: "fas fa-calculator", levels: ["Terminale", "Première", "Seconde"] },
      { subject: "Physique-Chimie", slug: "pc", color: "#1E90FF", icon: "fas fa-flask", levels: ["Terminale", "Première", "Seconde"] },
      { subject: "Informatique", slug: "info", color: "#FE66C4", icon: "fas fa-laptop-code", levels: ["Terminale", "Première"] }
    ]
  },
  {
    level: "Collège",
    intro: "Cours et modules pour la 6ème, la 5ème, la 4ème et la 3ème.",
    sections: [
      { subject: "Mathématiques", slug: "maths", color: "#0021B5", icon: "fas fa-square-root-alt", levels: ["3ème", "4ème", "5ème", "6ème"] },
      { subject: "Physique", slug: "pc", color: "#1E90FF", icon: "fas fa-atom", levels: ["3ème", "4ème"] },
      { subject: "Modules Spéciaux", slug: "autres", color: "#FE66C4", icon: "fas fa-cubes", levels: ["Révision", "Brevet Blanc"] }
    ]
  }
]);

// Variable "calculée" pour le filtrage
const categories = computed(() => {
  const matiereFiltre = route.query.matiere;
  if (!matiereFiltre) {
    return allCategories.value;
  }
  const filteredList = allCategories.value
    .map(category => {
      const filteredSections = category.sections.filter(section => section.slug === matiereFiltre);
      return { ...category, sections: filteredSections };
    })
    .filter(category => category.sections.length > 0);

  return filteredList;
});
</script>

<style scoped>
/* Le commentaire est maintenant à l'intérieur du style */
.categories-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
.page-title {
  color: var(--primary);
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
}
.page-intro {
  color: var(--text-light);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
}
.level-section {
  margin-bottom: 5rem;
}
.level-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
  text-align: center;
}
.level-intro {
  color: var(--text-dark);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
}
.subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.subject-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
}
.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.subject-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 5px solid;
}
.subject-header i {
  font-size: 2rem;
}
.subject-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
}
.level-list {
  list-style: none;
  padding: 0;
}
.level-list li {
  border-top: 1px solid var(--bg-light);
}
.level-list li :deep(a) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
}
.level-list li :deep(a:hover) {
  background-color: #f0f8ff;
  color: var(--primary);
}
.level-list li :deep(a i) {
  font-size: 0.9rem;
  color: var(--text-light);
  transition: var(--transition);
}
.level-list li :deep(a:hover i) {
  color: var(--primary);
  transform: translateX(5px);
}
@media(max-width: 768px) {
  .level-title {
    font-size: 1.5rem;
  }
  .subject-grid {
    grid-template-columns: 1fr;
  }
}
</style>
