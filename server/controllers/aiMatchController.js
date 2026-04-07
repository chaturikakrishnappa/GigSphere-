const Gig = require("../models/Gig");
const User = require("../models/User");

const normalizeSkills = (skills) => skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean);

const calculateMatchScore = (requiredSkills, freelancerSkills) => {
  const required = normalizeSkills(requiredSkills);
  const available = new Set(normalizeSkills(freelancerSkills));
  if (!required.length) return 0;

  const matchedCount = required.filter((skill) => available.has(skill)).length;
  return Math.round((matchedCount / required.length) * 100);
};

const getMatchesForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId).populate("client", "_id");
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.client._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only gig owner can view matches" });
    }

    const freelancers = await User.find({ role: "freelancer" }).select("name email skills bio");
    const matches = freelancers
      .map((freelancer) => ({
        freelancer,
        matchScore: calculateMatchScore(gig.requiredSkills, freelancer.skills || [])
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    return res.json({ gig, matches });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate matches", error: error.message });
  }
};

module.exports = { getMatchesForGig };
