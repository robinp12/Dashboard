module.exports = {
	// Example setup for your project:
	// The entry module that requires or imports the rest of your project.
	// Must start with `./`!
	entry: './src/entry.js',
	// Place output files in `./dist/my-app.js`
	output: {
		path: __dirname + '/dist',
		filename: 'my-app.js',
	},
	mode: "development",
	target: "node",
	// https://github.com/node-fetch/node-fetch/issues/450
	resolve: {
	        extensions: [".js"],
		mainFields: ["main"],
	},
	stats: {
        	warningsFilter: "Module not found: Error: Can't resolve 'encoding'"
	},
	module: {
		rules: [
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
		],
	},
};
