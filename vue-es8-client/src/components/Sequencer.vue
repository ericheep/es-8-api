<template>
  <div>
    <canvas id='sequencer'></canvas>
    <!-- <resize-observer @notify="handleResize"/> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import paper from 'paper'

export default {
  name: 'Sequencer',
  data: () => ({
    bpm: ''
  }),
  computed: {
  },
  methods: {
    // handleResize() {
    //   drawSequencer()
    // },
    ...mapActions([
      'changeSequencer'
    ]),
  },
  mounted() {
    drawSequencer()
  }
}

const drawSequencer = () => {
  /* eslint-disable no-undef */
  paper.install(window)
  paper.setup(document.getElementById('sequencer'))

  const w = window.innerWidth
  const h = window.innerHeight

  var rect = new Rectangle(0, 0, w, h)
  rect.fillColor = 'black'
}
</script>

<style scoped>
</style>
