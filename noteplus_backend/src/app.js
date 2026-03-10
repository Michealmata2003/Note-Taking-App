const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const notebookRoutes = require("./routes/notebookRoutes");
const tagRoutes = require("./routes/tagRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ─── Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use("/api/tags", tagRoutes);

// ─── Health Check ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "NotePlus API is running 🚀" });
});

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// ─── Global Error Handler ─────────────────────────────────
app.use(errorHandler);

module.exports = app;