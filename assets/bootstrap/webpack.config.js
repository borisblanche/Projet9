const path = require('path');

module.exports = {
    mode: 'production',
    entry: './assets/maugallery.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './dist/maugallery.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
