const Skill = require("../models/Skill");

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ _id: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      techs: Array.isArray(req.body.techs)
        ? req.body.techs
        : String(req.body.techs || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    };

    const skill = await Skill.create(payload);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: "Failed to create skill", error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      techs: Array.isArray(req.body.techs)
        ? req.body.techs
        : String(req.body.techs || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    };

    const skill = await Skill.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: "Failed to update skill", error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
