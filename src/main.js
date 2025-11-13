import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// AJOUTEZ CETTE LIGNE
import './assets/main.css'  // <-- Cela charge votre CSS global

const app = createApp(App)

app.use(router)

app.mount('#app')
