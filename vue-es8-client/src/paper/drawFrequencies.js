import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ selectedArea, frequencyResponse, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const length = selectedArea.samples.length
  const sampleWidth = width / length
  for (var i = 0; i < length; i++) {
    const sample = selectedArea.samples[i]
    if (sample.freq !== 0) {
      const pitch = frequencyToMIDIPitch(sample.freq)
      const sampleRect = new paper.Path.Rectangle({
        size: [sampleWidth, scale * 2],
        center: [i * sampleWidth + sampleWidth / 2, height - ((pitch - pitchLo) * scale)],
      })
      sampleRect.fillColor = 'gray'
    }
  }
}
