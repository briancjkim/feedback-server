const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const GithubStrategy = require("passport-github");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const isDev = process.env.NODE_ENV !== "production";

// schmea 를 2번째 변수로 안넣으면 모델을호출하는거임.
const User = mongoose.model("user");

// user는 callbackmethod 에서 done()으로 반환되는 user임.
passport.serializeUser((user, done) => {
  // user.id (mongodb)에서 생성되는 아이디를 쿠키에 serialise 해서 넣음
  done(null, user.id);
});

// deserialize 한뒤에 req.user에 user정보를넣는다.
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  }
});

// local
passport.use(User.createStrategy());

// google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // 이주소는 해커가 마음대로 자기네주소로 바꿀수잇기때문에 googleapi 에서 callbackURI와 반드시 같은 uri여야한다!
      callbackURL: isDev
        ? "http://localhost:5000/auth/google/callback"
        : "https://quiet-meadow-17520.herokuapp.com/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        //첫번쨰 arg는 err
        done(null, user);
      } else {
        const newUser = await new User({ googleId: profile.id }).save();
        done(null, newUser);
      }
    }
  )
);

// github
passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: isDev
        ? "http://localhost:5000/auth/github/callback"
        : "https://quiet-meadow-17520.herokuapp.com/auth/github/callback"
    },
    async (_, __, profile, done) => {
      const {
        _json: { id, avatar_url, name, email }
      } = profile;
      const user = await User.findOne({ githubId: id });
      if (user) {
        user.avatarUrl = avatar_url;
        await user.save();
        done(null, user);
      } else {
        const newUser = await User.create({
          githubId: id,
          avatarUrl: avatar_url,
          name,
          email
        });
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: isDev
        ? "http://localhost:5000/auth/facebook/callback"
        : "https://quiet-meadow-17520.herokuapp.com/auth/facebook/callback"
    },
    async (_, __, profile, done) => {
      const {
        id,
        _json: { name, email }
      } = profile;
      try {
        const user = await User.findOne({ facebookId: id });
        if (user) {
          user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
          await user.save();
          done(null, user);
        } else {
          const newUser = await User.create({
            facebookId: id,
            name,
            email,
            avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
          });
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
