"use server";

import { generateText } from "ai";
// import { google } from "@ai-sdk/google";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function detectHate(
  input: string
): Promise<"HATEFUL" | "NOT_HATEFUL" | "ERROR"> {
  try {
    const prompt = `
You are a content moderation assistant. decode the words into alphabetical first if it’s in cryptic form. Classify the input below as either:

"HATEFUL" —  if it forms any kind of hateful speech or abusive behavior, especially toward an individual whether it's explicitly or implicitly
"NOT_HATEFUL" — if it does not.

Only respond with "HATEFUL" or "NOT_HATEFUL", nothing else. Detect it either in bahasa indonesia or english

Input:
"""${input}"""
    `.trim();

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    const output = result.text.trim();
    const status =
      output === "HATEFUL" || output === "NOT_HATEFUL" ? output : "ERROR";

    return status;
  } catch (e) {
    console.error("Moderation error:", e);
    return "ERROR";
  }
}
