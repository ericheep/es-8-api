<template>
  <div id="sequencer">
    <EditWindow v-bind:paper='editPaper'/>
    <GuideWindow v-bind:paper='guidePaper'/>
  </div>
</template>

<script>
import paper from 'paper'

import EditWindow from './Sequencer/EditWindow.vue'
import GuideWindow from './Sequencer/GuideWindow.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sequencer',
  components: {
    EditWindow,
    GuideWindow,
  },
  computed: {
    ...mapGetters([
      'averagedSequence'
    ]),
    guidePaper: () => {
      return new paper.PaperScope()
    },
    editPaper: () => {
      return new paper.PaperScope()
    },
  },
  methods: {
    ...mapActions([
      'updateSequencerWidth'
    ]),
  },
  mounted() {
    const div = document.getElementById('sequencer')
    this.updateSequencerWidth(div.clientWidth)
  }
}
</script>

<style scoped>
#sequencer {
  width: 100%;
  height: 300px;
}
</style>
