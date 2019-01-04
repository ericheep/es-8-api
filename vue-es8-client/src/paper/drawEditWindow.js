import { frequencyToPitch } from '../helpers.js'

export default (selectedArea, paper) => {
  const div = document.getElementById('editWindow')
  const width = div.clientWidth
  const height = div.clientHeight
  const frequencyResponse = [38.0, 24000.0]

  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'gray'
  path.strokeWidth = 8

  const length = selectedArea.samples.length
  const sampleWidth = width / length
  for (var i = 0; i < length; i++) {
    const line = new paper.Path({
      segments: [[i * sampleWidth, 0], [i * sampleWidth, height]],
      strokeColor: 'gray',
    })
    line.dashArray = [1, 10]

    const sample = selectedArea.samples[i]
    const pitch = frequencyToPitch(sample['freq'])
    const sampleRect = new paper.Path.Rectangle({
      size: [sampleWidth, scale * 2],
      center: [i * sampleWidth + sampleWidth / 2, height - ((pitch - pitchLo) * scale)],
    })
    sampleRect.fillColor = 'gray'
  }
}
