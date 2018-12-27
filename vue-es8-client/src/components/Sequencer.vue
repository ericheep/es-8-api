<template>
  <div>
    <canvas id='sequencer'></canvas>
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
    ...mapActions([
      'changeSequencer'
    ]),
  },
  mounted() {
    /* eslint-disable no-undef */
    paper.install(window)

    window.onload = () => {
      paper.setup('sequencer')

      const w = window.innerWidth
      const h = window.innerHeight

      console.log(window)

      const path = new Path.Rectangle(0, 0, w, h)
      path.strokeColor = 'black'

      console.log(w, h)
    }
  }
}
</script>

<style scoped>
</style>
