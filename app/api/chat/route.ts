import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  // Guard: prevent build-time or runtime crashes
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 }
      );
    }

    // Lazy initialization (CRITICAL for Netlify)
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful web-based AI assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "No response from AI.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI error:", error);

    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}
