const express = require("express");
const cors = require("cors")
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Database connection error:", error));

// Start Server

app.use(express.static(path.join(__dirname, './frontend/build')));

// Serve the React app for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
