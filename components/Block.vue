<template>
  <div class="background">
    <Header :location="locationName" />
    <WeatherItem :weather="getWeatherData" />
  </div>
</template>

<script>
export default {
  name: 'BlockComponent',
  props: {
    locationName : {
      type: String,
    }
  },
  computed: {
    getWeatherData() {
      return JSON.parse(localStorage.getItem(`${this.locationName}`))
    }
  }
}
</script>