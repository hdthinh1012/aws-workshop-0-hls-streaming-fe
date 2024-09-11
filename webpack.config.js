const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
        }),
    ],
    watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        static: './dist',
        hot: true,
    },
    stats: {
        errorDetails: true
    }
}