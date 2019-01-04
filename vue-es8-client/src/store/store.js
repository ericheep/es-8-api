import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isConnected: '',
    sequencer: {
      samples: [],
      length: 0,
      frequencyResponse: [38.0, 24000.0],
      width: 300,
      samplesShown: 35,
    },
    selectedSample: {
      index: 0,
      offsetIndex: 0,
      freq: 0,
    },
    selectedArea: {
      samples: [],
      startIndex: 0,
      endIndex: 0,
    },
  },
  getters: {
    samplesShown: state => {
      return state.sequencer.samplesShown
    },
    sequenceLength: state => {
      return state.sequencer.samples.length
    },
    selectedArea: state => {
      return state.selectedArea
    },
    selectedAreaStartIndex: state => {
      return state.selectedArea.startIndex
    },
    selectedAreaEndIndex: state => {
      return state.selectedArea.endIndex
    },
    selectedSample: state => {
      return state.selectedSample
    },
    selectedSampleIndex: state => {
      return state.selectedSample.index
    },
    averagedFreqs: (state, getters) => {
      if (state.sequencer.length > 0) {
        const N = Math.floor(state.sequencer.length / state.sequencer.width)
        const reducer = (acc, curr) => acc + curr

        const averagedFreqs = []
        const freqs = state.sequencer.samples.map((elem) => elem['freq'])

        for (var i = 0; i < state.sequencer.width; i++) {
          const slice = freqs.slice(i * N, (i + 1) * N)
          averagedFreqs[i] = slice.reduce(reducer) / slice.length
        }

        return averagedFreqs
      }
    }
  },
  mutations: {
    selectArea(state, selectedArea) {
      state.selectedArea = selectedArea
    },
    selectSample(state, sample) {
      state.selectedSample = sample
    },
    selectSampleOffsetIndex(state, offsetIndex) {
      state.selectedSample = {
        ...state.selectedSample,
        offsetIndex
      }
    },
    updateSequencerWidth(state, width) {
      state.sequencer = {
        ...state.sequencer.width,
        width
      }
    },

    // socket mutations
    SOCKET_UPDATE_SEQUENCER(state, sequencer) {
      state.sequencer = {
        ...state.sequencer,
        ...sequencer,
        length: sequencer.samples.length
      }
    },
    SOCKET_UPDATE_SAMPLE(state, sample) {
      state.sequencer.samples[sample.index] = sample
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
    mouseSelectArea({ state, dispatch, commit }, mouse) {
      const position = mouse.x / state.sequencer.width
      const middleIndex = Math.floor(position * state.sequencer.length)
      const startIndex = middleIndex - Math.floor(state.sequencer.samplesShown / 2)
      const endIndex = startIndex + state.sequencer.samplesShown
      const samples = state.sequencer.samples.slice(startIndex, endIndex)
      const selectedArea = {
        startIndex,
        endIndex,
        samples,
      }
      commit('selectArea', selectedArea)
      dispatch('selectSample', middleIndex)
    },
    mouseSelectSample({ dispatch, commit, state }, mouse) {
      const position = mouse.clientX / state.sequencer.width
      const offsetIndex = Math.floor(position * state.sequencer.samplesShown)
      commit('selectSampleOffsetIndex', offsetIndex)

      const index = state.selectedArea.startIndex + offsetIndex
      dispatch('selectSample', index)
    },
    selectSample({ state, commit }, index) {
      const freq = state.sequencer.samples[index].freq
      commit('selectSample', {
        index,
        freq,
        offsetIndex: state.selectedArea.offsetIndex,
      })
    },

    // socket actions
    updateSample(state, sample) {
      this._vm.$socket.emit('updateSample', sample)
    },
  }
})
