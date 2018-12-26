import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    tempo: '',
    isConnected: '',
  },

  getters: {
  },

  mutations: {
    changeTempo(state, payload) {
      state.tempo = payload
    },
    SOCKET_STATE(state, payload) {
      state.tempo = payload.tempo
    },
    SOCKET_TEMPO(state, payload) {
      state.tempo = payload
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },

  actions: {
    changeTempo(state, payload) {
      this._vm.$socket.emit('tempo', payload)
    },
  }
})
