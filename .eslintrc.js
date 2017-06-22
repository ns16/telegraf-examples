module.exports = {
  parser: "babel-eslint",
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb-base',
  'modules': [
    'class-property'
  ],
  // required to lint *.vue files
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    'import/no-unresolved': 0,
    'no-param-reassign': ['error', { 'props': false }],
    'max-len': ['warn', 80],
    'spaced-comment': ['warn'],
    'semi': ["error", 'never'],
    'no-undef': ['warn'],
    'comma-dangle': 0,
    'no-unused-vars': 1,
    'class-methods-use-this': ['warn'],
    'no-restricted-syntax': 0,
    'new-cap': 0,
    'no-console': 0,
    'no-continue': 0,
    'no-new': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
