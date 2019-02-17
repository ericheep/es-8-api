import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ primedSample, pitchResponse, mouseIndex, width, height, samplesShown }, paper) => {
  const [pitchLo, pitchHi] = pitchResponse
  const range = pitchHi - pitchLo
  const scale = height / range

  const sampleWidth = width / samplesShown
  const pitch = frequencyToMIDIPitch(primedSample.frequency)

  let size = [sampleWidth - 2, scale * 2]
  let center = [sampleWidth * mouseIndex + sampleWidth / 2, height - ((pitch - pitchLo) * scale)]

  if (mouseIndex === 0) {
    size[0] -= 2
    center[0] += 1
  }

  if (mouseIndex === samplesShown - 1) {
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
