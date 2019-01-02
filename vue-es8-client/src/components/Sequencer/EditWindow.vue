<template>
  <div>
    <canvas @click='selectSample' id='editWindow'></canvas>
  </div>
</template>

<script>
import paper from 'paper'
import { mapGetters, mapActions } from 'vuex'
import drawEditWindow from '../../paper/drawEditWindow.js'

export default {
  name: 'EditWindow',
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
      'selectSample',
    ]),
  },
  watch: {
    selectedArea: {
      handler(s) {
        drawEditWindow(s, this.scope)
      },
      deep: true
    }
  },
  mounted() {
    this.scope.setup('editWindow')
  }
}
</script>

<style scoped>
#editWindow {
  width: 100%;
  height: 300px;
}
</style>
