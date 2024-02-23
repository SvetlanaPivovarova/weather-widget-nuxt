<template>
  <div class="form-control">
    <label class="input-text-label" for="text">Add location</label>
    <div class="form-control--container">
      <input
          class="input-text"
          type="text"
          id="text"
          placeholder="Your new location to observe the weather"
          v-model="newLocation"
          @keyup.enter="addLocation"
      />
      <button
          class="icon icon-58 icon--add button--add"
          :disabled="!isValid"
          @click="addLocation"
      >
      </button>
    </div>
    <span class="input-text-label_type_error">{{ errorMessage }}</span>
  </div>
</template>

<script>
import {API_KEY, PATTERN_NAME} from "../utils/constants";
export default {
  name: 'AddLocationForm',
  emits: ['add'],
  props: {
    defaultValue: String
  },
  data() {
    return {
      newLocation: this.defaultValue,
      locations: [],
      errorMessage: null
    }
  },
  methods: {
    addLocation() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.newLocation}&appid=${API_KEY}&units=metric`)
          .then((response) => response.json())
          .then((result) => {
            localStorage.setItem(`${this.newLocation}`, JSON.stringify(result));
            if(result.message) {
              this.errorMessage = result.message
            }
            else {
              this.$emit('add', this.newLocation);
              this.newLocation = null;
            }
          })
          .catch((error) => {
            console.log(error);

          })
    }
  },
  computed: {
    isValid() {
      return PATTERN_NAME.test(this.newLocation)
    },
  },
  watch: {
    'newLocation'() {
      this.errorMessage = null
    }
  }
}
</script>