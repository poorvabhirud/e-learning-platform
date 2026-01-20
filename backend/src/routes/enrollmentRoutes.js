import express from "express";

const router = express.Router();

router.post("/enroll", (req, res) => {
  res.json({ message: "Enroll placeholder" });
});

router.get("/enrollments/me", (req, res) => {
  res.json([]);
});

router.put("/enrollments/:id/progress", (req, res) => {
  res.json({ id: req.params.id, progress: req.body });
});

export default router;
