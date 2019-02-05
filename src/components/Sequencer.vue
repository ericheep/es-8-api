<template>
  <div id="sequencer">
    <Controls/>
    <Editor v-bind:paper="paper"/>
    <Transport v-bind:paper="paper"/>
    <SampleInfo/>
  </div>
</template>

<script>
import paper from 'paper'

import Controls from './Sequencer/Controls.vue'
import Editor from './Sequencer/Editor.vue'
import Transport from './Sequencer/Transport.vue'
import SampleInfo from './Sequencer/SampleInfo.vue'

export default {
  name: 'Sequencer',
  components: {
    Controls,
    Editor,
    Transport,
    SampleInfo,
  },
  computed: {
    paper: function() {
      return paper
    }
  },
}
</script>

<style scoped>
#sequencer {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
