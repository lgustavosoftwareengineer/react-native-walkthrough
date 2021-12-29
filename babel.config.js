module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          'tooltip-element': './src/tooltip-element',
          walkthrough: './src/walkthrough',
        },
      },
    ],
  ],
};
