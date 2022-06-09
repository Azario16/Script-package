const CopyPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: (devServerConfig) => {
        devServerConfig.devMiddleware = {
            index: true,
            mimeTypes: { phtml: 'text/html' },
            publicPath: '/public',
            serverSideRender: true,
            writeToDisk: true,
        };

        return devServerConfig;
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            const webpackConfigplugins = webpackConfig.plugins
            // webpackConfigplugins.push(new CopyPlugin({
            //     patterns: [
            //         { from: "public", to: "" }
            //     ],
            // }))

            // webpackConfig.module.rules = []
            // webpackConfig.module.rules[1].oneOf = []

            webpackConfigplugins[5].options.filename = "static/css/[name].css"

            const webpackConfigCurrentResolve = webpackConfig.resolve
            webpackConfigCurrentResolve["fallback"] = { "url": false }
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' &&
                        require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
                    content: './src/chrome/content.ts',
                    background: './src/chrome/background.ts'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
}
