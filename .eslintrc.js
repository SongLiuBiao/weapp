module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "globals": {
    "__static": true,
    "document": true,
    "navigator": true,
    "window": true,
    "node": true,
    "API": true
  },
  "extends": [
    "taro"
  ],
  "plugins": [
    "@typescript-eslint",
    "typescript",
    "react"
  ],
  "rules": {
    "arrow-parens": "off",
    "react/no-unused-state": "off",
    "generator-star-spacing": "off",
    "import/prefer-default-export": "off",
    "no-debugger": "off",
    "no-extra-semi": "error",
    "no-unreachable": "error",
    "no-useless-return": "off",
    "no-dupe-class-members": "off",
    "no-useless-constructor": "off",
    "no-restricted-globals": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/no-did-update-set-state": "off",
     // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    "eqeqeq": [ "error", "always", { "null": "ignore"}],
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    "typescript/class-name-casing": "error",
    "indent": [ 'error', 2,{ SwitchCase: 1, flatTernaryExpressions: true }],
    "no-unused-vars": ["off", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true,
    "node": true
  }
}
