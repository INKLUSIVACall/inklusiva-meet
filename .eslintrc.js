module.exports = {
    'extends': [
        '@jitsi/eslint-config',
        'plugin:react/recommended'
    ],
    'rules': {
        'react/jsx-equals-spacing': [ 2, 'never' ],
        'require-jsdoc': '0'
    },
    'ignorePatterns': [ '*.d.ts' ],
    parserOptions: {
        tsconfigRootDir: __dirname
    }
};
