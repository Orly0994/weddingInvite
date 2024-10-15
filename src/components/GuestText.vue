<template>
  <div class="content">
    <div class="text-guest">
      {{ words.dear }} {{ guestName }} приглашаем {{ words.you[0] }} на нашу свадьбу.<br />
      Будем рады с {{ words.you[1] }} разделить этот день. 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const sexes = [
  'she',
  'he',
  'they'
]

const wordsMap = {
  dear: {
    [sexes[0]]: 'Дорогая',
    [sexes[1]]: 'Дорогой',
    [sexes[2]]: 'Дорогие',
  },
  you: {
    [sexes[0]]: ['тебя', 'тобой'],
    [sexes[1]]: ['тебя', 'тобой'],
    [sexes[2]]: ['вас', 'вами'],
  }
}

const guestName = ref('Гость')
const sex = ref(sexes[2])

const words = computed(() => {
  return {
    dear: wordsMap.dear[sex.value],
    you: wordsMap.you[sex.value],
  }
})
</script>

<style lang="scss">
.text-guest {
  text-align: center;
  font-size: 38px;
}
</style>