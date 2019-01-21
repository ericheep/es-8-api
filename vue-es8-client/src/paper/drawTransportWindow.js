import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ transportRanges, frequencyResponse, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'black'
  path.strokeWidth = 2

  for (var i = 0; i < width; i++) {
    const [rangeLo, rangeHi] = transportRanges[i].map(frequencyToMIDIPitch)

    let ySize = (rangeHi - rangeLo) * scale
    if (ySize < 1.0) {
      ySize = 1.0
    }

    const pitchRect = new paper.Path.Rectangle({
      size: [1, ySize],
      center: [i, height - ((rangeHi + rangeLo) * 0.5 - pitchLo) * scale],
    })
    pitchRect.fillColor = 'black'
  }
}
