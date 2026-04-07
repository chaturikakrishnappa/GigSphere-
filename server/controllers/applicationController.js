const Application = require("../models/Application");
const Gig = require("../models/Gig");

const applyToGig = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    if (!coverLetter) return res.status(400).json({ message: "Cover letter is required" });

    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    const application = await Application.create({
      gig: req.params.gigId,
      freelancer: req.user.id,
      coverLetter
    });

    return res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: "Already applied to this gig" });
    return res.status(500).json({ message: "Could not apply", error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ freelancer: req.user.id })
      .populate({
        path: "gig",
        populate: { path: "client", select: "name email" }
      })
      .sort({ createdAt: -1 });
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch applications", error: error.message });
  }
};

module.exports = { applyToGig, getMyApplications };
