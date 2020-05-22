<template>
  <div>
    <canvas @click='mouseSelect' id='editor'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import drawEditorWindow from '../../paper/drawEditorWindow.js'
import drawFrequencies from '../../paper/drawFrequencies.js'
import drawPrimedSample from '../../paper/drawPrimedSample.js'
import drawSelectedIndex from '../../paper/drawSelectedIndex.js'

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
    width: null,
    height: null,
  }),
  computed: {
    ...mapGetters([
      'config',
      'mouseIndex',
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
      'mouseSelect',
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
        samplesShown: this.samplesShown,
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
    updateSelectedIndex: function() {
      this.scope.activate()
      this.mouseIndexLayer = this.renewLayer(this.scope, this.mouseIndexLayer)

      const params = {
        mouseIndex: this.mouseIndex,
        samplesShown: this.samplesShown,
        width: this.width,
        height: this.height,
      }

      drawSelectedIndex(params, this.scope)
    },
    updatePrimedSample: function() {
      this.scope.activate()
      this.primedSampleLayer = this.renewLayer(this.scope, this.primedSampleLayer)

      const params = {
        primedSample: this.primedSample,
        pitchResponse: this.pitchResponse,
        mouseIndex: this.mouseIndex,
        width: this.width,
        height: this.height,
        samplesShown: this.samplesShown,
      }

      drawPrimedSample(params, this.scope)
    },
  },
  watch: {
    samplesShown: {
      handler() {
        this.updateEditorWindow()
      }
    },
    selectedArea: {
      handler() {
        this.updateFrequencies()

        const index = this.mouseIndex + this.selectedArea.startIndex
        this.selectSample(index)
      },
      deep: true
    },
    selectedSample: {
      handler() {
        // this.updateSelectedSample()
      },
      deep: true
    },
    primedSample: {
      handler() {
        this.updatePrimedSample()
      },
      deep: true,
    },
    mouseIndex: {
      handler() {
        this.updateSelectedIndex()
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
