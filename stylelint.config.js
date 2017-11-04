module.exports = {
  'extends': [
    'stylelint-config-standard'
  ],
  'plugins': [
    'stylelint-scss'
  ],
  'rules': {
    'selector-pseudo-element-colon-notation': null,
    'number-no-trailing-zeros': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [true, {
      'ignoreAtRules': ['/^import-/']
    }]
  }
}
