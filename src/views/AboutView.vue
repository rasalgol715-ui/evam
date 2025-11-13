<template>
  <div class="page-container">
    <h1 class="page-title">À Propos d'EvaM Group</h1>
    <p class="page-intro">
      Notre mission est de rendre l'excellence éducative accessible à chaque élève,
      où qu'il soit.
    </p>

    <div class="content-card">
      <h3>Notre Histoire</h3>
      <p>
        EvaM Group est né d'un constat simple : de nombreux élèves talentueux
        n'atteignent pas leur plein potentiel par manque d'accès à des ressources
        pédagogiques de qualité, adaptées à leur rythme.
      </p>
      <p>
        Fondé par des enseignants passionnés, notre objectif a toujours été de
        combiner le meilleur de la pédagogie traditionnelle avec la flexibilité
        du numérique pour offrir des cours et des fascicules clairs, concis et
        efficaces en Mathématiques et Physique-Chimie.
      </p>
    </div>

    <div class="content-card">
      <h3>Nos Valeurs</h3>
      <ul>
        <li>
          <strong>Excellence :</strong> Nos contenus sont créés par des professeurs
          expérimentés et conformes aux programmes officiels.
        </li>
        <li>
          <strong>Accessibilité :</strong> Des tarifs justes et un accès 24/7
          à nos plateformes pour apprendre à son propre rythme.
        </li>
        <li>
          <strong>Réussite :</strong> Nous ne visons pas seulement la moyenne.
          Nous visons la maîtrise et la réussite aux examens (Brevet, Baccalauréat).
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Page statique, pas de script complexe nécessaire
</script>

<style scoped>
/* Styles génériques pour les pages de contenu */
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
}
.content-card li {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.7;
}
.content-card li strong {
  color: var(--text-dark);
}
</style>
