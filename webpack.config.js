const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss', '.sass'],
    },
};
