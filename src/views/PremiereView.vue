<template>
  <div class="page-view">
    <h1 class="page-title">Cours de Première</h1>
    <p class="page-intro">
      Accès complet aux modules de Mathématiques et Physique-Chimie (Spécialité).
    </p>

    <div class="controls-panel">
      <div class="filter-buttons">
        <button
          v-for="subject in uniqueSubjects"
          :key="subject"
          @click="selectedSubject = subject"
          :class="{ active: selectedSubject === subject }"
          class="subject-filter-btn"
          :style="{
            backgroundColor: selectedSubject === subject ? 'var(--primary)' : '#fff',
            color: selectedSubject === subject ? 'white' : 'var(--text-dark)',
            borderColor: selectedSubject === subject ? 'var(--primary)' : '#ccc'
          }"
        >
          {{ subject }}
        </button>
      </div>
      <input
        type="text"
        placeholder="Rechercher un module ou un chapitre..."
        v-model="searchText"
        class="search-input"
      />
    </div>

    <div class="modules-container">
      <div
        v-for="module in filteredModules"
        :key="module.id"
        class="module-card"
        :id="'module-' + module.id"
      >
        <div
          class="module-header"
          :class="{ active: module.isOpen }"
          :style="{ borderLeftColor: module.color }"
          @click="toggleModule(module)"
        >
          <div class="module-info">
            <span class="subject-tag" :style="{ backgroundColor: module.color }">{{ module.subject }}</span>
            <h3>{{ module.title }}</h3>
          </div>
          <i class="fas fa-chevron-down module-icon"></i>
        </div>

        <div v-show="module.isOpen" class="module-content">
          <div class="chapter-list">
            <h4>Chapitres inclus :</h4>
            <ul>
              <li v-for="chapter in module.chapters" :key="chapter">
                <i class="fas fa-video"></i> {{ chapter }}
                <a href="#"><i class="fas fa-file-pdf"></i> Fascicule</a>
              </li>
            </ul>
          </div>
          <button class="access-btn" :style="{ backgroundColor: module.color }">
            Accéder à toutes les vidéos
          </button>
        </div>
      </div>

      <div v-if="filteredModules.length === 0" class="no-results">
        Aucun module ou chapitre ne correspond à votre recherche.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCourses } from '@/services/courseService.js' // <-- IMPORTER NOTRE SERVICE

// 1. Récupérer les fonctions du service
const { getModulesByLevel } = useCourses()

// 2. Définir les modules en filtrant par "Terminale"
// Note : 'ref' est important pour que Vue suive les changements
const modulesTerminale = ref(getModulesByLevel('Première'))

// --- La logique d'interactivité reste la même ---
const selectedSubject = ref('Tous');
const searchText = ref('');

const toggleModule = (module) => {
  module.isOpen = !module.isOpen
}

const filteredModules = computed(() => {
  const query = searchText.value.toLowerCase().trim();
  return modulesTerminale.value.filter(module => {
    const subjectMatch = selectedSubject.value === 'Tous' || module.subject === selectedSubject.value;
    const textMatch = module.title.toLowerCase().includes(query) ||
                      module.chapters.some(chapter => chapter.toLowerCase().includes(query));
    return subjectMatch && textMatch;
  });
});

const uniqueSubjects = computed(() => {
  const subjects = new Set(modulesTerminale.value.map(m => m.subject));
  return ['Tous', ...Array.from(subjects)];
});
</script>

<style scoped>
/* On utilise les mêmes styles que TerminaleView.
  Pour une meilleure pratique, ce CSS devrait être
  dans un fichier 'module-page.css' et importé.
  Mais pour l'instant, copiez-collez le <style scoped>
  complet de votre fichier 'TerminaleView.vue'.
*/

/* Styles principaux de la page */
.page-view {
  max-width: 1000px;
  margin: 4rem auto;
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
  margin-bottom: 3rem;
}

/* Panneau de contrôle */
.controls-panel {
  max-width: 800px;
  margin: 0 auto 3rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: var(--radius);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.subject-filter-btn {
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}
.subject-filter-btn.active {
  color: white !important;
  box-shadow: 0 2px 5px rgba(0, 33, 181, 0.3);
}
.search-input {
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
}
.search-input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}
.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-size: 1.2rem;
  background-color: white;
  border-radius: var(--radius);
  margin-top: 2rem;
}

/* Conteneur de l'accordéon */
.modules-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.module-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
}
.module-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-left: 8px solid;
  background-color: var(--bg-light);
  transition: all 0.3s ease;
}
.module-header:hover {
  background-color: #f0f8ff;
}
.module-header.active {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
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
.module-icon {
  font-size: 1.1rem;
  color: var(--text-light);
  transition: transform 0.3s ease;
}
.module-header.active .module-icon {
  transform: rotate(180deg);
  color: var(--primary);
}
.module-content {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.chapter-list h4 {
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 1rem;
}
.chapter-list ul {
  list-style: none;
  padding: 0;
}
.chapter-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  color: var(--text-dark);
  font-size: 1rem;
}
.chapter-list li i.fa-video {
  color: var(--white);
  margin-right: 10px;
}
.chapter-list li a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}
.chapter-list li a i {
  margin-right: 5px;
}
.access-btn {
  padding: 12px 25px;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-start;
}
.access-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
