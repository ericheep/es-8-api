<template>
  <div id="controlWindow">
    <div id="left">
      <div id="top-center">
        <div class="left-items">
          Sample: {{ selectedSample.index }}
        </div>
        <div class="left-items">
          Frequency: {{ selectedSample.freq.toFixed(2) }}
        </div>
        <div class="left-items">
          Pitch: {{ pitch }}
        </div>
      </div>
      <div class="left-items">
        Modified by 242.142.132.041 on 01/01/2019
      </div>
    </div>

    <div id="right">
      <div class="right-items">
        <div>Frequency:
          <input v-model="message" style="width:65px" placeholder="hz">
        </div>
      </div>
      <div class="right-items">
        <div class="input-right">Pitch:
          <select v-model="selected">
            <option>A</option>
            <option>Bb</option>
            <option>B</option>
            <option>C</option>
            <option>Db</option>
            <option>D</option>
            <option>Eb</option>
            <option>E</option>
            <option>F</option>
            <option>F#</option>
            <option>G</option>
            <option>Ab</option>
          </select>
        </div>
        <div class="input-right">Octave:
          <input v-model="message" style="width:24px">
        </div>
        <div class="input-right">Cents:
          <input v-model="message" style="width:24px">
        </div>
      </div>
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
}
#center {
  /*width: 45%;*/
  text-align: center;
}
#top-center {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.left-items {
  justify-content: flex-start;
  text-align: left;
  margin-right: 15px;
}
.right-items {
  justify-content: flex-end;
  text-align: right;
}
.left-items, .right-items {
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
  margin-top: 3px;
}
.input-right {
  margin-left: 15px;
}
</style>
