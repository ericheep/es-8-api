<template>
  <div id="about">
    <h1>
      <b>hi</b>
    </h1>
    <p>
      Before you is an interface that controls a ChucK script on a Raspberry Pi, which in turn controls an Expert Sleepers ES-8 audio interface, which in turn controls an Intellijel Dixie 2. There is a loop that runs at a rate of once per second at a sample rate of 44100hz.
    </p>
    <p>
      This interface allows you to modify one of those samples, One out of 44100; you can make fill in an empty slot or overwrite an existing sample. Once you do, your IP will be logged and you'll be unable to edit another (well, for most of you, those who know how to change your IP can run wild).
    </p>
    <p>
      You can choose one, or go back to Facebook, or go outside, no judgement, this is a difficult time. We're doing our best. This is just art for the sake of nothing, it's late, I'm going to eat another quesadilla.
    </p>
    <p>
      I didn't build a database for this, once the node script on the Pi gets reset it all goes away. So don't think too hard about this, we have enough to worry about.
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
