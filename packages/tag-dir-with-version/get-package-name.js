const fs = require('fs');
const path = require('path');

const hasPackage = cwd => {
  return fs.existsSync(path.join(cwd, 'package.json'));
};

const getClosestPackage = dir => {
  if (hasPackage(dir)) {
    // eslint-disable-next-line global-require
    return require(path.join(dir, 'package.json')); // eslint-disable-line import/no-dynamic-require
  }
  return getClosestPackage(path.resolve(dir, '..'));
};

const cache = {};

const getCachedPackagePath = dir => {
  if (cache[dir] && path.basename(cache[dir]) === 'package.json') {
    return cache[dir];
  }
  if (hasPackage(dir)) {
    cache[dir] = path.join(dir, 'package.json');
    return cache[dir];
  }
  return getCachedPackagePath(path.resolve(dir, '..'));
};

function getPackageName() {
  const cwd = process.cwd();
  return hasPackage(cwd) ? process.env.npm_package_name : getClosestPackage(cwd).name;
}

const name = getPackageName();

console.log('name', name);
