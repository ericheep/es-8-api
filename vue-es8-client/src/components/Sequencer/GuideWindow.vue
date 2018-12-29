<template>
  <div>
    <canvas id='sequencer'></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paper from 'paper'

// const frequencyToPitch = (freq) => {
//   return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
// }

const drawSequencer = (sequence) => {
  const div = document.getElementById('sequencer')
  const width = div.clientWidth
  const height = div.clientHeight

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'black'
}

export default {
  name: 'Sequencer',
  computed: {
    ...mapGetters([
      'averagedSequence'
    ]),
  },
  methods: {
    ...mapActions([
      'changeView'
    ]),
  },
  watch: {
    averagedSequence: (s) => {
      drawSequencer(s)
    }
  },
  mounted() {
    paper.install(window)
    window.onload = () => {
      paper.setup('sequencer')
    }
  }
}
</script>

<style scoped>
#sequencer {
  width: 100%;
  height: 300px;
}
</style>
