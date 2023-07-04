module.exports = {
  'root': true,
  "extends": [
    // "eslint:recommended",
    'stylelint-config-standard',
    // 'stylelint-config-prettier',
  ],
  "ignoreFiles": [
    "app/bootstrap/**/*.less",
    "src/assets/styles/core/lib/*.scss",
    "src/assets/styles/app.css",
    "public/assets/styles/*.css"
  ],
  'globals': {
    'wp': true,
  },
  'env': {
    'node': true,
    'es6': true,
    'amd': true,
    'browser': true,
    'jquery': true,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'globalReturn': true,
      'generators': false,
      'objectLiteralDuplicateProperties': false,
      'experimentalObjectRestSpread': true,
    },
    'ecmaVersion': 2017,
    'sourceType': 'module',
  },
 
  "plugins": [
    // "@typescript-eslint",
    // 'import',
  ],
  'settings': {
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  'rules': {
    "block-opening-brace-space-before": null,
    "at-rule-empty-line-before": null,
    "rule-empty-line-before": null,
    "no-eol-whitespace": null,
    "no-descending-specificity": null,
    "declaration-colon-space-after": null,
    "no-missing-end-of-source-newline": null,
    "selector-list-comma-newline-after": 'always-multi-line',
    "block-closing-brace-empty-line-before": 'never',
    "selector-descendant-combinator-no-non-space": true,
    "shorthand-property-no-redundant-values": true,
    "number-leading-zero": 'never',
    "declaration-empty-line-before": 'never',
    "selector-pseudo-class-parentheses-space-inside": 'never',
    "selector-pseudo-element-colon-notation": 'single',
    "function-comma-space-after": 'always',
    "block-closing-brace-newline-after": 'always',
    "block-closing-brace-newline-after": 'always',
    "selector-combinator-space-after": 'always',
    "selector-combinator-space-before": 'always',
    "block-closing-brace-newline-before": 'always',
    "declaration-block-trailing-semicolon": 'always',
    "color-hex-case": 'lower',
    "comment-empty-line-before": 'never',
    "declaration-colon-space-before": 'never',
    "selector-list-comma-space-before": 'never',
    "max-empty-lines": 1,
    "indentation": 2,
    "media-feature-name-no-unknown": [true, {
      "ignoreMediaFeatureNames": ["prefers-reduced-motion"]
    }],
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin", "screen", "apply", "layer", "for", "tailwind",  "@tailwind", "extend"]
    }],
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["focus-visible"]
    }],
    "selector-type-no-unknown": [true, {
      "ignoreTypes": ["embeddedservice-chat-header"]
    }],
    
  },
};
