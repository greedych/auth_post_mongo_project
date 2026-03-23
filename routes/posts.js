import { Router } from "express";

const router = Router();

router.get("/get", (req, res) => {
  res.send("Geted all posts");
});

router.post("/create", (req, res) => {
  res.send("Post is created");
});

export default router;
