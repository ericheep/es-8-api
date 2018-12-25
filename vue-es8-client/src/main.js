import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import { store } from './store/store'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
