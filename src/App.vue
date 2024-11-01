<template>
  <div class="wrapper">
    <HelloScreen />
    <GuestText :guest="guest" class="mb-4" />
    <Timing />
    <Colors :guest="guest" />
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

import { ref, Ref } from 'vue';
import { useFetch } from './shared/useFetch'

interface IGuest {
  name: string,
  gender: string,
  drinks: Object[],
  comment: string,
  presence: boolean,
  uuid: string,
  hasAnswered: boolean,
}

const isLoading = ref(false)
const request = useFetch()
const guest: Ref<IGuest|null> = ref(null)

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

init()
</script>
