const path = require("path");
const webpack = require("webpack");


module.exports = {
    entry: {
        app: "./index.jsx"
    },
    context: path.resolve(__dirname, "src"),
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
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    }
}