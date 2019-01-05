<template>
  <div>
    <canvas @click='mouseSelectSample' id='editWindow'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import drawEditWindow from '../../paper/drawEditWindow.js'
import drawFrequencies from '../../paper/drawFrequencies.js'
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
    frequenciesLayer: null,
    sampleLayer: null,
    scope: null,
  }),
  computed: {
    ...mapGetters([
      'samplesShown',
      'selectedArea',
      'selectedSample',
      'frequencyResponse',
    ]),
  },
  methods: {
    ...mapActions([
      'selectSample',
      'mouseSelectSample',
    ]),
  },
  watch: {
    samplesShown: {
      handler(s) {
        this.scope.activate()
        drawEditWindow(s, this.scope)
      }
    },
    selectedArea: {
      handler(s) {
        this.scope.activate()
        if (this.frequenciesLayer != null) {
          this.frequenciesLayer.remove()
        }
        this.frequenciesLayer = new this.scope.Layer()

        const index = Math.floor((s.startIndex + s.endIndex) / 2)
        this.selectSample(index)

        drawFrequencies(s, this.frequencyResponse, this.scope)
      },
      deep: true
    },
    selectedSample: {
      handler(s) {
        this.scope.activate()
        if (this.sampleLayer != null) {
          this.sampleLayer.remove()
        }
        this.sampleLayer = new this.scope.Layer()
        drawSelectedSample(s, this.selectedArea, this.scope)
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
