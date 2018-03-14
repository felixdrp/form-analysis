// Inverted Index.

// Input rows of phrases

// Output phrases to words frequency:

const invertedIndex = (data) => {
  let wordSet = {}
  let invIndex = {}
  let handler = {
    get: function(target, name) {
      return name in target ?
        target[name] :
        0;
    }
  };

  for (let phraseId in data.phrases) {
    invIndex[phraseId] = new Proxy({}, handler)

    data.phrases[phraseId].stopWordized.forEach(
      word => {

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
  }

  return {
    wordSet,
    invIndex
  }
}

module.exports = invertedIndex;
