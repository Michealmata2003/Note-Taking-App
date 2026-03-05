const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["blank", "todo", "essay", "daily"],
      default: "blank",
    },
    todoItems: [
      {
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    notebook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      default: null,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reminderAt: {
      type: Date,
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    trashedAt: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

noteSchema.pre("save", function () {
  if (this.isModified("isTrashed") && this.isTrashed) {
    this.trashedAt = new Date();
  }
  if (this.isModified("isTrashed") && !this.isTrashed) {
    this.trashedAt = null;
  }
});

module.exports = mongoose.model("Note", noteSchema);