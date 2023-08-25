const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(path.resolve(), ".env") });
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/user", userRoutes);
app.listen(5001, () => {
  console.log("Server has started on port 5000");
});
