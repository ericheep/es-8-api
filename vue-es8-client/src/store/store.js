import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isConnected: '',
    sequencer: {
      length: 0,
      width: 300,
      samplesShown: 35,
      frequencyResponse: [38.0, 24000.0],
    },
    selectedSample: {
      index: 0,
      freq: 0,
    },
    selectedArea: {
      samples: [],
      startIndex: 0,
      endIndex: 0,
    },
    guide: {
      frequencies: [],
    },
  },
  getters: {
    samplesShown: state => {
      return state.sequencer.samplesShown
    },
    sequenceLength: state => {
      return state.sequencer.length
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
    guideFrequencies: state => {
      return state.guide.frequencies
    }
  },
  mutations: {
    selectArea(state, selectedArea) {
      state.selectedArea = {
        ...state.selectedArea,
        ...selectedArea,
      }
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
      }
    },
    SOCKET_UPDATE_SELECTED_AREA_SAMPLES(state, samples) {
      state.selectedArea.samples = samples
    },
    SOCKET_UPDATE_GUIDE_FREQUENCIES(state, frequencies) {
      state.guide.frequencies = frequencies
    },
    SOCKET_UPDATE_SAMPLE(state, sample) {
      // state.sequencer.samples[sample.index] = sample
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },
  actions: {
    updateSequencerWidth({ state, commit, dispatch }, width) {
      commit('updateSequencerWidth', width)
      dispatch('emitGuideFrequencies', width)
    },
    mouseSelectArea({ state, dispatch, commit }, mouse) {
      const position = mouse.x / state.sequencer.width
      let middleIndex = Math.floor(position * state.sequencer.length)
      let startIndex = middleIndex - Math.floor(state.sequencer.samplesShown / 2)
      let endIndex = startIndex + state.sequencer.samplesShown

      if (startIndex < 0) {
        startIndex = 0
        middleIndex = Math.floor(state.sequencer.samplesShown / 2)
        endIndex = startIndex + state.sequencer.samplesShown
      }

      if (endIndex >= state.sequencer.length) {
        startIndex = state.sequencer.length - state.sequencer.samplesShown
        middleIndex = state.sequencer.length - Math.floor(state.sequencer.samplesShown / 2)
        endIndex = state.sequencer.length
      }

      commit('selectArea', { startIndex, endIndex })
      dispatch('emitSelectedArea', { startIndex, endIndex })
    },
    mouseSelectSample({ dispatch, commit, state }, mouse) {
      const position = mouse.clientX / state.sequencer.width
      const offsetIndex = Math.floor(position * state.sequencer.samplesShown)
      const index = state.selectedArea.startIndex + offsetIndex
      dispatch('selectSample', index)
    },
    selectSample({ state, commit }, index) {
      if (state.selectedArea.samples.length > 0) {
        const samples = state.selectedArea.samples
        const startIndex = samples[0].index
        const endIndex = samples[samples.length - 1].index

        if (index > startIndex && index < endIndex) {
          const freq = state.selectedArea.samples.find((el) => el.index === index).freq

          commit('selectSample', {
            index,
            freq,
          })
        }
      }
    },

    // socket actions
    updateSample(state, sample) {
      this._vm.$socket.emit('updateSample', sample)
    },
    emitSelectedArea(state, selectedArea) {
      this._vm.$socket.emit('emitSelectedArea', selectedArea)
    },
    emitGuideFrequencies(state, width) {
      this._vm.$socket.emit('emitGuideFrequencies', width)
    },
  }
})
