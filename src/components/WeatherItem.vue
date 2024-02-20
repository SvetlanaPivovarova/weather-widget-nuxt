<template>
  <div class="b-info">
    <div class="b-info--section">
      <div class="icon icon-100 icon-weather"></div>
      <div class="b-info--wrapper">
        <p class="b-info--number">{{ getTemperature }} <span>&#8451;</span></p>
      </div>
    </div>
    <div class="b-info--text">Feels like {{ getFeelsLike }} ℃, {{ getDescription }}</div>
  </div>
  <Info

      :wind="getWind"
      :humidity="getHumidity"
      :pressure="getPressure"
      :visibility="getVisibility"
  />

  <Modal :show="showModal" @close="showModal = false" >
    <template #body>
      <p class="b-info--tooltip">{{ error }}</p>
      <Settings @refresh="refresh = true" />
    </template>
  </Modal>
</template>

<script>
import Info from "./Info.vue";
import Modal from "./Modal.vue";
import Settings from "./Settings.vue";

export default {
  name: 'WeatherItem',
  components: {Settings, Info, Modal },
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
    getPressure() {
      return Number(this.weather.main.pressure)
    },
    getVisibility() {
      return Number(this.weather.visibility)
    },
    getFeelsLike() {
      return Math.round(this.weather.main.feels_like)
    },
    getDescription() {
      return this.weather.weather[0].description
    }
  },
}
</script>