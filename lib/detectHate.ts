"use server";

import { generateText } from "ai";
// import { google } from "@ai-sdk/google";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function detectHate(
  input: string
): Promise<"ALLOWED" | "DISSALOWED" | "ERROR"> {
  try {
    let prompt = process.env.MOD_PROMPT + `"""${input}"""`.trim();
    prompt = prompt.replace(
      "{BLOCKED}",
      process.env.BLOCKED_WORDS?.toString() || "[]"
    );

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    const output = result.text.trim();
    const status =
      output === "ALLOWED" || output === "DISSALOWED" ? output : "ERROR";

    console.log("Moderation result:", { input, status, prompt });

    return status;
  } catch (e) {
    console.error("Moderation error:", e);
    return "ERROR";
  }
}
