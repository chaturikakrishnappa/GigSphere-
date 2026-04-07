const Gig = require("../models/Gig");
const Application = require("../models/Application");

const createGig = async (req, res) => {
  try {
    const { title, description, budget, requiredSkills } = req.body;
    if (!title || !description || !budget || !requiredSkills?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      requiredSkills,
      client: req.user.id
    });

    return res.status(201).json(gig);
  } catch (error) {
    return res.status(500).json({ message: "Could not create gig", error: error.message });
  }
};

const getAllGigs = async (_req, res) => {
  try {
    const gigs = await Gig.find().populate("client", "name email").sort({ createdAt: -1 });
    return res.json(gigs);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch gigs", error: error.message });
  }
};

const getClientGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ client: req.user.id }).sort({ createdAt: -1 });
    return res.json(gigs);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch client gigs", error: error.message });
  }
};

const getGigApplicants = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (gig.client.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const applicants = await Application.find({ gig: req.params.id })
      .populate("freelancer", "name email skills bio")
      .sort({ createdAt: -1 });

    return res.json(applicants);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch applicants", error: error.message });
  }
};

module.exports = { createGig, getAllGigs, getClientGigs, getGigApplicants };
