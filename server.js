import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./db/index.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

configDotenv();

const app = express();

app.use(express.json());

const HOST = process.env.HOST || "localhost";

const PORT = process.env.PORT || 3333;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed connected to MongoDB & start server", error);
  });

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
