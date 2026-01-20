import express from "express";

const router = express.Router();

router.get("/users", (req, res) => {
  res.json([]);
});

router.get("/reports", (req, res) => {
  res.json({ message: "Reports placeholder" });
});

export default router;
