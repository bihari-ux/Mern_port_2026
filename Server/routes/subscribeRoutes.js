const express = require("express");
const router = express.Router();
const { createSubscription, listSubscriptions } = require("../controllers/subscribeController");
const authMiddleware = require("../middleware/authMiddleware");

// public create
router.post("/", createSubscription);

// protected list
router.get("/", authMiddleware, listSubscriptions);

// protected delete
const { deleteSubscription } = require("../controllers/subscribeController");
router.delete("/:id", authMiddleware, deleteSubscription);

module.exports = router;
