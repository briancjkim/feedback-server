module.exports = (req, res, next) => {
  if (!req.user) {
    // res.status(401).send({ error: "you must log in!" });
    res.redirect("/");
    return;
  }
  next();
};
