<template>
  <header>
    <nav class="navbar">
      <RouterLink to="/"><img src="/images/evam logo.png" alt="logo" class="logo-image"></RouterLink>

      <div class="logo">
        <RouterLink to="/">EvaM group</RouterLink>
      </div>

      <ul class="nav-links">
        <li><RouterLink to="/">Accueil</RouterLink></li>

        <li class="dropdown">
          <RouterLink to="/categories" class="dropdown-toggle">Classes ▾</RouterLink>
          <ul class="dropdown-content">
            <li><RouterLink to="/seconde">2nde Second</RouterLink></li>
            <li><RouterLink to="/premiere">Premiere</RouterLink></li>
            <li><RouterLink to="/terminale">Terminale</RouterLink></li>
          </ul>
        </li>

        <li class="dropdown">
          <RouterLink to="/categories" class="dropdown-toggle">Cours ▾</RouterLink>
          <ul class="dropdown-content">
            <li><RouterLink to="/categories?matiere=maths">Mathématiques</RouterLink></li>
            <li><RouterLink to="/categories?matiere=pc">Physique-Chimie</RouterLink></li>
            <li><RouterLink to="/categories?matiere=info">Informatique</RouterLink></li>
          </ul>
        </li>

        <li><RouterLink to="/etudiants">Étudiants</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>

      <div class="search-bar">
        <input
          type="text"
          id="searchInput"
          placeholder="Rechercher un cours..."
          v-model="searchQuery"
          @keydown.enter="handleSearch"
        />
        <button id="searchBtn" @click="handleSearch">🔍</button>
      </div>

      <button class="login-btn">
        <RouterLink to="/login" style="color:white; text-decoration:none;">Se connecter</RouterLink>
      </button>

      <div class="menu-toggle"
           @click="toggleMobileMenu"
           :class="{ open: isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>

    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <RouterLink to="/" @click="closeMobileMenu">Accueil</RouterLink>

      <a href="#" class="mobile-dropdown-toggle" @click.prevent="toggleMobileSubmenu('classes')">
        Classes
        <i class="fas fa-chevron-down" :class="{ rotated: isMobileClassesOpen }"></i>
      </a>
      <div class="mobile-submenu" v-show="isMobileClassesOpen">
        <RouterLink to="/categories" @click="closeMobileMenu">Toutes les classes</RouterLink>
        <RouterLink to="/seconde" @click="closeMobileMenu">2nde Second</RouterLink>
        <RouterLink to="/premiere" @click="closeMobileMenu">Premiere</RouterLink>
        <RouterLink to="/terminale" @click="closeMobileMenu">Terminale</RouterLink>
      </div>

      <a href="#" class="mobile-dropdown-toggle" @click.prevent="toggleMobileSubmenu('cours')">
        Cours
        <i class="fas fa-chevron-down" :class="{ rotated: isMobileCoursOpen }"></i>
      </a>
      <div class="mobile-submenu" v-show="isMobileCoursOpen">
        <RouterLink to="/categories?matiere=maths" @click="closeMobileMenu">Mathématiques</RouterLink>
        <RouterLink to="/categories?matiere=pc" @click="closeMobileMenu">Physique-Chimie</RouterLink>
        <RouterLink to="/categories?matiere=info" @click="closeMobileMenu">Informatique</RouterLink>
      </div>

      <RouterLink to="/etudiants" @click="closeMobileMenu">Étudiants</RouterLink>
      <RouterLink to="/contact" @click="closeMobileMenu">Contact</RouterLink>
      <RouterLink to="/login" class="login-btn-mobile" @click="closeMobileMenu">Se connecter</RouterLink>
    </div>

    <div id="overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileMenu">
    </div>
  </header>
</template>

<script setup>
// --- 1. IMPORTS ---
// On importe les outils de Vue et du Routeur
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// --- 2. VARIABLES D'ÉTAT (Refs) ---

// État pour le menu mobile
const isMobileMenuOpen = ref(false)
const isMobileClassesOpen = ref(false)
const isMobileCoursOpen = ref(false)

// État pour la recherche
const searchQuery = ref('')

// Initialisation du routeur (pour la redirection)
const router = useRouter()

// --- 3. FONCTIONS ---

// Fonction pour le menu mobile principal
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Fonction pour basculer les sous-menus
const toggleMobileSubmenu = (menu) => {
  if (menu === 'classes') {
    isMobileClassesOpen.value = !isMobileClassesOpen.value
    isMobileCoursOpen.value = false // Ferme l'autre pour éviter les conflits
  } else if (menu === 'cours') {
    isMobileCoursOpen.value = !isMobileCoursOpen.value
    isMobileClassesOpen.value = false // Ferme l'autre
  }
}

// Fonction pour fermer tous les menus
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  isMobileClassesOpen.value = false
  isMobileCoursOpen.value = false
}

// Fonction pour la gestion du scroll
const handleScroll = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenu() // Appelle la fonction qui réinitialise tout
  }
}

// Fonction pour la recherche
const handleSearch = () => {
  if (searchQuery.value.trim() === '') {
    return // Ne pas rechercher si c'est vide
  }
  // Redirige vers la page de recherche avec le terme en paramètre
  router.push({
    name: 'search',
    query: { q: searchQuery.value }
  })
  // Vide la barre de recherche
  searchQuery.value = ''
}

// --- 4. CYCLE DE VIE (Lifecycle Hooks) ---

// Ajout / retrait de l’écouteur d’événement
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- 5. OBSERVATEURS (Watchers) ---

// Bloquer le scroll du body quand le menu mobile est ouvert
watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto'
})
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: var(--white);
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.logo a {
  text-decoration: none;
  font-size: 1.9rem;
  font-weight: bold;
  color: var(--primary);
  transition: var(--transition);
}

.logo a:hover {
  transform: scale(1.05);
}

.logo-image {
  height: 80px;
  transition: var(--transition);
}

.logo-image:hover {
  transform: scale(1.05);
}

/* Liens de navigation */
.nav-links {
  display: flex;
  gap: 1.2rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  position: relative;
  transition: var(--transition);
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--primary);
  transition: var(--transition);
}

.nav-links a:hover::after {
  width: 100%;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  list-style: none;
  position: absolute;
  background: #fff;
  top: 100%;
  left: 0;
  min-width: 160px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content li a {
  display: block;
  padding: 10px;
  color: #052a9a;
}

.dropdown-content li a:hover {
  background: #ffe6f2;
}

/* Barre de recherche */
.search-bar {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 30px;
  padding: 5px 10px;
}

.search-bar input {
  border: none;
  outline: none;
  background: none;
  padding: 0.6rem;
  width: 180px;
}

.search-bar button {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
}

.search-bar button:hover {
  background: var(--primary-dark);
}

/* Bouton de connexion */
.login-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
}

.login-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* --- BOUTON BURGER --- */
.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  height: 3px;
  width: 25px;
  background: var(--text-dark);
  margin-bottom: 4px;
  border-radius: 2px;
  transition: var(--transition);
}

.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* --- MENU MOBILE --- */
.mobile-menu {
  display: flex;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.4s ease;
  flex-direction: column;
  background: var(--white);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  box-shadow: var(--shadow);
  z-index: 300;
}

.mobile-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mobile-menu a {
  padding: 1rem 2rem;
  color: var(--text-dark);
  text-decoration: none;
  border-bottom: 1px solid #f3f4f6;
  transition: var(--transition);
}

.mobile-menu a:hover {
  background: aqua;
  color: var(--primary);
}

a.login-btn-mobile {
  background-color: #ffe6f2;
  border-radius: 25px;
  padding: 10px 25px;
  margin: 1rem auto;
  text-align: center;
}

a.login-btn-mobile:hover {
  background-color: aqua;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .search-bar {
    display: none;
  }

  .login-btn {
    display: none;
  }
}

/* Overlay */
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
}

#overlay.active {
  opacity: 1;
  visibility: visible;
}
/* DANS src/components/AppHeader.vue, à la fin de <style scoped> */

.mobile-menu a.mobile-dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.mobile-menu a.mobile-dropdown-toggle i {
  transition: transform 0.3s ease;
}

.mobile-menu a.mobile-dropdown-toggle i.rotated {
  transform: rotate(180deg);
}

.mobile-submenu {
  display: flex;
  flex-direction: column;
  /* Fond légèrement différent pour marquer la sous-section */
  background-color: var(--pink);
  padding-left: 2rem; /* Indentation pour les sous-liens */
}

.mobile-submenu a {
  padding: 0.8rem 2rem 0.8rem 1rem;
  border-bottom: 1px solid #fce7f3; /* Bordure plus légère */
}

.mobile-submenu a:last-child {
  border-bottom: none;
}
</style>
