<template>
  <div class="login-page">
    <div class="login-container">

      <img src="/images/evam logo.png" alt="Logo EvaM Group" class="login-logo">
      <h2>Connexion à votre espace</h2>
      <p>Accédez à vos cours et suivez votre progression.</p>

      <form @submit.prevent="handleLogin" class="login-form">

        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input type="email" id="email" v-model="email" placeholder="exemple@gmail.com" required>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" class="btn-submit-login">
          Se connecter
        </button>
      </form>

      <div class="login-footer">
        <a href="#">Mot de passe oublié ?</a>
        <p>Pas encore de compte ? <a href="#">Créez-en un</a></p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref(null) // Pour les erreurs de connexion
const router = useRouter() // Pour la redirection

const handleLogin = () => {
  // --- Logique de connexion (Simulation) ---
  console.log('Tentative de connexion avec:', email.value, password.value)
  errorMessage.value = null // Réinitialise l'erreur

  // Simulation : Si l'email n'est pas "admin@evam.com"
  if (email.value !== 'admin@evam.com' || password.value !== 'admin') {
    errorMessage.value = 'Email ou mot de passe incorrect.'
  } else {
    // Connexion réussie !
    console.log('Connexion réussie !')
    // On redirige vers la page d'accueil
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--bg-light);
  min-height: 80vh;
}
.login-container {
  max-width: 450px;
  width: 100%;
  padding: 3rem;
  background-color: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-align: center;
  border-top: 5px solid var(--primary);
}

.login-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
}

.login-container h2 {
  color: var(--primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}
.login-container p {
  color: var(--text-light);
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}
.form-group label {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  display: block;
}
.form-group input {
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: var(--transition);
}
.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 33, 181, 0.1);
}

.error-message {
  color: #D32F2F; /* Rouge erreur */
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
}

.btn-submit-login {
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
.btn-submit-login:hover {
  background-color: var(--primary-dark);
}

.login-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
}
.login-footer p {
  margin-top: 1rem;
  color: var(--text-light);
}
.login-footer a {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}
.login-footer a:hover {
  text-decoration: underline;
}
</style>
