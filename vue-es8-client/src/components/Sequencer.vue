<template>
  <div id="sequencer">
    <ControlWindow/>
    <EditWindow v-bind:paper="paper"/>
    <GuideWindow v-bind:paper="paper"/>
    <BottomWindow/>
    <YouTubeWindow/>
  </div>
</template>

<script>
import paper from 'paper'

import ControlWindow from './Sequencer/ControlWindow.vue'
import EditWindow from './Sequencer/EditWindow.vue'
import GuideWindow from './Sequencer/GuideWindow.vue'
import BottomWindow from './Sequencer/BottomWindow.vue'
import YouTubeWindow from './Sequencer/YouTubeWindow.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Sequencer',
  components: {
    ControlWindow,
    EditWindow,
    GuideWindow,
    BottomWindow,
    YouTubeWindow,
  },
  computed: {
    paper: function() {
      return paper
    }
  },
  methods: {
    ...mapActions([
      'updateSequencerWidth',
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
  width: 90%;
  height: 350px;
  margin-left: 5%;
}
</style>
