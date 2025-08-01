const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const ownerRoutes = require("./routes/ownerRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const maintenanceRoutes = require("./routes/miscellaneousRoutes");

app.use("/api/owners", ownerRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/misc-expenses", maintenanceRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
