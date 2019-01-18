<template>
  <div id="sample-info">
    Modified by 242.142.132.041 on {{ dateTime() }}
    {{ formatSelectedPitchAndFreq() }}
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
    formatSelectedPitchAndFreq() {
      return formatPitchAndFreq(this.selectedSample)
    },
    dateTime() {
      return this.selectedSample.dateTime
    },
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
