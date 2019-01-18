import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ primedSample, frequencyResponse, selectedArea, width, height }, paper) => {
  const [pitchLo, pitchHi] = frequencyResponse.map(frequencyToMIDIPitch)
  const range = pitchHi - pitchLo
  const scale = height / range

  const sampleWidth = width / selectedArea.samples.length
  const offsetIndex = primedSample.index - selectedArea.startIndex
  const pitch = frequencyToMIDIPitch(primedSample.freq)

  let size = [sampleWidth - 2, scale * 2]
  let center = [sampleWidth * offsetIndex + sampleWidth / 2, height - ((pitch - pitchLo) * scale)]

  if (offsetIndex === 0) {
    size[0] -= 2
    center[0] += 1
  }

  if (offsetIndex === selectedArea.samples.length - 1) {
    size[0] -= 2
    center[0] -= 1
  }

  const selectedSampleRect = new paper.Path.Rectangle({
    size: size,
    center: center,
    strokeWidth: 2,
  })
  selectedSampleRect.sendToBack()
  selectedSampleRect.fillColor = 'pink'
}
