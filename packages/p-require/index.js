module.exports = request => new Promise((res, rej) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    res(require(request));
  } catch (err) {
    rej(err);
  }
});
