const frequencyToPitch = (freq) => {
  return 12 * Math.log(freq / 440.0) / Math.log(2) + 69
}

const frequencyToNote = (freq) => {
  const notes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab']
  const pitch = frequencyToPitch(freq)

  return pitch
}

console.log(frequencyToNote(440))
