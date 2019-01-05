import { frequencyToPitch } from '../helpers.js'

export default (selectedArea, frequencyResponse, paper) => {
  const div = document.getElementById('editWindow')
  const width = div.clientWidth
  const height = div.clientHeight

  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const length = selectedArea.samples.length
  const sampleWidth = width / length
  for (var i = 0; i < length; i++) {
    const sample = selectedArea.samples[i]
    const pitch = frequencyToPitch(sample['freq'])
    const sampleRect = new paper.Path.Rectangle({
      size: [sampleWidth, scale * 2],
      center: [i * sampleWidth + sampleWidth / 2, height - ((pitch - pitchLo) * scale)],
    })
    sampleRect.fillColor = 'gray'
  }
}
