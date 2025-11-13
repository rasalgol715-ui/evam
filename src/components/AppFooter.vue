<template>
  <footer class="bg-gray-900 text-white py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <RouterLink to="/">
              <img src="/images/evam logo.png" alt="EVAM Group" class="h-12 w-12 object-contain" />
            </RouterLink>
            <div>
              <RouterLink to="/">
                <h3 class="font-bold text-lg">EVAM GROUP</h3>
              </RouterLink>
              <p class="text-sm text-gray-400">Corporation</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm">
            Votre partenaire pour l'excellence éducative en ligne.
          </p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Formations</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><RouterLink to="/categories" class="hover:text-white transition-colors">Mathématiques</RouterLink></li>
            <li><RouterLink to="/categories" class="hover:text-white transition-colors">Physique-Chimie</RouterLink></li>
            <li><RouterLink to="/categories" class="hover:text-white transition-colors">Informatique</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Entreprise</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><RouterLink to="/about" class="hover:text-white transition-colors">À propos</RouterLink></li>
            <li><RouterLink to="/team" class="hover:text-white transition-colors">Notre équipe</RouterLink></li>
            <li><RouterLink to="/careers" class="hover:text-white transition-colors">Carrières</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><RouterLink to="/contact" class="hover:text-white transition-colors">Support</RouterLink></li>
            <li><RouterLink to="/faq" class="hover:text-white transition-colors">FAQ</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-white transition-colors">Nous contacter</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2025 EVAM Group Corporation. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de JavaScript nécessaire pour ce composant pour l'instant
</script>

<style scoped>
/* ============================= */
/* 🦶 FOOTER (V1) */
/* ============================= */
footer { background-color: #111827; color: white; padding: 3rem 1.5rem; }
footer .max-w-7xl { max-width: 80rem; margin: 0 auto; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
.flex { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
footer img { height: 3rem; width: 3rem; object-fit: contain; }
footer h3 { font-weight: bold; font-size: 1.125rem; }
footer > div > div > div:first-child p { color: #9ca3af; font-size: 0.875rem; }
footer h4 { font-weight: bold; margin-bottom: 1rem; }
footer ul { display: flex; list-style: none; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; }
footer a { transition: color 0.3s ease; text-decoration: none; color: #9ca3af; }
footer a:hover { color: white; transform: scale(1.05); }
.border-t { border-top: 1px solid #1f2937; padding-top: 2rem; text-align: center; color: #9ca3af; font-size: 0.875rem; }

/* Règle @media pour le footer */
@media(max-width:768px) {
  .grid { grid-template-columns: 1fr; } /* Règle du footer */
}
</style>
