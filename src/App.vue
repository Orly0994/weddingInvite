<template>
  <div class="wrapper">
    <HelloScreen />
    <GuestText class="mb-4" />
    <Timing />
    <Colors />
    <Form />
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
</script>
