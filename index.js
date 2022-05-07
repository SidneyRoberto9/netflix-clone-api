const moviesRoutes = require("./routes/movies");
const seriesRoutes = require("./routes/series");
const userRoutes = require("./routes/users");
const listRoutes = require("./routes/lists");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/lists", listRoutes);

app.listen(PORT, () => {
  console.log("Backend server is running on port " + PORT);
});
