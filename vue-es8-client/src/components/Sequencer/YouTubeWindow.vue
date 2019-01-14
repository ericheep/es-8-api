<template>
  <div id="youtube-window">
    <youtube video-id="j1eD_yUFfwk"/>
  </div>
</template>

<script>
export default {
  name: 'YouTubeWindow',
  data: () => ({
    playerVars: {
      autoplay: 1
    },
  }),
}
</script>

<style scoped>
#youtube-window {
  margin-top: 5px;
}
</style>
