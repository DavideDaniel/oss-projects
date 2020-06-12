const fs = require('fs');
const glob = require('glob');

module.exports = function tagDirWithVersion({
  dir,
  ignorePatterns = [],
  ignorePaths = [],
  placeholder,
  replacement,
  verbose,
}) {
  const regex = new RegExp(placeholder, 'g');

  const globOpts = { nodir: true, matchBase: true, ignore: ignorePaths.concat(...ignorePatterns) };

  const filePaths = glob
    .sync(`${dir}/**`, globOpts)

    .filter(
      filePath =>
        fs.statSync(filePath).isFile() &&
        !ignorePaths.some(ignorePath => filePath.indexOf(ignorePath) > -1),
    );

  if (verbose) {
    console.log('Matched paths \n', filePaths);
  }

  filePaths.forEach(filePath => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      if (!regex.test(fileContent)) {
        if (verbose) {
          console.info(`No match for ${placeholder} found in ${filePath}`);
        }
        return;
      }

      console.info(`Updating ${placeholder} in ${filePath} with ${replacement}`);

      fs.writeFileSync(filePath, fileContent.replace(regex, replacement));
    } catch (error) {
      throw new Error(`Could not update "${filePath}": ${error.message}`);
    }
  });
};
