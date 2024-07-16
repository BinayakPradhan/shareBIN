const mongoose = require("mongoose");
const { type } = require("os");

mongoose
  .connect(
    "mongodb+srv://binayakprdhn:Lu6jtMXkTThpK7R4@sharebin.vofr3hi.mongodb.net/shareBin?retryWrites=true&w=majority&appName=shareBin"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log(e);
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;
