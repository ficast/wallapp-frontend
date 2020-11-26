module.exports = {
  plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-runtime"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
  ],
};
