export default (selectedSample, selectedArea, paper) => {
  const div = document.getElementById('editWindow')
  const height = div.clientHeight
  const width = div.clientWidth
  const sampleWidth = width / selectedArea.samples.length
  const offsetIndex = selectedSample.index - selectedArea.startIndex

  const selectedSampleRect = new paper.Path.Rectangle({
    size: [sampleWidth, height],
    center: [sampleWidth * offsetIndex + sampleWidth / 2, height / 2],
  })
  selectedSampleRect.fillColor = new paper.Color(0.75, 0, 0, 0.125)
}
