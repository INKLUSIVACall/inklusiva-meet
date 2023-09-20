module.exports = {
    'extends': [
        '@jitsi/eslint-config'
    ],
    'ignorePatterns': [ '*.d.ts' ],
    parserOptions: {
        tsconfigRootDir: __dirname
    }
};
