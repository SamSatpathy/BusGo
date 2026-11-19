const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const cors = require("cors")
const busRoutes = require("./routes/busRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const authRoutes = require("./routes/authRoutes")
const app = express()

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("BusGo API is running")
});
app.use("/api/buses", busRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api", authRoutes)
app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});