<template>
  <div id="sample-info">
    {{ formatSampleInfo() }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPitchAndFreq } from '../../helpers'

export default {
  name: 'SampleInfo',
  computed: {
    ...mapGetters([
      'selectedSample',
    ]),
  },
  methods: {
    formatSampleInfo() {
      if (this.selectedSample.freq !== null) {
        return 'Modified by 127.0.0.1 on ' +
        this.selectedSample.dateTime +
        ' ' +
        formatPitchAndFreq(this.selectedSample)
      } else {
        return 'Unmodified sample.'
      }
    }
  }
}
</script>

<style scoped>
#sample-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  font-size: 14px;
  margin-top: 5px;
  padding-bottom: 10px;
}
</style>
