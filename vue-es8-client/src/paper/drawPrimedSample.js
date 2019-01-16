import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ primedSample, frequencyResponse, selectedArea, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const sampleWidth = width / selectedArea.samples.length
  const offsetIndex = primedSample.index - selectedArea.startIndex
  const pitch = frequencyToMIDIPitch(primedSample.freq)

  const selectedSampleRect = new paper.Path.Rectangle({
    size: [sampleWidth - 2, scale * 2],
    center: [sampleWidth * offsetIndex + sampleWidth / 2, height - ((pitch - pitchLo) * scale)],
    strokeWidth: 2,
  })
  selectedSampleRect.fillColor = 'pink'
}
