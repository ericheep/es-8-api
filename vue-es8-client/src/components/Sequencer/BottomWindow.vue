<template>
  <div id="bottom-window">
    Modified by 242.142.132.041 on 01/01/2019
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BottomWindow',
  computed: {
    ...mapGetters([
      'selectedSample',
    ]),
  },
}
</script>

<style scoped>
#bottom-window {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
}
</style>
