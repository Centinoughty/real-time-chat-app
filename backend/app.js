const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db");

const app = express();
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
