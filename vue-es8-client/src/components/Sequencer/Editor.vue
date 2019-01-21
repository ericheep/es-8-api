<template>
  <div>
    <canvas @click='mouseSelectSample' id='editor'></canvas>
  </div>
</template>

<script>
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
      'scopedIndex',
      'selectedArea',
      'samplesShown',
      'selectedSample',
      'primedSample',
      'pitchResponse',
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
        pitchResponse: this.pitchResponse,
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
        pitchResponse: this.pitchResponse,
        selectedArea: this.selectedArea,
        scopedIndex: this.scopedIndex,
        width: this.width,
        height: this.height,
      }

      drawPrimedSample(params, this.scope)
    },
  },
  watch: {
    samplesShown: {
      handler(s) {
        this.updateEditorWindow()
      }
    },
    selectedArea: {
      handler(s) {
        this.updateFrequencies()

        const index = this.scopedIndex + this.selectedArea.startIndex
        this.selectSample(index)
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
  mounted() {
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
