<template>
  <div class="b-info">
    <div class="b-info--section">
      <img
          :src="getIcon"
          alt="weather icon"
      />
      <div class="b-info--wrapper">
        <p class="b-info--number">{{ getTemperature }} &#8451;</p>
      </div>
    </div>
    <div class="b-info--text">Feels like {{ getFeelsLike }} ℃, {{ getDescription }}</div>
  </div>
  <Info
      :wind="getWind"
      :humidity="getHumidity"
  />

  <Modal :show="showModal" @close="showModal = false" >
    <template #body>
      <p class="b-info--tooltip">{{ error }}</p>
      <Settings @refresh="refresh = true" />
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'WeatherItem',
  props: {
    weather: {
      type: Object,
    }
  },
  data() {
    return {
      latitude: null,
      longitude: null,
      error: '',
      isLoading: null,
      showModal: false,
      locations: [],
      refresh: false,
    }
  },
  computed: {
    getTemperature() {
      return Math.round(this.weather.main.temp)
    },
    getWind() {
      return Number(this.weather.wind.speed)
    },
    getHumidity() {
      return Number(this.weather.main.humidity)
    },
    getFeelsLike() {
      return Math.round(this.weather.main.feels_like)
    },
    getDescription() {
      return this.weather.weather[0].description
    },
    getIcon() {
      const iconName = this.weather.weather[0].icon;
      const getImageUrl = (iconName, size) => `http://openweathermap.org/img/wn/${iconName}@${size || '1x'}.png`
      return getImageUrl(iconName, '2x')
    }
  },
}
</script>