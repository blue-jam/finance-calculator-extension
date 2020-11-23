const path = require('path');

const outputPath = path.resolve(__dirname, 'build');

module.exports = {
    mode: 'production',
    entry: {
        background: [path.resolve(__dirname, 'src/background.ts')],
        popup: [path.resolve(__dirname, 'src/popup.tsx')],
        options: [path.resolve(__dirname, 'src/options.tsx')],
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
    devtool: 'inline-source-map',
};
