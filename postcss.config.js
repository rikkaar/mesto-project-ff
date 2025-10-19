const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const isProduction = process.env.NODE_ENV === "production";

const plugins = [autoprefixer];

if (isProduction) {
  plugins.push(cssnano({ preset: "default" }));
}

module.exports = {
  plugins,
};
