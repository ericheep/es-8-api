import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(VueSocketio, io('http://localhost:3000'), { store })

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
