const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const keys = require("./config/keys");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./db");
require("./models/User");
require("./services/passport");

const app = express();

const mongoStore = new MongoStore(session);

// enable app to use cookie&session
// express-session vs cookie-session
// cookie-session 는 cookie에 user정보를 담고 그것을 req.session에 넣어서 passport가 req.session에 접근한후 deserialize한다.
// expres-session cookie는 user정보를 session_id에 담고  session store에서 session id를찾아서 user id를찾는다.
app.use(
  session({
    secret: keys.cookieKey,
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );

// enable passport to use cookie to save user.id
app.use(passport.initialize());
app.use(passport.session());

require("./router/authRouter")(app);

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
