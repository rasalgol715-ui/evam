// src/services/courseService.js
import { ref } from 'vue'

// Notre base de données "maître" de tous les modules
const allModules = ref([
  // --- TERMINALE ---
  {
    id: 1,
    level: 'Terminale',
    title: 'Mathématiques - Analyse (Partie 1)',
    subject: 'Maths',
    color: '#0021B5',
    path: '/terminale#module-1', // Lien direct vers l'ancre
    chapters: ['Limites et Continuité', 'Dérivation et Fonctions usuelles', 'Intégration et Primitives', 'Équations Différentielles']
  },
  {
    id: 2,
    level: 'Terminale',
    title: 'Physique-Chimie - Mécanique & Énergie',
    subject: 'PC',
    color: '#3DDCD9',
    path: '/terminale#module-2',
    chapters: ['Cinématique et Dynamique Newtonienne', 'Transferts Thermiques', 'Lois de Kepler', 'Ondes et Lumière']
  },
  {
    id: 3,
    level: 'Terminale',
    title: 'Mathématiques - Algèbre & Géométrie (Partie 2)',
    subject: 'Maths',
    color: '#FE66C4',
    path: '/terminale#module-3',
    chapters: ['Nombres Complexes', 'Probabilités et Variables aléatoires', 'Géométrie dans l’espace']
  },

  // --- PREMIÈRE ---
  {
    id: 4,
    level: 'Première',
    title: 'Mathématiques - Analyse (Spécialité)',
    subject: 'Maths',
    color: '#0021B5',
    path: '/premiere#module-4',
    chapters: ['Suites numériques', 'Fonctions du second degré', 'Dérivation', 'Trigonométrie']
  },
  {
    id: 5,
    level: 'Première',
    title: 'Physique-Chimie - Mouvement & Interactions',
    subject: 'PC',
    color: '#1E90FF',
    path: '/premiere#module-5',
    chapters: ['Mouvement d\'un système', 'Interactions fondamentales', 'Énergie mécanique', 'Structure des molécules']
  },

  // --- SECONDE ---
  {
    id: 6,
    level: 'Seconde',
    title: 'Mathématiques - Ensembles et Fonctions',
    subject: 'Maths',
    color: '#0021B5',
    path: '/seconde#module-6',
    chapters: ['Ensembles de nombres (N, Z, D, Q, R)', 'Intervalles et calculs', 'Notion de fonction', 'Fonctions de référence (carré, inverse...)']
  },
  {
    id: 7,
    level: 'Seconde',
    title: 'Physique-Chimie - L\'Univers & la Matière',
    subject: 'PC',
    color: '#1E90FF',
    path: '/seconde#module-7',
    chapters: ['Description de l\'Univers', 'Le système Solaire', 'Structure de l\'atome', 'Transformations chimiques']
  }
])

// Fonction "composable" que nos vues vont utiliser
export function useCourses() {

  // Fonction pour rechercher DANS les modules
  const searchModules = (query) => {
    if (!query || query.trim() === '') {
      return [] // Retourne vide si la recherche est vide
    }
    const lowerQuery = query.toLowerCase().trim()

    return allModules.value.filter(module => {
      const titleMatch = module.title.toLowerCase().includes(lowerQuery)
      const chapterMatch = module.chapters.some(chapter => chapter.toLowerCase().includes(lowerQuery))
      return titleMatch || chapterMatch
    })
  }

  // Fonction pour récupérer les modules par niveau
  const getModulesByLevel = (levelName) => {
    return allModules.value.filter(module => module.level === levelName)
  }

  // On expose les fonctions et données utiles
  return {
    allModules,
    searchModules,
    getModulesByLevel
  }
}
