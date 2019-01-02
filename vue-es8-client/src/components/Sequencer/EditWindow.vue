<template>
  <div>
    <canvas @click='selectSample' id='editWindow'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import drawEditWindow from '../../paper/drawEditWindow.js'

export default {
  name: 'EditWindow',
  props: {
    paper: {
      type: Object,
      default: function () {
        return null
      },
    },
  },
  computed: {
    ...mapGetters([
      'averagedFreqs',
      'selectedArea',
    ]),
  },
  methods: {
    ...mapActions([
      'selectSample',
    ]),
  },
  watch: {
    selectedArea: {
      handler(s) {
        drawEditWindow(s, this.paper)
      },
      deep: true
    }
  },
  mounted() {
    // this.paper.setup('editWindow')
  }
}
</script>

<style scoped>
#editWindow {
  width: 100%;
  height: 400;
}
</style>
