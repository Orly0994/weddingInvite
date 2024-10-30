<template>
  <div class="wrapper">
    <HelloScreen />
    <GuestText class="mb-4" />
    <Timing />
    <Colors />
    <Form :guest="guest" />
    <Map />
  </div>
</template>

<script setup lang="ts">
import HelloScreen from './components/HelloScreen.vue'
import GuestText from './components/GuestText.vue'
import Timing from './components/Timing.vue'
import Colors from './components/Colors.vue'
import Map from './components/Map.vue'
import Form from './components/Form.vue'

import { ref } from 'vue'
import { useFetch } from './shared/useFetch'

const isLoading = ref(false)
const request = useFetch()
const guest = ref({})

const init = async () => {
  isLoading.value = true

  try {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('uuid')

    if (id) {
      const response = await request.get(id)

      guest.value = response
    }
  } finally {
    isLoading.value = false
  }
}

init()
</script>
