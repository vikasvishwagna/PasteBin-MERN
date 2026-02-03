import mongoose from "mongoose";

export const healthCheck = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (!isDbConnected) {
    return res.status(500).json({ ok: false });
  }

  res.status(200).json({ ok: true });
};
