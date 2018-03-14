// Analysis ot comments at phrase level.

// Input rows of data

// Output rows of phrases:

//   pharases: {
//    position: {row: ,column: ,index:},
//    original: '',
//    originalTokenized: '',
//    stopWordized: '',
//    brigramsFromStopWordized: '',
//    stemmingFromStopWordized: '',
//    sentiment: {},
//  },

var sw = require('stopword')
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var NGrams = natural.NGrams;
var wordnet = new natural.WordNet();

const analysePhrase = (phrase) => {
  let originalTokenized = tokenizer.tokenize(phrase)
  let stopWordized = sw.removeStopwords(originalTokenized)
  let stemmingFromStopWordized = []
  // Choose between stemmers:
  // https://github.com/NaturalNode/natural#stemmers
  stopWordized.forEach(val => {
    // stemmingFromStopWordized.push(natural.PorterStemmer.stem(val))
    stemmingFromStopWordized.push(natural.LancasterStemmer.stem(val))
  })
  brigramsFromStopWordized = NGrams.bigrams(stopWordized)
  // debugger
  return {
     original: phrase,
     originalTokenized,
     stopWordized,
     brigramsFromStopWordized,
     stemmingFromStopWordized
     // sentiment: {},
  }

}

const _phrases = (input) => {
  let phrases = {}
  let phrasesIndex = []

  for (let rowIndex in input.dataIndex) {
    let row = input.data[rowIndex]
    // Divide the text in phrases
    for (let columIndex in row.columns) {
      // Check column type is string
      if (input.titles[columIndex].type != 'string') {
        continue
      }

      let colPhrases = row.columns[columIndex].val.split('.')

      for (let phrase of colPhrases) {
        let id = phrasesIndex.length
        // If no phrase continue
        if (phrase.trim() == '') {
          continue
        }

        phrases[id] = analysePhrase(phrase)
        phrases[id].id = id

        phrases[id].position = {
          rowID: rowIndex,
          columnID: columIndex,
          textIndex: row.columns[columIndex].val.indexOf(phrase)
        }

        phrasesIndex.push(phrasesIndex.length)
      }
    }
  }

  return {
    phrases,
    phrasesIndex
  }
}

module.exports = _phrases;
