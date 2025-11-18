<template>
  <div class="page-container">
    <h1 class="page-title">Rejoignez l'Aventure EvaM Group</h1>
    <p class="page-intro">
      Nous recherchons des talents passionnés par l'éducation et l'innovation
      pour révolutionner l'apprentissage en ligne.
    </p>

    <div class="content-card">
      <h3>Notre Culture</h3>
      <p>
        Chez EvaM Group, nous croyons à l'excellence, à la collaboration et à
        l'impact. Nous travaillons dans un environnement dynamique où chaque
        idée compte et où chaque membre de l'équipe contribue directement
        à la réussite de milliers d'élèves.
      </p>
    </div>

    <section class="jobs-section">
      <h2>Postes Ouverts</h2>

      <div v-if="openPositions.length > 0" class="jobs-grid">
        <div v-for="job in openPositions" :key="job.title" class="job-card">
          <h4>{{ job.title }}</h4>
          <span class="job-location">{{ job.location }}</span>
          <p class="job-description">{{ job.description }}</p>
          <a :href="'mailto:recrutement@evamgroup.com?subject=Candidature - ' + job.title" class="btn-apply">
            Postuler
          </a>
        </div>
      </div>

      <div v-else class="no-jobs">
        <p>
          Il n'y a pas de poste ouvert pour le moment.
          <br>
          Cependant, nous sommes toujours à la recherche de talents.
          N'hésitez pas à nous envoyer une candidature spontanée !
        </p>
        <a href="mailto:recrutement@evamgroup.com?subject=Candidature Spontanée" class="btn-apply">
          Candidature Spontanée
        </a>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Vous pouvez mettre à jour cette liste depuis un CMS plus tard
const openPositions = ref([
  {
    title: "Professeur Rédacteur (Maths)",
    location: "Télétravail (Dakar)",
    description: "Recherche d'un professeur de mathématiques expérimenté pour créer des contenus pédagogiques clairs et des exercices corrigés pour le niveau Lycée."
  },
  {
    title: "Monteur Vidéo Pédagogique",
    location: "Télétravail",
    description: "Nous cherchons un monteur vidéo créatif capable d'animer des concepts complexes de physique-chimie pour nos modules en ligne."
  }
  // Mettez cette liste à vide [] pour voir le message "aucun poste"
])
</script>

<style scoped>
/* Styles génériques (similaires à AboutView) */
.page-container {
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;
  min-height: 70vh;
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
.content-card {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}
.content-card h3 {
  color: var(--primary);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}
.content-card p {
  color: var(--text-light);
  font-size: 1.1rem;
  line-height: 1.7;
}

/* Section Postes */
.jobs-section {
  margin-top: 4rem;
}
.jobs-section h2 {
  font-size: 2.2rem;
  color: var(--primary);
  text-align: center;
  margin-bottom: 3rem;
}
.jobs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
.job-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border-left: 5px solid var(--primary);
  display: grid;
  grid-template-columns: 1fr auto; /* Bouton à droite */
  grid-template-rows: auto auto auto;
  gap: 0.5rem 1rem;
}
.job-card h4 {
  grid-column: 1 / 2;
  font-size: 1.3rem;
  color: var(--text-dark);
}
.job-card .job-location {
  grid-column: 1 / 2;
  color: var(--text-light);
  font-style: italic;
}
.job-card .job-description {
  grid-column: 1 / 2;
  margin-top: 1rem;
  color: var(--text-light);
}
.btn-apply {
  grid-column: 2 / 3;
  grid-row: 1 / 4; /* S'étend sur 3 lignes */
  align-self: center; /* Centre le bouton verticalement */

  display: inline-block;
  padding: 10px 20px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  background-color: var(--primary);
  color: #fff;
  transition: var(--transition);
}
.btn-apply:hover {
  background-color: var(--primary-dark);
}

.no-jobs {
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: var(--radius);
}
.no-jobs p {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 2rem;
}
.no-jobs .btn-apply { /* Style pour le bouton centré */
  align-self: auto;
  grid-column: auto;
  grid-row: auto;
}
</style>
