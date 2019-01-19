<template>
  <div>
    <canvas @click='mouseSelectArea' id='transport' resize></canvas>
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapActions, mapGetters } from 'vuex'
import drawTransportWindow from '../../paper/drawTransportWindow.js'
import drawSelectedArea from '../../paper/drawSelectedArea.js'

export default {
  name: 'Transport',
  props: {
    paper: {
      type: Object,
      default: () => {
        return null
      }
    },
  },
  data: () => ({
    transportWindowLayer: null,
    selectedAreaLayer: null,
    scope: null,
  }),
  computed: {
    ...mapGetters([
      'transportRanges',
      'selectedArea',
      'sequenceLength',
      'frequencyResponse',
    ]),
  },
  methods: {
    ...mapActions([
      'mouseSelectArea',
      'updateSequencerWidth',
    ]),
    renewLayer: function(scope, layer) {
      if (layer != null) {
        layer.remove()
      }
      return new scope.Layer()
    },
    updateTransportWindow: function() {
      this.scope.activate()
      this.transportWindowLayer = this.renewLayer(this.scope, this.transportWindowLayer)

      const params = {
        transportRanges: this.transportRanges,
        frequencyResponse: this.frequencyResponse,
        width: this.width,
        height: this.height,
      }

      if (this.frequencyResponse !== 0) drawTransportWindow(params, this.scope)
    },
    updateSelectedArea: function() {
      this.scope.activate()
      this.selectedAreaLayer = this.renewLayer(this.scope, this.selectedAreaLayer)

      const params = {
        selectedArea: this.selectedArea,
        sequenceLength: this.sequenceLength,
        width: this.width,
        height: this.height,
      }

      drawSelectedArea(params, this.scope)
    },
    handleResizeEvent: debounce(function(event) {
      this.width = document.getElementById('transport').clientWidth
      this.height = document.getElementById('transport').clientHeight

      this.updateTransportWindow()
      this.updateSelectedArea()
    }, 50),
  },
  watch: {
    transportRanges: {
      handler(f) {
        this.updateTransportWindow()
      }
    },
    selectedArea: {
      handler(selectedArea) {
        this.updateSelectedArea()
      },
      deep: true
    },
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResizeEvent)
  },
  mounted() {
    window.addEventListener('resize', this.handleResizeEvent)

    console.log(document.getElementById('transport'))

    this.width = document.getElementById('transport').clientWidth
    this.height = document.getElementById('transport').clientHeight
    this.updateSequencerWidth(this.width)

    this.scope = new this.paper.PaperScope()
    this.scope.setup('transport')
  }
}
</script>

<style scoped>
#transport, div {
  width: 100%;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
}
</style>
