const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname,'app'),
    entry: './main.js',
    output: {
		filename: "./[name].js",
		publicPath: './dist/',
		chunkFilename: "./[id].js",
	},
	plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    module: {
    	rules: [
    		{
			    test: /\.(ogg|mp3|wav|mpe?g)$/i,
			    use: 'file-loader'
			}
    	]
    }
};

