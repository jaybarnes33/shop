import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import uploadsRoute from "./routes/uploads.js";

import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

connectDB();
if (!process.env.NODE_ENV) {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/uploads", uploadsRoute);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV ? "production" : "development"
    } mode on port ${process.env.PORT}`.yellow.bold
  );
});
