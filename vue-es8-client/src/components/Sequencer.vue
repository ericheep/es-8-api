<template>
  <div id="sequencer">
    <ControlWindow/>
    <EditWindow v-bind:paper="paper"/>
    <GuideWindow v-bind:paper="paper"/>
  </div>
</template>

<script>
import paper from 'paper'

import ControlWindow from './Sequencer/ControlWindow.vue'
import EditWindow from './Sequencer/EditWindow.vue'
import GuideWindow from './Sequencer/GuideWindow.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sequencer',
  components: {
    ControlWindow,
    EditWindow,
    GuideWindow,
  },
  computed: {
    ...mapGetters([
      'averagedSequence'
    ]),
    paper: function() {
      return paper
    }
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
  height: 500px;
}
</style>
