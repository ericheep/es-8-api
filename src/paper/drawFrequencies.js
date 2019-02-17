import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ selectedArea, pitchResponse, width, height, samplesShown }, paper) => {
  const [pitchLo, pitchHi] = pitchResponse
  const range = pitchHi - pitchLo
  const scale = height / range

  const sampleWidth = width / samplesShown

  selectedArea.samples.forEach(sample => {
    const pitch = frequencyToMIDIPitch(sample.frequency)
    const mouseIndex = sample.index - selectedArea.startIndex
    const sampleRect = new paper.Path.Rectangle({
      size: [sampleWidth, scale * 2],
      center: [mouseIndex * sampleWidth + sampleWidth / 2, height - ((pitch - pitchLo) * scale)],
    })
    sampleRect.fillColor = 'gray'
  })
}
