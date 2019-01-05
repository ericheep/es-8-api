export const frequencyToPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

export const pitchToFrequency = (pitch) => {
  return 440 * Math.pow(2, (pitch - 69) / 12)
}

export const frequencyToNote = (freq) => {
  const latins = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  const pitch = frequencyToPitch(freq)
  let cents = ((pitch % 1) * 100).toFixed(4)
  let pitchAdjust = 0

  if (cents >= 50) {
    cents = -(100 - cents)
    pitchAdjust = 1
  }
  const octave = Math.floor((pitch + pitchAdjust - 12) / 12)
  const latin = latins[Math.floor((pitch + pitchAdjust - 9) % 12)]

  return {
    latin,
    octave,
    cents,
  }
}

export const noteToFrequency = (note) => {
  const latins = [
    ['C', 'B#'],
    ['Db', 'C#'],
    ['D'],
    ['Eb', 'D#'],
    ['E', 'Fb'],
    ['F', 'E#'],
    ['F#', 'Gb'],
    ['G'],
    ['Ab', 'G#'],
    ['A'],
    ['A#', 'Bb'],
    ['B', 'Cb'],
  ]

  const pitch = latins.indexOf(latins.find((arr) => arr.find((el) => el === note.latin)))
  return pitchToFrequency(pitch + note.cents + (note.octave * 12 + 12))
}
