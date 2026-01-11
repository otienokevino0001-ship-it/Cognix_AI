"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1>AI Assistant</h1>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <button
        onClick={sendPrompt}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {response && (
        <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          {response}
        </pre>
      )}
    </main>
  );
}
