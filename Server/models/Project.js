const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  githubLink: {
    type: String,
    default: "",
  },
  liveLink: {
    type: String,
    default: "",
  },
  techStack: {
    type: [String],
    default: [],
  },
  tag: {
    type: String,
    default: "Web App",
  },
  color: {
    type: String,
    default: "#22d3ee",
  },
  year: {
    type: String,
    default: "",
  },
  stars: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  highlights: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Project", projectSchema);
