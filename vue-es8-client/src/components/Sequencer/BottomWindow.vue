<template>
  <div id="bottom-window">
    Modified by 242.142.132.041 on 01/01/2019
    {{ formattedSelectedPitch() }} ({{ selectedSample.freq }})
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
  methods: {
    formattedSelectedPitch() {
      const pitchClass = this.selectedSample.pitch.pitchClass
      const octave = this.selectedSample.pitch.octave
      const cents = Math.round(this.selectedSample.pitch.cents)
      let operator = ''
      if (cents >= 0) {
        operator = '+'
      }
      return pitchClass + octave + ' ' + operator + cents
    },
  }
}
</script>

<style scoped>
#bottom-window {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  font-size: 14px;
  margin-top: 5px;
}
</style>
