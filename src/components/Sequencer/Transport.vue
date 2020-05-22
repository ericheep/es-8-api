<template>
  <div>
    <canvas @click='mouseSelectArea' id='transport'></canvas>
  </div>
</template>

<script>
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
  },
  watch: {
    transportRanges: {
      handler() {
        this.updateTransportWindow()
      }
    },
    selectedArea: {
      handler() {
        this.updateSelectedArea()
      },
      deep: true
    },
  },
  mounted() {
    this.width = document.getElementById('transport').clientWidth
    this.height = document.getElementById('transport').clientHeight

    this.scope = new this.paper.PaperScope()
    this.scope.setup('transport')
  }
}
</script>

<style scoped>
#transport, div {
  width: 100%;
  height: 100px;
  min-height: 45px;
  max-height: 45px;
}
</style>
