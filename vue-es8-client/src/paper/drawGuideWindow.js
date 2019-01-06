import { frequencyToMIDIPitch } from '../helpers.js'

export default (freqs, frequencyResponse, paper) => {
  const div = document.getElementById('guideWindow')
  const width = div.clientWidth
  const height = div.clientHeight

  const pitches = freqs.map(frequencyToMIDIPitch)
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 2

  for (var i = 0; i < width; i++) {
    const pitchRect = new paper.Path.Rectangle({
      size: [1, scale * 2],
      center: [i, height - ((pitches[i] - pitchLo) * scale)],
    })
    pitchRect.fillColor = 'gray'
  }
}
