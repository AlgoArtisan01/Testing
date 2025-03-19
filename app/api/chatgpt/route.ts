import { NextResponse } from "next/server";

// Use Route Segment Config options
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const maxDuration = 30; // Set timeout to 30 seconds

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      throw new Error("Gemini API key is missing.");
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Tell me ${question}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read the response as text
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.candidates[0]?.content?.parts[0]?.text || "No response available.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chatgpt:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
