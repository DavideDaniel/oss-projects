module.exports = () => {
  let lernaBinary = 'lerna';

  const useYarn = process.env.USE_YARN;
  if (Boolean(useYarn) && useYarn !== 'false' && useYarn !== '0') {
    console.log('Using yarn when calling lerna');
    lernaBinary = 'yarn lerna';
  }
  return lernaBinary;
};
