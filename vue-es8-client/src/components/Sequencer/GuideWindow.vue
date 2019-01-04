<template>
  <div>
    <canvas @click='mouseSelectArea' id='guideWindow'></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import drawGuideWindow from '../../paper/drawGuideWindow.js'
import drawSelectedArea from '../../paper/drawSelectedArea.js'

export default {
  name: 'GuideWindow',
  props: {
    paper: {
      type: Object,
      default: () => {
        return null
      }
    },
  },
  data: () => ({
    guideLayer: null,
    selectedAreaLayer: null,
    scope: null,
  }),
  computed: {
    ...mapGetters([
      'guideFrequencies',
      'selectedArea',
      'sequenceLength',
    ]),
  },
  methods: {
    ...mapActions([
      'mouseSelectArea',
    ]),
  },
  watch: {
    guideFrequencies: {
      handler(f) {
        this.scope.activate()

        if (this.guideLayer != null) {
          this.guideLayer.remove()
        }

        this.guideLayer = new this.scope.Layer()
        drawGuideWindow(f, this.scope)
      }
    },
    selectedArea: {
      handler(selectedArea) {
        this.scope.activate()

        if (this.selectedAreaLayer != null) {
          this.selectedAreaLayer.remove()
        }

        this.selectedAreaLayer = new this.scope.Layer()
        drawSelectedArea(selectedArea, this.sequenceLength, this.scope)
      },
      deep: true
    },
  },
  mounted() {
    this.scope = new this.paper.PaperScope()
    this.scope.setup('guideWindow')
  }
}
</script>

<style scoped>
#guideWindow, div {
  width: 100%;
  height: 100px;
}
</style>
