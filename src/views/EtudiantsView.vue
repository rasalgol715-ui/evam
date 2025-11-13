<template>
  <div class="page-container">
    <h1 class="page-title">Espace Étudiants</h1>
    <p class="page-intro">
      Découvrez les avantages exclusifs et ce que notre communauté pense de nous.
    </p>

    <section class="students-benefits">
      <h2>Vos Avantages EvaM Group</h2>
      <div class="student-benefits-grid">
        <div class="benefit">
          <i class="fas fa-tags"></i>
          <h3>Réductions spéciales</h3>
          <p>Bénéficiez de remises exclusives sur les fascicules et les modules de cours.</p>
          <RouterLink to="/#commande-fascicules" class="btn-benefit">
            Commander maintenant
          </RouterLink>
        </div>

        <div class="benefit">
          <i class="fas fa-headset"></i>
          <h3>Support Prioritaire</h3>
          <p>Posez vos questions et obtenez des réponses rapides de nos professeurs.</p>
          <RouterLink to="/contact" class="btn-benefit"> Poser une question </RouterLink>
        </div>

        <div class="benefit">
          <i class="fab fa-whatsapp"></i>
          <h3>Communauté active</h3>
          <p>Rejoignez nos groupes de discussion et d'entraide sur WhatsApp et nos réseaux.</p>
          <RouterLink to="/contact" class="btn-benefit"> Nous rejoindre </RouterLink>
        </div>

        <div class="benefit">
          <i class="fas fa-clock"></i>
          <h3>Accès illimité 24/7</h3>
          <p>Accédez à vos vidéos de cours à tout moment, où que vous soyez.</p>
          <RouterLink to="/login" class="btn-benefit"> Se connecter </RouterLink>
        </div>

        <div class="benefit">
          <i class="fas fa-eye"></i>
          <h3>Aperçus Gratuits</h3>
          <p>Prévisualisez gratuitement le contenu de nos fascicules avant de commander.</p>
          <RouterLink to="/#preview-fascicules" class="btn-benefit"> Voir les extraits </RouterLink>
        </div>

        <div class="benefit">
          <i class="fas fa-graduation-cap"></i>
          <h3>Préparation aux Examens</h3>
          <p>Profitez de modules dédiés à la révision du Brevet et du Baccalauréat.</p>
          <RouterLink to="/categories" class="btn-benefit"> Voir les modules </RouterLink>
        </div>
      </div>
    </section>
    <section class="testimonials">
      <h2>Ils ont réussi avec nous</h2>
      <div class="testimonial-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
          <img
            :src="testimonial.imageUrl"
            :alt="'Photo de ' + testimonial.name"
            class="testimonial-photo"
          />
          <p class="testimonial-quote">"{{ testimonial.quote }}"</p>
          <h4 class="testimonial-name">{{ testimonial.name }}</h4>
          <span class="testimonial-class">{{ testimonial.class }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router' // Important pour les boutons

// Données d'exemple pour les témoignages (inchangées)
const testimonials = ref([
  {
    name: 'Aïssatou Diallo',
    class: 'Terminale S2 - Mention Très Bien',
    quote:
      "Les fascicules de Maths étaient incroyablement clairs. J'ai pu rattraper mon retard sur les nombres complexes en quelques jours seulement. Je recommande à 100% !",
    imageUrl: '/images/students/student-1.png',
  },
  {
    name: 'Mamadou Sow',
    class: 'Première S1',
    quote:
      "Je n'ai jamais vraiment compris la mécanique avant de suivre les modules de PC. Le professeur explique super bien et les animations m'ont aidé à visualiser les forces.",
    imageUrl: '/images/students/student-2.png',
  },
  {
    name: 'Coumba Gueye',
    class: 'Seconde S',
    quote:
      "J'avais peur de la Seconde, mais les cours sur les fonctions m'ont donné confiance. Les exercices corrigés sont parfaits pour s'entraîner.",
    imageUrl: '/images/students/student-3.png',
  },
])
</script>

<style scoped>
/* Styles génériques pour la page */
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
  margin-bottom: 4rem;
}

/* Section Avantages */
.students-benefits {
  margin-bottom: 4rem;
}
.students-benefits h2 {
  font-size: 2.2rem;
  color: var(--primary);
  text-align: center;
  margin-bottom: 3rem;
}
.student-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* CARTE AVANTAGE MISE À JOUR */
.benefit {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
  text-align: center;
  border-bottom: 5px solid var(--primary);
  /* Ajout pour flexbox */
  display: flex;
  flex-direction: column;
}
.benefit:hover {
  transform: translateY(-10px);
}
.benefit i {
  /* Style pour les icônes */
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}
.benefit h3 {
  color: var(--text-dark);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.benefit p {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1; /* Pousse le bouton en bas */
  margin-bottom: 1.5rem; /* Espace avant le bouton */
}

/* STYLE POUR LES NOUVEAUX BOUTONS */
.btn-benefit {
  display: inline-block;
  padding: 10px 20px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  background-color: var(--primary);
  color: #fff;
  transition: var(--transition);
}
.btn-benefit:hover {
  background-color: var(--primary-dark);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
/* Style alternatif pour le 2e bouton */
.benefit:nth-child(2n) .btn-benefit {
  background-color: var(--pink); /* Rose clair */
  color: var(--primary);
}
.benefit:nth-child(2n) .btn-benefit:hover {
  background-color: var(--white); /* Rose foncé */
  color: #fff;
}

/* Section Témoignages (inchangée) */
.testimonials {
  padding: 4rem 0;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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
  flex-grow: 1; /* Pousse le nom en bas */
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
