<template>
  <div id="youTube">
    <youtube video-id="j1eD_yUFfwk" width="380" height="213"/>
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
  margin-left: 5px;
}
</style>
