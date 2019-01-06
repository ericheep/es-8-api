export const frequencyToMIDIPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

export const MIDIpitchToFrequency = (pitch) => {
  return 440 * Math.pow(2, (pitch - 69) / 12)
}

export const frequencyToPitch = (freq) => {
  const pitchClasses = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  const MIDIpitch = frequencyToMIDIPitch(freq)
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
  return MIDIpitchToFrequency(pitchClassIndex + parseFloat(pitch.cents * 0.01) + (pitch.octave * 12 + 12))
}
