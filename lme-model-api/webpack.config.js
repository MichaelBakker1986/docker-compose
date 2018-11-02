var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
const StartServerPlugin = require('start-server-webpack-plugin')
var nodeModules = {}
const nodeExternals = require('webpack-node-externals')

function addModule(path) {
	fs.readdirSync(path)
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod
	})
}

['node_modules',
	'../git-connect/node_modules',
	'../ffl/node_modules',
	'../financiallanguageconverter/DatastoreCluster/node_modules',
	'../excel-connect/node_modules',
	'../docker-connect/node_modules',
	'../lme-core/node_modules',
	'../proxy/node_modules',
	'../demo-apps/node_modules',
	'../lme-data-api/node_modules',
	'../formulajs-connect/node_modules', '../traefik/node_modules'].forEach(module => addModule(module))

module.exports = {
	entry    : [
		'webpack/hot/poll?1000',
		path.resolve(__dirname, '../Production_Run.js')
	],
	watch    : true,
	target   : 'node',
	mode     : 'development',
	externals: [
		{ 'sqlite3': 'commonjs sqlite3' },
		nodeExternals({
			whitelist: ['webpack/hot/poll?1000']
		})
	],
	output   : {
		path    : path.join(__dirname, '.build'),
		filename: 'server.js'
	},
	module   : {
		rules: [{
			test   : /\.js?$/,
			exclude: /node_modules/
		}]
	},
	plugins  : [
		new StartServerPlugin('server.js'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'BUILD_TARGET': JSON.stringify('server')
			}
		})
	],
	devtool  : 'inline-source-map'
}
