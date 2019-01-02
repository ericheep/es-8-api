<template>
  <div>
    <canvas @click='selectAreaPosition' id='guideWindow'></canvas>
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
      default: function () {
        return null
      },
    },
  },
  data: () => ({
    guideLayer: null,
    selectedAreaLayer: null,
  }),
  computed: {
    ...mapGetters([
      'averagedFreqs',
      'selectedArea',
    ]),
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
        this.guideLayer = new this.paper.Layer()
        drawGuideWindow(f, this.paper)
      }
    },
    selectedArea: {
      handler(s) {
        if (this.selectedAreaLayer != null) {
          this.selectedAreaLayer.remove()
        }

        this.selectedAreaLayer = new this.paper.Layer()
        drawSelectedArea(s, this.paper)
      },
      deep: true
    },
  },
  mounted() {
    this.paper.setup('guideWindow')
  }
}
</script>

<style scoped>
#guideWindow {
  width: 100%;
  height: 100px;
}
</style>
