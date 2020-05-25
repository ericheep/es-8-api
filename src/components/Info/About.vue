<template>
  <div id="about">
    <p>
      This is a sequencer that controls my analog synth. There is control loop that runs at a rate of once per second at a sample rate of 44100hz.
    </p>
    <p>
      This interface allows you to modify one of those samples; just one, One out of 44100. You can fill in an empty slot or overwrite an existing slot. You're free to choose any frequency, but if you want that sample to be heard I wouldn't choose below 38hz or above 15khz.
    </p>
    <p>
      Once you commit a sample, your IP will be logged and you'll be unable to edit another (well, for some of you, hint hint).
    </p>
    <p>
      It'd be cool if you could come over and hear it, but you know -- quarantine, sorry.
    </p>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
#about {
  width: 95%;
  margin-right: 5%;
}
</style>
