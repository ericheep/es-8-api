<template>
  <div id="footer">
    <div>
      <a href="http://www.ericheep.com">me</a>
    </div>
    <div>
      <a href="https://github.com/ericheep/es-8-api">code</a>
    </div>
    <div>
      Edits: {{ edits }}
    </div>
    <div>
      Average: {{ averageFrequency.toFixed(3) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters([
      'edits',
      'averageFrequency',
    ]),
  },
}
</script>

<style scoped>
#footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  padding-bottom: 15px;
}
</style>
