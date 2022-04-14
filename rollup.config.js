import importAssertions from 'rollup-plugin-import-assertions';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [importAssertions()]
};
