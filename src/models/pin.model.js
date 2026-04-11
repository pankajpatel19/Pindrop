import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    board: {
      type: String,
      default: "Inspiration",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    imagePublicId: {
      type: String,
      required: [true, "Image public ID is required"],
    },
    imageSecureUrl: {
      type: String,
      required: [true, "Image secure URL is required"],
    },
  },
  { timestamps: true },
);

const Pin = mongoose.models.Pin || mongoose.model("Pin", PinSchema);

export default Pin;
