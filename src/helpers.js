export const frequencyToMIDIPitch = (frequency) => {
  return 12 * Math.log(frequency / 440.0) / Math.log(2) + 69
}

export const MIDIPitchToFrequency = (pitch) => {
  return 440 * Math.pow(2, (pitch - 69) / 12)
}

const formatPitch = (pitch) => {
  let cents = Math.round(pitch.cents)
  if (cents >= 0) {
    cents = '+' + cents
  }
  return pitch.pitchClass + pitch.octave + ' ' + cents
}

const formatFrequency = (frequency) => {
  return frequency.toFixed(2) + 'hz'
}

export const formatPitchAndFrequency = (sample) => {
  return formatPitch(sample.pitch) + ' (' + formatFrequency(sample.frequency) + ')'
}

export const frequencyToPitch = (frequency) => {
  const pitchClasses = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  const MIDIpitch = frequencyToMIDIPitch(frequency)
  let cents = ((MIDIpitch % 1) * 100).toFixed(4)
  let pitchAdjust = 0

  if (cents >= 50) {
    cents = -(100 - cents)
    pitchAdjust = 1
  }
  const octave = Math.floor((MIDIpitch + pitchAdjust - 12) / 12)
  const pitchClass = pitchClasses[Math.floor((MIDIpitch + pitchAdjust - 9) % 12)]

  return {
    pitchClass,
    octave,
    cents,
  }
}

export const pitchToFrequency = (pitch) => {
  const pitchClasses = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'A#', 'B', 'Bb']

  const pitchClassIndex = pitchClasses.indexOf(pitch.pitchClass)
  return MIDIPitchToFrequency(pitchClassIndex + parseFloat(pitch.cents * 0.01) + (pitch.octave * 12 + 12))
}
