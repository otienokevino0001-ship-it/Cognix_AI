"use client";

import { useState } from "react";

export default function Assistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, `AI: ${data.reply}`]);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 700, margin: "auto", padding: "2rem" }}>
      <h1>Web AI Assistant</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          minHeight: 300,
          marginBottom: "1rem",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        {loading && <p>AI is thinking…</p>}
      </div>

      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything…"
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <button
        onClick={sendMessage}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Send
      </button>
    </main>
  );
}
