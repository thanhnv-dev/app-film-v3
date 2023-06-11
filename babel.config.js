module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.json',
                    '.ts',
                    '.tsx',
                    '.jpg',
                    '.png',
                ],
                alias: {
                    src: './src',
                },
            },
        ],
    ],
};
