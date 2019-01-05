<template>
  <div id="controlWindow">
    <div id="left">
      {{ selectedAreaStartIndex }} - {{ selectedAreaEndIndex }}
    </div>
    <div id="center">
      <div>
        Sample: {{ selectedSample.index }}
        Freq: {{ selectedSample.freq.toFixed(2) }}
        Pitch: {{ pitch }}
      </div>
      <div>Modified by 242.142.132.041 on 01/01/2019</div>
    </div>
    <div id="right">
      <div>Frequency</div>
      <div>Pitch</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ControlWindow',
  computed: {
    ...mapGetters([
      'selectedAreaStartIndex',
      'selectedAreaEndIndex',
      'selectedSample',
    ]),
    pitch: function() {
      const pitch = this.selectedSample.pitch.latin
      const octave = this.selectedSample.pitch.octave
      let cents = Math.round(this.selectedSample.pitch.cents)
      if (cents >= 0) {
        cents = '+' + cents
      }
      return pitch + octave + ' ' + cents
    }
  }
}
</script>

<style scoped>
#controlWindow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 50px;
}
#left {
  text-align: left;
}
#center {
  text-align: center;
}
#right {
  text-align: right;
}
</style>
