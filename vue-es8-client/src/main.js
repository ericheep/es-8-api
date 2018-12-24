import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import App from './App.vue'

export const SocketInstance = socketio('http://localhost:4113');

Vue.use(VueSocketIO, SocketInstance)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
