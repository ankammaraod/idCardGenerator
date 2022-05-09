/* eslint-disable max-len */
const fs = require('fs');

const { generateTag } = require('../tools/generateTags.js');
const { generateLink } = require('../tools/generateTags.js');
const { parseCsv } = require('../tools/csvToJsonParser.js');

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');
const writeFile = (fileName, info) => fs.writeFileSync(fileName, info, 'utf-8');

const generateIdCard = function (personDetails) {
  const keys = Object.keys(personDetails);
  let replacedText = this;

  for (let index = 0; index < keys.length; index++) {
    replacedText = replacedText.replaceAll('--' + keys[index] + '--',
      personDetails[keys[index]]);
  }
  return replacedText;
};

const generatePageClosure = function (bodyContent) {
  const title = generateTag('title', 'Id Cards');
  const link = generateLink('./styles.css');
  const head = generateTag('head', title + link,);
  const body = generateTag('body', bodyContent);
  return generateTag('html', head + body);
};

const main = function () {

  const peopleData = parseCsv('./data.csv', '|');

  const personTemplate = readFile('./personTemplate.html');

  const PageTemplate = generatePageClosure('--idCards--');

  const idCards = peopleData.map(generateIdCard.bind(personTemplate)).join('');

  const htmlPage = PageTemplate.replace('--idCards--', idCards);

  writeFile('./index.html', htmlPage);
};

main();
