import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // Absolute expiry time (null if no TTL)
    expiresAt: {
      type: Date,
      default: null,
    },

    // Max allowed views (null if unlimited)
    maxViews: {
      type: Number,
      default: null,
    },

    // Remaining views (null if unlimited)
    remainingViews: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt is useful for TTL calculation
  }
);

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;
