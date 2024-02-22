<template>
  <main>
    <div v-if="!isLoading">
      <div v-for="item in arrayOfLocations" :key="item.id">
        <Block :location-name="item.name"/>
      </div>
    </div>

    <div v-if="weatherArray.length !== 0" class="b-info">
      <div class="b-info--section">
        <div class="b-info--wrapper">
          <ul class="cards-wrapper">
            <WeatherCard :weather-day="weatherArray[dayWeatherItem]" :weather-night="weatherArray[dayWeatherItem + 4]" />
            <WeatherCard :weather-day="weatherArray[dayWeatherItem + 8]" :weather-night="weatherArray[dayWeatherItem + 12]" />
            <WeatherCard :weather-day="weatherArray[dayWeatherItem + 16]" :weather-night="weatherArray[dayWeatherItem + 20]" />
          </ul>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="b-info--loader-container">
      <Loader />
    </div>

    <Modal :show="showModal" @close="showModal = false" >
      <template #body>
        <p class="b-info--tooltip">{{ error }}</p>
        <Settings @refresh="refresh = $event" />
      </template>
    </Modal>
  </main>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      error: '',
      arrayOfLocations: locationStorage.fetch(),
      isLoading: null,
      locations: null,
      showModal: false,
      refresh: false,
      weatherArray: [],
    }
  },
  mounted() {
    this.isLoading = true;
    this.locations = locationStorage.fetch();
    if(this.locations.length === 0) {
      this.geoFindMe()
    }
    else {
      for (let i = 0; i < this.locations.length; i++) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.locations[i].name}&appid=${API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((result) => {
              localStorage.setItem(`${this.locations[i].name}`, JSON.stringify(result));
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => this.isLoading = false);
      }
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.locations[0].name}&appid=${API_KEY}&units=metric`)
          .then((response) => response.json())
          .then((result) => {
            console.log('result', result.list)
            this.weatherArray = result.list
            localStorage.setItem(`${this.locations[0].name}.3days`, JSON.stringify(result));
          })
    }
  },
  methods: {
    handleSuccess(position) {
      console.log(position.coords.latitude)
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            this.locations.push({
              id: locationStorage.uid++,
              name: result.name,
            });
            locationStorage.save(this.locations);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => this.isLoading = false);
    },
    handleError() {
      this.error = "Unable to get your location. Add below";
      this.isLoading = false;
      this.showModal = true;
    },
    geoFindMe() {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      if (!navigator.geolocation) {
        this.error = "Geolocation не поддерживается вашим браузером";
      } else {
        navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError, options);
      }
    },
  },
  watch: {
    'refresh'() {
      if (this.refresh) {
        location.reload();
        this.refresh = false;
      }
    },
  },
  computed: {
    dayWeatherItem() {
      let a = 0;
      for (let i = 0; i < this.weatherArray; i++) {
        if (this.weatherArray[i].dt_txt.split(' ')[1] === "12:00:00") {
          a = i;
          break;
        }
      }
      return a
    }
  }
}
</script>
