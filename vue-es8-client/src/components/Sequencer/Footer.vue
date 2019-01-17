<template>
  <div id="footer">
    <div id="more-info">
      <div>
        <a href="http://www.ericheep.com">me</a>
      </div>
      <div>
        <a href="https://github.com/ericheep/es-8-api">code</a>
      </div>
      <div>
        Edits: 14
      </div>
      <div>
        Centroid: 440.0hz, A4 +00
      </div>
      <div>
        Server Uptime: {{ uptime }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters([
      'uptime',
    ]),
  },
}
</script>

<style scoped>
#footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  height: 100%;
  width: 100%;
}
#more-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
