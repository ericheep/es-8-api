<template>
  <div id="app">
    <Tempo bpm="120.0"/>
  </div>
</template>

<script>
import Tempo from './components/Tempo.vue'

export default {
  name: 'app',
  components: {
    Tempo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
