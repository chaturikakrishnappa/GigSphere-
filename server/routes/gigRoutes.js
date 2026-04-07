const express = require("express");
const auth = require("../middleware/auth");
const {
  createGig,
  getAllGigs,
  getClientGigs,
  getGigApplicants
} = require("../controllers/gigController");

const router = express.Router();

router.get("/", auth(), getAllGigs);
router.post("/", auth(["client"]), createGig);
router.get("/my-gigs", auth(["client"]), getClientGigs);
router.get("/:id/applicants", auth(["client"]), getGigApplicants);

module.exports = router;
