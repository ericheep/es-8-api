export default (selectedArea, sequenceLength, paper) => {
  const div = document.getElementById('guideWindow')
  const height = div.clientHeight
  const width = div.clientWidth

  const selectedAreaDistance = (selectedArea.endIndex - selectedArea.startIndex)
  const selectedAreaWidth = selectedAreaDistance / sequenceLength * width
  const centerIndex = (selectedArea.endIndex + selectedArea.startIndex) * 0.5
  const centerPixel = centerIndex / sequenceLength * width

  const selectedAreaRect = new paper.Path.Rectangle({
    size: [selectedAreaWidth, height - 2],
    center: [centerPixel, height * 0.5],
    dashArray: [1, 2],
  })
  selectedAreaRect.strokeColor = 'gray'
}
