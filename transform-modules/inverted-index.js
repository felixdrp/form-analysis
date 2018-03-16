// Inverted Index.

// Input rows of phrases

// Output phrases to words frequency:

const invertedIndex = (data) => {
  let wordSet = {}
  let invIndex = {}
  let wordSetStemm = {}
  let invIndexStemm = {}

  let handler = {
    get: function(target, name) {
      return name in target ?
        target[name] :
        0;
    }
  };

  for (let phraseId in data.phrases) {
    invIndex[phraseId] = new Proxy({}, handler)
    invIndexStemm[phraseId] = new Proxy({}, handler)

    data.phrases[phraseId].stopWordized.forEach(
      word => {
        // Raw words
        if (wordSet[word]) {
          wordSet[word].total += 1;
          wordSet[word].phrases.push(phraseId);

        } else {
          wordSet[word] = {
            total: 1,
            phrases: [phraseId]
          };
        }

        if (!invIndex[phraseId][word]) {
          return invIndex[phraseId][word] = 1
        }
        invIndex[phraseId][word] += 1
      }
    )

    // Stemmer version (word's root)
    data.phrases[phraseId].stemmingFromStopWordized.forEach(
      word => {
        // Raw words
        if (wordSetStemm[word]) {
          wordSetStemm[word].total += 1;
          wordSetStemm[word].phrases.push(phraseId);

        } else {
          wordSetStemm[word] = {
            total: 1,
            phrases: [phraseId]
          };
        }

        if (!invIndexStemm[phraseId][word]) {
          return invIndexStemm[phraseId][word] = 1
        }
        invIndexStemm[phraseId][word] += 1
      }
    )
  }

  return {
    wordSet,
    invIndex,
    wordSetStemm,
    invIndexStemm
  }
}

module.exports = invertedIndex;
