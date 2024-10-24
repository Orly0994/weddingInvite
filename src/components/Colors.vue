<template>
  <div class="section-colors">
    <h1 class="mb-2">Цветовая гамма</h1>

    <div class="colors">
      <div
        v-for="color in colors"
        :key="color"
        :style="{ 'background-color': color, 'box-shadow': getShadow(color) }"
        class="color"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = ['#000000', '#FFFFFF', '#000000', '#FFFFFF', '#00333377', '#FF00FF']

const getShadow = (hex: string) => {
  return `5px 5px 20px ${hex}`
}
</script>

<style lang="scss">
.section-colors {
  padding: 30px 15px;
  text-align: center;
  background-color: var(--background-color-black);
  color: var(--text-color-white);
}

.colors {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.color {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}
</style>
