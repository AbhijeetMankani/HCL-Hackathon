import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One patient record per user
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      uppercase: true,
    },
    height: {
      type: Number, // in cm
      min: 0,
    },
    weight: {
      type: Number, // in kg
      min: 0,
    },
    allergies: [
      {
        allergen: String,
        severity: {
          type: String,
          enum: ["Mild", "Moderate", "Severe"],
        },
        notes: String,
      },
    ],
    chronicConditions: [
      {
        condition: String,
        diagnosedDate: Date,
        status: {
          type: String,
          enum: ["Active", "Managed", "Resolved"],
          default: "Active",
        },
        notes: String,
      },
    ],
    currentMedications: [
      {
        medicationName: String,
        dosage: String,
        frequency: String,
        prescribedBy: {
          type: Schema.Types.ObjectId,
          ref: "Provider",
        },
        startDate: Date,
        endDate: Date,
        notes: String,
      },
    ],
    insuranceProvider: {
      type: String,
      trim: true,
    },
    insuranceId: {
      type: String,
      trim: true,
    },
    medicalHistory: [
      {
        eventType: {
          type: String,
          enum: ["Surgery", "Hospitalization", "Diagnosis", "Treatment", "Other"],
        },
        description: String,
        date: Date,
        provider: {
          type: Schema.Types.ObjectId,
          ref: "Provider",
        },
        documents: [String], // URLs to medical documents
        notes: String,
      },
    ],
    emergencyContact: {
      name: String,
      relationship: String,
      phoneNumber: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
