// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import TerminaleView from '../views/TerminaleView.vue'
import PremiereView from '../views/PremiereView.vue'
import SecondeView from '../views/SecondeView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import FaqView from '../views/FaqView.vue'
import TeamView from '../views/TeamView.vue'
import EtudiantsView from '../views/EtudiantsView.vue'
import SearchView from '../views/SearchView.vue'
import LoginView from '../views/LoginView.vue'
import CareersView from '../views/CareersView.vue'

// --- NOUVEAUX IMPORTS ---
import AcademieIAView from '../views/AcademieIAView.vue'
import EntreprisesView from '../views/EntreprisesView.vue'

const router = createRouter({
  // VÉRIFIEZ : createWebHistory est utilisé ici, l'avertissement devrait disparaître
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      // Route pour la page d'accueil (HomeView est utilisé)
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Route pour la page Catégories (CategoriesView est utilisé)
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      // Route pour la page Terminale (TerminaleView est utilisé)
      path: '/terminale',
      name: 'terminale',
      component: TerminaleView
    },
    // Route pour la page Première (PremiereView est utilisé)
    {
      path: '/premiere',
      name: 'premiere',
      component: PremiereView
    },
    // Route pour la page Seconde (SecondeView est utilisé)
    {
      path: '/premiere',
      name: 'premiere',
      component: PremiereView // Assurez-vous que cette vue existe aussi
    },
    {
      path: '/seconde', // <-- NOUVELLE ROUTE
      name: 'seconde',
      component: SecondeView
    },

      // Route pour la page Contact (ContactView est utilisé)
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/about', // <-- NOUVELLE ROUTE
      name: 'about',
      component: AboutView
    },
    {
      path: '/faq', // <-- NOUVELLE ROUTE
      name: 'faq',
      component: FaqView
    },
    {
      path: '/team', // <-- NOUVELLE ROUTE
      name: 'team',
      component: TeamView
    },
    {
      path: '/etudiants', // <-- NOUVELLE ROUTE
      name: 'etudiants',
      component: EtudiantsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/search', // <-- NOUVELLE ROUTE
      name: 'search',
      component: SearchView
    },
    {
      path: '/careers', // <-- NOUVELLE ROUTE
      name: 'careers',
      component: CareersView
    },

    // --- NOUVELLES ROUTES AJOUTÉES ---
    {
      path: '/academie-ia',
      name: 'academie-ia',
      component: AcademieIAView
    },
    {
      path: '/entreprises',
      name: 'entreprises',
      component: EntreprisesView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si l'URL contient une "ancre" (un hash, ex: #module-3)
    if (to.hash) {
      return {
        el: to.hash,     // Dit à Vue de faire défiler vers l'élément avec cet id
        behavior: 'smooth', // Ajoute un défilement fluide
        top: 80, // Ajoute un décalage (pour ne pas être collé sous le header)
      }
    }

    // Si l'utilisateur clique sur "Précédent"
    if (savedPosition) {
      return savedPosition
    }

    // Comportement par défaut (si pas d'ancre) : aller en haut
    else {
      return { top: 0 }
    }
  }
})
export default router
