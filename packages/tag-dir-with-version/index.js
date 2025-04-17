/**
 * Updates files in a directory by replacing a placeholder with a specified replacement string.
 *
 * @param {Object} options - The options for the function.
 * @param {string} options.dir - The directory to search for files.
 * @param {string[]} [options.ignorePatterns=[]] - Glob patterns to ignore when searching for files.
 * @param {string[]} [options.ignorePaths=[]] - Specific file paths to ignore.
 * @param {string} options.placeholder - The placeholder string to search for in the files.
 * @param {string} options.replacement - The string to replace the placeholder with.
 * @param {boolean} [options.verbose=false] - Whether to log detailed information about the process.
 *
 * @throws {Error} Throws an error if a file cannot be updated.
 *
 * @example
 * const { tagDirWithVersion } = require('tag-dir-with-version');
 *
 * tagDirWithVersion({
 *   dir: './src',
 *   ignorePatterns: ['.yarn, node_modules'],
 *   ignorePaths: ['./src/ignore-this-file.js'],
 *   placeholder: '__VERSION__',
 *   replacement: '1.0.0',
 *   verbose: true,
 * });
 */
const fs = require('fs');
const glob = require('glob');

function tagDirWithVersion({
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
      (filePath) =>
        fs.statSync(filePath).isFile() &&
        !ignorePaths.some((ignorePath) => filePath.indexOf(ignorePath) > -1),
    );

  if (verbose) {
    console.log('Matched paths \n', filePaths);
  }

  filePaths.forEach((filePath) => {
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
}

module.exports = {
  tagDirWithVersion,
};
