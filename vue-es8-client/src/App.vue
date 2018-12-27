<template>
  <div id="app">
    <Topbar/>
    <Sequencer/>
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue'
import Sequencer from './components/Sequencer.vue'

export default {
  name: 'app',
  components: {
    Topbar,
    Sequencer,
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0px;
  border: none;
}
div {
  margin: 0px;
  border: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  color: #2c3e50;
}
</style>
