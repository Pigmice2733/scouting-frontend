module.exports = {
  env: {
    node: true
  },
  extends: 'calebeby',
  overrides: {
    files: 'src/**.js',
    env: {
      node: false,
      browser: true
    }
  }
}
