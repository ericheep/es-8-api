import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    sequence: [],
    freqs: [],
    frequencyResponse: [],
    isConnected: '',
    sequencerWidth: '',
  },
  getters: {
    sequence: state => {
      return state.sequence
    },
    freqs: state => {
      return state.sequence.map((elem) => elem['freq'])
    },
    sequenceLength: state => {
      return state.sequence.length
    },
    averagedFreqs: (state, getters) => {
      if (state.sequence.length > 0 && state.sequencerWidth > 0) {
        const N = Math.floor(getters.sequenceLength / state.sequencerWidth)
        const averagedFreqs = []
        const reducer = (acc, curr) => acc + curr

        for (var i = 0; i < state.sequencerWidth; i++) {
          const slice = getters.freqs.slice(i * N, (i + 1) * N)
          averagedFreqs[i] = slice.reduce(reducer) / slice.length
        }

        return averagedFreqs
      }
    }
  },
  mutations: {
    changeSequencerWidth(state, payload) {
      state.sequencerWidth = payload
    },
    SOCKET_STATE(state, payload) {
      state.sequence = payload.sequence
      state.frequencyResponse = payload.frequencyResponse
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
    changeSequencerWidth({ state, commit }, payload) {
      commit('changeSequencerWidth', payload)
    },
    changeSequence(state, payload) {
      this._vm.$socket.emit('changeSequence', payload)
    },
    changeView(state, payload) {
      this._vm.$socket.emit('changeView', payload)
    },
  }
})
