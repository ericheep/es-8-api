import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    sequence: '',
    isConnected: '',
  },
  getters: {
    sequence: state => {
      return state.sequence
    },
    sequenceLength: getters => {
      return getters.sequence.length
    }
  },
  mutations: {
    SOCKET_STATE(state, payload) {
      state.sequence = payload.sequence
    },
    SOCKET_CHANGE_SEQUENCE(state, sample) {
      state.sequence[sample.index] = sample
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
    changeSequence(state, payload) {
      this._vm.$socket.emit('changeSequence', payload)
    },
  }
})
