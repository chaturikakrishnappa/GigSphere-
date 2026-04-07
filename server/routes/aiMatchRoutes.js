const express = require("express");
const auth = require("../middleware/auth");
const { getMatchesForGig } = require("../controllers/aiMatchController");

const router = express.Router();

router.get("/:gigId", auth(["client"]), getMatchesForGig);

module.exports = router;
