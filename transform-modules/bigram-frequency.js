// Bigrams frequency

// Input rows of phrases

// Output bigrams frequency:

const bigramsFrequency = (data) => {
  let bigramFreq = {}
  let bigramFreqIndex = []

  let bigramFreqUnsort = {}
  let bigramFreqIndexUnsort = []

  // let handler = {
  //   get: function(target, name) {
  //     return name in target ?
  //       target[name] :
  //       0;
  //   }
  // };
  const bigramsEqual = (a, b) => {
    return a.findIndex(b[0]) > -1 && a.findIndex(b[1]) > -1
  }

  for (let phraseId in data.phrases) {
    data.phrases[phraseId].bigramsFromStopWordized.forEach(
      bigram => {
        let bigramSortedStringify = Object.assign([], bigram).sort().join()
        let bigramStringify = bigram.join()

        if (!bigramFreq[bigramSortedStringify]) {
          bigramFreqIndex.push(bigramSortedStringify)
          bigramFreq[bigramSortedStringify] = {
            freq: 1,
            phrases: [phraseId]
          }
        } else {
          bigramFreq[bigramSortedStringify].freq += 1,
          bigramFreq[bigramSortedStringify].phrases.push(phraseId)
        }

        // Preserved order.
        if (!bigramFreqUnsort[bigramStringify]) {
          bigramFreqIndexUnsort.push(bigramStringify)
          bigramFreqUnsort[bigramStringify] = {
            freq: 1,
            phrases: [phraseId]
          }
        } else {
          bigramFreqUnsort[bigramStringify].freq += 1,
          bigramFreqUnsort[bigramStringify].phrases.push(phraseId)
        }
      }
    )
  }

  return {
    bigramFreq,
    bigramFreqIndex,
    bigramFreqUnsort,
    bigramFreqIndexUnsort
  }
}

module.exports = bigramsFrequency;
