import Vue from 'vue'
// import socketio from 'socket.io-client'
import App from './App.vue'
import { store } from './store/store'

// import VueSocketIO from 'vue-socket.io'

// Vue.use(VueSocketIO, 'http://localhost:3128')
Vue.config.productionTip = false

new Vue({
  // sockets: {
  //   connect: function() {
  //     console.log('connected')
  //   },
  //   customEmit: function() {
  //     console.log('emit')
  //   },
  // },
  store: store,
  render: h => h(App),
}).$mount('#app')
