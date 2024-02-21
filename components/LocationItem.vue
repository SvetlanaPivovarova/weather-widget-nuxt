<template>
  <li class="b-settings--item">
    <div class="b-settings--line">
      <div class="b-settings--accent"><span></span></div>
      <p class="b-settings--item-text">{{ locationDisplay.name }}</p>
    </div>
    <div class="icon icon-24 icon-trash-delete" @click="deleteLocation"></div>
  </li>
</template>

<script>
export default {
  name: 'LocationItem',
  props: {
    locationDisplay: {
      type: Object,
    },
  },
  emits: ['delete'],
  methods: {
    deleteLocation() {
      this.$emit('delete', this.locationDisplay.id)
    }
  }
}
</script>