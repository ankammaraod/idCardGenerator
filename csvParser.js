const fs = require('fs');

const readFile = (fileName) => {
  return fs.readFileSync(fileName, 'utf-8');
};

const convertToJson = (keys, values) => {
  const obj = {};
  keys.forEach(
    (key, index) => {
      obj[key] = +values[index] || values[index];
    }
  );
  return obj;
};

const parseCsv = (csvFile, separator) => {
  const data = readFile(csvFile).split('\n');
  const header = data.shift().split(separator);

  return data.map(
    (row) => {
      return convertToJson(header, row.split(separator));
    }
  );
};

exports.parseCsv = parseCsv;
