const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            components: 'src/app/components',
            containers: 'src/app/containers',
            core: 'src/app/core',
            atoms: 'src/app/core/atoms',
            molecules: 'src/app/core/molecules',
            packages: 'src/app/core/packages',
            global: 'src/app/core/global',
            api: 'src/app/core/api',
            reducers: 'src/app/data-reducers',
            selectors: 'src/app/data-selectors',
        },
        extensions: [ '', '.js', '.jsx', 'css', 'scss' ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'react-hot', 'babel' ],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: [ 'style', 'css', 'sass' ]
            }
        ]
    }
};
