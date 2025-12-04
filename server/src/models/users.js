import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    doctorAppointed: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
    },
    profilePicture: {
      type: String, // cloudinary url or file path
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // automatically creates createdAt and updatedAt
  }
);

export const User = mongoose.model("User", userSchema);
