const express = require("express");
const tambolaGameController = require("../controllers/tambola.js");
const router = express.Router();

router.get("/getAllTickets", tambolaGameController.getAllTickets);
router.post("/postTickets/:sets", tambolaGameController.createTickets);

module.exports = router;
