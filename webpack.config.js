var path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'src/server/static'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    }
};
