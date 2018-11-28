// var path = require('path');
// var webpack = require('webpack');

module.exports = 
{
    entry: 
    {
        ClientState: './class/client/clientState.js',
        Movable: './class/common/movable.js',
    },
    mode: 'production',
    // mode: 'development',
    target: 'web',
    output: 
    {
        library: "[name]",
		libraryTarget: "umd",
        path: __dirname+'/public/scripts/dist/',
        filename: "[name].js"
    },
    // stats: 
    // {
    //     colors: true // Nice colored output
    // },
    // devtool: 'source-map' // Create Sourcemaps for the bundle
};
