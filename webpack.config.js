const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    ar: path.join(__dirname, "src", "ar-viewer-ar.js"),
    ui: path.join(__dirname, "src", "ar-viewer-ui.js")
  },
  output: {
    publicPath: '/',
    filename: 'ar-viewer.[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      jsartoolkit: '@ar-js-org/artoolkit5-js',
      threexArmarkercontrols$: path.resolve(__dirname, 'src/packages/arjs/three.js/src/threex/arjs-markercontrols.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: 'no-fallback'
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
};
