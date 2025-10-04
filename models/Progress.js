import mongoose from 'mongoose';

const SubjectProgressSchema = new mongoose.Schema(
  {
    quizzesCompleted: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    lastScore: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
  },
  { _id: false }
);

const ProgressSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    class: { type: String, required: true },
    science: { type: SubjectProgressSchema, default: () => ({}) },
    technology: { type: SubjectProgressSchema, default: () => ({}) },
    engineering: { type: SubjectProgressSchema, default: () => ({}) },
    mathematics: { type: SubjectProgressSchema, default: () => ({}) },
    totalScore: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Create unique index on userName
ProgressSchema.index({ userName: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);


