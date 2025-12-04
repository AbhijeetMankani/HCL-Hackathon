import mongoose, { Schema } from "mongoose";

const wellnessGoalSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    goalType: {
      type: String,
      enum: ["active_time", "sleep", "steps", "hydration", "weight", "exercise", "nutrition"],
      required: true,
    },
    goalTitle: {
      type: String,
      required: true,
      trim: true,
    },
    goalDescription: {
      type: String,
      trim: true,
    },
    targetValue: {
      type: Number,
      required: true,
      min: 0,
    },
    targetUnit: {
      type: String,
      required: true,
      trim: true,
      // Examples: 'minutes', 'hours', 'steps', 'liters', 'kg', 'calories'
    },
    currentValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "paused"],
      default: "not_started",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      // Calculated as (currentValue / targetValue) * 100
    },
    milestones: [
      {
        value: Number,
        achievedDate: Date,
        note: String,
      },
    ],
    reminders: {
      enabled: {
        type: Boolean,
        default: false,
      },
      frequency: {
        type: String,
        enum: ["daily", "weekly", "custom"],
      },
      time: String, // HH:MM format
    },
    notes: [
      {
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
wellnessGoalSchema.index({ patientId: 1, goalType: 1 });
wellnessGoalSchema.index({ patientId: 1, status: 1 });

// Virtual for calculating completion percentage
wellnessGoalSchema.virtual("completionPercentage").get(function () {
  if (this.targetValue === 0) return 0;
  return Math.min(100, Math.round((this.currentValue / this.targetValue) * 100));
});

// Method to update progress
wellnessGoalSchema.methods.updateProgress = function (newValue) {
  this.currentValue = newValue;
  this.progress = Math.min(100, Math.round((newValue / this.targetValue) * 100));
  
  if (this.progress >= 100 && this.status !== "completed") {
    this.status = "completed";
  } else if (this.progress > 0 && this.status === "not_started") {
    this.status = "in_progress";
  }
  
  return this.save();
};

export const WellnessGoal = mongoose.model("WellnessGoal", wellnessGoalSchema);
