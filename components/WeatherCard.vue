<template>
  <li class="background b-card">
    <p class="r-mr-40">{{weatherDay.dt_txt.split(' ')[0]}}</p>

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
      const getImageUrl = (iconName, size) => `http://openweathermap.org/img/wn/${iconName}@${size || '1x'}.png`
      return getImageUrl(iconName, '2x')
    }
  }
}
</script>