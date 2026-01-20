import express from "express";
import mongoose from "mongoose";
import Enrollment from "../models/Enrollment.js";

import {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";



const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const Course = mongoose.model('Course');
    const courses = await Course.find({});
    res.json({ courses }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", getCourses);


router.post("/enrollments", async (req, res) => {
  try {
    const DEMO_USER_ID = "507f1f77bcf86cd799439011";
    const { courseId } = req.body;

    const enrollment = await Enrollment.create({
      userId: new mongoose.Types.ObjectId(DEMO_USER_ID),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/enrollments/:enrollmentId/progress', async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { $set: { [`progress.${lessonId}`]: completed } },
      { new: true }
    ).populate('courseId', 'title lessons');
    
    res.json({ success: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/enrollments/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: new mongoose.Types.ObjectId(req.params.userId)
    }).populate({
      path: 'courseId',
      select: 'title description'
    });

    res.json(enrollments);
  } catch (err) {
    console.error('GET ENROLLMENTS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const Course = mongoose.model('Course');
    const course = await Course.findOne({ slug: req.params.slug });
    console.log('🔍 Found course:', course?.title || 'NOT FOUND'); // Debug
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ course }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;


