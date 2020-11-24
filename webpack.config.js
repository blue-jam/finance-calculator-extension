const path = require('path');

const environment = process.env.NODE_ENV || 'dev';
const devtool = environment === 'dev' ? 'inline-source-map' : undefined;

const outputPath = path.resolve(__dirname, 'build');

module.exports = {
    entry: {
        background: [path.resolve(__dirname, 'src/background.ts')],
        options: [path.resolve(__dirname, 'src/options.tsx')],
        contentScripts: [path.resolve(__dirname, 'src/contentScripts.tsx')],
    },
    output: {
        path: outputPath,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /.tsx?$/i,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: devtool,
};
