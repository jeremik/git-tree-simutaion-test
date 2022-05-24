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
};
