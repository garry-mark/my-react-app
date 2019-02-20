module.exports = {
  map: false,
  plugins: [
    require('postcss-mixins'),
    require('postcss-import')(),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}
