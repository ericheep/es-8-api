<template>
  <div id="youTube">
    <youtube video-id="j1eD_yUFfwk"/>
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  data: () => ({
    playerVars: {
      autoplay: 1
    },
  }),
}
</script>

<style scoped>
#youTube {

}
</style>
