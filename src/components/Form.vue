<template>
  <div class="section-form mb-2">
    <div class="text-guest mb-2">
      Просим вас ответить на несколько вопросов до 15 ноября.<br />
      Это поможет нам в организации торжества.
    </div>

    <h2>Сможете ли вы присутствовать?</h2>

    <div class="list-wrapper">
      <div class="list">
        <label v-for="presenceOption in presenceOptions" :key="presenceOption.id" class="list__item mb-2">
          <input type="radio" name="presence" :value="presenceOption.id" @input="onInputPresence" />

          <div class="checkbox"></div>

          {{ presenceOption.name }}
        </label>
      </div>
    </div>

    <div :class="{ disabled: isDisabled }">
      <h2 class="text-center">Предпочтения по напиткам:</h2>

      <div class="list-wrapper mb-4">
        <div class="list">
          <label v-for="drink in drinks" :key="drink.id" class="list__item mb-2" :disabled="isDisabled">
            <input type="checkbox" :checked="drink.isChecked" @input="(event) => onChangeDrink(drink.id, event)">

            <div class="checkbox"></div>

            {{ drink.name }}
          </label>
        </div>

        <div class="label">Другое:</div>

        <div class="input-wrapper">
          <input type="text" v-model="comment" class="input" :disabled="isDisabled">
        </div>
      </div>

      <h2 class="text-center">Предпочтения по горячему:</h2>

      <div class="list-wrapper">
        <div class="list">
          <label v-for="foodOption in foodOptions" :key="foodOption.id" class="list__item mb-2" :disabled="isDisabled">
            <input type="radio" name="food" :value="foodOption.id" @input="onInputFood" />

            <div class="checkbox"></div>

            {{ foodOption.name }}
          </label>
        </div>
      </div>
    </div>

    <div class="btn-wrapper mb-4">
      <button class="btn" @click="onClickBtn" :disabled="isLoading">Отправить</button>
    </div>

    <div class="text-guest">
      Просим не обременять себя выбором цветов, Ваше присутствие скрасит этот день ярче любых букетов! <br />
      Будем Вас ждать ♥
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useFetch } from '../shared/useFetch'

const props = defineProps(['guest'])

const toast = useToast()
const request = useFetch()

const isLoading = ref(false)

const presenceOptions = [
  {
    id: 1,
    name: 'Смогу'
  },
  {
    id: 2,
    name: 'Не смогу'
  },
]

const foodOptions = [
  {
    id: 1,
    name: 'Мясо'
  },
  {
    id: 2,
    name: 'Рыба'
  },
]

const food = ref(null)

const presence = ref(null)

const drinks = ref([
  {
    id: 1,
    name: 'Красное вино',
    isChecked: false,
  },
  {
    id: 2,
    name: 'Белое вино',
    isChecked: false,
  },
  {
    id: 3,
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

const isDisabled = computed(() => {
  return Number(presence.value) === 2
})

const syncDataWithProps = () => {
  if (props.guest.comment) {
    comment.value = props.guest.comment
  }


  if (props.guest.drinks) {
    drinks.value.forEach(drink => {
      const drinkFound = props.guest.drinks.find(dr => drink.id === dr.id)

      drink.isChecked = drinkFound ?? false
    })
  }
}

const onChangeDrink = (id, event) => {
  const drink = drinks.value.find(drinks => drinks.id === id)

  if (drink) {
    drink.isChecked = event.target.checked
  }
}

const onInputPresence = (event) => {
  presence.value = event.target.value
}

const onInputFood = (event) => {
  food.value = event.target.value
}

const onClickBtn = async () => {
  isLoading.value = true

  try {
    const guestUuid = props.guest.uuid

    await request.put(guestUuid, {
      ...props.guest,
      drinks: drinks.value.map(drink => {
        if (drink.isChecked) {
          return {
            id: drink.id
          }
        }

        return null
      }).filter(Boolean),
      comment: comment.value,
      presence: presence.value,
      food: food.value,
    })
  } finally {
    isLoading.value = false

    toast('Спасибо!')
  }
}

watchEffect(() => {
  syncDataWithProps()
})

syncDataWithProps()
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
  width: 100%;
}

.list {
  padding: 30px 0;
  width: 100%;

  &__item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;

    &[disabled="true"] {
      pointer-events: none;
    }
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

input[type="checkbox"], input[type="radio"] {
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
  padding: 0 0 3px 0;

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--checkbox-color);
  }


  &-wrapper {
    margin-top: auto;
    padding: 20px 0;
    height: 70px;
  }

  &[disabled="true"] {
    pointer-events: none;
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
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.2;
  }
}

.disabled {
  opacity: .3;
  pointer-events: none;
}
</style>