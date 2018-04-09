const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main.ts')
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].bundle.[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['./node_modules', './node_modules']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.(eot|svg|cur)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:20].[ext]',
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash:20].[ext]',
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /.html$/,
                use: [{ loader: 'raw-loader' }]
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            showErrors: true,
            title: 'Webpack App',
            hash: false,
            inject: true,
            compile: true,
            favicon: false,
            minify: false,
            cache: true,
            showErrors: true
        }),
        new CopyWebpackPlugin(
            [
                {
                    context: 'src',
                    to: '',
                    from: {
                        glob: 'assets/**/*',
                        dot: true
                    }
                }
            ]
        )
    ],
    node: {
        fs: 'empty',
        global: true,
        crypto: 'empty',
        tls: 'empty',
        net: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
    devServer: {
        historyApiFallback: true
    }
};
