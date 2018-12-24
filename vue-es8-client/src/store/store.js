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
  },

  actions: {
    changeTempo ({ dispatch, commit }, payload) {
      commit('changeTempo', payload)
      dispatch('updateClient')
    },
  }
})
