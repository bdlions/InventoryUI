var webpack = require('webpack');
module.exports = {
    entry: "./app-build/main.js",
    output: {
        path: __dirname,
        filename: "./resources/js/bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    plugins: [
        // minify output
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            sourceMap: false,
            output: {comments: false}
        })
    ]
};
