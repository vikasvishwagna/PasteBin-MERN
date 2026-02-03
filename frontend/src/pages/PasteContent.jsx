import React, { useState } from "react";

function PasteContent() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_BASE_URL = "http://localhost:5000";

  const createPaste = async () => {
    setError(null);
    setResultUrl(null);

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const payload = { content: content.trim() };
    if (ttl && Number(ttl) > 0) payload.ttl_seconds = Number(ttl);
    if (maxViews && Number(maxViews) > 0) payload.max_views = Number(maxViews);

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_BASE_URL}/api/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (data?.id) {
        setResultUrl(`${BACKEND_BASE_URL}/p/${data.id}`);
      } else {
        setError("Invalid response from backend");
      }

      setContent("");
      setTtl("");
      setMaxViews("");
    } catch (err) {
      setError("Backend not reachable");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <textarea
        rows={8}
        placeholder="Paste your content here..."
        value={content}
        onChange={(e) => { setContent(e.target.value); setError(null); }}
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
      />

      <input
        type="number"
        placeholder="TTL in seconds (optional)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      <input
        type="number"
        placeholder="Max views (optional)"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      <button
        onClick={createPaste}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {resultUrl && (
        <div className="mt-6 text-center">
          <p className="mb-2 text-gray-700">Share this link:</p>
          <a
            href={resultUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {resultUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default PasteContent;
