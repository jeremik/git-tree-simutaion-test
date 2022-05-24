## ESLint

- Add typescript eslint package: `yarn add --dev @typescript-eslint/eslint-plugin`
- Replace `.eslintrc.json` file:

```json
{
  "plugins": ["@typescript-eslint"],
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

## Prettier

- Add prettier package: `yarn add --dev prettier eslint-config-prettier`
- Create `.prettierrc.json` file (Reference: https://prettier.io/playground):

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

- Add `prettier` in `.eslintrc.json`:

```json
// .eslintrc.json
{
  // ...
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier" // Add "prettier" last. This will turn off eslint rules conflicting with prettier. This is not what will format our code.
  ]
  // ...
}
```

- Create `.vscode/settings.json` file:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // Add those two lines:
  "editor.formatOnSave": true, // Tell VSCode to format files on save
  "editor.defaultFormatter": "esbenp.prettier-vscode" // Tell VSCode to use Prettier as default file formatter
}
```

## Husky

- Add husky: `yarn add --dev husky`
- Install husky(need to run every setup): `yarn husky install`

## Husky Lint Stage

- Add lintstage package: `yarn add --dev lint-staged`
- Add husky pre-commit hook: `yarn husky add .husky/pre-commit "yarn lint-staged"`
- Create `.lintstagedrc.js` file:

```js
module.exports = {
  // Type check TypeScript files
  '*.{ts,tsx}': () => 'yarn tsc --noEmit',

  // Lint then format TypeScript files
  '**/*.(ts|tsx)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
}
```

## Husky Commitlint

- Add commitlint package: `yarn add --dev @commitlint/cli @commitlint/config-conventional`
- Add husky commit-msg hook: `yarn husky add .husky/commit-msg 'npx --no-install commitlint --edit ""`
- Create `commitlint.config.js` file (Reference: https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md):

```js
module.exports = {
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: ['ES-'],
    },
  },
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
}
```
