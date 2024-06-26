import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import coonnectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config();
coonnectDB();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-Commerce",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`.bgGreen.white);
});
