<template>
  <div>
    <canvas @click='selectAreaPosition' id='guideWindow'></canvas>
  </div>
</template>

<script>
import paper from 'paper'
import { mapActions, mapGetters } from 'vuex'
import drawGuideWindow from '../../paper/drawGuideWindow.js'
import drawSelectedArea from '../../paper/drawSelectedArea.js'

export default {
  name: 'GuideWindow',
  data: () => ({
    guideLayer: null,
    selectedAreaLayer: null,
  }),
  computed: {
    ...mapGetters([
      'averagedFreqs',
      'selectedArea',
    ]),
    scope: () => {
      return new paper.PaperScope()
    }
  },
  methods: {
    ...mapActions([
      'selectAreaPosition',
    ]),
  },
  watch: {
    averagedFreqs: {
      handler(f) {
        if (this.guideLayer != null) {
          this.guideLayer.remove()
        }
        this.guideLayer = new this.scope.Layer()
        drawGuideWindow(f, this.scope)
      }
    },
    selectedArea: {
      handler(s) {
        if (this.selectedAreaLayer != null) {
          this.selectedAreaLayer.remove()
        }

        this.selectedAreaLayer = new this.scope.Layer()
        drawSelectedArea(s, this.scope)
      },
      deep: true
    },
  },
  mounted() {
    this.scope.setup('guideWindow')
  }
}
</script>

<style scoped>
#guideWindow {
  width: 100%;
  height: 100px;
}
</style>
