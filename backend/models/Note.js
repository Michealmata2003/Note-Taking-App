// backend/models/Note.js
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Note;
};
