// Use example:
// node process-csv.js -if "./data/Lynn Bradley.csv" -of "./data/Lynn Bradley.json"

var fs = require('fs');
var parse = require('csv-parse');
var transform = require('./transform-modules/model1-transform')
var inputFile = '';
const inputFileIndex = process.argv.findIndex(e => e == '-if');
var outputFile = '';
const outputFileIndex = process.argv.findIndex(e => e == '-of');

if (inputFileIndex > -1) {
  inputFile = process.argv[inputFileIndex + 1]
}

if (outputFileIndex > -1) {
  outputFile = process.argv[outputFileIndex + 1]
}

var csvData=[];
fs.createReadStream(inputFile)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        // console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end',function() {
      // console.log(JSON.stringify(transform(csvData)))
      let data = transform(csvData)

      //do something wiht csvData
      if (outputFile) {
        fs.writeFile(outputFile, JSON.stringify(csvData), (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
          // success case, the file was saved
          console.log('Write to File:' + outputFile);
        });
      } else {
        console.log(csvData);
      }
    });
