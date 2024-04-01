import express from "express";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-Commerce",
  });
});

const PORT =process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`.bgGreen.white);
});
