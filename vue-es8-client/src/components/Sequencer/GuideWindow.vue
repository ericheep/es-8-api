<template>
  <div>
    <canvas @click='selectAreaPosition' id='guideWindow'></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paper from 'paper'

const frequencyToPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

const drawGuide = (freqs) => {
  const div = document.getElementById('guideWindow')
  const width = div.clientWidth
  const height = div.clientHeight
  const frequencyResponse = [38.0, 24000.0]

  const pitches = freqs.map(frequencyToPitch)
  const pitchResponse = frequencyResponse.map(frequencyToPitch)
  const range = pitchResponse[1] - pitchResponse[0]
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 2

  for (var i = 0; i < width; i++) {
    const pitchRect = new paper.Path.Rectangle({
      size: [1, scale],
      center: [i, scale * pitches[i]],
    })
    pitchRect.fillColor = 'gray'
  }
}

const drawSelectedArea = (s) => {
  const div = document.getElementById('guideWindow')
  const height = div.clientHeight
  const width = div.clientWidth

  const selectedAreaRect = new paper.Path.Rectangle({
    size: [s.width, height - 2],
    center: [s.position * width, height * 0.5],
    dashArray: [2, 2],
  })
  selectedAreaRect.strokeColor = 'gray'
}

export default {
  name: 'GuideWindow',
  data: () => {
    return {
      guideLayer: null,
      selectedAreaLayer: null,
    }
  },
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
    averagedFreqs: (f) => {
      if (this.guideLayer != null) {
        this.guideLayer.remove()
      }
      this.guideLayer = new paper.Layer()
      drawGuide(f)
    },
    selectedArea: {
      handler(s) {
        if (this.selectedAreaLayer != null) {
          this.selectedAreaLayer.remove()
        }
        this.selectedAreaLayer = new paper.Layer()
        drawSelectedArea(s)
      },
      deep: true
    },
  },
  mounted() {
    paper.install(window)
    window.onload = () => {
      paper.setup('guideWindow')

      this.guideLayer = new paper.Layer()
      this.selectedAreaLayer = new paper.Layer()
    }
  }
}
</script>

<style scoped>
#guideWindow {
  width: 100%;
  height: 100px;
}
</style>
