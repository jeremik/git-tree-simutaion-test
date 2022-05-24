- Create new nextjs project: `npx create-next-app@latest --ts` (https://nextjs.org/docs/basic-features/typescript)
- Install Tailwindcss: `yarn add tailwindcss`
- Install ANT Design: `yarn add antd`
- Install sass and less support for antd: `yarn add next-with-less less less-loader sass`
- Install postcss and autoprefixer: `yarn add postcss autoprefixer`

- Create `./postcss.config.js` file:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- Add in `./package.json` file (https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-target-browsers): This is for cross-browser support

```json
"browserslist": [
  "> 1%",
  "last 3 versions",
  "Firefox >= 20",
  "iOS >=7"
],
```

- Move `pages` and `styles` folder to `src` folder
- Update `./next.config.js` file:

```js
/** @type {import('next').NextConfig} */
const withLess = require('next-with-less')
const modifyVars = require('./customTheme.json')

const nextConfig = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars, // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    },
  },
  eslint: {
    dirs: ['src'],
  },
})

module.exports = nextConfig
```

- Create `./tailwind.config.js` file (update base on your preference):

```js
const vars = require('./customTheme.json')

module.exports = {
  mode: 'none',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primary: vars['@teal'],
        secondary: vars['@navy'],
        success: vars['@success'],
        warning: vars['@warning'],
        danger: vars['@danger'],
        pending: vars['@gray'],
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '21px',
        h6: '24px',
        h5: '32px',
        h4: '40px',
        h3: '48px',
        h2: '56px',
        h1: '64px',
      },
      lineHeight: {
        xs: '14px',
        sm: '16px',
        base: '21px',
        lg: '24px',
        xl: '28px',
        h6: '32px',
        h5: '40px',
        h4: '48px',
        h3: '56px',
        h2: '64px',
        h1: '72px',
      },
      spacing: {
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        56: '56px',
        60: '60px',
      },
      borderRadius: {
        none: '0',
        xs: '1px',
        sm: '2px',
        DEFAULT: '4px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // false to avoid conflict with antd default design
  },
}
```

- Create `./customTheme.json` file (update base on your preference, available antd variables: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less):

```json
{
  "@navy": "#0f4476",
  "@teal": "#29a8d2",
  "@black": "#000000",
  "@white": "#ffffff",
  "@gray": "#a0a0a0",
  "@success": "#00a758",
  "@warning": "#e87722",
  "@danger": "#d31145"
}
```

- Create `./src/styles/antd.less` file:

```css
@import '~antd/dist/antd.less';
```

- Rename `./src/styles/globals.css` to `./src/styles/globals.scss`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Additional scss styling here
```

- Update `./src/pages/_app.tsx` and add the following imports:

```js
import '../styles/antd.less'
import '../styles/globals.scss'
```
