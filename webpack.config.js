const path = require('path');
const webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname,'app'),
    entry: './interface.js',
    output: {
		filename: "./[name].js",
		publicPath: './dist/',
		chunkFilename: "./[id].js",
	},
	plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

