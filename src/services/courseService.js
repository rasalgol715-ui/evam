import { ref } from 'vue'

const allModules = ref([
  {
    id: 1,
    level: 'Terminale',
    title: 'Mathématiques - Analyse (Partie 1)',
    subject: 'Maths',
    color: '#0021B5',
    path: '/terminale#module-1',
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
    chapters: ['Nombres Complexes', 'Probabilités et Variables aléatoires', 'Géométrie dans l\'espace']
  },
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
  },
  {
    id: 8,
    level: 'Académie IA',
    title: 'Parcours : Ingénieur Prompt & IA Générative',
    subject: 'IA',
    color: '#6366f1',
    path: '/academie-ia#module-8',
    chapters: ['Fondamentaux de l\'IA Générative', 'Maîtriser ChatGPT (Prompting)', 'Création d\'images avec Midjourney/DALL-E', 'Automatisation et API']
  },
  {
    id: 9,
    level: 'Académie IA',
    title: 'Parcours : Analyste de Données (Data Analyst) IA',
    subject: 'IA',
    color: '#34d399',
    path: '/academie-ia#module-9',
    chapters: ['Introduction à la Data Science', 'Python pour la Data (Pandas)', 'Visualisation (Matplotlib)', 'Analyse prédictive avec l\'IA']
  },
  {
    id: 10,
    level: 'Académie IA',
    title: 'Parcours : Développeur IA / Machine Learning',
    subject: 'IA',
    color: '#f59e0b',
    path: '/academie-ia#module-10',
    chapters: ['Algorithmes de Machine Learning', 'Bibliothèques (Scikit-learn)', 'Introduction au Deep Learning (TensorFlow/Keras)', 'Déployer un modèle IA']
  }
])

export function useCourses() {
  const searchModules = (query) => {
    if (!query || query.trim() === '') {
      return []
    }
    const lowerQuery = query.toLowerCase().trim()

    return allModules.value.filter(module => {
      const titleMatch = module.title.toLowerCase().includes(lowerQuery)
      const chapterMatch = module.chapters.some(chapter => chapter.toLowerCase().includes(lowerQuery))
      const subjectMatch = module.subject.toLowerCase().includes(lowerQuery)
      return titleMatch || chapterMatch || subjectMatch
    })
  }

  const getModulesByLevel = (levelName) => {
    return allModules.value.filter(module => module.level === levelName)
  }

  const getModulesBySubject = (subjectName) => {
    return allModules.value.filter(module => module.subject.toLowerCase() === subjectName.toLowerCase())
  }

  const getModuleById = (id) => {
    return allModules.value.find(module => module.id === id)
  }

  return {
    allModules,
    searchModules,
    getModulesByLevel,
    getModulesBySubject,
    getModuleById
  }
}
