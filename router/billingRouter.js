const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const onlyPrivate = require("../middlewares/onlyPrivate");

module.exports = app => {
  // strip doc https://stripe.com/docs/api/charges/create
  app.post("/api/stripe", onlyPrivate, async (req, res) => {
    // create함수가 promise 리턴하기땜시 비동기
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "aud",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    req.user.credits += 5;
    // req.user and user saved in different memory.
    // try to return most latest object
    const user = await req.user.save();
    res.send(user);
  });
};
