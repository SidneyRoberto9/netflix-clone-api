const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("Backend server is running on port 8800");
});
