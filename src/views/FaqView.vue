<template>
  <div class="page-container">
    <h1 class="page-title">Questions Fréquemment Posées</h1>
    <p class="page-intro">
      Trouvez rapidement les réponses à vos interrogations.
    </p>

    <div class="faq-container">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">

        <div class="faq-question" @click="toggleFaq(index)">
          <h3>{{ faq.question }}</h3>
          <i class="fas fa-chevron-down" :class="{ rotated: faq.isOpen }"></i>
        </div>

        <div v-show="faq.isOpen" class="faq-answer">
          <p>{{ faq.answer }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "Comment puis-je commander un fascicule ?",
    answer: "C'est très simple ! Allez sur notre page d'accueil, remplissez le formulaire de commande avec vos informations et les fascicules désirés. Un agent vous contactera par WhatsApp pour finaliser la livraison.",
    isOpen: true
  },
  {
    question: "Les cours en vidéo sont-ils accessibles tout le temps ?",
    answer: "Oui. Une fois inscrit à un module, vous pouvez accéder aux vidéos de cours 24h/24, 7j/7, sur votre téléphone, tablette ou ordinateur, pour apprendre à votre propre rythme.",
    isOpen: false
  },
  {
    question: "Qui sont les professeurs ?",
    answer: "Nos cours sont conçus et enseignés par des professeurs certifiés, expérimentés et reconnus pour leur pédagogie claire et efficace, spécialisés dans la préparation aux examens sénégalais.",
    isOpen: false
  },
  {
    question: "Que faire si j'ai un problème technique ?",
    answer: "Pas d'inquiétude. Vous pouvez nous contacter directement via notre page Contact ou sur WhatsApp. Notre équipe de support technique vous aidera à résoudre votre problème rapidement.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
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

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.faq-item {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background-color: var(--bg-light);
}
.faq-question:hover {
  background-color: #f0f8ff;
}
.faq-question h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
}
.faq-question i {
  font-size: 1rem;
  color: var(--primary);
  transition: transform 0.3s ease;
}
.faq-question i.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
}
.faq-answer p {
  color: var(--text-light);
  font-size: 1.1rem;
  line-height: 1.7;
}
</style>
