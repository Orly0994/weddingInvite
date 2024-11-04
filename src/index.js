import { createApp } from 'vue'
// import { router } from './router'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'aos/dist/aos.css'
import './styles/style.scss'
import VueCountdown from '@chenfengyuan/vue-countdown'
import Vue3Lottie from 'vue3-lottie'

const app = createApp(App)

// app.use(router)

app.component('VueCountdown', VueCountdown)

app.use(Toast, {
  toastClassName: 'toast-class',
  position: POSITION.BOTTOM_CENTER,
})

app.use(Vue3Lottie, { name: 'LottieAnimation' })

app.mount('#app')
