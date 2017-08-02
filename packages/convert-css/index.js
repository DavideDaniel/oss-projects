const parse = require('css-parse');
const camelize = require('camelize');

function sequence() {
  const fns = arguments;
  return function () {
    let args = arguments;
    for (let i = 0; i < fns.length; i += 1) {
      args = [fns[i](...args)];
    }
    return args[0];
  };
}

const isString = str => typeof str === 'string';

// const SYMBOL = /!-!/ig
const removeFirst = str => str.replace(/^\_/gi, '');
const replaceDots = str => str.replace(/\./gi,'_');
const replaceSpace = str => str.replace(/\s/gi, '_');
// const replaceDashes = str => str.replace(/\-/gi, '!-!');
// // const replaceSymbol = str => str.replace(SYMBOL, '-');
const replace___ = str => str.replace('___','__');

const normalizeToStr = key => isString(key) ? key : key[0];


/**
 * replaceCssSyntax is a function will pipe a string [key] through more functions to replace and normalize css rule keys
 * @type {String}
 */
const replaceCssSyntax = sequence(
  replaceDots, // replace all .
  removeFirst, // remove starting .
  // replaceDashes, // placeHolder for dashes
  replace___, // in the case of typod double space, normalize to __ instead of ___ causing confusion
  replaceSpace // replace any white space with _
  // replaceSymbol // return dashes to original
);

const convertKey = key => isString(key)
  ? replaceCssSyntax(key)
  : key.map(replaceCssSyntax)[0];

function convertKeyNames(obj) {
  const newObj = {}
  const objKeys = Object.keys(obj);
  for (var i = 0; i < objKeys.length; i++) {
    newObj[convertKey(objKeys[i])]= obj[objKeys[i]];
  }
  return newObj;
}

const propExists = prop => prop.length;

function mungeRules(rules) {
  const rulesArr = [];
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    let type = rule.type;
    if(type === 'rule') {
        let declarations = rule.declarations;
        let selectors = rule.selectors;
        let ruleObj = {};
        if (propExists(declarations) && propExists(selectors)) {
          declarations.forEach(({ property, value }) => { ruleObj[property] = value });
          selectors.map(s => ({[s]:ruleObj})).forEach(r => rulesArr.push(r));
        }
      } else if(type === 'media') {
        rulesArr.concat(mungeRules(rule.rules));
      } else {
        console.error('Type of ' + type + ' did not conform to media or rule \n', rule);
      }
  }
  return rulesArr;
}

function cssToJson(string) {
  if (!isString(string)) {
    throw new Error('cssToJson needs a valid css string to convert')
  }

  const ast = parse(string);

  if(ast.stylesheet && ast.stylesheet.rules) {
    return mungeRules(ast.stylesheet.rules)
  } else {
    throw new Error('cssToJson needs a valid ast object')
  }
}

function cssToCamelizedJson(string) {
  if (!isString(string)) {
    throw new Error('cssToCamelizedJson needs a valid css string to convert')
  }
  const json = cssToJson(string);
  return json.map(obj => {
    const key = Object.keys(obj)[0];
    return {
      [key]: camelize(obj[key])
    }
  });
}

module.exports = {
  convertKey,
  convertKeyNames,
  cssToJson,
  cssToCamelizedJson
};
