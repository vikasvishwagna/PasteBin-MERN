import Paste from "../models/Paste.js";
import getNow from "../utils/getNow.js";

// POST /api/pastes
export const createPaste = async (req, res) => {
  try {
    let { content, ttl_seconds, max_views } = req.body;

    // Validation
    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "Content is required" });
    }

    // Convert empty strings to undefined
    ttl_seconds = ttl_seconds === "" ? undefined : ttl_seconds;
    max_views = max_views === "" ? undefined : max_views;

    if (
      ttl_seconds !== undefined &&
      (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
    ) {
      return res
        .status(400)
        .json({ error: "ttl_seconds must be an integer >= 1" });
    }

    if (
      max_views !== undefined &&
      (!Number.isInteger(max_views) || max_views < 1)
    ) {
      return res
        .status(400)
        .json({ error: "max_views must be an integer >= 1" });
    }

    const now = getNow();

    // const expiresAt = ttl_seconds !== undefined ? new Date(now.getTime() + ttl_seconds * 1000) : null;

    const expiresAt =
      ttl_seconds !== undefined ? now + ttl_seconds * 1000 : null;

    // Ensure maxViews and remainingViews are null if not provided
    const maxViewsValue = max_views !== undefined ? max_views : null;

    const paste = await Paste.create({
      content: content.trim(),
      expiresAt,
      maxViews: maxViewsValue,
      remainingViews: maxViewsValue,
    });

    res.status(201).json({
      id: paste._id.toString(),
      url: `${req.protocol}://${req.get("host")}/p/${paste._id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/pastes/:id
export const getPaste = async (req, res) => {
  try {
    const { id } = req.params;
    const now = getNow();

    // Step 1: fetch paste
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    // Step 2: TTL check
    if (paste.expiresAt !== null && now > paste.expiresAt) {
  return res.status(404).json({ error: "Paste not found" });
}

    // Step 3: max views check
    if (paste.remainingViews !== null && paste.remainingViews <= 0) {
      return res.status(404).json({ error: "Paste unavailable" });
    }

    // Step 4: decrement only if limited
    if (paste.remainingViews !== null) {
      paste.remainingViews -= 1;
      await paste.save();
    }

    res.status(200).json({
      content: paste.content,
      remaining_views: paste.remainingViews,
      expires_at: paste.expiresAt,
    });
  } catch (err) {
    return res.status(404).json({ error: "Paste not found" });
  }
};
