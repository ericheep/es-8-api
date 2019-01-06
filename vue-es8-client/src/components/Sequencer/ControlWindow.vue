<template>
  <div id="controlWindow">
    <div id="left">
      <div id="top-center">
      <div class="left-items">
        Modified by 242.142.132.041 on 01/01/2019
      </div>
      </div>
        <div class="left-items">
          Sample: {{ selectedSample.index }}
        </div>
    </div>

    <div id="right">
      <div class="right-items">
        <div>Frequency:
          <input
            v-model="frequencyInput"
            @input="updatePrimedSampleFrequency"
            style="width:65px"
            placeholder="hz"
          >
        </div>
      </div>
      <div class="right-items">
        <div class="input-right">Pitch:
          <select v-model="pitchInput" @change="updatePrimedSamplePitchClass">
            <option>A</option> <option>Bb</option> <option>B</option> <option>C</option>
            <option>Db</option> <option>D</option> <option>Eb</option> <option>E</option>
            <option>F</option> <option>F#</option> <option>G</option> <option>Ab</option>
          </select>
        </div>
        <div class="input-right">Octave:
          <input v-model="octaveInput" style="width:24px" @input="updatePrimedSampleOctave">
        </div>
        <div class="input-right">Cents:
          <input v-model="centsInput" style="width:24px" @input="updatePrimedSampleCents">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ControlWindow',
  data: () => ({
    frequencyInput: 0,
    pitchInput: 0,
    octaveInput: 0,
    centsInput: 0,
  }),
  computed: {
    ...mapGetters([
      'selectedAreaStartIndex',
      'selectedAreaEndIndex',
      'selectedSample',
      'primedSampleFrequency',
      'primedSamplePitch',
      'primedSample',
    ]),
  },
  methods: {
    ...mapActions([
      'updatePrimedSampleFrequency',
      'updatePrimedSamplePitch',
      'updatePrimedSamplePitchClass',
      'updatePrimedSampleOctave',
      'updatePrimedSampleCents',
    ]),
  },
  watch: {
    primedSampleFrequency: {
      handler(s) {
        this.pitchInput = this.primedSample.pitch.pitchClass
        this.octaveInput = this.primedSample.pitch.octave
        this.centsInput = Math.round(this.primedSample.pitch.cents)
      }
    },
    primedSamplePitch: {
      handler(s) {
        this.frequencyInput = this.primedSample.freq
      }
    },
    selectedSample: {
      handler(s) {
        this.frequencyInput = s.freq
        this.pitchInput = s.pitch.pitchClass
        this.octaveInput = s.pitch.octave
        this.centsInput = Math.round(s.pitch.cents)

        this.updatePrimedSamplePitch({
          pitchClass: this.pitchInput,
          octave: this.octaveInput,
          cents: this.centsInput,
        })
      },
      deep: true
    },
  },
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
