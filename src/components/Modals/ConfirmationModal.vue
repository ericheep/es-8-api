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
          <p>
            Are you sure that you want to set sample at index {{ primedSample.index }}
            {{ formatSelectedPitchAndFrequency() }}  to
            {{ formatPrimedPitchAndFrequency() }}?
          </p>
          <p>
            I mean, it's not a big deal, I'm just double checking.
          </p>
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
            @click="commit"
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
import { formatPitchAndFrequency } from '../../helpers'

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
      'emitCommitPrimedSample',
    ]),
    formatSelectedPitchAndFrequency() {
      if (this.selectedSample.frequency) {
        return 'from ' + formatPitchAndFrequency(this.selectedSample)
      } else {
        return ''
      }
    },
    formatPrimedPitchAndFrequency() {
      return formatPitchAndFrequency(this.primedSample)
    },
    commit() {
      this.emitCommitPrimedSample()
      this.$emit('close')
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
  background-color: pink;
  color: white;
}
.modal-button:active {
  padding: 8px 13px 6px;
}
a {
  color: pink;
}
</style>
