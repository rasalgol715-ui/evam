<template>
  <div class="page-container">
    <h1 class="page-title">Solutions Entreprises</h1>
    <p class="page-intro">
      Préparez vos équipes à la révolution de l'IA. Formez, évaluez et recrutez les meilleurs
      talents IA au Sénégal.
    </p>

    <!-- J'utilise le style de carte de AboutView -->
    <div class="content-card">
      <h3>Formez vos Équipes à l'IA</h3>
      <p>
        La montée en compétence (upskilling) en IA n'est plus une option. Nous proposons des
        parcours de formation clés en main pour vos collaborateurs :
      </p>
      <ul>
        <li>
          <strong>Pour les Managers :</strong> Comprendre les enjeux de l'IA, gérer des projets IA,
          et identifier les opportunités.
        </li>
        <li>
          <strong>Pour les Équipes Tech :</strong> Maîtrise des outils d'IA Générative, intégration
          d'API, et fondamentaux du Machine Learning.
        </li>
        <li>
          <strong>Pour tous les Employés :</strong> Utiliser l'IA au quotidien pour gagner en
          productivité (Prompting, outils bureautiques IA).
        </li>
      </ul>
      <RouterLink to="/contact" class="btn-apply">Demander une démo</RouterLink>
    </div>

    <div class="content-card">
      <h3>Recrutez nos Talents</h3>
      <p>
        Besoin de renforcer vos équipes ? Accédez à notre vivier d'étudiants formés et certifiés par
        l'Académie IA.
      </p>
      <p>
        Nous vous mettons en relation avec les meilleurs profils de Data Analysts, Prompt Engineers
        et Développeurs IA juniors du Sénégal, formés sur des cas d'usage concrets.
      </p>
      <RouterLink to="/contact" class="btn-apply">Contacter notre service Carrières</RouterLink>
    </div>

    <!-- Preuve sociale B2B -->
    <section class="logo-cloud">
      <h3>Ils font confiance à l'écosystème EvaM</h3>
      <div class="logo-grid">
        <!-- Remplacez par vos vrais logos partenaires si vous en avez -->
        <span>Sonatel</span>
        <span>Wave</span>
        <span>Orange</span>
        <span>Jumia</span>
        <span>InTouch</span>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page statique, pas de script complexe nécessaire
</script>

<style scoped>
/* J'importe les styles de AboutView pour la cohérence */
.page-container {
  max-width: 900px;
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
  margin-bottom: 1rem;
}
.content-card ul {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0;
}
.content-card li {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.7;
  position: relative;
  padding-left: 25px;
}
.content-card li::before {
  content: '✓'; /* Icône de coche */
  color: var(--primary);
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 0;
}
.content-card li strong {
  color: var(--text-dark);
}

/* Bouton (style copié de CareersView) */
.btn-apply {
  display: inline-block;
  padding: 10px 20px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  background-color: var(--primary);
  color: #fff;
  transition: var(--transition);
  margin-top: 1rem;
}
.btn-apply:hover {
  background-color: var(--primary-dark);
}

/* Section des logos partenaires */
.logo-cloud {
  margin-top: 4rem;
  text-align: center;
}
.logo-cloud h3 {
  font-size: 1.2rem;
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 2rem;
}
.logo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  opacity: 0.6;
}
.logo-grid span {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-light);
}
</style>
