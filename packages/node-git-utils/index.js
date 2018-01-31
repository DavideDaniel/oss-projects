const execa = require('execa');

function execSync(command, args, opts) {
  return execa.sync(command, args, opts).stdout;
}

function concatAndFilter(a, b) {
  return a.concat(b).filter(str => str.length);
}

function getCurrentSHA(opts) {
  return execSync('git', ['rev-parse', 'HEAD'], opts);
}

function getCurrentBranch(opts) {
  return execSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], opts);
}

function getLastTag(opts) {
  return execSync('git', ['describe', '--tags', '--abbrev=0'], opts);
}

function getLastTaggedCommit(opts) {
  return execSync('git', ['rev-list', '--tags', '--max-count=1'], opts);
}

function getTagsFromCommit(opts) {
  return execSync('git', ['describe', '--tags', opts.commit], opts);
}

function getLastTaggedCommitInBranch(opts) {
  return execSync('git', ['rev-list', '-n', '1', getLastTag(opts)], opts);
}

function hasTags(opts) {
  return !!execSync('git', ['tag'], opts);
}

function getFromLastTag(opts) {
  const format = (opts && opts.format) || '%s | %an';
  return execSync('git', ['log', '-1', `--format=${format}`, getLastTaggedCommitInBranch()], opts);
}

function getStringifiedFromLastTag(opts = {}) {
  const format = opts.format || '{ author:"%an", subject: "%s" }';
  const str = getFromLastTag({ format, ...opts });
  return JSON.stringify(str);
}

function getCommitsSinceLastTag(opts) {
  const options = opts || {};
  const { folderPath, withMerges } = options;
  const includeMerges = withMerges ? '' : '--no-merges';
  const fp = folderPath || '';
  const args = concatAndFilter(['log', `${getLastTag()}..HEAD`, '--pretty=%s | [%an]'], [includeMerges, fp]);
  return execSync('git', args, options);
}

function getInbetweenCommits(opts) {
  const {
    a, b, withMerges, folderPath,
  } = opts;
  const between = `${a}...${b}`;
  const includeMerges = withMerges ? '' : '--no-merges';
  const fp = folderPath || '';
  const args = concatAndFilter(['log', between, '--pretty=%s | [%an]'], [includeMerges, fp]);
  return execSync('git', args, opts);
}

module.exports = {
  getLastTag,
  getInbetweenCommits,
  getCommitsSinceLastTag,
  getLastTaggedCommitInBranch,
  getLastTaggedCommit,
  getStringifiedFromLastTag,
  getCurrentBranch,
  getCurrentSHA,
  getTagsFromCommit,
  hasTags,
};
