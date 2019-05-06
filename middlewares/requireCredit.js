module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // 403 is forbidden
    return res.status(403).send({ error: "Not enough credit" });
  }
  next();
};
