[![Build Status](https://travis-ci.org/DavideDaniel/convert-css.svg?branch=master)](https://travis-ci.org/DavideDaniel/convert-css)

# convert-css

Parse and convert css. The focus is on JSON as it's needed for other services, and other easier conversions like modules in js for css-in-js.

### Install

`$ npm install convert-css --save`

### Usage

```javascript
const fs = require('fs');
const { cssToCamelizedJson } = require('convert-css');

const handleErr = (err) => {
  if(err) {
    console.error(err);
  }
};

fs.readFile('./my.css', 'utf-8', (err, data) => {
  handleErr(err);

  const cssText = data.toString();
  const cssInJs = 'module.exports = ' + JSON.stringify(
    cssToCamelizedJson(data), null, 2
  );

  fs.writeFile('./myCss.js', Buffer.from(cssInJs), (error) => {
    handleErr(error)
    console.log('done!')
  });
});
```
