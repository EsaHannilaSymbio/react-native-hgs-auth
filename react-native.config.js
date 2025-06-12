// react-native.config.js
module.exports = {
    dependencies: {
        'react-native-hgs-auth': {
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
