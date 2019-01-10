<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
        Commit
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
        Are you sure that you want to change sample at index {{ selectedSample.index }}
        from
        {{ formattedSelectedPitch() }} ({{ selectedSample.freq.toFixed(2) }}hz) to
        {{ formattedPrimedPitch() }} ({{ primedSample.freq.toFixed(2) }}hz)
        on {{ dateTime() }} from XXX.XXX.XXX.XXX?
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button
            type="button"
            class="modal-button"
            @click="close"
          >
            No
          </button>
          <button
            type="button"
            class="modal-button"
            @click="emitSampleUpdate"
          >
            Yes
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import format from 'date-fns/format'

export default {
  name: 'ConfirmationModal',
  computed: {
    ...mapGetters([
      'primedSample',
      'selectedSample',
    ]),
  },
  methods: {
    ...mapActions([
      'emitSampleUpdate',
    ]),
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
    formattedPrimedPitch() {
      const pitchClass = this.primedSample.pitch.pitchClass
      const octave = this.primedSample.pitch.octave
      const cents = Math.round(this.primedSample.pitch.cents)
      let operator = '+'
      if (cents < 0) {
        operator = '-'
      }
      return pitchClass + octave + ' ' + operator + cents
    },
    dateTime() {
      return format(new Date(), 'dddd, MMMM Do YYYY, h:mm:ss A')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}
.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: pink;
  justify-content: space-between;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
  width: 700px;
  text-align: center;
}
.modal-button {
  padding: 5px;
  margin-left: 10px;
  margin-top: 3px;
  border: dotted;
  border-width: 1px;
  height: 45px;
  width: 125px;
  background-color: white;
  font: normal 16px inconsolata;
}
.modal-button:hover {
  background-color: black;
  color: white;
}
.modal-button:active {
  padding: 8px 13px 6px;
}
</style>
