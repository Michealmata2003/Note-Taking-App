const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  trashNote,
  restoreNote,
  deleteNotePermanent,
  getTrashedNotes,
  togglePin,
  toggleFavourite,
  shareNote,
  uploadNoteImages,
  getReminderNotes,
} = require("../controllers/noteController");

router.use(protect); // All note routes require auth

router.get("/bin", getTrashedNotes);
router.get("/reminders", getReminderNotes);
router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNote).put(updateNote).delete(trashNote);
router.put("/:id/restore", restoreNote);
router.delete("/:id/permanent", deleteNotePermanent);
router.put("/:id/pin", togglePin);
router.put("/:id/favourite", toggleFavourite);
router.post("/:id/share", shareNote);
router.post("/:id/images", upload.array("images", 5), uploadNoteImages);

module.exports = router;