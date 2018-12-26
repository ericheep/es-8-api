<template>
  <div>
    BPM:
    <input v-model="bpm" placeholder="120" v-on:change="changeTempo(bpm)">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Tempo',
  data: () => ({
    bpm: ''
  }),
  computed: {
    tempo() {
      return this.$store.state.tempo
    },
  },
  methods: {
    ...mapActions([
      'changeTempo'
    ]),
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
