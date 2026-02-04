import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    maxViews: {
      type: Number,
      default: null,
    },

    remainingViews: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;
