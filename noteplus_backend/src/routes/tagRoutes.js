const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { 
  getTags, 
  createTag, 
  updateTag, 
  deleteTag 
} = require("../controllers/tagController");

router.use(protect);
router.route("/").get(getTags).post(createTag);
router.route("/:id").put(updateTag).delete(deleteTag);

module.exports = router;