export default (s, paper) => {
  const div = document.getElementById('guideWindow')
  const height = div.clientHeight
  const width = div.clientWidth

  const selectedAreaRect = new paper.Path.Rectangle({
    size: [s.width, height - 2],
    center: [s.position * width, height * 0.5],
    dashArray: [2, 2],
  })
  selectedAreaRect.strokeColor = 'gray'
}
