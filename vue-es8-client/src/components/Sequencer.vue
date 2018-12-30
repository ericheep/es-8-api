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
      'changeView'
    ]),
  },
}
</script>

<style scoped>
#sequencer {
  width: 100%;
  height: 300px;
}
</style>
