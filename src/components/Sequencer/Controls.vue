<template>
  <div id="controls">
    <ConfirmationModal
      v-show="isModalVisible"
      @close="closeConfirmationModal"
    />
    <div id="left-side">
        <div class="left-items">
          <button class="arrow-button" @click="leftArrowClick">
            &larr;
          </button>
          <button class="arrow-button" @click="rightArrowClick">
            &rarr;
          </button>
        </div>
        <div class="flex-column">
          <div>
            Index: {{ primedSample.index }}
          </div>
          <div>
            Selected Range: {{ startIndex }} - {{ endIndex }}
          </div>
        </div>
    </div>
    <div id="right-side">
      <div class="flex-column">
        <div class="right-items">
          <div>Frequency:
            <input
              v-model="frequencyInput"
              @input="updatePrimedSampleFrequency"
              type="number"
              step="0.0000000000000001"
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
      <div>
        <button class="commit-button" @click="showConfirmationModal">Commit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConfirmationModal from '../Modals/ConfirmationModal'

export default {
  name: 'Controls',
  components: {
    ConfirmationModal,
  },
  data: () => ({
    frequencyInput: 0,
    pitchInput: 0,
    octaveInput: 0,
    centsInput: 0,
    startIndex: 0,
    endIndex: 0,
    isModalVisible: false,
  }),
  computed: {
    ...mapGetters([
      'selectedArea',
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
      'showConfirmationModal',
      'leftArrowClick',
      'rightArrowClick',
      'commit',
    ]),
    showConfirmationModal() {
      this.isModalVisible = true
    },
    closeConfirmationModal() {
      this.isModalVisible = false
    },
  },
  watch: {
    primedSampleFrequency: {
      handler() {
        this.pitchInput = this.primedSample.pitch.pitchClass
        this.octaveInput = this.primedSample.pitch.octave
        this.centsInput = Math.round(this.primedSample.pitch.cents)
      }
    },
    primedSamplePitch: {
      handler() {
        this.frequencyInput = this.primedSample.frequency
      }
    },
    selectedArea: {
      handler() {
        this.startIndex = this.selectedArea.startIndex
        this.endIndex = this.selectedArea.endIndex
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  font-size: 14px;

  margin-bottom: 5px;

  height: 55px;
  min-height: 55px;
  max-height: 55px;
}
#left-side {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
#right-side {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
button {
  border: dotted;
  border-width: 1px;
  background-color: white;
  font: normal 16px inconsolata;
}
button:hover {
  background-color: pink;
  color: white;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.commit-button {
  margin-left: 10px;
  height: 100%;
  width: 110px;
}
.left-items {
  justify-content: flex-start;
  text-align: left;
  margin-right: 5px;
}
.right-items {
  justify-content: flex-end;
  text-align: right;
}
.left-items, .right-items {
  display: flex;
  flex-direction: row;
}
.input-right {
  margin-left: 15px;
}
.arrow-button {
  text-align: center;
  width: 40px;
  height: 100%;
  margin-right: 6px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
