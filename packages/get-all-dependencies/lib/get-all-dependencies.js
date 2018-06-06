const memo = {};
const getNestedDependencies = (dep, hash, arr) => {
  if (!memo[dep]) {
    memo[dep] = 1;
    if (hash[dep]) {
      hash[dep].forEach((d) => {
        arr.push(d);
        getNestedDependencies(d, hash, arr);
      });
    }
  } else {
    memo[dep] += 1;
  }
};

/**
 * reduceDependencies takes a package name and a dependency hash map to give you
 * an in depth dependency chain (upstream or downstream dependent on the hash)
 * @param  {String} pkgName         A package name in th dependency map
 * @param  {Object} dependencyMap   A dependency map with keys of pkgNames with
 *                                  value as arrays of pkgNames
 * @return {Array}                  A reduced array of pkgNames
 */
const reduceDependencies = (pkgName, dependencyMap) => {
  const pkgs = dependencyMap[pkgName] || [];
  const result = pkgs.reduce((acc, dep) => {
    if (!acc.includes(dep)) {
      acc.push(dep);
    }

    getNestedDependencies(dep, dependencyMap, acc);
    return acc;
  }, []);
  return result;
};

/**
 * getDependencies takes a list of packages, a list of localPackages and a logger
 * to give you a hashMap of packages with upstream and downstream dependencies
 * @param  {Array} pkgNames         An array of package names from a monorepo
 * @param  {Array} localPackages    A list of all the package.jsons in the same monorepo
 * @param  {Object} logger          An option logger with the same methods as console
 * @return {Object}                 A hashMap of key value pairs with downstream and upstream arrays
 *                                  {[pkgName: String]:{ upstream: Array, downstream: Array }}
 */
function getAllDependencies(pkgNames, localPackages, { logger = console, verbose }) {
  const names = localPackages.map(({ name }) => name);
  const data = {};
  const builtBy = {};
  const dependedOnBy = {};

  localPackages.forEach(({
    name, dependencies, devDependencies, peerDependencies,
  }) => {
    builtBy[name] = []
      .concat(Object.keys(dependencies || {}))
      .concat(Object.keys(devDependencies || {}))
      .concat(Object.keys(peerDependencies || {}))
      .filter(k => names.includes(k));
  });

  names.forEach((pkgName) => {
    // Do a first order pass on who depends on me
    builtBy[pkgName].forEach((dep) => {
      dependedOnBy[dep] = dependedOnBy[dep] || [];
      dependedOnBy[dep].push(pkgName);
    });

    if (pkgNames.includes(pkgName)) {
      if (verbose) {
        logger.info(`Mapping all dependencies for ${pkgName}`);
      }

      data[pkgName] = {
        upstream: reduceDependencies(pkgName, builtBy),
        downstream: reduceDependencies(pkgName, dependedOnBy),
      };
    }
  });

  if (verbose && logger) {
    logger.info(`Mapped dependencies:\n${JSON.stringify(data, null, 2)}`);
  }

  return data;
}

module.exports = { reduceDependencies, getNestedDependencies, getAllDependencies };
