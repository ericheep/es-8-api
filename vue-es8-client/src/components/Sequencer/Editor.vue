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
    fullHeight: document.documentElement.clientHeight,
    fullWidth: document.documentElement.clientWidth,
  }),
  beforeDestroy: () => {
    window.removeEventListener('resize', this.handleResizeEvent)
  },
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
    handleResizeEvent (event) {
      this.fullHeight = document.documentElement.clientHeight
      this.fullWidth = document.documentElement.clientWidth
    }
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
    window.addEventListener('resize', this.handleResizeEvent)

    this.scope = new this.paper.PaperScope()
    this.scope.setup('editor')
  },
}
</script>

<style scoped>
#editor, div {
}
</style>
