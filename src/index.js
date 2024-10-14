import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.scss'
import VueCountdown from '@chenfengyuan/vue-countdown'

const app = createApp(App)

app.component('VueCountdown', VueCountdown)

app.mount('#app')
