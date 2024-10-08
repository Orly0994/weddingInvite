<template>
  <div>
    <div>{{ message }}</div>

    <div>
      <button @click="onClickBtn">click me!</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'

const message: Ref<string> = ref('Hello there')

const onClickBtn = () => {
  message.value = 'changed message'
}
</script>
