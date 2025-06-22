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
    const prompt = process.env.MOD_PROMPT + `"""${input}"""`.trim();

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
