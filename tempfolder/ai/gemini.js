import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyC25rrFVK_6bHR9atEHH_5HQ9F4Y2hsMBU" });

export async function askGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log("Gemini API Response:", response);
    console.log("Content object:", response.candidates[0]?.content);

    return response; // ✅ return full response so backend route can use it
  } catch (error) {
    console.error("Error during Gemini processing:", error);
    throw new Error("Gemini API error");
  }
}
