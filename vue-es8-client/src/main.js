import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client'
import App from './App.vue'
import { store } from './store/store'

// export const SocketInstance = socketio('http://localhost:4113'

// Vue.use(VueSocketIO, SocketInstance)
Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
