<template>
  <header class="b-header">
    <div class="b-header--wrapper">
      <div class="icon icon-44 icon-location"></div>
      <h2 class="b-header--heading">{{ location }}</h2>
    </div>
    <div>
      <button class="b-header--button icon icon-settings"  @click="showModal = true">
      </button>
    </div>
  </header>
  <Modal :show="showModal" @close="showModal = false" >
    <template #body>
      <Settings />
    </template>
  </Modal>

</template>

<script>
import Modal from "./Modal.vue";
import Settings from "./Settings.vue";
export default {
  name: 'HeaderComponent',
  props: {
    location: {
      type: String,
      default: 'Moscow'
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  components: {
    Settings,
    Modal,
  },
  mounted() {


  },
  methods: {
    changeSettings() {
      alert('click')
    }
  }
}
</script>