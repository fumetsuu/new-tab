const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
})

module.exports = {
	devtool: 'source-map',
	entry: ['./src/js/app.js'],
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: 'app.bundle.js',
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{
				test: /\.sass$/,
				use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'imgs/[name].[ext]'
				}
			},
			{ test: /\.html$/, use: 'html-loader' }
		]
	},
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}
