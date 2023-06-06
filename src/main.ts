import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/scss/bootstrap-reboot.scss'
import 'bootstrap/scss/bootstrap-grid.scss'
import 'bootstrap/scss/bootstrap-utilities.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
