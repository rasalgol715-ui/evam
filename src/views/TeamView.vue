<template>
  <div class="page-container">
    <h1 class="page-title">Notre Équipe Pédagogique</h1>
    <p class="page-intro">
      Des professeurs passionnés et dévoués à votre réussite.
    </p>

    <div class="team-grid">

      <div v-for="member in team" :key="member.name" class="team-card">
        <img :src="member.imageUrl" :alt="'Photo de ' + member.name" class="team-photo">
        <h3 class="team-name">{{ member.name }}</h3>
        <p class="team-role">{{ member.role }}</p>
        <p class="team-bio">{{ member.bio }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Remplacez ces données par les informations de votre équipe
const team = ref([
  {
    name: "M. Abdoulaye Diop",
    role: "Professeur Agrégé de Mathématiques",
    bio: "Avec plus de 15 ans d'expérience dans la préparation au Baccalauréat, M. Diop simplifie les concepts les plus complexes de l'analyse et de l'algèbre.",
    imageUrl: "/images/team/prof-maths.png" // Vous devrez ajouter cette image
  },
  {
    name: "Mme. Fatou Ndiaye",
    role: "Professeure Certifiée de Physique-Chimie",
    bio: "Spécialiste de la pédagogie par l'exemple, Mme. Ndiaye rend la mécanique et la chimie organique accessibles et passionnantes pour tous les niveaux.",
    imageUrl: "/images/team/prof-pc.png" // Vous devrez ajouter cette image
  },
  {
    name: "Dr. Cheikh Anta Fall",
    role: "Fondateur & Coordinateur Pédagogique",
    bio: "Notre mission est de garantir que chaque élève, où qu'il soit, ait accès aux meilleurs outils pour bâtir son avenir. L'excellence est notre standard.",
    imageUrl: "/images/team/fondateur.png" // Vous devrez ajouter cette image
  }
])
</script>

<style scoped>
/* Styles génériques (similaires à AboutView) */
.page-container {
  max-width: 1200px;
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

/* Grille de l'équipe */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.team-card {
  background-color: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-align: center;
  padding: 2rem;
  transition: var(--transition);
  border-top: 5px solid var(--primary);
}
.team-card:hover {
  transform: translateY(-10px);
}
.team-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid var(--pink);
}
.team-name {
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.team-role {
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 1rem;
}
.team-bio {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
}
</style>
