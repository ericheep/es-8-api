<template>
  <div id="app">
    <Info/>
    <Sequencer/>
  </div>
</template>

<script>
import Info from './components/Info.vue'
import Sequencer from './components/Sequencer.vue'

export default {
  name: 'app',
  components: {
    Info,
    Sequencer,
  }
}
</script>

<style>
html, body, #app {
  margin: 0px;
  border: none;
}
div {
  margin: 0px;
  border: none;
}
#app {
  font-family: 'Inconsolata', monospace;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  color: #2c3e50;

  margin: 15px;

  display: flex;
  flex-direction: row;
}
</style>
