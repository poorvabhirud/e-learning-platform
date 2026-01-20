import Course from "../models/Course.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

export const getCourses = async (req, res) => {
  try {
    const { category, search, difficulty, page = 1, limit = 50 } = req.query;  
    const filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const courses = await Course.find(filter)
      .select("-lessons") 
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      pagination: { page: page * 1, limit: limit * 1, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = [
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const course = new Course(req.body);
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

export const updateCourse = [
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

export const deleteCourse = [
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }

      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];
