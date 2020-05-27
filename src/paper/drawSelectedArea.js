export default ({ selectedArea, sequenceLength, width, height }, paper) => {
  const selectedAreaDistance = (selectedArea.endIndex - selectedArea.startIndex)
  const selectedAreaWidth = width / sequenceLength * selectedAreaDistance
  const centerIndex = (selectedArea.endIndex + selectedArea.startIndex) * 0.5
  const centerPixel = centerIndex / sequenceLength * width

  const selectedAreaRect = new paper.Path.Rectangle({
    size: [selectedAreaWidth, height - 2],
    center: [centerPixel, height * 0.5],
  })
  selectedAreaRect.fillColor = 'pink'
  selectedAreaRect.fillColor.alpha = 0.5
}
