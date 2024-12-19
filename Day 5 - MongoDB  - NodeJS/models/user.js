const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
  age: { type: Number, min: 13 },
});

module.exports = mongoose.model("User", userSchema);