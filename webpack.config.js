const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let appName = 'gostats';

const srcPath = path.join(__dirname, 'public-src');
const entryPoint = path.join(srcPath, 'index.js');
const staticPath = path.join(srcPath, 'static');
const exportPath = path.join(__dirname, 'public');

const env = process.env.WEBPACK_ENV;

let plugins = [];

if (env === 'production') {
	const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

	plugins.push(new UglifyJsPlugin({ minimize: true }));
	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}));

	appName += '.min.js';
} else {
	appName += '.js';
}

module.exports = {
	entry: entryPoint,
	output: {
		path: exportPath,
		filename: appName
	},
	module: {
		loaders: [
			{
				test: /\.js&/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015' ]
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		...plugins,
		new CopyWebpackPlugin([{
			from: path.join(staticPath, 'index.html')
		}, {
			from: path.join(staticPath, 'favicon.ico')
		}])
	]
}
