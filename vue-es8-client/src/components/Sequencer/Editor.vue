<template>
  <div>
    <canvas @click='mouseSelectSample' id='editor' resize></canvas>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapGetters, mapActions } from 'vuex'
import drawEditorWindow from '../../paper/drawEditorWindow.js'
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
    scope: null,
    frequenciesLayer: null,
    editorWindowLayer: null,
    selectedSampleLayer: null,
    primedSampleLayer: null,
    width: null,
    height: null,
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
    renewLayer: function(scope, layer) {
      if (layer != null) {
        layer.remove()
      }
      return new scope.Layer()
    },
    updateFrequencies: function() {
      this.scope.activate()
      this.frequenciesLayer = this.renewLayer(this.scope, this.frequenciesLayer)

      const params = {
        selectedArea: this.selectedArea,
        frequencyResponse: this.frequencyResponse,
        width: this.width,
        height: this.height,
      }

      drawFrequencies(params, this.scope)
    },
    updateEditorWindow: function() {
      this.scope.activate()
      this.editorWindowLayer = this.renewLayer(this.scope, this.editorWindowLayer)

      const params = {
        samplesShown: this.samplesShown,
        width: this.width,
        height: this.height,
      }

      drawEditorWindow(params, this.scope)
    },
    updateSelectedSample: function() {
      this.scope.activate()
      this.primedSampleLayer = this.renewLayer(this.scope, this.primedSampleLayer)
      this.selectedSampleLayer = this.renewLayer(this.scope, this.selectedSampleLayer)

      const params = {
        selectedSample: this.selectedSample,
        selectedArea: this.selectedArea,
        width: this.width,
        height: this.height,
      }

      drawSelectedSample(params, this.scope)
    },
    updatePrimedSample: function() {
      this.scope.activate()
      this.primedSampleLayer = this.renewLayer(this.scope, this.primedSampleLayer)

      const params = {
        primedSample: this.primedSample,
        frequencyResponse: this.frequencyResponse,
        selectedArea: this.selectedArea,
        width: this.width,
        height: this.height,
      }

      drawPrimedSample(params, this.scope)
    },
    handleResizeEvent: debounce(function(event) {
      this.width = document.getElementById('editor').clientWidth
      this.height = document.getElementById('editor').clientHeight

      this.updateEditorWindow()
      this.updateFrequencies()
      this.updateSelectedSample()
      this.updatePrimedSample()
    }, 100),
  },
  watch: {
    samplesShown: {
      handler(s) {
        this.updateEditorWindow()
      }
    },
    selectedArea: {
      handler(s) {
        const index = this.selectedArea.scopedIndex + this.selectedArea.startIndex
        this.selectSample(index)

        this.updateFrequencies()
      },
      deep: true
    },
    selectedSample: {
      handler(s) {
        this.updateSelectedSample()
      },
      deep: true
    },
    primedSample: {
      handler(s) {
        this.updatePrimedSample()
      },
      deep: true,
    }
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResizeEvent)
  },
  mounted() {
    window.addEventListener('resize', this.handleResizeEvent)

    this.width = document.getElementById('editor').clientWidth
    this.height = document.getElementById('editor').clientHeight

    this.scope = new this.paper.PaperScope()
    this.scope.setup('editor')
  },
}
</script>

<style scoped>
#editor {
  min-height: 355px;
  max-height: 355px;
  width: 100%;
}
</style>
