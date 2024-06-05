const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './assets/scripts.js', // Chemin vers votre fichier JS principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.min.js', // Nom du fichier JS compressé
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
  mode: 'production',
};
