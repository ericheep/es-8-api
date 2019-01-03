import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isConnected: '',
    sequence: [],
    freqs: [],
    sequencerWidth: '',
    editWidth: 35,
    selectedSample: {
      index: 0,
    },
    selectedArea: {
      width: 0,
      position: 0,
      samples: [],
    },
  },
  getters: {
    selectedArea: (state, getters) => {
      return state.selectedArea
    },
    selectedAreaStartIndex: state => {
      const length = state.selectedArea.samples.length
      const samples = state.selectedArea.samples
      if (length) {
        return samples[0].index
      } else {
        return 0
      }
    },
    selectedAreaEndIndex: state => {
      const length = state.selectedArea.samples.length
      const samples = state.selectedArea.samples
      if (length) {
        return samples[length - 1].index
      } else {
        return 0
      }
    },
    selectedSampleIndex: state => {
      return state.selectedSample.index
    },
    selectedAreaWidth: state => {
      return state.sequencerWidth / state.sequence.length * state.editWidth
    },
    freqs: state => {
      return state.sequence.map((elem) => elem['freq'])
    },
    averagedFreqs: (state, getters) => {
      const freqs = getters.freqs
      if (freqs.length > 0 && state.sequencerWidth > 0) {
        const N = Math.floor(freqs.length / state.sequencerWidth)
        const reducer = (acc, curr) => acc + curr

        const averagedFreqs = []
        for (var i = 0; i < state.sequencerWidth; i++) {
          const slice = freqs.slice(i * N, (i + 1) * N)
          averagedFreqs[i] = slice.reduce(reducer) / slice.length
        }

        return averagedFreqs
      }
    }
  },
  mutations: {
    selectAreaPosition(state, payload) {
      state.selectedArea.position = payload
    },
    selectAreaSamples(state, payload) {
      state.selectedArea.samples = payload
    },
    selectSample(state, payload) {
      state.selectedSample = payload
    },
    updateSequencerWidth(state, payload) {
      state.sequencerWidth = payload
    },
    SOCKET_STATE(state, payload) {
      state.sequence = payload.sequence
      state.frequencyResponse = payload.frequencyResponse
      state.selectedArea.width = state.sequencerWidth / state.sequence.length * state.editWidth
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
    updateSequencerWidth({ state, commit }, payload) {
      commit('updateSequencerWidth', payload)
    },
    selectAreaPosition({ state, commit }, payload) {
      const position = payload.x / state.sequencerWidth
      commit('selectAreaPosition', position)

      const middleIndex = Math.floor(position * state.sequence.length)
      const firstIndex = middleIndex - Math.floor(state.editWidth / 2)
      commit('selectAreaSamples', state.sequence.slice(firstIndex, firstIndex + state.editWidth))
    },
    selectSample({ state, commit }, payload) {
      const offsetIndex = Math.floor(payload.clientX / state.sequencerWidth * state.editWidth)
      commit('selectSample', state.selectedAreaBeginIndex + offsetIndex)
    },
    changeSequence(state, payload) {
      this._vm.$socket.emit('changeSequence', payload)
    },
    changeView(state, payload) {
      this._vm.$socket.emit('changeView', payload)
    },
  }
})
