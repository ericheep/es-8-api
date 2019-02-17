export default ({ mouseIndex, samplesShown, width, height }, paper) => {
  const sampleWidth = width / samplesShown

  const selectedIndexRect = new paper.Path.Rectangle({
    size: [sampleWidth, height],
    center: [sampleWidth * mouseIndex + sampleWidth / 2, height / 2],
    strokeWidth: 2,
  })
  selectedIndexRect.strokeColor = 'black'
}
