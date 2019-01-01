<template>
  <div>
    <canvas @click='selectSample' id='editWindow'></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import paper from 'paper'

const frequencyToPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

const drawEditWindow = (partialSequence) => {
  const div = document.getElementById('editWindow')
  const width = div.clientWidth
  const height = div.clientHeight
  const frequencyResponse = [38.0, 24000.0]

  const pitchResponse = frequencyResponse.map(frequencyToPitch)
  const range = pitchResponse[1] - pitchResponse[0]
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 2
  // console.log(width, height)

  // for (var i = 0; i < width; i++) {
  //   const pitchRect = new paper.Path.Rectangle({
  //     size: [1, scale],
  //     center: [i, scale * pitches[i]],
  //   })
  //   pitchRect.fillColor = 'gray'
  // }
}

export default {
  name: 'EditWindow',
  computed: {
    ...mapGetters([
      'averagedFreqs',
      'selectedArea',
    ]),
  },
  methods: {
    ...mapActions([
      'selectSample',
    ]),
  },
  watch: {
    selectedArea: {
      handler(s) {
        drawEditWindow(s)
      },
      deep: true
    }
  },
  mounted() {
    paper.install(window)
    window.onload = () => {
      paper.setup('editWindow')
    }
  }
}
</script>

<style scoped>
#editWindow {
  width: 100%;
  height: 400;
}
</style>
