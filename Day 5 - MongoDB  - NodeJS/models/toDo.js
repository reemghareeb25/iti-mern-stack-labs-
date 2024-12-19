const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    index: true,
  },
  status: { type: String, default: "to-do" },
  tags: {
    type: [String],
    validate: [
      (tags) => tags.every((tag) => tag.length <= 10),
      "Tag length exceeds 10 characters",
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);