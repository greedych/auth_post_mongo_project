import { Router } from "express";
import { getDB } from "../db/index.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    const existingUser = await db.collection("users").findOne({ email });
    if (!username || !email) {
      return res.status(400).json({ message: "Name and email are required!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required!!!" });
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists!", email: email });
    }

    const newUser = await db.collection("users").insertOne({
      username: username,
      email: email,
      password: await bcrypt.hash(password, 5),
    });
    res
      .status(201)
      .json({ message: "User successfully registered!", data: newUser });
  } catch (error) {
    res.status(500).json({ error: "Faid create user!" });
  }
});

router.post("/login", (req, res) => {
  res.send("User login in!");
});

export default router;
