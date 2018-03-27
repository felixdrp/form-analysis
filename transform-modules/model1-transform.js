// Transform a data type with the form:
// [ [Title], [data1], ..., [dataN] ]
// To:
// {
//   course,
//   courseCode,
//   titlesIndex: [],
//   titles: {},
//   dataIndex: [],
//   data: {},
//   pharases: {
//    position: {row: ,column: ,index:},
//    original: '',
//    originalTokenized: '',
//    stopWordized: '',
//    stopWordizedTokenized: '',
//    brigramsFromStopWordized: '',
//    stemmingFromStopWordized: '',
//    sentiment: {},
//  },
//   rawData: {}
// }
_ = require('underscore');
var natural = require('natural');

// Uses the word list from https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions.
var contractions = require('contractions');
var customExpansion = require('./custom-expansion');
var phrases = require('./phrase-analysis');
var invertedIndex = require('./inverted-index');
var bigramFrequency = require('./bigram-frequency');

const transform = (data) => {
  let titles = {}
  let formatedData = {}
  let i = 0

  // Process columns titles
  for (let title of data[0].slice(2)) {
    let columnType = '';
    let j = 1;
    let index = i + 2;


    // Find column type
    do {
      if (data[j][index] == undefined | data[j][index] == '') {
        // If not defined go to next row until get a correct type
        j++;
        continue;
      }
      if ( /\D+/.test(data[j][index]) ) {
        columnType = 'string'
      } else {
        columnType = 'numeric'
      }
    } while(!columnType)

    titles[i] = {
      // Remove the 4 spaces from titles
      title: title.match(/[^\s{4}][\w\s]+[^\s{4}]/)[0],
      id: i,
      type: columnType
    };
    i++;
  }

  // Process data
  i = 0
  for (let element of data.slice(1)) {
    formatedData[i] = {
      columns: element.slice(2).reduce(
        (result, value, index) => {
          let _value = contractions.expand(value);
          _value = customExpansion.expand(_value);
          // Check expanded text
          // if (value != contractions.expand(value)) {
          //   console.log( 'expanded: ')
          //   console.log( value )
          //   console.log( contractions.expand(value) )
          // }
          //
          // if (value != customExpansion.expand(value)) {
          //   console.log( 'customExpansion: ' )
          //   console.log( value )
          //   console.log( customExpansion.expand(value) )
          // }

          result[index] = {
            val: _value,
            id: index
          }
          return result
        },
        {}
      ),
      id: i
    }
    i++;
  }

  var output = {
    course: data[1][0],
    courseCode: data[1][1],
    titlesIndex: _.range(data[0].length),
    titles: titles,
    dataIndex: _.range(data.length - 1), // removed titles
    data: formatedData,
    rawData: data
  }

  output.phrases = phrases(output)
  output.invIdx = invertedIndex(output.phrases)
  output.bigramFreq = bigramFrequency(output.phrases)

  // debugger

  return output
}

module.exports = transform;
