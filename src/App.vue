<template>
  <div id="app">
    <Info/>
    <Sequencer/>
    <Footer/>
  </div>
</template>

<script>
import Info from './components/Info.vue'
import Sequencer from './components/Sequencer.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Info,
    Sequencer,
    Footer,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Inconsolata|Nova+Mono');
html, body, #app {
  margin: 0px;
  border: none;
  height: 100%;
}
div {
  margin: 0px;
  border: none;
}
#app {
  font-family: 'Inconsolata', monospace;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  color: #2c3e50;
  min-width: 760px;
  max-width: 760px;

  margin-left: auto;
  margin-right: auto;

  padding-left: 30px;
  padding-right: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
