<template>
  <div>
    <canvas @click='selectSample' id='editWindow'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import drawEditWindow from '../../paper/drawEditWindow.js'
import drawSelectedSample from '../../paper/drawSelectedSample.js'

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
    editLayer: null,
    scope: null,
  }),
  computed: {
    ...mapGetters([
      'averagedFreqs',
      'selectedArea',
      'selectedSample',
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

        if (this.editLayer != null) {
          this.editLayer.remove()
        }

        this.editLayer = new this.scope.Layer()
        drawEditWindow(s, this.scope)
      },
      deep: true
    },
    selectedSample: {
      handler(s) {
        console.log('watch selected sample')
        this.scope.activate()
        if (this.sampleLayer != null) {
          this.sampleLayer.remove()
        }
        this.sampleLayer = new this.scope.Layer()
        drawSelectedSample(s, this.scope)
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
