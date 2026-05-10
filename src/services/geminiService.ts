import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function suggestAutomationRules(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 effective WhatsApp automation rules for: ${topic}. 
      Format each rule as a concise one-line instruction.
      Keep it professional and business-oriented.`,
    });
    
    const text = response.text || "";
    return text.split('\n').filter(line => line.trim().length > 0).slice(0, 3);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "Auto-reply to welcome new customers",
      "Send follow-up after 24h of inactivity",
      "Notify team on high-priority keywords"
    ];
  }
}
