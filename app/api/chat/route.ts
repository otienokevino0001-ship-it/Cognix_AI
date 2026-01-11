import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

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
