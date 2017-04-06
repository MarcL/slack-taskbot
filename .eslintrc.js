module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "env": {
        "mocha": true
    },
    "globals": {
        "chai": true,
        "expect": true,
        "sinon": true
    },
    "rules": {
        "indent": ["error", 4],
        "comma-dangle": 0,
        "object-curly-spacing": 0
    }
};