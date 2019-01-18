import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ transportRanges, frequencyResponse, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 2

  for (var i = 0; i < width; i++) {
    const [rangeLo, rangeHi] = transportRanges[i].map(frequencyToMIDIPitch)
    const pitchRect = new paper.Path.Rectangle({
      size: [1, scale * rangeHi - scale * rangeLo],
      center: [i, height - (rangeHi - rangeLo) * scale],
    })
    pitchRect.fillColor = 'black'
  }
}
