import Vue from 'vue'
import Vuex from 'vuex'

import { frequencyToPitch, frequencyToMIDIPitch, MIDIPitchToFrequency, pitchToFrequency } from '../helpers.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isConnected: '',
    server: {
      uptime: '00:00:00',
    },
    sequencer: {
      length: 0,
      width: 0,
      samplesShown: 0,
      frequencyResponse: 0,
    },
    selectedSample: {
      index: 0,
      freq: 0,
      pitch: {
        pitchClass: '',
        octave: 0,
        cents: '',
      },
    },
    primedSample: {
      index: 0,
      freq: 0,
      pitch: {
        pitchClass: '',
        octave: 0,
        cents: '',
      },
    },
    selectedArea: {
      samples: [],
      startIndex: 0,
      endIndex: 0,
      scopedIndex: 0,
    },
    transport: {
      frequencies: [],
    },
  },
  getters: {
    uptime: state => {
      return state.server.uptime
    },
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
    transportFrequencies: state => {
      return state.transport.frequencies
    },
    frequencyResponse: state => {
      return state.sequencer.frequencyResponse
    },
    primedSampleFrequency: state => {
      return state.primedSample.freq
    },
    primedSamplePitch: state => {
      return state.primedSample.pitch
    },
    primedSample: state => {
      return state.primedSample
    },
  },
  actions: {
    leftArrowClick({ state, commit, dispatch }, event) {
      let startIndex = state.selectedArea.startIndex - state.sequencer.samplesShown
      let endIndex = state.selectedArea.endIndex - state.sequencer.samplesShown

      if (startIndex <= 0) {
        startIndex = 0
        endIndex = startIndex + state.sequencer.samplesShown
      }

      commit('UPDATE_SELECTED_AREA', { startIndex, endIndex })
      dispatch('emitSelectedArea', { startIndex, endIndex })
    },
    rightArrowClick({ state, commit, dispatch }, event) {
      let startIndex = state.selectedArea.startIndex + state.sequencer.samplesShown
      let endIndex = state.selectedArea.endIndex + state.sequencer.samplesShown

      if (endIndex >= state.sequencer.length) {
        startIndex = state.sequencer.length - state.sequencer.samplesShown
        endIndex = state.sequencer.length
      }

      commit('UPDATE_SELECTED_AREA', { startIndex, endIndex })
      dispatch('emitSelectedArea', { startIndex, endIndex })
    },
    updatePrimedSampleFrequency({ state, commit }, event) {
      const isValid = RegExp(/^-?\d+\.?\d*$/).test(event.target.value)
      if (isValid) {
        commit('UPDATE_PRIMED_SAMPLE_FREQUENCY', parseFloat(event.target.value))
      }
    },
    updatePrimedSamplePitch({ state, commit }, pitch) {
      commit('UPDATE_PRIMED_SAMPLE_PITCH', pitch)
    },
    updatePrimedSamplePitchClass({ state, commit }, event) {
      const pitch = {
        pitchClass: event.target.value,
        octave: state.primedSample.pitch.octave,
        cents: state.primedSample.pitch.cents,
      }

      commit('UPDATE_PRIMED_SAMPLE_PITCH', pitch)
    },
    updatePrimedSampleOctave({ state, commit }, event) {
      const isValid = RegExp(/^\d+$/).test(event.target.value)

      if (isValid) {
        const pitch = {
          pitchClass: state.primedSample.pitch.pitchClass,
          octave: event.target.value,
          cents: state.primedSample.pitch.cents,
        }
        commit('UPDATE_PRIMED_SAMPLE_PITCH', pitch)
      }
    },
    updatePrimedSampleCents({ state, commit }, event) {
      const isValid = RegExp(/^-?\d+\.?\d*$/).test(event.target.value)

      if (isValid) {
        const pitch = {
          pitchClass: state.primedSample.pitch.pitchClass,
          octave: state.primedSample.pitch.octave,
          cents: event.target.value,
        }
        commit('UPDATE_PRIMED_SAMPLE_PITCH', pitch)
      }
    },
    updateSequencerWidth({ state, commit, dispatch }, width) {
      commit('UPDATE_SEQUENCER_WIDTH', width)
      dispatch('emitTransportFrequencies', width)
    },
    mouseSelectArea({ state, dispatch, commit }, mouse) {
      const width = mouse.originalTarget.clientWidth
      const scopedIndex = state.selectedSample.index - state.selectedArea.startIndex

      const x = mouse.layerX - mouse.originalTarget.offsetLeft
      const position = x / width
      let middleIndex = Math.floor(position * state.sequencer.length)
      let startIndex = middleIndex - Math.floor(state.sequencer.samplesShown / 2)
      let endIndex = startIndex + state.sequencer.samplesShown

      if (startIndex < 0) {
        startIndex = 0
        endIndex = startIndex + state.sequencer.samplesShown
      }

      if (endIndex >= state.sequencer.length) {
        startIndex = state.sequencer.length - state.sequencer.samplesShown
        endIndex = state.sequencer.length
      }
      commit('UPDATE_SELECTED_AREA', { startIndex, endIndex, scopedIndex })
      dispatch('emitSelectedArea', { startIndex, endIndex })
    },
    mouseSelectSample({ dispatch, commit, state }, mouse) {
      const height = mouse.originalTarget.clientHeight
      const width = mouse.originalTarget.clientWidth

      const pos = (mouse.layerY - mouse.originalTarget.offsetTop) / height
      const [pitchLo, pitchHi] = state.sequencer.frequencyResponse.map(frequencyToMIDIPitch)
      const range = pitchHi - pitchLo
      const pitch = (range - pos * range) + pitchLo
      const freq = MIDIPitchToFrequency(pitch)
      commit('UPDATE_PRIMED_SAMPLE_FREQUENCY', freq)

      const x = mouse.layerX - mouse.originalTarget.offsetLeft
      const position = x / width
      const offsetIndex = Math.floor(position * state.sequencer.samplesShown)
      const index = state.selectedArea.startIndex + offsetIndex

      dispatch('selectSample', index)
    },
    selectSample({ state, commit }, index) {
      if (state.selectedArea.samples.length > 0) {
        const samples = state.selectedArea.samples
        const startIndex = state.selectedArea.startIndex
        const endIndex = samples[samples.length - 1].index
        console.log(state.selectedArea.startIndex, startIndex)

        if (index >= startIndex && index <= endIndex) {
          const freq = state.selectedArea.samples.find((el) => el.index === index).freq
          commit('UPDATE_SELECTED_SAMPLE', { index, freq })
        }
      }
    },
    // socket actions
    emitSelectedArea(state, selectedArea) {
      this._vm.$socket.emit('emitSelectedArea', selectedArea)
    },
    emitTransportFrequencies(state, width) {
      this._vm.$socket.emit('emitTransportFrequencies', width)
    },
    emitUpdateSample({ state, commit }, sample) {
      this._vm.$socket.emit('emitUpdateSample', state.primedSample)
    },
  },
  mutations: {
    UPDATE_SELECTED_AREA(state, selectedArea) {
      state.selectedArea = {
        ...state.selectedArea,
        ...selectedArea,
      }
    },
    UPDATE_SELECTED_SAMPLE(state, { index, freq }) {
      state.selectedSample = {
        freq: freq,
        index: index,
        pitch: frequencyToPitch(freq),
      }
      state.primedSample.index = index
    },
    UPDATE_PRIMED_SAMPLE_FREQUENCY(state, freq) {
      state.primedSample = {
        freq: freq,
        pitch: frequencyToPitch(freq),
        index: state.selectedSample.index,
      }
    },
    UPDATE_PRIMED_SAMPLE_PITCH(state, pitch) {
      state.primedSample.pitch = pitch
      state.primedSample.freq = pitchToFrequency(pitch)
    },
    UPDATE_SEQUENCER_WIDTH(state, width) {
      state.sequencer.width = width
    },
    SOCKET_INITIALIZE_SEQUENCER(state, sequencer) {
      state.sequencer = {
        ...state.sequencer,
        ...sequencer,
      }
    },
    SOCKET_INITIALIZE_SELECTED_AREA(state, selectedArea) {
      state.selectedArea = {
        ...state.selectedArea,
        ...selectedArea,
      }
    },
    SOCKET_UPDATE_SELECTED_AREA_SAMPLES(state, samples) {
      state.selectedArea.samples = samples
    },
    SOCKET_UPDATE_TRANSPORT_FREQUENCIES(state, frequencies) {
      state.transport.frequencies = frequencies
    },
    SOCKET_UPDATE_UPTIME(state, uptime) {
      state.server.uptime = uptime
    },
    SOCKET_UPDATE_SAMPLE(state, sample) {
      const samples = state.selectedArea.samples
      const index = samples.findIndex((s) => s.index === sample.index)

      samples[index] = {
        freq: sample.freq,
        index: sample.index,
      }

      state.selectedArea.samples = samples
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },
})
