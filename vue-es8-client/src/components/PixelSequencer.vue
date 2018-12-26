<template>
  <div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PixelSequencer',
  data: () => ({
    bpm: ''
  }),
  computed: {
  },
  methods: {
    ...mapActions([
      'changeTempo'
    ]),
  },
}
</script>

<style scoped>
</style>
