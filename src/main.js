import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io-extended'
import VueYoutube from 'vue-youtube'
import io from 'socket.io-client'
import { store } from './store/store'

Vue.config.productionTip = false

Vue.use(VueSocketio, io('http://127.0.0.1:8081'), { store })
// Vue.use(VueSocketio, io('http://174.56.50.77:8081'), { store })
Vue.use(VueYoutube)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
