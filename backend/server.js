import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import Order from "./models/Order.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
const __dirname = path.resolve();

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
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  );
});
