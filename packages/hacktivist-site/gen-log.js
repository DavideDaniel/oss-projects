const standardVersion = require('standard-version');

// Options are the same as command line, except camelCase
standardVersion({
  noVerify: true,
  infile: './CHANGELOG.md',
  silent: false,
}, (err) => {
  if (err) {
    console.error(`standard-version failed with message: ${err.message}`);
  }
  // standard-version is done
});
