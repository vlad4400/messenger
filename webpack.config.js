const path = require("path");
const webpack = require("webpack");


module.exports = {
    entry: {
        app: "./index.jsx"
    },
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    devServer: {
        contentBase: path.join(__dirname,"dist"),
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/react"]
                }
            }
        ]
    }
}