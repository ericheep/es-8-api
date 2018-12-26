import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

Vue.config.productionTip = false
Vue.use(VueSocketio, io('http://localhost:3000'), { store })

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
