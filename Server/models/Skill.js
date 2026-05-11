const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "Frontend",
  },
  description: {
    type: String,
    default: "",
  },
  techs: {
    type: [String],
    default: [],
  },
  color: {
    type: String,
    default: "#22d3ee",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Skill", skillSchema);
