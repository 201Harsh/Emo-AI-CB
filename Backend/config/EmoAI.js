const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.API_KEy });

async function generateResponse(prompt, name) {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt is empty or invalid.");
    }

    const response = await ai.models.generateContent({
      // model: "gemini-2.5-flash-preview-04-17",
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text:  prompt }],
        },
      ],
    });

    // Extract and return the generated text
    const text = response.candidates[0].content.parts[0].text;
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error; // Re-throw if needed for error handling in the calling code
  }
}

module.exports = generateResponse;
