const express = require("express");
const auth = require("../middleware/auth");
const { applyToGig, getMyApplications } = require("../controllers/applicationController");

const router = express.Router();

router.post("/:gigId", auth(["freelancer"]), applyToGig);
router.get("/my", auth(["freelancer"]), getMyApplications);

module.exports = router;
