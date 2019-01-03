<template>
  <div id="controlWindow">
    <div id="left">
      {{ selectedAreaStartIndex }} - {{ selectedAreaEndIndex }}
    </div>
    <div id="right">
      {{ selectedSample }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ControlWindow',
  computed: {
    ...mapGetters([
      'selectedAreaStartIndex',
      'selectedAreaEndIndex',
      'selectedSample',
    ]),
  },
  methods: {
  },
}
</script>

<style scoped>
#controlWindow {
  width: 100%;
  height: 50px;
}
</style>
