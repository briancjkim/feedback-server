const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const keys = require("./config/keys");
const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./db");
require("./models/User");
require("./services/passport");

const app = express();

const mongoStore = new MongoStore(session);

// enable app to use cookie&session
// express-session vs cookie-session
// cookie-session 는 cookie에 user정보를 담고 그것을 req.session에 넣어서 passport가 req.session에 접근한후 deserialize한다.
// expres-session cookie는 user정보를 session_id에 담고  session store에서 session id를찾아서 user id를찾는다.
// express는 기본적으로 post에서 오는내용을 받을 수없어서 bodyparser써야함.
app.use(bodyParser.json());
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
require("./router/billingRouter")(app);

if (process.env.NODE_ENV === "production") {
  // main.js 나 css파일이 index.html에서 요청됬을시에 server에는 없으므로
  // path를 지정해줘야한다 그래서 client/build폴더를 검색하도록 설정.
  app.use(express.static("client/build"));
  // server에 없는 route을 client에서 원하면 index.html파일을 보낸다
  // html 파일이 로드되야 react상에 react-router가 작동하여 pagerefresh안되고 바로나온다.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
