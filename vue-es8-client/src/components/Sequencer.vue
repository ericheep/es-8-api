<template>
  <div id="sequencer">
    <EditWindow/>
    <GuideWindow/>
  </div>
</template>

<script>
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
  height: 400px;
}
</style>
