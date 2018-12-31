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
    guideWidth: '',
    view: 'pitches',
  },
  getters: {
    frequencyResponse: state => {
      return state.frequencyResponse
    },
    sequence: state => {
      return state.sequence
    },
    view: state => {
      return state.view
    },
    freqs: state => {
      return state.sequence.map((elem) => elem['freq'])
    },
    averagedFreqs: (state, getters) => {
      const freqs = getters.freqs
      if (freqs.length > 0 && state.guideWidth > 0) {
        const N = Math.floor(freqs.length / state.guideWidth)
        const reducer = (acc, curr) => acc + curr

        const averagedFreqs = []
        for (var i = 0; i < state.guideWidth; i++) {
          const slice = freqs.slice(i * N, (i + 1) * N)
          averagedFreqs[i] = slice.reduce(reducer) / slice.length
        }

        return averagedFreqs
      }
    }
  },
  mutations: {
    changeGuideWidth(state, payload) {
      state.guideWidth = payload
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
    changeGuideWidth({ state, commit }, payload) {
      commit('changeGuideWidth', payload)
    },
    changeSequence(state, payload) {
      this._vm.$socket.emit('changeSequence', payload)
    },
    changeView(state, payload) {
      this._vm.$socket.emit('changeView', payload)
    },
  }
})
