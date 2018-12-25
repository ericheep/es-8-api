import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    tempo: '',
  },

  getters: {
  },

  mutations: {
    changeTempo(state, payload) {
      state.tempo = payload
    },
    // vue-socket.io
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },

  actions: {
    changeTempo ({ dispatch, commit }, payload) {
      commit('changeTempo', payload)
      dispatch('updateClient')
    },
  }
})
