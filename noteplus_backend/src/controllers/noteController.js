const Note = require("../models/Note");

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  const { notebook, tag, pinned, favourite, reminder, search } = req.query;

  const filter = { user: req.user._id, isTrashed: false };

  if (notebook) filter.notebook = notebook;
  if (tag) filter.tags = tag;
  if (pinned === "true") filter.isPinned = true;
  if (favourite === "true") filter.isFavourite = true;
  if (reminder === "true") filter.reminderAt = { $ne: null };
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const notes = await Note.find(filter)
    .populate("notebook", "name")
    .populate("tags", "name")
    .populate("sharedWith", "name email avatar")
    .sort({ isPinned: -1, updatedAt: -1 });

  res.status(200).json({ success: true, count: notes.length, notes });
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
const getNote = async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    $or: [{ user: req.user._id }, { sharedWith: req.user._id }],
  })
    .populate("notebook", "name")
    .populate("tags", "name")
    .populate("sharedWith", "name email avatar");

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  res.status(200).json({ success: true, note });
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  const { title, content, type, todoItems, notebook, tags, reminderAt } = req.body;

  const note = await Note.create({
    title,
    content,
    type,
    todoItems,
    notebook,
    tags,
    reminderAt,
    user: req.user._id,
  });

  res.status(201).json({ success: true, note });
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  let note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, note });
};

// @desc    Soft delete (move to trash)
// @route   DELETE /api/notes/:id
// @access  Private
const trashNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note.isTrashed = true;
  await note.save();

  res.status(200).json({ success: true, message: "Note moved to trash" });
};

// @desc    Restore note from trash
// @route   PUT /api/notes/:id/restore
// @access  Private
const restoreNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note.isTrashed = false;
  await note.save();

  res.status(200).json({ success: true, message: "Note restored" });
};

// @desc    Permanently delete a note
// @route   DELETE /api/notes/:id/permanent
// @access  Private
const deleteNotePermanent = async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  res.status(200).json({ success: true, message: "Note permanently deleted" });
};

// @desc    Get all trashed notes
// @route   GET /api/notes/bin
// @access  Private
const getTrashedNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id, isTrashed: true })
    .sort({ trashedAt: -1 });

  res.status(200).json({ success: true, count: notes.length, notes });
};

// @desc    Toggle pin
// @route   PUT /api/notes/:id/pin
// @access  Private
const togglePin = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note.isPinned = !note.isPinned;
  await note.save();

  res.status(200).json({ success: true, isPinned: note.isPinned });
};

// @desc    Toggle favourite
// @route   PUT /api/notes/:id/favourite
// @access  Private
const toggleFavourite = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  note.isFavourite = !note.isFavourite;
  await note.save();

  res.status(200).json({ success: true, isFavourite: note.isFavourite });
};

// @desc    Share note with another user
// @route   POST /api/notes/:id/share
// @access  Private
const shareNote = async (req, res) => {
  const { userId } = req.body;

  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  if (note.sharedWith.includes(userId)) {
    return res.status(400).json({ 
      success: false, 
      message: "Already shared with this user" 
    });
  }

  note.sharedWith.push(userId);
  await note.save();

  res.status(200).json({ success: true, message: "Note shared successfully" });
};

// @desc    Upload images to a note
// @route   POST /api/notes/:id/images
// @access  Private
const uploadNoteImages = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  const uploaded = req.files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  note.images.push(...uploaded);
  await note.save();

  res.status(200).json({ success: true, images: note.images });
};

// @desc    Get all reminder notes
// @route   GET /api/notes/reminders
// @access  Private
const getReminderNotes = async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
    isTrashed: false,
    reminderAt: { $ne: null },
  }).sort({ reminderAt: 1 });

  res.status(200).json({ success: true, count: notes.length, notes });
};

module.exports = {
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
};