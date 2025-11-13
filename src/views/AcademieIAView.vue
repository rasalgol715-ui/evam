<template>
  <div class="page-view">
    <h1 class="page-title">Académie IA EvaM</h1>
    <p class="page-intro">
      Ne suivez pas un cours. Visez un métier d'avenir au Sénégal.
    </p>

    <!-- J'utilise le même panneau de contrôle que TerminaleView -->
    <div class="controls-panel">
      <!-- Les filtres ne sont pas utiles ici, car tous sont "IA" -->
      <input
        type="text"
        placeholder="Rechercher un parcours ou un chapitre..."
        v-model="searchText"
        class="search-input"
      />
    </div>

    <!-- J'utilise le même conteneur de modules que TerminaleView -->
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
                <!-- Icône changée pour 'IA' -->
                <i class="fas fa-brain" :style="{ color: module.color }"></i> {{ chapter }}
                <!-- Lien désactivé pour l'instant -->
                <!-- <a href="#"><i class="fas fa-file-pdf"></i> Fascicule</a> -->
              </li>
            </ul>
          </div>
          <button class="access-btn" :style="{ backgroundColor: module.color }">
            Accéder au Parcours
          </button>
        </div>
      </div>

      <div v-if="filteredModules.length === 0" class="no-results">
        Aucun parcours ou chapitre ne correspond à votre recherche.
      </div>
    </div>

    <!-- Section Témoignages (style de EtudiantsView) -->
     <section class="testimonials">
      <h2>Ils préparent leur futur avec nous</h2>
      <div class="testimonial-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
          <img :src="testimonial.imageUrl" :alt="'Photo de ' + testimonial.name" class="testimonial-photo">
          <p class="testimonial-quote">"{{ testimonial.quote }}"</p>
          <h4 class="testimonial-name">{{ testimonial.name }}</h4>
          <span class="testimonial-class">{{ testimonial.class }}</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCourses } from '@/services/courseService.js'

// 1. Récupérer les fonctions du service
const { getModulesByLevel } = useCourses()

// 2. Définir les modules en filtrant par "Académie IA"
const modulesIA = ref(getModulesByLevel('Académie IA'))

// --- Logique d'interactivité (copiée de TerminaleView) ---
const searchText = ref('');

const toggleModule = (module) => {
  module.isOpen = !module.isOpen
}

// Ouvre le premier module par défaut
if (modulesIA.value.length > 0) {
  modulesIA.value[0].isOpen = true;
}

const filteredModules = computed(() => {
  const query = searchText.value.toLowerCase().trim();
  if (!query) {
    return modulesIA.value; // Retourne tout si la recherche est vide
  }
  return modulesIA.value.filter(module => {
    const textMatch = module.title.toLowerCase().includes(query) ||
                      module.chapters.some(chapter => chapter.toLowerCase().includes(query));
    return textMatch;
  });
});

// Données pour les témoignages
const testimonials = ref([
  {
    name: "Fatou K.",
    class: "Étudiante en Marketing, UCAD",
    quote: "Je pensais que l'IA était trop compliquée. Le parcours 'Ingénieur Prompt' m'a montré comment l'utiliser concrètement. Je crée des contenus incroyables maintenant !",
    imageUrl: "https://placehold.co/100x100/e0e7ff/3730a3?text=FK" // Placeholder
  },
  {
    name: "Mamadou D.",
    class: "Développeur Web, Dakar",
    quote: "J'étais développeur web, mais je voulais passer à l'IA. Le parcours 'Développeur IA' m'a donné les compétences en Machine Learning pour décrocher un nouveau job.",
    imageUrl: "https://placehold.co/100x100/d1fae5/047857?text=MD" // Placeholder
  },
  {
    name: "Aïssatou N.",
    class: "Étudiante en Économie, ESP",
    quote: "Le parcours 'Data Analyst IA' est très pratique. Les projets sur des données locales m'ont aidé à comprendre et à trouver un stage dans une banque.",
    imageUrl: "https://placehold.co/100x100/fef3c7/92400e?text=AN" // Placeholder
  }
])
</script>

<style scoped>
/* J'importe les styles de TerminaleView pour la cohérence */

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
}
.search-input {
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
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
}
.module-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-left: 8px solid; /* La couleur est définie par Vue */
  background-color: var(--bg-light);
}
.module-header:hover {
  background-color: #f0f8ff;
}
.module-header.active {
  background-color: #fff;
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
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  color: var(--text-dark);
  font-size: 1rem;
}
/* Style pour la nouvelle icône IA */
.chapter-list li i.fa-brain {
  /* color: #6366f1; */ /* Couleur IA - héritée dynamiquement */
  margin-right: 10px;
}
.access-btn {
  padding: 12px 25px;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 25px;
  cursor: pointer;
  align-self: flex-start; /* Aligner à gauche */
}

/* Section Témoignages (style de EtudiantsView) */
.testimonials {
  max-width: 800px;
  margin: 4rem auto 0 auto;
  padding-top: 4rem;
  border-top: 1px solid #eee;
}
.testimonials h2 {
  font-size: 2.2rem;
  color: var(--primary);
  text-align: center;
  margin-bottom: 3rem;
}
.testimonial-grid {
  display: grid;
  /* grid-template-columns: 1fr; Une seule colonne pour s'adapter */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.testimonial-card {
  background-color: var(--primary-dark);
  color: #fff;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.testimonial-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid var(--white); /* Couleur rose */
}
.testimonial-quote {
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.testimonial-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
}
.testimonial-class {
  font-size: 0.9rem;
  color: var(--pink); /* Couleur rose clair */
}


</style>
