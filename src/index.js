import { createApp } from 'vue'
import App from './App.vue'
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"
import './styles/style.scss'
import VueCountdown from '@chenfengyuan/vue-countdown'

const app = createApp(App)

app.component('VueCountdown', VueCountdown)

app.use(Toast, {
  toastClassName: "toast-class",
  position: POSITION.BOTTOM_CENTER,
})

app.mount('#app')
