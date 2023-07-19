const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://luuvu:luuvu123@cluster0.f2bxuxz.mongodb.net/netflix",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api/user", userRoutes);
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
