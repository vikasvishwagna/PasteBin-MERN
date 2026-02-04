import Paste from "../models/Paste.js";
import getNow from "../utils/getNow.js";

export const viewPasteHTML = async (req, res) => {
  try {
    const { id } = req.params;
    const now = getNow(req);

    // Fetch the paste
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).send("Paste not found");
    }

    // Check TTL
    if (paste.expiresAt && now > paste.expiresAt) {
      return res.status(404).send("Paste expired");
    }

    // Check max views
    if (paste.remainingViews !== null && paste.remainingViews <= 0) {
      return res.status(404).send("Paste unavailable");
    }

    if (paste.remainingViews !== null) {
      paste.remainingViews -= 1;
      await paste.save();
    }

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Paste</title>
          <style>
            body { font-family: monospace; background: #f5f5f5; padding: 20px; }
            pre { background: #fff; padding: 16px; border-radius: 6px; white-space: pre-wrap; word-break: break-word; }
          </style>
        </head>
        <body>
          <pre>${paste.content}</pre>
          ${paste.remainingViews !== null ? `<p>Remaining views: ${paste.remainingViews}</p>` : ""}
          ${paste.expiresAt ? `<p>Expires at: ${paste.expiresAt.toISOString()}</p>` : ""}
        </body>
      </html>
    `);
  } catch (err) {
    return res.status(404).send("Paste not found");
  }
};
