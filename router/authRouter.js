const passport = require("passport");
const onlyPrivate = require("../middlewares/onlyPrivate");
const onlyPublic = require("../middlewares/onlyPublic");

module.exports = app => {
  // google
  app.get(
    "/auth/google",
    onlyPublic,
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    onlyPublic,
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  // github
  app.get("/auth/github", onlyPublic, passport.authenticate("github"));
  app.get(
    "/auth/github/callback",
    onlyPublic,
    passport.authenticate("github", {
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // facebook
  app.get("/auth/facebook", onlyPublic, passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    onlyPublic,
    passport.authenticate("facebook", {
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // api
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", onlyPrivate, (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
