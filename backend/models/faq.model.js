const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    questionId: {
      type: String,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
