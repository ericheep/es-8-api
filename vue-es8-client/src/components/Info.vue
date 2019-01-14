<template>
  <div id="info">
    <About/>
    <YouTube/>
  </div>
</template>

<script>
import About from './Info/About.vue'
import YouTube from './Info/YouTube.vue'

export default {
  name: 'Info',
  components: {
    About,
    YouTube,
  },
}
</script>

<style scoped>
#info {
  display: flex;
  flex-direction: row;
}
</style>
