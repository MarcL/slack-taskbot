module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['import', 'prettier'],
    env: {
        mocha: true
    },
    globals: {
        chai: true,
        expect: true,
        sinon: true
    },
    rules: {
        indent: ['error', 4],
        'comma-dangle': 0,
        'object-curly-spacing': 0,
        'prettier/prettier': 'error'
    }
};
