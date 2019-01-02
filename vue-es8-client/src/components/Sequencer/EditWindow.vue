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
      default: () => {
        return null
      }
    },
  },
  data: () => ({
    scope: null,
  }),
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
        this.scope.activate()
        drawEditWindow(s, this.scope)
      },
      deep: true
    }
  },
  mounted() {
    this.scope = new this.paper.PaperScope()
    this.scope.setup('editWindow')
  }
}
</script>

<style scoped>
#editWindow, div {
  width: 100%;
  height: 300px;
}
</style>
