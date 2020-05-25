import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ transportRanges, frequencyResponse, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'black'
  path.strokeWidth = 2

  transportRanges.forEach(element => {
    const rangeLo = element.min
    const rangeHi = element.max
    const index = element.transportGroup

    const [pitchRangeLo, pitchRangeHi] = [rangeLo, rangeHi].map(frequencyToMIDIPitch)
    const ySize = Math.max((pitchRangeHi - pitchRangeLo) * scale, 1.0)

    const pitchRect = new paper.Path.Rectangle({
      size: [1, ySize],
      center: [index, height - ((pitchRangeHi + pitchRangeLo) * 0.5 - pitchLo) * scale],
    })
    pitchRect.fillColor = 'black'
  })
}
