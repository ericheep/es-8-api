<template>
  <div>
    <canvas @click='mouseSelectSample' id='editor'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import drawEditWindow from '../../paper/drawEditWindow.js'
import drawFrequencies from '../../paper/drawFrequencies.js'
import drawSelectedSample from '../../paper/drawSelectedSample.js'
import drawPrimedSample from '../../paper/drawPrimedSample.js'

export default {
  name: 'Editor',
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
    primedLayer: null,
    scope: null,
  }),
  computed: {
    ...mapGetters([
      'samplesShown',
      'selectedArea',
      'selectedSample',
      'primedSample',
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
        console.log('selectedArea')

        this.scope.activate()
        if (this.frequenciesLayer != null) {
          this.frequenciesLayer.remove()
        }
        this.frequenciesLayer = new this.scope.Layer()

        const index = s.scopedIndex + s.startIndex
        this.selectSample(index)

        drawFrequencies(s, this.frequencyResponse, this.scope)
      },
      deep: true
    },
    selectedSample: {
      handler(s) {
        this.scope.activate()
        if (this.primedLayer != null) {
          this.primedLayer.remove()
        }
        if (this.sampleLayer != null) {
          this.sampleLayer.remove()
        }
        this.sampleLayer = new this.scope.Layer()
        drawSelectedSample(s, this.selectedArea, this.scope)
      },
      deep: true
    },
    primedSample: {
      handler(s) {
        this.scope.activate()
        if (this.primedLayer != null) {
          this.primedLayer.remove()
        }
        this.primedLayer = new this.scope.Layer()
        drawPrimedSample(s, this.frequencyResponse, this.selectedArea, this.scope)
      },
      deep: true,
    }
  },
  mounted() {
    this.scope = new this.paper.PaperScope()
    this.scope.setup('editor')
  }
}
</script>

<style scoped>
#editor, div {
  width: 100%;
}
</style>
