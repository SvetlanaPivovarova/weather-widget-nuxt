<template>
  <section class="b-settings">
    <h2 class="b-settings--title">Settings</h2>
    <ul v-for="item in locations" :key="item">
      <LocationItem :locationDisplay="item" @delete="deletedItem = $event" />
    </ul>
    <AddLocationForm @add="newItem = $event" />
  </section>
</template>

<script>
import LocationItem from "./LocationItem.vue";
import AddLocationForm from "./AddLocationForm.vue";

import { locationStorage } from "../utils/utils";

export default {
  name: 'SettingsComponent',
  components: { AddLocationForm, LocationItem },
  data() {
    return {
      locations: locationStorage.fetch(),
      newItem: null,
      deletedItem: '',
    }
  },
  emits: ['refresh'],
  watch: {
    'locations'() {
      locationStorage.save(this.locations)
    },
    'newItem'() {
      this.addLocation(this.newItem)
      this.$emit('refresh')
    },
    'deletedItem'() {
      this.removeLocation(this.deletedItem)
      this.$emit('refresh')
    }
  },
  methods: {
    addLocation() {
      const value = this.newItem && this.newItem.trim();
      if (!value) {
        return;
      }
      this.locations.push({
        id: locationStorage.uid++,
        name: value,
      });
      locationStorage.save(this.locations);
      this.newItem = "";
    },
    removeLocation(id) {
      this.locations = this.locations.filter(
          (item) => item.id !== id
      );
      locationStorage.save(this.locations);
      this.newItem = null;
    },
  }
}
</script>