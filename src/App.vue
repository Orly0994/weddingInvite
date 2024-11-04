<template>
  <div v-if="adminModeEnabled">
    <div class="section container content admin">
      <div class="form">
        <div class="form-input">
          <div class="form-input__label">Имя</div>
          <input v-model="form.name"/>
        </div>
        
        <div class="form-input">
          <div class="form-input__label">Как обращаться?</div>
          <input v-model="form.gender"/>
          he, she, they
        </div>

        <div class="form-input">
          <div class="form-input__label">Внутреннее наименование</div>
          <input v-model="form.alias"/>
        </div>
      </div>

      <button class="btn mb-4" @click="onClickCreateBtn" :disabled="isLoadingAdmin">
        <img
          class="btn-loader"
          :class="{ visible: isLoadingAdmin }"
          src="./images/btn-loader.svg"
          alt="loader"
        />
        <span class="btn-text" :class="{ visible: !isLoadingAdmin }">Создать</span>
      </button>


      <button class="btn mb-4" @click="onClickGetAllBtn" :disabled="isLoadingAdmin">
        <img
          class="btn-loader"
          :class="{ visible: isLoadingAdmin }"
          src="./images/btn-loader.svg"
          alt="loader"
        />
        <span class="btn-text" :class="{ visible: !isLoadingAdmin }">Получить</span>
      </button>

      <div class="guest-list">
        <div v-for="guest in guests" :key="guest.uuid" class="guest-list-item">
          <div class="guest-list-item__name">{{ guest.name }}</div>
          <div class="guest-list-item__url">{{ getUrl(guest) }}</div>
          <button class="btn mb-4" @click="onClickDeleteBtn(guest)" :disabled="isLoading">
            <span class="btn-text" :class="{ visible: !isLoading }">Удалить</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <template v-else>
    <div
      class="preloader"
      :class="{
        'fade-out': isShownMainSection,
        'fade-out-ended': fadeOutEnded,
      }"
    >
      <LottieAnimation
        :animationData="animationJSON"
        :height="400"
        :width="400"
        :loop="false"
        :speed="2"
        @on-complete="onCompleteAdnimation"
      />
    </div>

    <div style="display: none;" @click="adminModeEnabled = true">
      click
    </div>

    <div class="wrapper" v-if="isShownMainSection">
      <HelloScreen />
      <GuestText :guest="guest" class="mb-4" />
      <Timing />
      <Colors :guest="guest" />
      <Form :guest="guest" />
      <Map />
    </div>
  </template>
</template>

<script setup lang="ts">
import HelloScreen from './components/HelloScreen.vue'
import GuestText from './components/GuestText.vue'
import Timing from './components/Timing.vue'
import Colors from './components/Colors.vue'
import Map from './components/Map.vue'
import Form from './components/Form.vue'
import animationJSON from './images/animation.json'
import AOS from 'aos'

import { ref, Ref, computed, onMounted } from 'vue'
import { useFetch } from './shared/useFetch'

interface IGuest {
  name: string
  gender: string
  drinks: Object[]
  comment: string
  presence: boolean
  uuid: string
  hasAnswered: boolean
}

const isLoading = ref(false)
const isLoadingAdmin = ref(false)

const guests: Ref<any[]> = ref([])
const form = ref({
  name: '',
  gender: '',
  alias: '',
})

const request = useFetch()
const guest: Ref<IGuest | null> = ref(null)
const animationEnded = ref(false)
const fadeOutEnded = ref(false)
const adminModeEnabled = ref(false)

const isShownMainSection = computed(() => {
  return !isLoading.value && animationEnded.value
})

const init = async () => {
  isLoading.value = true

  try {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('uuid')

    if (id) {
      const response: IGuest = await request.get(id)

      guest.value = response
    }
  } finally {
    isLoading.value = false
  }
}

const onCompleteAdnimation = () => {
  animationEnded.value = true

  setTimeout(() => {
    fadeOutEnded.value = true
  }, 1000)
}

const onClickGetAllBtn = async () => {
  isLoading.value = true

  try {
    const response = await request.get()
    guests.value = response
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const onClickCreateBtn = async () => {
  isLoading.value = true

  try {
    const response = await request.post(form.value)

    if (response.state === 'success') {
      await onClickGetAllBtn()
    }
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const onClickDeleteBtn = async (guest) => {
  isLoading.value = true

  try {
    const response = await request.delete(guest.uuid)

    if (response.state === 'deleted') {
      await onClickGetAllBtn()
    }
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const getUrl = (guest) => {
  return `${window.location.origin}/?uuid=${guest.uuid}`
}

init()

onMounted(() => {
  AOS.init({
    once: true,
    duration: 1000,
  })
})
</script>

<style lang="scss">
.admin {
  font-family: Arial, sans-serif !important;
}

.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--background-color-main);

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  transition: 1s ease-in-out;
}

.fade-out {
  opacity: 0;
}

.fade-out-ended {
  display: none;
}
</style>
