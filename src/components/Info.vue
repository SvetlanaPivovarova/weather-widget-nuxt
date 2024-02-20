<template>
  <div class="b-info--grid">
    <ul class="b-info--grid-info">
      <li class="b-info--grid-item">
        <p>Wind speed</p>
        <p class="b-info--grid-bold-text">{{ wind }} m/s SSE <span class="icon icon-19 icon-wind"></span></p>
      </li>
      <li class="b-info--grid-item">
        <p>Pressure</p>
        <p class="b-info--grid-bold-text">{{ pressure }} hPa</p>
      </li>
      <li class="b-info--grid-item">
        <p>Humidity</p>
        <p class="b-info--grid-bold-text">{{ humidity }}%</p>
      </li>
      <li class="b-info--grid-item">
        <p>Visibility</p>
        <p class="b-info--grid-bold-text">{{ visibility }} km</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    wind: {
      type: Number
    },
    humidity: {
      type: Number
    },
    pressure: {
      type: Number
    },
    visibility: {
      type: Number
    },
  }
}
</script>