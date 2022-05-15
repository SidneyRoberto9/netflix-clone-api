import MoviesRouter from "./routes/movies";
import ListsRouter from "./routes/lists";
import UsersRouter from "./routes/users";
import AuthRouter from "./routes/auth";

import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const options: cors.CorsOptions = {
  origin: "*",
};

app.use(cors(options));
app.use(express.json());

dotenv.config({ path: __dirname + "/.env" });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

app.use("/api/auth", AuthRouter);
app.use("/api/lists", ListsRouter);
app.use("/api/movies", MoviesRouter);
app.use("/api/users", UsersRouter);

app.listen(PORT, () => {
  console.log("Backend server is running on port " + PORT);
});
