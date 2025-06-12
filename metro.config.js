const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
    projectRoot: __dirname,
    watchFolders: [path.resolve(__dirname, '..')], // or wherever your monorepo root is
    resolver: {
        blacklistRE: exclusionList([/node_modules\/.*\/node_modules\/react-native\/.*/]),
    },
};