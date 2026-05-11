const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

exports.addProject = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      techStack: Array.isArray(req.body.techStack)
        ? req.body.techStack
        : String(req.body.techStack || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      highlights: Array.isArray(req.body.highlights)
        ? req.body.highlights
        : String(req.body.highlights || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    };

    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Failed to create project", error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      techStack: Array.isArray(req.body.techStack)
        ? req.body.techStack
        : String(req.body.techStack || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      highlights: Array.isArray(req.body.highlights)
        ? req.body.highlights
        : String(req.body.highlights || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    };

    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project", error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
