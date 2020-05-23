<template>
  <div id="sample-info">
    {{ formatSampleInfo() }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValid, parseISO, formatDistance } from 'date-fns'
import { formatPitchAndFrequency } from '../../helpers'

export default {
  name: 'SampleInfo',
  computed: {
    ...mapGetters([
      'selectedSample',
    ]),
  },
  methods: {
    formatSampleInfo() {
      const sampleTime = parseISO(this.selectedSample.time)
      if (this.selectedSample.frequency !== null && isValid(sampleTime)) {
        return 'Modified from ' +
          this.selectedSample.origin +
          ', ' +
          formatDistance(sampleTime, new Date()) +
          ' ago, to ' +
          formatPitchAndFrequency(this.selectedSample)
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
