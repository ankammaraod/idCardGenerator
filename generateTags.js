const generateAttr = (attr, value) => [attr, '=', '"', value, '"'].join('');

const openTag = (tag, attr, value) => {
  const attribute = attr ? generateAttr(attr, value) : '';
  return ['<', tag, ' ', attribute, '>'].join('');
};

const closeTag = (tag) => ['</', tag, '>'].join('');

// eslint-disable-next-line default-param-last
const generateTag = (tag, content = '', attr, value) => {
  return openTag(tag, attr, value) + content + closeTag(tag);
};

const generateLink = (filePath) =>
  '<link rel="stylesheet"' + 'href=' + '"' + filePath + '"' + '>';

const generatePageClosure = function (pageTitle, bodyContent) {
  const title = generateTag('title', pageTitle);
  const link = generateLink('./styles.css');
  const head = generateTag('head', title + link,);
  const body = generateTag('body', bodyContent);
  return generateTag('html', head + body);
};

exports.generateTag = generateTag;
exports.generateLink = generateLink;
exports.generatePageClosure = generatePageClosure;
exports.openTag = openTag;
exports.closeTag = closeTag;
