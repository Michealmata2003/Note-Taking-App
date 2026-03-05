const Notebook = require("../models/Notebook");

// @desc    Get all notebooks
// @route   GET /api/notebooks
// @access  Private
const getNotebooks = async (req, res) => {
  const notebooks = await Notebook.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, notebooks });
};

// @desc    Create notebook
// @route   POST /api/notebooks
// @access  Private
const createNotebook = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ 
      success: false, 
      message: "Notebook name is required" 
    });
  }

  const notebook = await Notebook.create({ name, user: req.user._id });
  res.status(201).json({ success: true, notebook });
};

// @desc    Update notebook
// @route   PUT /api/notebooks/:id
// @access  Private
const updateNotebook = async (req, res) => {
  const notebook = await Notebook.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name: req.body.name },
    { new: true, runValidators: true }
  );

  if (!notebook) {
    return res.status(404).json({ 
      success: false, 
      message: "Notebook not found" 
    });
  }

  res.status(200).json({ success: true, notebook });
};

// @desc    Delete notebook
// @route   DELETE /api/notebooks/:id
// @access  Private
const deleteNotebook = async (req, res) => {
  const notebook = await Notebook.findOneAndDelete({ 
    _id: req.params.id, 
    user: req.user._id 
  });

  if (!notebook) {
    return res.status(404).json({ 
      success: false, 
      message: "Notebook not found" 
    });
  }

  res.status(200).json({ success: true, message: "Notebook deleted" });
};

module.exports = { getNotebooks, createNotebook, updateNotebook, deleteNotebook };