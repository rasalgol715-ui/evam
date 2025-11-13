<template>
  <div class="home-view">

    <section class="hero-section-dark">
      <div class="hero-content">
        <div class="typing-container">
          <h1>EvaM Group</h1>
        </div>

        <p class="hero-subheadline">Formations d'excellence pour le Lycée et les Métiers du Futur.</p>
        <p class="hero-description">
          Réussissez votre Bac avec nos cours de Maths/PC et préparez votre carrière avec l'Académie IA.
        </p>

        <div class="hero-buttons">
          <RouterLink to="/categories" class="btn btn-primary">Soutien Lycée</RouterLink>
          <RouterLink to="/academie-ia" class="btn btn-secondary">Académie IA</RouterLink>
        </div>
      </div>
    </section>

    <!-- NOUVELLE SECTION DE PRÉSENTATION IA -->
    <section class="ia-showcase-section">
      <div class="ia-showcase-container">
        <div class="ia-showcase-text">
          <h2>Découvrez notre Académie IA</h2>
          <p class="section-intro">
            L'intelligence Artificielle transforme le monde. Ne restez pas spectateur.
            Nous formons les étudiants sénégalais aux métiers de demain :
          </p>
          <ul class="ia-features-list">
            <li><i class="fas fa-check-circle"></i> Ingénieur Prompt & IA Générative</li>
            <li><i class="fas fa-check-circle"></i> Analyste de Données (Data Analyst) IA</li>
            <li><i class="fas fa-check-circle"></i> Développeur IA / Machine Learning</li>
          </ul>
          <div class="hero-buttons">
            <RouterLink to="/academie-ia" class="btn btn-primary">Explorer les Parcours IA</RouterLink>
          </div>
        </div>
        <div class="ia-showcase-image">
          <!-- Utilisation de l'image que vous avez fournie -->
          <img src="/images/etudiant-en-ligne.png" alt="Étudiant apprenant l'IA en ligne">
        </div>
      </div>
    </section>

    <section class="features-section">
      <h2>Pourquoi choisir EvaM Group ?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <i class="fas fa-book-reader"></i>
          <h3>Contenu riche</h3>
          <p>Des explications claires, des exercices corrigés et des fascicules téléchargeables.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-chalkboard-teacher"></i>
          <h3>Professeurs experts</h3>
          <p>Apprenez avec des enseignants passionnés et expérimentés.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-laptop-code"></i>
          <h3>Apprentissage flexible</h3>
          <p>Accédez à vos cours à tout moment, de n'importe où.</p>
        </div>
      </div>
    </section>

    <section class="video-showcase-section">
      <div class="video-showcase-container">
        <h2>Découvrez nos cours en action</h2>
        <p class="section-intro">
          Voyez par vous-même comment nous rendons les concepts difficiles faciles à comprendre.
        </p>
        <div class="video-grid">
          <div class="video-main">
            <iframe
              src="https://www.youtube.com/embed/votre_ID_video_youtube"
              title="Vidéo de présentation EvaM Group"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="animation-grid">
            <div class="animation-card">
              <img src="" alt="Animation Programmation Python">
              <h4>Info Terminale : Python</h4>
              <p>Découvrez les boucles, les fonctions et les structures de données.</p>
            </div>
            <div class="animation-card">
              <img src="" alt="Animation Algorithmes">
              <h4>Info Première : Algorithmes</h4>
              <p>Comprenez la logique et la structure d'un algorithme efficace.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="new-modules-section">
      <h2>Nouveautés</h2>
      <div class="modules-grid">
        <div class="module-item">
          <img src="/images/math_tle_cover.png" alt="Module Maths Terminale" />
          <h3>Maths Terminale : Nombres Complexes</h3>
          <p>Découvrez les nombres complexes et leurs applications géométriques.</p>
          <RouterLink :to="{ path: '/terminale', hash: '#module-3' }" class="btn btn-small">Voir le module</RouterLink>
        </div>
        <div class="module-item">
          <img src="/images/math_1ere_cover.png" alt="Module PC Première" />
          <h3>PC Première : Mouvement et Forces</h3>
          <p>Comprenez les lois de Newton et la cinématique des solides.</p>
          <RouterLink :to="{ path: '/premiere', hash: '#module-5' }" class="btn btn-small">Voir le module</RouterLink>
        </div>
        <div class="module-item">
          <img src="/images/pc_tle_cover.png" alt="Module Info Terminale" />
          <h3>Info Terminale : Programmation Python</h3>
          <p>Initiation à la programmation et aux algorithmes avec Python.</p>
          <RouterLink to="/terminale" class="btn btn-small">Voir le module</RouterLink>
        </div>
      </div>
    </section>

    <section id="preview-fascicules" class="preview-section">
      <div class="preview-container">
        <div class="section-title-container">
          <i class="fas fa-eye"></i>
          <h2>Prévisualisez nos Fascicules</h2>
          <p>Cliquez sur une couverture pour voir un extrait du contenu.</p>
        </div>
        <div class="preview-grid">
          <div class="fascicule-selector-list">
            <div
              v-for="fascicule in listeFascicules"
              :key="fascicule.id"
              class="fascicule-selector-item"
              :class="{ active: fascicule.id === fasciculeEnPreview.id }"
              @click="changerPreview(fascicule)"
            >
              <img :src="fascicule.coverImg" :alt="'Couverture ' + fascicule.nom">
              <h4>{{ fascicule.nom }}</h4>
            </div>
          </div>
          <div class="fascicule-preview-area">
            <transition name="fade" mode="out-in">
              <div class="preview-content" :key="fasciculeEnPreview.id">
                <img
                  :src="fasciculeEnPreview.coverImg"
                  :alt="'Aperçu ' + fasciculeEnPreview.nom"
                  class="preview-cover-img"
                >
                <div class="preview-text-content">
                  <h3>Extrait : {{ fasciculeEnPreview.nom }}</h3>
                  <div v-html="fasciculeEnPreview.previewHtml"></div>
                  <a href="#commande-fascicules" class="btn-commander-extrait">
                    Commander ce fascicule <i class="fas fa-arrow-down"></i>
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <section id="commande-fascicules" class="order-section">
      <div class="order-container">
        <h2>
          <i class="fas fa-qrcode"></i>
          Commander vos Fascicules EvaM
        </h2>
        <p>
          Accès direct à la réussite. Remplissez le formulaire ci-dessous
          pour recevoir vos fascicules.
        </p>
        <form v-if="!formSubmitted" @submit.prevent="handleOrder" class="order-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom complet</label>
              <input type="text" id="nom" v-model="commande.nom" placeholder="Ex: Moussa Diop" required>
            </div>
            <div class="form-group">
              <label for="classe">Votre Classe</label>
              <select id="classe" v-model="commande.classe" required>
                <option disabled value="">-- Sélectionnez votre niveau --</option>
                <option>6ème</option>
                <option>5ème</option>
                <option>4ème</option>
                <option>3ème</option>
                <option>Seconde</option>
                <option>Première</option>
                <option>Terminale</option>
                <option>Autre</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="telephone">Numéro de téléphone (WhatsApp)</label>
            <input type="tel" id="telephone" v-model="commande.telephone" placeholder="Ex: 77 123 45 67" required>
          </div>
          <div class="form-group">
            <label>Quels fascicules souhaitez-vous ?</label>
            <div class="fascicule-options">
              <div v-for="fascicule in listeFascicules" :key="fascicule.id" class="option">
                <input
                  type="checkbox"
                  :id="fascicule.id"
                  :value="fascicule.nom"
                  v-model="commande.selection">
                <label :for="fascicule.id">
                  {{ fascicule.nom }} <span>({{ fascicule.prix }} FCFA)</span>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn-submit-order">
            Passer la commande
          </button>
        </form>
        <div v-if="formSubmitted" class="success-message">
          <h3>Merci pour votre commande !</h3>
          <p>
            Nous avons bien reçu votre demande. Un agent EvaM vous contactera
            très prochainement sur le numéro <strong>{{ commande.telephone }}</strong>
            pour finaliser la livraison.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// LE SCRIPT EST EXACTEMENT LE MÊME, PAS DE CHANGEMENT NÉCESSAIRE
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_dtj373m'
const EMAILJS_TEMPLATE_COMMANDE = 'template_2ggmqlo'
const EMAILJS_PUBLIC_KEY = 'kSSYiauK7yBL9LRZV'

const listeFascicules = ref([
  {
    id: 'math_tle',
    nom: 'Maths Terminale',
    prix: 5000,
    coverImg: '/images/math_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : Les Limites et la Continuité</h4><p>...'
  },
  {
    id: 'pc_tle',
    nom: 'PC Terminale',
    prix: 5000,
    coverImg: '/images/pc_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : La Mécanique Newtonienne</h4><p>...'
  },
  {
    id: 'math_1ere',
    nom: 'Maths Première',
    prix: 4500,
    coverImg: '/images/math_1ere_cover.jpg',
    previewHtml: '<h4>Chapitre 1 : Le Second Degré</h4><p>...'
  },
  {
    id: 'math_2nde',
    nom: 'Maths Seconde',
    prix: 4000,
    coverImg: '/images/pc_tle_cover.png',
    previewHtml: '<h4>Chapitre 1 : Les Ensembles de Nombres</h4><p>...'
  },
])
const fasciculeEnPreview = ref(listeFascicules.value[0])
function changerPreview(fascicule) {
  fasciculeEnPreview.value = fascicule
}

const commande = ref({
  nom: '',
  classe: '',
  telephone: '',
  selection: []
})
const formSubmitted = ref(false)

function handleOrder() {
  const templateParams = {
    nom: commande.value.nom,
    classe: commande.value.classe,
    telephone: commande.value.telephone,
    selection: commande.value.selection.join(', ')
  };

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_COMMANDE,
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
  .then((response) => {
     console.log('Commande envoyée !', response.status, response.text);
     formSubmitted.value = true
  }, (err) => {
     console.error('Échec...', err);
     alert("Erreur lors de l'envoi de la commande.");
  });
}
</script>

<style scoped>
/* GENERAL */
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ============================================= */
/* --- NOUVEAU STYLE HERO "DARK TYPING" --- */
/* ============================================= */
.hero-section-dark {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* Fond sombre, assorti à votre footer */
  background-color: #111827;
  padding: 0 2rem;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

/* Le conteneur de l'animation */
.typing-container {
  display: inline-block; /* S'adapte à la largeur du texte */
  margin-bottom: 1.5rem;
}

.typing-container h1 {
  font-size: 3.5rem; /* Taille du texte "EvaM Group" */
  font-weight: 700;
  color: #fff;
  white-space: nowrap; /* Empêche le retour à la ligne pendant l'animation */
  overflow: hidden; /* Cache le texte qui n'est pas encore "écrit" */

  /* C'est le CURSEUR lumineux. On utilise la couleur rose de votre site */
  border-right: 4px solid var(--pink);

  /* Animation :
     1. "typing" écrit le texte en 2.5 secondes.
        "steps(10)" car "EvaM Group" a 10 caractères (espace inclus)
     2. "blink-caret" fait clignoter le curseur indéfiniment
  */
  animation:
    typing 1.5s steps(10, end),
    blink-caret 0.75s step-end infinite;
}

/* Sous-titres */
.hero-subheadline {
  font-size: 1.5rem;
  color: #f3f4f6; /* Blanc cassé */
  margin-bottom: 0.5rem;
  animation: fadeIn 1.5s ease-in-out 0.5s; /* Apparaît après le typing */
  animation-fill-mode: forwards; /* Reste visible */
  opacity: 0; /* Caché au début */
}
.hero-description {
  font-size: 1.2rem;
  color: var(--text-light); /* Gris clair de votre CSS */
  margin-bottom: 2.5rem;
  animation: fadeIn 1.5s ease-in-out 0.3s; /* Apparaît après le sous-titre */
  animation-fill-mode: forwards;
  opacity: 0;
}
.hero-buttons {
  animation: fadeIn 1.5s ease-in-out 0.5s; /* Apparaît en dernier */
  animation-fill-mode: forwards;
  opacity: 0;
}


/* --- KEYFRAMES (Les animations CSS) --- */

/* Animation 1: Écriture du texte */
/* Fait grandir la largeur du texte de 0% à 100% */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Animation 2: Clignotement du curseur (la "lumière") */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--pink); }
}

/* Animation 3: Apparition en fondu du reste */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}


/* Styles des boutons sur fond sombre (inchangés) */
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.btn-primary {
  background-color: var(--primary);
  color: white;
  border: 2px solid var(--primary);
}
.btn-primary:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}
.btn-secondary:hover {
  background-color: white;
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Responsive pour le Hero */
@media (max-width: 768px) {
  .typing-container h1 {
    font-size: 2.5rem;
    animation:
      typing 2.5s steps(10, end),
      blink-caret 0.75s step-end infinite;
  }
  .hero-subheadline {
    font-size: 1.2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .hero-buttons {
    flex-direction: column;
  }
}

/* --- NOUVELLE SECTION IA SHOWCASE --- */
.ia-showcase-section {
  width: 100%;
  padding: 4rem 2rem;
  background-color: #fff; /* Fond blanc */
}
.ia-showcase-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.ia-showcase-text h2 {
  font-size: 2.2rem;
  color: var(--primary);
  margin-bottom: 1rem;
  font-weight: 700;
}
.ia-showcase-text .section-intro {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}
.ia-features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
}
.ia-features-list li {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
.ia-features-list li i {
  color: var(--primary); /* Utilise la couleur primaire */
  margin-right: 10px;
  font-size: 1.2rem;
}
.ia-showcase-image img {
  width: 100%;
  max-width: 500px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
/* Recréer les styles des boutons pour cette section */
.ia-showcase-section .hero-buttons {
  animation: none; /* Pas d'animation de fondu ici */
  opacity: 1;
  justify-content: flex-start;
}
.ia-showcase-section .btn {
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.ia-showcase-section .btn-primary {
  background-color: var(--primary);
  color: white;
  border: 2px solid var(--primary);
}
.ia-showcase-section .btn-primary:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* ============================================= */
/* --- LE RESTE DU CSS EST INCHANGÉ --- */
/* ============================================= */

/* --- SECTIONS SUIVANTES --- */
.features-section, .new-modules-section {
  width: 100%;
  max-width: 1200px;
  padding: 4rem 2rem;
  text-align: center;
}
.features-section h2, .new-modules-section h2 {
  font-size: 2.2rem;
  color: var(--primary);
  margin-bottom: 3rem;
  font-weight: 700;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.feature-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-10px);
}
.feature-card i {
  font-size: 3.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}
.feature-card h3 {
  font-size: 1.4rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}
.feature-card p {
  color: var(--text-light);
  font-size: 1rem;
}

/* MODULES GRID */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.module-item {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  text-align: left;
  transition: transform 0.3s ease;
}
.module-item:hover {
  transform: translateY(-8px);
}
.module-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.module-item h3 {
  font-size: 1.3rem;
  color: var(--text-dark);
  margin: 1.5rem 1.5rem 0.5rem 1.5rem;
}
.module-item p {
  color: var(--text-light);
  font-size: 0.95rem;
  margin: 0 1.5rem 1.5rem 1.5rem;
}
.module-item .btn-small {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 1.5rem 1.5rem 1.5rem;
  transition: background-color 0.3s ease;
}
.module-item .btn-small:hover {
  background-color: var(--primary-dark);
}
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* SECTION VIDÉO SHOWCASE */
.video-showcase-section {
  width: 100%;
  padding: 4rem 2rem;
  background-color: #fff; /* Fond blanc pour contraster */
  text-align: center;
}
.video-showcase-container {
  max-width: 1200px;
  margin: 0 auto;
}
.video-showcase-section h2 {
  font-size: 2.2rem;
  color: var(--primary);
  margin-bottom: 1rem;
  font-weight: 700;
}
.video-showcase-section .section-intro {
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto 3rem auto;
}
.video-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Vidéo principale plus grande */
  gap: 2rem;
  align-items: flex-start; /* Aligne les éléments en haut */
}
.video-main {
  position: relative;
  padding-top: 56.25%; /* (100 / 16 * 9) */
  height: 0;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.video-main iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.animation-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.animation-card {
  background-color: var(--bg-light);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: left;
  transition: var(--transition);
}
.animation-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}
.animation-card img {
  width: 100%;
  height: 180px; /* Hauteur fixe pour les GIFs */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #eee; /* Couleur de fond si l'image charge */
}
.animation-card h4 {
  font-size: 1.2rem;
  color: var(--text-dark);
  font-weight: 600;
}
.animation-card p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0; /* Retire la marge par défaut des <p> */
}
@media (max-width: 900px) {
  /* Ajout de la règle pour .ia-showcase-container */
  .ia-showcase-container {
    grid-template-columns: 1fr;
  }
  .ia-showcase-image {
    order: -1; /* Met l'image en premier sur mobile */
    margin-bottom: 2rem;
  }
  .ia-showcase-text {
    text-align: center;
  }
  .ia-showcase-text .hero-buttons {
    justify-content: center;
  }
  .ia-features-list li {
    justify-content: center;
  }

  .video-grid {
    grid-template-columns: 1fr; /* Passe en une seule colonne */
  }
  .video-main {
      margin-bottom: 2rem;
  }
  .animation-grid {
    flex-direction: row; /* Met les 2 animations côte à côte */
  }
  .animation-card {
    flex: 1; /* Les 2 cartes prennent la même largeur */
  }
}
@media (max-width: 600px) {
  .animation-grid {
    flex-direction: column; /* Repasse en colonne sur petits écrans */
  }
}


/* SECTION PREVIEW FASCICULES */
.preview-section {
  padding: 4rem 2rem;
  background-color: var(--pink);
}
.preview-container {
  max-width: 1200px;
  margin: auto;
}
.section-title-container {
  text-align: center;
  margin-bottom: 3rem;
}
.section-title-container i {
  font-size: 2.5rem;
  color: var(--primary);
}
.section-title-container h2 {
  font-size: 2.2rem;
  color: var(--primary);
  margin-top: 0.5rem;
}
.section-title-container p {
  font-size: 1.1rem;
  color: var(--text-light);
}
.preview-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  background-color: var(--pink);
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.fascicule-selector-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
}
.fascicule-selector-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: var(--transition);
}
.fascicule-selector-item img {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.fascicule-selector-item h4 {
  font-size: 1rem;
  color: var(--text-dark);
}
.fascicule-selector-item:hover {
  background-color: var(--bg-light);
}
.fascicule-selector-item.active {
  background-color: #e0f7fa;
  border-color: var(--primary);
}
.fascicule-selector-item.active h4 {
  color: var(--primary);
  font-weight: 700;
}
.fascicule-preview-area {
  position: relative;
  min-height: 400px;
}
.preview-content {
  display: flex;
  gap: 2rem;
}
.preview-cover-img {
  width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: var(--shadow);
}
.preview-text-content {
  flex: 1;
}
.preview-text-content h3 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}
.preview-text-content :deep(h4) {
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-top: 1rem;
}
.preview-text-content :deep(p) {
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.6;
}
.preview-text-content :deep(i) {
  font-style: italic;
  color: #555;
}
.btn-commander-extrait {
  display: inline-block;
  margin-top: 2rem;
  padding: 10px 20px;
  background-color: var(--primary);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: var(--transition);
}
.btn-commander-extrait:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}
.btn-commander-extrait i {
  margin-left: 8px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 900px) {
  .preview-grid {
    grid-template-columns: 1fr;
  }
  .fascicule-selector-list {
    flex-direction: row;
    overflow-x: auto;
    max-height: none;
    padding: 0.5rem;
  }
  .fascicule-selector-item {
    flex-direction: column;
    text-align: center;
    min-width: 120px;
  }
  .fascicule-selector-item h4 {
    font-size: 0.9rem;
  }
}
@media (max-width: 768px) {
  .preview-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

/* SECTION COMMANDE FASCICULES */
.order-section {
  padding: 4rem 2rem;
  background-color: var(--pink);
}
.order-container {
  max-width: 800px;
  margin: auto;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border-top: 5px solid var(--primary);
}
.order-container h2 {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 1rem;
}
.order-container h2 i {
  margin-right: 10px;
  color: var(--text-dark);
}
.order-container p {
  text-align: center;
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}
.order-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}
.form-group input[type="text"],
.form-group input[type="tel"],
.form-group select {
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: var(--transition);
}
.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}
.fascicule-options .option {
  display: flex;
  align-items: center;
  background-color: var(--bg-light);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: var(--transition);
}
.fascicule-options .option:hover {
  background-color: #e0f7fa;
}
.fascicule-options input[type="checkbox"] {
  width: 1.3em;
  height: 1.3em;
  margin-right: 12px;
  accent-color: var(--primary);
}
.fascicule-options label {
  margin-bottom: 0;
  font-weight: 500;
  flex-grow: 1;
}
.fascicule-options label span {
  float: right;
  font-weight: 600;
  color: var(--primary);
}
.btn-submit-order {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--primary);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
}
.btn-submit-order:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.success-message {
  text-align: center;
  padding: 2rem;
  background-color: #e6fffa;
  border: 1px solid #3ddc97;
  border-radius: var(--radius);
}
.success-message h3 {
  color: #23765a;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .order-container {
    padding: 1.5rem;
  }
}
</style>
