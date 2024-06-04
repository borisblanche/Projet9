const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

module.exports = {
  entry: './assets/bootstrap/bootstrap.css', // Remplacez par le chemin de votre fichier CSS principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Un nom de fichier JS est requis pour l'entrée, mais il sera ignoré car nous ne générons que du CSS
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bootstrap.min.css', // Nom du fichier CSS compressé
    }),
    new PurgeCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'Projet9/index.html'),
        path.join(__dirname, 'Projet9/assets/scripts.js'),
        path.join(__dirname, 'Projet9/assets/maugallery.bundle.js'),
        path.join(__dirname, 'Projet9/assets/style.css'),
      ]),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  mode: 'production',
};



