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

      const div = document.getElementById('sequencer')
      const w = div.clientWidth
      const h = div.clientHeight

      const path = new Path.Rectangle(0, 0, w, h)
      path.strokeColor = 'black'
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
