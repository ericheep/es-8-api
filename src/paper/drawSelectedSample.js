export default ({ selectedSample, selectedArea, width, height }, paper) => {
  const sampleWidth = width / selectedArea.samples.length
  const offsetIndex = selectedSample.index - selectedArea.startIndex

  const selectedSampleRect = new paper.Path.Rectangle({
    size: [sampleWidth, height],
    center: [sampleWidth * offsetIndex + sampleWidth / 2, height / 2],
    strokeWidth: 2,
  })
  selectedSampleRect.strokeColor = 'black'
}
