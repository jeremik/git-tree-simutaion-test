/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');
const modifyVars = require('./customTheme.json');

const nextConfig = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars, // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    },
  },
  eslint: {
    dirs: ['src'],
  },
});

module.exports = nextConfig;
