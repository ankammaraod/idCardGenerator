/* eslint-disable no-magic-numbers */
const fs = require('fs');

const { generateTag } = require('./generateTags.js');
const { generatePageClosure } = require('./generateTags.js');
const { parseCsv } = require('./csvParser');

const writeFile = (fileName, info) => fs.writeFileSync(fileName, info, 'utf-8');

const generateHeader = (name) => {
  const slash = generateTag('span', name[0], 'class', 'slash');
  return generateTag('header', slash + name.slice(1), 'class', 'logo');
};

const generateImage = (personDetails) => {
  const path = personDetails.imagePath;
  const image = '<img src=' + '"' + path + '"' + ' alt="image">';
  return generateTag('div', image, 'class', 'image');
};

const generatePersonTemplate = (personDetails) => {
  const logo = generateHeader('/thoughtworks');
  const image = generateImage(personDetails);
  const name = generateTag('div', personDetails.name, 'class', 'name');
  const details = generateTag('p', 'Emp. Id: ' + personDetails.id +
    ' Blood Group: ' + personDetails.bloodGroup);
  const closureForDetails = generateTag('div', details);

  const info = generateTag(
    'div', name + closureForDetails, 'class', 'info');
  const profile = generateTag('div', image + info, 'class', 'profile');
  return generateTag('div', logo + profile, 'class', 'identity');
};

const comparator = function (firstElement, secondElement) {
  return firstElement[this] - secondElement[this];
};

const main = function () {
  const sourceData = process.argv[2];
  const parsedData = parseCsv(sourceData, '|');
  const sortBy = 'id';
  const sortedData = parsedData.sort(comparator.bind(sortBy));

  const idCards = sortedData.map(generatePersonTemplate);
  const htmlPage = generatePageClosure('Identity Cards', idCards);

  try {
    writeFile('./index.html', htmlPage);
  } catch (error) {
    throw 'unable to write';
  }
};

main();
