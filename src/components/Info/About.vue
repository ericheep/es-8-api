<template>
  <div id="about">
    <p>
      This is a sequencer that controls my analog synth. There is control loop that plays each frequency back at a rate of {{ rate }} per frequency, for a total of {{ length }} frequencies.
    </p>
    <p>
      You can fill in an empty slot or overwrite an existing slot. You're free to choose any frequency, but if you want that frequency to be heard I wouldn't choose anything below 38hz or above 15khz.
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

/* const formatFreq = ((freq) => { */
/*   if (freq > 1000) { */

/*   } */
/* }) */

export default {
  name: 'About',
  data: () => ({
    rate: 0,
    length: 0,
    loFreq: 0,
    hiFreq: 0,
  }),
  computed: {
    ...mapGetters([
      'config',
    ]),
  },
  watch: {
    config: {
      handler() {
        this.length = this.config.length
        this.rate = this.config.rate
        this.loFreq = this.config.frequencyResponse[0]
        this.hiFreq = this.config.frequencyResponse[1]

      },
      deep: true
    }
  }
}
</script>

<style scoped>
#about {
  width: 95%;
  margin-right: 5%;
}
</style>
