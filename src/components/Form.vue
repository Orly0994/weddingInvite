<template>
  <div class="section-form mb-2">
    <h1 class="mb-2 text-center">Предпочтения по напиткам</h1>

    <div class="list-wrapper">
      <div class="list">
        <label v-for="drink in drinks" :key="drink.id" class="list__item mb-2">
          <input type="checkbox" @change="drink.isChecked = !drink.isChecked ">

          <div class="checkbox"></div>

          {{ drink.name }}
        </label>
      </div>

      <div class="label">Другое:</div>

      <div class="input-wrapper">
        <input type="text" v-model="comment" class="input">
      </div>

      <div class="btn-wrapper">
        <button class="btn" @click="onClickBtn">Отправить</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const drinks = ref([
  {
    id: 2,
    name: 'Красное вино',
    isChecked: false,
  },
  {
    id: 3,
    name: 'Белое вино',
    isChecked: false,
  },
  {
    id: 33,
    name: 'Игристое',
    isChecked: false,
  },
  {
    id: 4,
    name: 'Коньяк',
    isChecked: false,
  },
  {
    id: 5,
    name: 'Виски',
    isChecked: false,
  },
  {
    id: 6,
    name: 'Водка',
    isChecked: false,
  },
  {
    id: 7,
    name: 'Безалкольные напитки',
    isChecked: false,
  }
])

const comment = ref('')

const onClickBtn = () => {
  console.log(comment, drinks)
  toast('Шпасибо!')
}
</script>

<style lang="scss">
.section-form {
  padding: 30px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.list-wrapper {
  max-width: 400px;
}

.list {
  padding: 30px 0;

  &__item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
  }
}

.checkbox {
  width: 20px;
  height: 20px;
  position: relative;
  border: 1px solid var(--checkbox-color);
  border-radius: 4px;
  margin-right: 2rem;

  &:after {
    content: '';
    display: none;
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 1;
    top: 6px;
    left: 13px;
    transform: translate(-50%, -50%);
    background-image: url(../images/check.svg);
  }
}

input[type="checkbox"] {
  display: none;

  &:checked ~ .checkbox {
    &::after {
      display: block;
    }
  }
}

.input {
  background-color: transparent;
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--checkbox-color);
  font-size: 30px;
  font-weight: bold;
  font-family: 'Sacramento';
  padding: 0 0 20px 0;

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--checkbox-color);
  }


  &-wrapper {
    margin-top: auto;
    padding: 20px 0;
    height: 70px;
  }
}

.label {
  font-size: 30px;
  font-weight: bold;
}

.btn {
  min-width: 200px;
  padding: 10px 15px;
  background-color: var(--background-color-toast);
  border-radius: 10px;
  color: var(--btn-text-color-black);
  font-family: 'Sacramento';
  font-weight: bold;
  font-size: 30px;
  border: none;
  outline: none;
  cursor: pointer;


  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 4rem;
  }
}
</style>