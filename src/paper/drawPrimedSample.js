import { frequencyToMIDIPitch } from '../helpers.js'

export default ({ primedSample, pitchResponse, scopedIndex, selectedArea, width, height }, paper) => {
  const [pitchLo, pitchHi] = pitchResponse
  const range = pitchHi - pitchLo
  const scale = height / range

  const sampleWidth = width / selectedArea.samples.length
  const pitch = frequencyToMIDIPitch(primedSample.freq)

  let size = [sampleWidth - 2, scale * 2]
  let center = [sampleWidth * scopedIndex + sampleWidth / 2, height - ((pitch - pitchLo) * scale)]

  if (scopedIndex === 0) {
    size[0] -= 2
    center[0] += 1
  }

  if (scopedIndex === selectedArea.samples.length - 1) {
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
