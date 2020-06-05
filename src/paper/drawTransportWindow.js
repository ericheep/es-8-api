import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ transportRanges, frequencyResponse, width, height, length }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range
  console.log(width, height, frequencyResponse, transportRanges)

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'black'
  path.strokeWidth = 2

  let sampleWidth = Math.floor(width / length)
  if (sampleWidth < 1) {
    sampleWidth = 1
  }

  transportRanges.forEach(element => {
    const rangeLo = element.min
    const rangeHi = element.max
    const index = element.group

    const [pitchRangeLo, pitchRangeHi] = [rangeLo, rangeHi].map(frequencyToMIDIPitch)
    const ySize = Math.max((pitchRangeHi - pitchRangeLo) * scale, 1.0)

    const pitchRect = new paper.Path.Rectangle({
      size: [sampleWidth, ySize],
      leftCenter: [index, height - ((pitchRangeHi + pitchRangeLo) * 0.5 - pitchLo) * scale],
    })
    pitchRect.fillColor = 'black'
  })
}
