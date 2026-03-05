const Tag = require("../models/Tag");

// @desc    Get all tags
// @route   GET /api/tags
// @access  Private
const getTags = async (req, res) => {
  const tags = await Tag.find({ user: req.user._id }).sort({ name: 1 });
  res.status(200).json({ success: true, tags });
};

// @desc    Create tag
// @route   POST /api/tags
// @access  Private
const createTag = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ 
      success: false, 
      message: "Tag name is required" 
    });
  }

  const tag = await Tag.create({ name, user: req.user._id });
  res.status(201).json({ success: true, tag });
};

// @desc    Rename tag
// @route   PUT /api/tags/:id
// @access  Private
const updateTag = async (req, res) => {
  const tag = await Tag.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name: req.body.name },
    { new: true, runValidators: true }
  );

  if (!tag) {
    return res.status(404).json({ 
      success: false, 
      message: "Tag not found" 
    });
  }

  res.status(200).json({ success: true, tag });
};

// @desc    Delete tag
// @route   DELETE /api/tags/:id
// @access  Private
const deleteTag = async (req, res) => {
  const tag = await Tag.findOneAndDelete({ 
    _id: req.params.id, 
    user: req.user._id 
  });

  if (!tag) {
    return res.status(404).json({ 
      success: false, 
      message: "Tag not found" 
    });
  }

  res.status(200).json({ success: true, message: "Tag deleted" });
};

module.exports = { getTags, createTag, updateTag, deleteTag };