export default {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
};
