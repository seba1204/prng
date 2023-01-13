const prod = process.env.NODE_ENV === 'production';

import path from 'path';

import dotenv from 'dotenv';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const mode = prod ? 'production' : 'development';
dotenv.config({ path: prod ? 'prod.env' : 'dev.env' });

// entry point of parsing
export const entry = './src/index.tsx';
// output folder
export const output = {
    path: __dirname + '/dist/',
    publicPath: "/", // for dev server
};
// setup rules for parsing
export const module = {
    rules: [
        // use ts-loader for all typescript files
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            use: 'ts-loader',
        },
        // use css-loader for all css files
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(fbx|gltf)$/i,
            use: 'file-loader',
        },
        {
            test: /\.glsl$/i,
            loader: 'webpack-glsl-loader',
        },
        // load SASS
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
        // load text files
        {
            test: /\.txt$/,
            use: 'raw-loader'
        },
        // load json files
        {
            test: /\.json$/,
            type: 'javascript/auto',
            use: 'json-loader'
        },
    ],
    // don't parse typescript files with babel
    noParse: [require.resolve('typescript/lib/typescript.js')],
};

// resolve extensions for importing files without specifying extension name
// in import statement, e.g. import { App } from './App';
export const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
        "path": require.resolve("path-browserify"),
    }
};

// source map allows us to see the original code in the browser
// for easier debugging, it is not needed in production
export const devtool = prod ? undefined : 'source-map';
export const devServer = prod ? undefined : {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: process.env.PORT || 3200,
    open: true,
    hot: true
};

// add plugins that will be used in the build pipeline
export const plugins = [
    // use index.html as a template for the output html file
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
    }),

    // compile css into one file
    new MiniCssExtractPlugin(),

    // Use ForkTsCheckerWebpackPlugin to speed up compilation and type checking
    // by running it in a separate process and caching results.
    new ForkTsCheckerWebpackPlugin(),

];