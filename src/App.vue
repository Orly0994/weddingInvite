<template>
  <div>
    <HelloScreen />
    <div>{{ message }}</div>
    <div>{{ staticMessage }}</div>

    <div>
      <button @click="onClickBtn">click me!</button>
      <button @click="onClickBtnStaticMessage">click me 2!</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import HelloScreen from './components/HelloScreen.vue'

const message: Ref<string> = ref('Hello there')

let staticMessage: string = 'static message'

const onClickBtn = () => {
  message.value = 'changed message'
}

const onClickBtnStaticMessage = () => {
  staticMessage = 'static 2 message'
}
</script>
