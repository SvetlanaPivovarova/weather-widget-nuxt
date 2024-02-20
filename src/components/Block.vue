<template>
  <div class="background">
    <HeaderComponent :location="locationName" />
    <WeatherItem :weather="getWeatherData" />
  </div>
</template>

<script>
import HeaderComponent from './Header.vue';
import WeatherItem from "./WeatherItem.vue";
export default {
  name: 'BlockComponent',
  props: {
    locationName : {
      type: String,

    }
  },
  components: {HeaderComponent, WeatherItem},
  computed: {
    getWeatherData() {
      return JSON.parse(localStorage.getItem(`${this.locationName}`))
    }
  }
}
</script>