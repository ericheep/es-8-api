import { frequencyToMIDIPitch } from '../helpers.js'

const getMin = (prev, curr) => {
  return prev[0] < curr[0] ? prev[0] : curr[0]
}

const getMax = (prev, curr) => {
  return prev[1] > curr[1] ? prev[1] : curr[1]
}

const combineRanges = (ranges, width) => {
  const combinedRanges = []

  const N = ranges.length / width
  for (var i = 0; i < width; i++) {
    const startIndex = Math.floor(i * N)
    const endIndex = Math.floor((i + 1) * N)

    const slice = ranges.slice(startIndex, endIndex)
    const min = slice.reduce(getMin)
    const max = slice.reduce(getMax)

    combinedRanges.push([min, max])
  }

  return combinedRanges
}

export default ({ transportRanges, frequencyResponse, width, height }, paper) => {
  const combinedRanges = combineRanges(transportRanges, width)

  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 2

  for (var i = 0; i < width; i++) {
    const [rangeLo, rangeHi] = combinedRanges[i].map(frequencyToMIDIPitch)
    const pitchRect = new paper.Path.Rectangle({
      size: [1, (rangeHi - rangeLo) * scale],
      center: [i, height - ((rangeHi + rangeLo) * 0.5 - pitchLo) * scale],
    })
    pitchRect.fillColor = 'black'
  }
}
