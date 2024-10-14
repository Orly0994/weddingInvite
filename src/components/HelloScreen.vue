<template>
  <div class="section hello-screen">
    <div>
      <img class="image-1" src="../images/1.png" alt="1">
    </div>
    <div class="names">
      <template v-for="(name, i) in names" :key="name">
        <div class="name">{{ name }}</div>
        <div v-if="!isLastName(i)" class="fs-20">И</div>
      </template>
    </div>
    <div class="date">{{ dateFormated }}</div>
    <VueCountdown class="countdown" :time="timeRemaining" v-slot="{ days, hours, minutes, seconds }">
      <div class="d-flex align-items-center justify-content-center">
        <div v-if="days">{{ days }} дн.</div>
        <div v-if="hours">{{ hours }} ч.</div>
        <div v-if="minutes">{{ minutes }} мин.</div>
        <div v-if="seconds">{{ seconds }} сек.</div>
      </div>
    </VueCountdown>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ref, Ref } from 'vue'

const names: Ref<string[]> = ref(['Анастасия', 'Андрей'])

const date = new Date('12-04-2024')
const dateFormated = format(date, 'dd.MM.yyyy')
const timeRemaining = date.getTime() - new Date().getTime() 

const isLastName = (index: number) => {
  return index === names.value.length -1
}
</script>

<style lang="scss">
.hello-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image-1 {
  height: 47vh;
}

.names {
  text-align: center;
  margin-bottom: 2rem;
}

.name {
  font-size: 48px;
  line-height: 4rem;
}

.date {
  font-size: 25px;
  margin-top: auto;
}

.fs-20 {
  font-size: 20px;
}

.countdown {
  margin-top: auto;
  text-wrap: nowrap;
  font-size: 30px;
  margin-bottom: 1rem;
}
</style>