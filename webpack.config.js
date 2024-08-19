const path = require('path');

module.exports = {
  entry: {
    main: './src/scripts/script.ts',      // Użyj względnej ścieżki
    subpage: './src/plugins/plugins-script.ts', // Użyj względnej ścieżki
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // lub 'production'
};
