const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

router.post("/", sendMessage);
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markMessageRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
