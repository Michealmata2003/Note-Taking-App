const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { 
  getNotebooks, 
  createNotebook, 
  updateNotebook, 
  deleteNotebook 
} = require("../controllers/notebookController");

router.use(protect);
router.route("/").get(getNotebooks).post(createNotebook);
router.route("/:id").put(updateNotebook).delete(deleteNotebook);

module.exports = router;