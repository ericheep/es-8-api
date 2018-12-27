<template>
  <div id="app">
    <Topbar id="topbar"/>
    <Sequencer id="sequencer"/>
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
* {
  border-style: dashed;
}
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
  display: flex;
  flex-direction: column;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: #2c3e50;
}
#topbar {
  min-height: 200px;
  width: 100%;
  border-style: dotted;
}
#sequencer {
  min-height: 100%;
  width: 100%;
  border-style: dotted;
}
</style>
