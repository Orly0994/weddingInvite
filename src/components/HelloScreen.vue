<template>
  <div class="section hello-screen">
    <div class="image-wrapper">
      <img class="image-1" src="../images/1.png" alt="1" />
    </div>
    <div class="names">
      <template v-for="(name, i) in names" :key="name">
        <div class="name">{{ name }}</div>
        <div v-if="!isLastName(i)" class="fs-20">И</div>
      </template>
    </div>

    <div class="date text-bold">{{ dateFormated }}</div>

    <VueCountdown
      class="countdown"
      :time="timeRemaining"
      v-slot="{ days, hours, minutes, seconds }"
    >
      <div class="countdown-wrapper">
        <div class="text-nowrap">
          <span class="d-inline-block text-bold">{{ days }}</span> дн.
        </div>
        <div class="text-nowrap">
          <span class="d-inline-block text-bold">{{ hours }}</span> ч.
        </div>
        <div class="text-nowrap">
          <span class="d-inline-block text-bold">{{ minutes }}</span> мин.
        </div>
        <div class="text-nowrap">
          <span class="d-inline-block text-bold">{{ seconds }}</span> сек.
        </div>
      </div>
    </VueCountdown>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ref, Ref } from 'vue'

const names: Ref<string[]> = ref(['Анастасия', 'Андрей'])

const date = new Date('2024-12-04T15:00:00')
const dateFormated = format(date, 'dd.MM.yyyy')
const timeRemaining = date.getTime() - new Date().getTime()

const isLastName = (index: number) => {
  return index === names.value.length - 1
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
  font-size: 53px;
  line-height: 4rem;
}

.date {
  font-size: 30px;
  margin-top: auto;
}

.fs-20 {
  font-size: 20px;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.countdown {
  display: block;
  width: 100%;
  margin-top: auto;
  text-wrap: nowrap;
  overflow: hidden;
  font-size: 30px;
  margin-bottom: 1rem;
  padding: 0 15px;

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: nowrap;

    div {
      flex: 0 1 88px;
      text-align: center;
    }
  }
}
</style>
