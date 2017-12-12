module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      pragma: 'h'
    }
  },
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-use-before-define': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'no-console': 'off'
  },
  overrides: {
    files: 'src/**.js',
    env: {
      node: false,
      browser: true
    }
  }
}
