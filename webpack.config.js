const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: "./index.jsx"
    },
    context: path.resolve(__dirname, "src"),
    devServer: {
        contentBase: path.join(__dirname,"dist"),
        port: 9000,
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                { from: /app.js$/, to: './app.js' }
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        // new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/react"],
                    plugins: [
                        [
                            "@babel/plugin-proposal-class-properties",
                            {
                                "loose": true
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    }
}