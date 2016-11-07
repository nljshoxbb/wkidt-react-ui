var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var isProduction = function() {
  return process.env.NODE_ENV === 'production';
};
outputDir = 'E:/working/react-newui/dist';
entryPath = 'E:/working/react-newui/testPages';
var plugins = null;

function setCommons(set) {
  plugins = [
    new webpack.optimize.CommonsChunkPlugin(set)
  ];
}

setCommons({
  name: 'commons',
  filename: 'js/commons.js',
})
if (isProduction()) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}


var entris = fs.readdirSync(entryPath).reduce(function(o, filename) {
  !/\./.test(filename) &&
    (o[filename] = ['webpack/hot/dev-server', path.join(entryPath, filename, filename + ".jsx")]);
  return o;
}, {});

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: entris,
  output: {
    path: outputDir,
    filename: 'js/[name].bundle.js',
    publicPath: isProduction() ? '/dist/' : '/dist/',
    chunkFilename: isProduction() ? 'js/[name].chunk.js' : 'js/[name].chunk.min.js',
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=react&presets[]=es2015&presets[]=stage-0']
    }, ],
    postLoaders: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['es3ify-loader'],
    }, ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './',
    port: 9090 //端口你可以自定义
  },
  externals: {
    "jquery": "window.jQuery",
    "easemobim": "window.easemobim",
    'webuploader': 'window.WebUploader',
  },
  plugins: plugins

};