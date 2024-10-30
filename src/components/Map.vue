<template>
  <div class="section-map">
    <div class="addresses">
      <div class="address">
        <img class="address__img" src="/src/images/timing.svg" alt="palace" />

        <div class="address__name">Дворец бракосочетания</div>

        <div class="address__copy" @click="onClickCopyAddressPalaceBtn">
          <img src="/src/images/copy.svg" alt="" />
        </div>
      </div>

      <div class="address">
        <img class="address__img" src="/src/images/martini.svg" alt="palace" />

        <div class="address__name">Ресторан "Весенний"</div>

        <div class="address__copy" @click="onClickCopyAddressRestaurantBtn">
          <img src="/src/images/copy.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="map-wrapper">
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { onMounted } from 'vue'
import iconTimingMap from '/src/images/timing-map.svg'
import iconMartiniMap from '/src/images/martini-map.svg'

const toast = useToast()

const init = () => {
  ymaps.ready(() => {
    const map = new ymaps.Map('map', {
      center: [59.934014, 30.293828],
      controls: [],
      zoom: 13,
    })

    const palace = new ymaps.Placemark(
      [59.934014, 30.293828],
      {
        balloonContent: 'Дворец бракосочетания № 1\n Английская наб., 28',
      },
      {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: iconTimingMap,
        // Размеры метки.
        iconImageSize: [60, 60],
      },
    )

    const banket = new ymaps.Placemark(
      [59.920118, 30.284796],
      {
        balloonContent: 'Ресторан "Весенний"\n просп. Римского-Корсакова, 83-85',
      },
      {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: iconMartiniMap,
        // Размеры метки.
        iconImageSize: [60, 60],
      },
    )

    map.geoObjects.add(palace).add(banket)
  })
}

const showToastCopied = () => {
  toast('Адрес скопирован!')
}

const showToastError = () => {
  toast('Что-то пошло не так...')
}

const onClickCopyAddressRestaurantBtn = async () => {
  try {
    await navigator.clipboard.writeText('просп. Римского-Корсакова, 83-85')
    showToastCopied()
  } catch(error) {
    showToastError()

    throw error
  }
}

const onClickCopyAddressPalaceBtn = async () => {
  try {
    await navigator.clipboard.writeText('Английская наб., 28, Санкт-Петербург')
    showToastCopied()
  } catch(error) {
    showToastError()

    throw error
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss">
.section-map {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color-black);
  color: var(--text-color-white);
}

.map-wrapper {
  width: 100%;
  height: 70vh;
}

#map {
  filter: grayscale(1);
  -ms-filter: grayscale(1);
  -webkit-filter: grayscale(1);
  -moz-filter: grayscale(1);
  -o-filter: grayscale(1);
}

.addresses {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 30px 15px;
}

.address {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 30px;
  gap: 30px;
  width: 100%;

  &__img {
    width: 40px;
    height: 40px;
  }

  &__name {
    margin-bottom: -19px;
    font-weight: bold;
    flex: 1;
  }

  &__copy {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -9px;
    cursor: pointer;
  }
}

.toast-class {
  background-color: var(--background-color-toast) !important;
  font-family: 'Sacramento' !important;

  .Vue-Toastification__toast-body {
    font-size: 30px !important;
  }

  svg {
    display: none;
  }

  button {
    display: none;
  }
}
</style>
