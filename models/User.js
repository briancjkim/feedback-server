const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  facebookId: String,
  githubId: String,
  googleId: String,
  avatarUrl: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
mongoose.model("user", userSchema);
