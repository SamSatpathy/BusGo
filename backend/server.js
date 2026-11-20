const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

app.use(cors()); // for now OK, change to restricted origin after deploy
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("BusGo API is running");
});

app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", authRoutes);

// Global Error Handler - ADD THIS
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Server Error" });
});

app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});

app.use(cors({
  origin: "process.env.FRONTEND_URL", // <- your Vercel link here
  credentials: true
}))