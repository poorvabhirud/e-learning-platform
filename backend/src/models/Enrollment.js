import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Map,
      of: Boolean,
      default: {},
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;