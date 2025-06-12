// react-native.config.js

console.log("React Native config for hgs-auth loaded");

module.exports = {
    dependencies: {
        'react-native-hgs-auth': {
            root: __dirname,
            platforms: {
                ios: {
                    podspecPath: 'ios/HgsAuth.podspec',
                },
                android: {
                    sourceDir: './android',
                },
            },
        },
    },
};
