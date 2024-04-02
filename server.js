import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import coonnectDB from "./config/db.js";

dotenv.config();
coonnectDB()
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-Commerce",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`.bgGreen.white);
});
