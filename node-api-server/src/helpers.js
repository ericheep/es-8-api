const formatTime = (time) => {
  var sec_num = parseInt(time, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  var seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (hours   < 10) { hours   = "0" + hours }
  if (minutes < 10) { minutes = "0" + minutes }
  if (seconds < 10) { seconds = "0" + seconds }
  var time    = hours+':'+minutes+':'+seconds
  return time
}

const getNullSamples = (numSamples) => {
  var samples = []

  for (var i = 0; i < numSamples; i++) {
    samples.push({
      index: i,
      freq: null,
      dateTime: null,
    })
  }

  return samples
}

const getInitialState = () => {
  return {
    samples: getNullSamples(44100),
    sequencer: {
      frequencyResponse: [38, 24000.0],
      samplesShown: 100,
      length: 44100,
    },
  }
}

const getRangesOfFrequencies = (frequencies, width) => {
  const ranges = []
  const N = frequencies.length / width

  for (var i = 0; i < width; i++) {
    const startIndex = Math.floor(i * N)
    const endIndex = Math.floor((i + 1) * N)
    const slice = frequencies.slice(startIndex, endIndex)

    ranges.push([
      Math.min.apply(null, slice.filter(Boolean)),
      Math.max.apply(null, slice.filter(Boolean))]
    )
  }

  return ranges
}

module.exports.formatTime = formatTime
module.exports.getRangesOfFrequencies = getRangesOfFrequencies
module.exports.getInitialState = getInitialState