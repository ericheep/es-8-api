<template>
  <div>
    <canvas @click='mouseSelectSample' id='editor'></canvas>
  </div>
</template>

<script>
import { debounce } from 'debounce'
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
  computed: {
    ...mapGetters([
      'selectedArea',
      'samplesShown',
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
    handleResizeEvent: debounce(event => {
      this.fullHeight = document.documentElement.clientHeight
      this.fullWidth = document.documentElement.clientWidth

      // this.redrawEditor()
    }, 200),
    redrawEditor: () => {
      this.scope.activate()
      if (this.frequenciesLayer != null) {
        this.frequenciesLayer.remove()
      }
      this.frequenciesLayer = new this.scope.Layer()

      const index = this.selectedArea.scopedIndex + this.selectedArea.startIndex
      this.selectSample(index)

      // drawFrequencies(this.selectedArea, this.frequencyResponse, this.scope, this.fullHeight, this.fullWidth)
    },
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

        const index = this.selectedArea.scopedIndex + this.selectedArea.startIndex
        this.selectSample(index)

        const params = {
          selectedArea: s,
          frequencyResponse: this.frequencyResponse,
          scope: this.scope,
          width: this.width,
          height: this.height,
        }
        console.log(params)
        drawFrequencies(params)
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
  beforeDestroy: () => {
    window.removeEventListener('resize', this.handleResizeEvent)
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
