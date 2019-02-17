import Vue from 'vue'
import Vuex from 'vuex'

import { frequencyToPitch, frequencyToMIDIPitch, MIDIPitchToFrequency, pitchToFrequency } from '../helpers.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isConnected: '',
    config: {
      length: 0,
      samplesShown: 0,
      frequencyResponse: 0,
      pitchResponse: 0,
      mouseIndex: 0,
    },
    selectedSample: {
      index: 0,
      frequency: 0,
      pitch: {
        pitchClass: '',
        octave: 0,
        cents: '',
      },
      dateTime: '00/00/00',
      comment: '',
    },
    primedSample: {
      index: 0,
      frequency: 0,
      pitch: {
        pitchClass: '',
        octave: 0,
        cents: '',
      },
      dateTime: '00/00/00',
      comment: '',
    },
    selectedArea: {
      samples: [],
      startIndex: 0,
      endIndex: 0,
    },
    transport: {
      ranges: [],
    },
  },
  getters: {
    config: state => {
      return state.config
    },
    samplesShown: state => {
      return state.config.samplesShown
    },
    sequenceLength: state => {
      return state.config.length
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
    transportRanges: state => {
      return state.transport.ranges
    },
    frequencyResponse: state => {
      return state.config.frequencyResponse
    },
    pitchResponse: state => {
      return state.config.pitchResponse
    },
    primedSampleFrequency: state => {
      return state.primedSample.frequency
    },
    primedSamplePitch: state => {
      return state.primedSample.pitch
    },
    primedSample: state => {
      return state.primedSample
    },
    mouseIndex: state => {
      return state.config.mouseIndex
    },
  },
  actions: {
    leftArrowClick({ state, commit, dispatch }, event) {
      if (state.selectedArea.startIndex !== 0) {
        let startIndex = state.selectedArea.startIndex - state.config.samplesShown
        let endIndex = state.selectedArea.endIndex - state.config.samplesShown

        if (startIndex <= 0) {
          startIndex = 0
          endIndex = startIndex + state.config.samplesShown
        }

        dispatch('emitSelectedArea', {
          startIndex,
          endIndex,
        })
      }
    },
    rightArrowClick({ state, commit, dispatch }, event) {
      if (state.selectedArea.endIndex !== state.config.length) {
        let startIndex = state.selectedArea.startIndex + state.config.samplesShown
        let endIndex = state.selectedArea.endIndex + state.config.samplesShown

        if (endIndex >= state.config.length) {
          startIndex = state.config.length - state.config.samplesShown
          endIndex = state.config.length
        }

        dispatch('emitSelectedArea', {
          startIndex,
          endIndex,
        })
      }
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
    mouseSelectArea({ state, dispatch, commit }, mouse) {
      const width = mouse.originalTarget.clientWidth
      const mouseIndex = state.selectedSample.index - state.selectedArea.startIndex

      const x = mouse.layerX - mouse.originalTarget.offsetLeft
      const position = x / width
      let middleIndex = Math.floor(position * state.config.length)
      let startIndex = middleIndex - Math.floor(state.config.samplesShown / 2)
      let endIndex = startIndex + state.config.samplesShown

      if (startIndex < 0) {
        startIndex = 0
        endIndex = startIndex + state.config.samplesShown
      }

      if (endIndex >= state.config.length) {
        startIndex = state.config.length - state.config.samplesShown
        endIndex = state.config.length
      }

      dispatch('emitSelectedArea', { startIndex, endIndex, mouseIndex })
    },
    mouseSelect({ dispatch, commit, state }, mouse) {
      dispatch('mouseSelectIndex', mouse)
      dispatch('mouseSelectFrequency', mouse)
    },
    mouseSelectIndex({ dispatch, commit, state }, mouse) {
      const width = mouse.originalTarget.clientWidth
      const x = mouse.layerX - mouse.originalTarget.offsetLeft
      const xPosition = x / width
      const mouseIndex = Math.floor(xPosition * state.config.samplesShown)

      dispatch('updateMouseIndex', mouseIndex)

      const index = mouseIndex + state.selectedArea.startIndex
      commit('UPDATE_PRIMED_SAMPLE_INDEX', index)

      dispatch('selectSample', index)
    },
    mouseSelectFrequency({ dispatch, commit, state }, mouse) {
      const height = mouse.originalTarget.clientHeight
      const yPosition = (mouse.layerY - mouse.originalTarget.offsetTop) / height

      const [pitchLo, pitchHi] = state.config.pitchResponse
      const range = pitchHi - pitchLo
      const pitch = (range - yPosition * range) + pitchLo
      const frequency = MIDIPitchToFrequency(pitch)

      commit('UPDATE_PRIMED_SAMPLE_FREQUENCY', frequency)
    },
    updateMouseIndex({ state, commit }, mouseIndex) {
      commit('UPDATE_MOUSE_INDEX', mouseIndex)
    },
    selectSample({ state, commit }, index) {
      commit('UPDATE_SELECTED_SAMPLE', index)
    },
    // socket actions
    emitSelectedArea({ state }, selectedArea) {
      this._vm.$socket.emit('emitSelectedArea', selectedArea)
    },
    emitCommitPrimedSample({ state, commit }, dateTime) {
      commit('UPDATE_PRIMED_SAMPLE_DATE_TIME', dateTime)
      this._vm.$socket.emit('emitCommitPrimedSample', state.primedSample)
    },
  },
  mutations: {
    UPDATE_SELECTED_SAMPLE(state, index) {
      const sample = state.selectedArea.samples.find((el) => el.index === index)

      if (sample) {
        state.selectedSample.frequency = sample.frequency
        state.selectedSample.pitch = frequencyToPitch(sample.frequency)
        state.selectedSample.index = index
        state.selectedSample.dateTime = sample.dateTime
      } else {
        state.selectedSample.frequency = null
        state.selectedSample.pitch = null
        state.selectedSample.index = null
        state.selectedSample.dateTime = null
      }
    },
    UPDATE_PRIMED_SAMPLE_FREQUENCY(state, frequency) {
      state.primedSample = {
        ...state.primedSample,
        frequency: frequency,
        pitch: frequencyToPitch(frequency),
      }
    },
    UPDATE_PRIMED_SAMPLE_INDEX(state, index) {
      state.primedSample.index = index
    },
    UPDATE_PRIMED_SAMPLE_PITCH(state, pitch) {
      state.primedSample.pitch = pitch
      state.primedSample.frequency = pitchToFrequency(pitch)
    },
    UPDATE_MOUSE_INDEX(state, mouseIndex) {
      state.config.mouseIndex = mouseIndex
    },
    SOCKET_INITIALIZE_CONFIG(state, config) {
      state.config = {
        ...state.config,
        ...config,
        pitchResponse: config.frequencyResponse.map(frequencyToMIDIPitch),
      }
    },
    SOCKET_UPDATE_SELECTED_AREA(state, selectedArea) {
      state.selectedArea = selectedArea
      console.log(selectedArea)
    },
    SOCKET_UPDATE_TRANSPORT_RANGES(state, ranges) {
      state.transport.ranges = ranges
    },
    SOCKET_UPDATE_COMMITTED_SAMPLE(state, sample) {
      const samples = state.selectedArea.samples
      const index = samples.findIndex((s) => s.index === sample.index)

      samples[index] = {
        frequency: sample.frequency,
        index: sample.index,
        dateTime: sample.dateTime,
        comment: sample.comment,
      }

      state.selectedArea = {
        samples: samples,
        startIndex: state.selectedArea.startIndex,
        endIndex: state.selectedArea.endIndex,
      }
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },
})