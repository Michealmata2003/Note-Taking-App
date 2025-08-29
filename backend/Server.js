const express = require("express");
const sequelize = require("./db");
const User = require("./models/User");
const Note = require("./models/Note");
const cors = require("cors");




const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
// connect and sync
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error:", err));

app.get("/", (req, res) => {
  res.send("Notes App Backend Running...");
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
