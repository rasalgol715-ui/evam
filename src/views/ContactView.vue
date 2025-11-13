<template>
  <div class="contact-page">
    <div class="contact-container">

      <div class="section-title-container">
        <i class="fas fa-paper-plane"></i>
        <h2>Contactez-nous</h2>
        <p>Une question ? Une suggestion ? Laissez-nous un message !</p>
      </div>

      <div class="contact-form-wrapper">
        <form v-if="!contactFormSubmitted" @submit.prevent="handleContact" class="contact-form">
          <div class="form-group">
            <label for="contact-nom">Votre Nom</label>
            <input type="text" id="contact-nom" v-model="contactForm.nom" required>
          </div>
          <div class="form-group">
            <label for="contact-email">Votre Email</label>
            <input type="email" id="contact-email" v-model="contactForm.email" required>
          </div>
          <div class="form-group">
            <label for="contact-message">Votre Message</label>
            <textarea id="contact-message" v-model="contactForm.message" rows="6" required></textarea>
          </div>
          <button type="submit" class="btn-submit-contact">
            Envoyer le message
          </button>
        </form>

        <div v-if="contactFormSubmitted" class="success-message">
          <h3>Message envoyé !</h3>
          <p>
            Merci, <strong>{{ contactForm.nom }}</strong>. Nous avons bien reçu votre message et
            nous vous répondrons sur <strong>{{ contactForm.email }}</strong> dans les plus brefs délais.
          </p>
        </div>
      </div>

      <div class="social-links-wrapper">
        <h3>Suivez notre communauté</h3>
        <p>Restez connecté à EvaM Group sur vos plateformes préférées.</p>
        <div class="social-icon-list">
          <a href="https://tiktok.com" target="_blank" class="social-icon-link tiktok" aria-label="TikTok">
            <i class="fab fa-tiktok"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="social-icon-link instagram" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" class="social-icon-link facebook" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://wa.me/221775632268" target="_blank" class="social-icon-link whatsapp" aria-label="WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser' // <-- 1. IMPORTER EMAILJS

// --- VOS CLÉS EMAILJS CORRIGÉES ---
const EMAILJS_SERVICE_ID = 'service_dtj373m'
const EMAILJS_TEMPLATE_CONTACT = 'template_pdbhtl9' // <-- ID Contact
const EMAILJS_PUBLIC_KEY = 'kSSYiauK7yBL9LRZV'

// Logique pour le formulaire de contact
const contactForm = ref({
  nom: '',
  email: '',
  message: ''
})
const contactFormSubmitted = ref(false)

const handleContact = () => {
  const templateParams = {
    nom: contactForm.value.nom,
    email: contactForm.value.email,
    message: contactForm.value.message,
  };

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_CONTACT, // <-- Utilise la variable corrigée
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
  .then((response) => {
     console.log('Email envoyé avec succès !', response.status, response.text);
     contactFormSubmitted.value = true // Affiche le message de succès
  }, (err) => {
     console.error('Échec de l\'envoi...', err);
     alert("Une erreur est survenue. Veuillez vérifier vos informations ou réessayer plus tard.");
  });
}
</script>

<style scoped>
/* On importe les styles de la section contact de HomeView */
.contact-page {
  padding: 4rem 2rem;
  background-color: var(--bg-light);
  min-height: 80vh;
}

.contact-container {
  max-width: 800px;
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

/* Formulaire */
.contact-form-wrapper {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.contact-form {
  display: flex;
  flex-direction: column;
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
.form-group input,
.form-group textarea {
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: var(--transition);
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}
.form-group textarea {
  resize: vertical;
  min-height: 120px;
}
.btn-submit-contact {
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
.btn-submit-contact:hover {
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

/* Réseaux Sociaux */
.social-links-wrapper {
  text-align: center;
  margin-top: 3rem;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.social-links-wrapper h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}
.social-links-wrapper p {
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}
.social-icon-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.social-icon-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.8rem;
  color: #fff;
  transition: var(--transition);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.social-icon-link:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: var(--shadow);
}
.social-icon-link.tiktok { background-color: #000; }
.social-icon-link.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.social-icon-link.facebook { background-color: #1877F2; }
.social-icon-link.whatsapp { background-color: #25D366; }
</style>
