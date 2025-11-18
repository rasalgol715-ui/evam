<template>
  <div class="page-container">
    <h1 class="page-title">
      Résultats pour :
      <span class="search-term">"{{ searchTerm }}"</span>
    </h1>
    <p class="page-intro">
      {{ searchResults.length }} {{ searchResults.length > 1 ? 'résultats trouvés' : 'résultat trouvé' }}
    </p>

    <div class="search-results-grid">
      <div v-if="searchResults.length > 0">
        <div v-for="module in searchResults" :key="module.id" class="module-card">
          <div class="module-header" :style="{ borderLeftColor: module.color }">
            <div class="module-info">
              <span class="subject-tag" :style="{ backgroundColor: module.color }">{{ module.subject }}</span>
              <h3>{{ module.title }}</h3>
              <span class="level-tag">{{ module.level }}</span>
            </div>
            <RouterLink :to="module.path" class="btn-see-module">
              Voir <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else class="no-results">
        <p>Aucun module ou chapitre ne correspond à votre recherche.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCourses } from '@/services/courseService.js'

const route = useRoute()
const { searchModules } = useCourses()

// Variable pour stocker les résultats
const searchResults = ref([])

// 'computed' pour le terme de recherche (inchangé)
const searchTerm = computed(() => route.query.q)

// Fonction pour exécuter la recherche
const performSearch = (query) => {
  searchResults.value = searchModules(query)
}

// On observe 'searchTerm'. Si l'URL change, on relance la recherche.
// 'immediate: true' lance la recherche au chargement initial de la page
watch(searchTerm, (newQuery) => {
  performSearch(newQuery)
}, { immediate: true })

</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;
  min-height: 60vh;
}
.page-title {
  color: var(--primary);
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
}
.search-term {
  color: var(--pink); /* Rose */
}
.page-intro {
  color: var(--text-light);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
}
.search-results-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-size: 1.2rem;
  background-color: white;
  border-radius: var(--radius);
}

/* On réutilise les styles de TerminaleView */
.module-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.module-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 8px solid;
}
.module-info h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-top: 5px;
}
.subject-tag {
  display: inline-block;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.level-tag {
  display: block;
  font-size: 0.9rem;
  color: var(--text-light);
  margin-top: 8px;
}
.btn-see-module {
  display: inline-block;
  padding: 8px 16px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  background-color: var(--primary);
  color: #fff;
  transition: var(--transition);
}
.btn-see-module:hover {
  background-color: var(--primary-dark);
}
</style>
