if (process.env.NODE_ENV === "production") {
  // production  return the prodc set of keys
  module.exports = require("./prod");
} else {
  // return the dev keys
  module.exports = require("./dev");
}
