import './main.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification' // Import the package to allow the use of the toast plugin
import 'vue-toastification/dist/index.css' // Import the CSS file for the toast plugin
import App from './App.vue'

const app = createApp(App)
app.use(Toast);
app.mount('#app')
