<template>
  <li class="background b-card">
    <p class="r-mr-10">{{weatherDay.dt_txt.split(' ')[0]}}</p>

    <p>День</p>
    <p>Ночь</p>
    <img
        :src="getIcon"
        alt="weather icon"
    />
    <p>{{Math.round(weatherDay.main.temp)}} ℃</p>
    <p>{{Math.round(weatherNight.main.temp)}} ℃</p>

  </li>
</template>

<script>
export default {
  props: {
    weatherDay: Object,
    weatherNight: Object
  },
  computed: {
    getIcon() {
      const iconName = this.weatherDay.weather[0].icon;
      const getImageUrl = (iconName) => `http://openweathermap.org/img/wn/${iconName}.png`
      return getImageUrl(iconName)
    }
  }
}
</script>