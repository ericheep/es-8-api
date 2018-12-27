<template>
  <div>
    <canvas id='sequencer'></canvas>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paper from 'paper'

const frequencyToPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

export default {
  name: 'Sequencer',
  data: () => ({
    bpm: ''
  }),
  computed: {
    ...mapGetters([
      'sequence',
      'sequenceLength',
    ]),
  },
  methods: {
    ...mapActions([
      'changeSequence'
    ]),
  },
  mounted() {
    paper.install(window)

    window.onload = () => {
      paper.setup('sequencer')
    }
  },
  updated() {
    const freqRange = [1.0, 24000.0]
    frequencyToPitch(freqRange[0])

    const sequence = this.$store.getters['sequence']
    const sequenceLength = this.$store.getters['sequence']

    const div = document.getElementById('sequencer')
    const width = div.clientWidth
    const height = div.clientHeight

    const path = new paper.Path.Rectangle(0, 0, width, height)
    path.strokeColor = 'black'
  }
}
</script>

<style scoped>
#sequencer {
  width: 100%;
  height: 300px;
}
</style>
