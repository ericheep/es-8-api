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

      const path = new Path.Rectangle(0, 0, 20, 40)
      path.strokeColor = 'black'
    }
  }
}
</script>

<style scoped>
</style>
