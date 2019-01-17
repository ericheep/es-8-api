<template>
  <div id="sequencer">
    <Controls/>
    <Editor v-bind:paper="paper"/>
    <Transport v-bind:paper="paper"/>
    <SampleInfo/>
    <Footer/>
  </div>
</template>

<script>
import paper from 'paper'

import Controls from './Sequencer/Controls.vue'
import Editor from './Sequencer/Editor.vue'
import Transport from './Sequencer/Transport.vue'
import SampleInfo from './Sequencer/SampleInfo.vue'
import Footer from './Sequencer/Footer.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Sequencer',
  components: {
    Controls,
    Editor,
    Transport,
    SampleInfo,
    Footer,
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
  display: flex;
  flex-direction: column;
  padding: 0px 10px 0px 0px;
  min-width: 740px;
  width: 100%;
  height: 100%;
}
</style>
