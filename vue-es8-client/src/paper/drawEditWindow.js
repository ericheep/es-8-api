export default (samplesShown, paper) => {
  const div = document.getElementById('editWindow')
  const width = div.clientWidth
  const height = div.clientHeight

  const path = new paper.Path.Rectangle(0, 0, width, height)
  path.strokeColor = 'black'
  path.strokeWidth = 6

  const length = samplesShown
  const sampleWidth = width / length
  for (var i = 0; i < length; i++) {
    const line = new paper.Path({
      segments: [[i * sampleWidth, 0], [i * sampleWidth, height]],
      strokeColor: 'gray',
    })
    line.dashArray = [1, 10]

    let widthSubtract = 0
    if (i === 0 || i === length - 1) {
      widthSubtract = 8
    }

    const highlight = new paper.Path.Rectangle({
      size: [sampleWidth - widthSubtract, height - 8],
      center: [i * sampleWidth + sampleWidth / 2, height / 2],
      fillColor: 'white',
    })

    highlight.onMouseEnter = function(event) {
      this.fillColor = new paper.Color(0, 0, 0, 0.025)
    }
    highlight.onMouseLeave = function(event) {
      this.fillColor = 'white'
    }
  }
}
