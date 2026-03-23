import { Router } from "express";
import { authJWT } from "../middleware/authJwt.js";
import { getDB } from "../db/index.js";

const router = Router();

router.get("/get", async (req, res) => {
  try {
    const db = getDB();
    const posts = await db.collection("posts").find().toArray();
    res.status(200).json({ message: "Fetched all posts", posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

router.post("/create", authJWT, async (req, res) => {
  try {
    const db = getDB();
    const { title, text } = req.body;
    if (!title || !text) {
      res.status(400).json({ message: "Title and text is required!" });
    }
    const newPost = await db.collection("posts").insertOne({ title, text });
    res.status(201).json({ message: "Post successfully created!", newPost });
  } catch (error) {
    res.status(500).json({ error: "Created post error", error });
  }
});

export default router;
