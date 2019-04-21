const mongoose = require("mongoose");
const keys = require("./config/keys");
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("on", () => console.log("connected to DB"));
db.on("error", () => console.log(" Error toconnected to DB"));
