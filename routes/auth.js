import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.send("User registreted");
});

router.post("/login", (req, res) => {
  res.send("User login in!");
});

export default router;
