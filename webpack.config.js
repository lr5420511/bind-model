'use strict';

const [resolve, UglifyjsWP] = [require('path').resolve, require('uglifyjs-webpack-plugin')];

module.exports = {
    entry: {
        'bind-model': './src/index.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: false,
    module: {
        rules: [
            { 
                test: /\.js$/i,
                loader: ['babel-loader'],
                exclude: /node_modules/i
            }
        ]
    },
    plugins: [
        new UglifyjsWP({ sourceMap: false, test: /\.js$/i })
    ]
};