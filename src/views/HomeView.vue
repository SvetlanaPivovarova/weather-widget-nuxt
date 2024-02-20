<template>
  <main v-if="!isLoading">
    <div v-for="item in arrayOfLocations" :key="item.id">
      <Block :location-name="item.name"/>
    </div>
  </main>
  <div v-if="isLoading" class="b-info--loader-container">
    <Loader />
  </div>

  <Modal :show="showModal" @close="showModal = false" >
    <template #body>
      <p class="b-info--tooltip">{{ error }}</p>
      <Settings @refresh="refresh = true" />
    </template>
  </Modal>

</template>

<script>
import Block from "../components/Block.vue";
import { locationStorage } from "../utils/utils";
import { API_KEY } from "../utils/constants";
import Loader from "../components/Loader.vue";
import Modal from "../components/Modal.vue";
import Settings from "../components/Settings.vue";

export default {
  components: {
    Loader,
    Block,
    Modal,
    Settings
  },
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
    }
  },
  mounted() {
    this.isLoading = true;
    this.locations = locationStorage.fetch()
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
    }
  },
  methods: {
    handleSuccess(position) {
      console.log(position.coords.latitude)
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
          .then((response) => response.json())
          .then((result) => {
            this.locations.push({
              id: locationStorage.uid++,
              name: result.name,
            });
            locationStorage.save(this.locations);
            console.log(this.locations)
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
}
</script>
