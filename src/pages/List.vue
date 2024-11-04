<template>
  <div class="section container content admin">
    <div class="form">
      <div class="form-input">
        <div class="form-input__label">Имя</div>
        <input v-model="form.name"/>
      </div>
      
      <div class="form-input">
        <div class="form-input__label">Как обращаться?</div>
        <input v-model="form.gender"/>
        he, she, they
      </div>

      <div class="form-input">
        <div class="form-input__label">Внутреннее наименование</div>
        <input v-model="form.alias"/>
      </div>
    </div>

    <button class="btn mb-4" @click="onClickCreateBtn" :disabled="isLoading">
      <img
        class="btn-loader"
        :class="{ visible: isLoading }"
        src="../images/btn-loader.svg"
        alt="loader"
      />
      <span class="btn-text" :class="{ visible: !isLoading }">Создать</span>
    </button>


    <button class="btn mb-4" @click="onClickGetAllBtn" :disabled="isLoading">
      <img
        class="btn-loader"
        :class="{ visible: isLoading }"
        src="../images/btn-loader.svg"
        alt="loader"
      />
      <span class="btn-text" :class="{ visible: !isLoading }">Получить</span>
    </button>

    <div class="guest-list">
      <div v-for="guest in guests" :key="guest.uuid" class="guest-list-item">
        <div class="guest-list-item__name">{{ guest.name }}</div>
        <div class="guest-list-item__url">{{ getUrl(guest) }}</div>
        <button class="btn mb-4" @click="onClickDeleteBtn(guest)" :disabled="isLoading">
          <span class="btn-text" :class="{ visible: !isLoading }">Удалить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '../shared/useFetch'


const isLoading = ref(false)
const request = useFetch()

const guests = ref([])
const form = ref({
  name: '',
  gender: '',
  alias: '',
})

const test = [
    {
        "_id": "6720ff44a92049bbbdb2737c",
        "name": "Андрей",
        "gender": "he",
        "drinks": [
            {
                "id": 3
            },
            {
                "id": 4
            }
        ],
        "comment": "Хочу еще пива нефильтрованного",
        "presence": true,
        "uuid": "1972e89f-8c5b-404d-bd3f-2755020f235d",
        "hasAnswered": false,
        "timeAnswered": "",
        "__v": 0
    },
    {
        "_id": "6720ff44a92049bbbdb2737d",
        "name": "Настя",
        "gender": "she",
        "drinks": [],
        "comment": "",
        "presence": true,
        "uuid": "f09e98fe-00e3-42c5-8b96-49e23d8f5529",
        "hasAnswered": false,
        "timeAnswered": "",
        "__v": 0
    },
    {
        "_id": "6720ff44a92049bbbdb2737e",
        "name": "Кто-то и кто-то",
        "gender": "they",
        "drinks": [
            {
                "id": 5
            },
            {
                "id": 7
            }
        ],
        "comment": "",
        "presence": false,
        "uuid": "064f8803-a9de-44bb-8adb-4d8798a3f786",
        "hasAnswered": false,
        "timeAnswered": "",
        "__v": 0
    }
]

const onClickGetAllBtn = async () => {
  isLoading.value = true

  try {
    const response = await request.get()
    guests.value = response
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const onClickCreateBtn = async () => {
  isLoading.value = true

  try {
    const response = await request.post(form.value)

    if (response.state === 'success') {
      await onClickGetAllBtn()
    }
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const onClickDeleteBtn = async (guest) => {
  isLoading.value = true

  try {
    const response = await request.delete(guest.uuid)

    if (response.state === 'deleted') {
      await onClickGetAllBtn()
    }
  } catch(error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

const getUrl = (guest) => {
  return `${window.location.origin}/?uuid=${guest.uuid}`
}
</script>

<style lang="scss">
.admin {
  font-family: Arial, sans-serif !important;
}
</style>
