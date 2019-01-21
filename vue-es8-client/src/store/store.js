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
      dateTime: '00/00/00',
      comment: '',
    },
    primedSample: {
      index: 0,
      freq: 0,
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
      scopedIndex: 0,
    },
    transport: {
      ranges: [],
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
    transportRanges: state => {
      return state.transport.ranges
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
      if (state.selectedArea.startIndex !== 0) {
        let startIndex = state.selectedArea.startIndex - state.sequencer.samplesShown
        let endIndex = state.selectedArea.endIndex - state.sequencer.samplesShown

        if (startIndex <= 0) {
          startIndex = 0
          endIndex = startIndex + state.sequencer.samplesShown
        }

        dispatch('emitSelectedArea', {
          startIndex,
          endIndex,
          scopedIndex: state.selectedArea.scopedIndex,
        })
      }
    },
    rightArrowClick({ state, commit, dispatch }, event) {
      if (state.selectedArea.endIndex !== state.sequencer.length) {
        let startIndex = state.selectedArea.startIndex + state.sequencer.samplesShown
        let endIndex = state.selectedArea.endIndex + state.sequencer.samplesShown

        if (endIndex >= state.sequencer.length) {
          startIndex = state.sequencer.length - state.sequencer.samplesShown
          endIndex = state.sequencer.length
        }

        dispatch('emitSelectedArea', {
          startIndex,
          endIndex,
          scopedIndex: state.selectedArea.scopedIndex,
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

      dispatch('emitSelectedArea', { startIndex, endIndex, scopedIndex })
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
      const startIndex = state.selectedArea.startIndex
      const scopedIndex = index - startIndex

      commit('UPDATE_SCOPED_INDEX', scopedIndex)
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

      state.selectedSample.freq = sample.freq
      state.selectedSample.pitch = frequencyToPitch(sample.freq)
      state.selectedSample.index = index
      state.selectedSample.dateTime = sample.dateTime

      state.primedSample.index = index
    },
    UPDATE_PRIMED_SAMPLE_FREQUENCY(state, freq) {
      state.primedSample = {
        freq: freq,
        pitch: frequencyToPitch(freq),
        index: state.selectedSample.index,
      }
    },
    UPDATE_PRIMED_SAMPLE_DATE_TIME(state, dateTime) {
      state.primedSample.dateTime = dateTime
    },
    UPDATE_PRIMED_SAMPLE_PITCH(state, pitch) {
      state.primedSample.pitch = pitch
      state.primedSample.freq = pitchToFrequency(pitch)
    },
    UPDATE_SCOPED_INDEX(state, scopedIndex) {
      state.selectedArea.scopedIndex = scopedIndex
    },
    SOCKET_INITIALIZE_SEQUENCER(state, sequencer) {
      state.sequencer = {
        ...state.sequencer,
        ...sequencer,
      }
    },
    SOCKET_UPDATE_SELECTED_AREA(state, selectedArea) {
      state.selectedArea = selectedArea
    },
    SOCKET_UPDATE_TRANSPORT_RANGES(state, ranges) {
      state.transport.ranges = ranges
    },
    SOCKET_UPDATE_UPTIME(state, uptime) {
      state.server.uptime = uptime
    },
    SOCKET_UPDATE_COMMITTED_SAMPLE(state, sample) {
      const samples = state.selectedArea.samples
      const index = samples.findIndex((s) => s.index === sample.index)

      samples[index] = {
        freq: sample.freq,
        index: sample.index,
        dateTime: sample.dateTime,
        comment: sample.comment,
      }

      // state.selectedArea = {
      //   samples: samples,
      //   startIndex: state.selectedArea.startIndex,
      //   endIndex: state.selectedArea.endIndex,
      //   scopedIndex: state.selectedArea.scopedIndex,
      // }
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false
    },
  },
})
