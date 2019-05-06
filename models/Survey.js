const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchmea = require("./Recipient");
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchmea],
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dataSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
