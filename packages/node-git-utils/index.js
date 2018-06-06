const execa = require('execa');

/**
 * execSync simply wraps execa.sync
 * @param {String} command a shell command
 * @param {Array} args an array of flags/arguments
 * @param {Object} opts an object of options passed to execa
 */
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

function getStringifiedFromLastTag(options) {
  const opts = options || {};
  const format = opts.format || '{ author:"%an", subject: "%s" }';
  const str = getFromLastTag(Object.assign({}, format, opts));
  return JSON.stringify(str);
}

function getCommitsSinceLastTag(opts) {
  const options = opts || {};
  const { folderPath, withMerges, format } = options;
  const includeMerges = withMerges ? '' : '--no-merges';
  const fp = folderPath || '';
  const f = format || '--pretty=%s | [%an]';
  const args = concatAndFilter(['log', `${getLastTag()}..HEAD`, f], [includeMerges, fp]);
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

function addTag(tag, opts) {
  return execSync('git', ['tag', tag, '-m', tag], opts);
}

function commit(message, opts = {}) {
  const { noVerify } = opts;
  const nv = noVerify ? '--no-verify' : '';
  const args = concatAndFilter(['commit', '-m', nv], [message]);
  return execSync('git', args, opts);
}

function checkout(opts) {
  if (opts.commit) {
    return execSync('git', ['checkout', opts.commit]);
  }

  const {
    branch, start, noTrack, remote,
  } = opts;
  const b = start ? '-b' : '';
  const rb = remote ? `--track ${remote}/${branch}` : '';
  const nt = noTrack ? '--no-track' : '';

  const args = concatAndFilter(['checkout'], [b, branch, nt, rb]);
  return execSync('git', args, opts);
}

function cherryPick(hash, opts) {
  return execSync('git', ['cherry-pick', hash], opts);
}

function revert(hash, opts) {
  const { noEdit } = opts;
  const ne = noEdit ? '--no-edit' : '';
  const args = concatAndFilter(['revert', hash], [ne]);
  return execSync('git', args, opts);
}

const npmVersion = (location, releaseType, opts) => {
  const skipTag = opts.skipTag ? '--no-git-tag-version' : '';
  const args = concatAndFilter([skipTag, 'version'], [releaseType]);
  return execSync('npm', args, { cwd: location, ...opts });
};

const add = (files, opts) => execSync('git', ['add', files], opts);

function matchCommitsBySubject(subject, opts = {}) {
  const delimiter = opts.delimiter || '|';
  const commits = getCommitsSinceLastTag({ format: `--pretty=%H${delimiter}%s`, ...opts });
  const arr = commits.split('\n');

  return arr.map((line) => {
    const [hash, subjectLine] = line.split(delimiter);
    return { hash, subjectLine };
  }).filter(({ subjectLine }) => subjectLine === subject);
}

function getLastCommitBySubject(subject, opts) {
  return matchCommitsBySubject(subject, opts)[0];
}

module.exports = {
  add,
  addTag,
  checkout,
  cherryPick,
  commit,
  getLastTag,
  getInbetweenCommits,
  getCommitsSinceLastTag,
  getLastTaggedCommitInBranch,
  getLastCommitBySubject,
  getLastTaggedCommit,
  getStringifiedFromLastTag,
  getCurrentBranch,
  getCurrentSHA,
  getTagsFromCommit,
  hasTags,
  matchCommitsBySubject,
  npmVersion,
  revert,
};
