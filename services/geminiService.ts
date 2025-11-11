import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are "Alma AI", a helpful and friendly AI assistant for the AlmaConnect alumni portal. Your purpose is to provide information about the platform's features.
The portal has the following sections:
- Events: Users can view, create, and RSVP to events like reunions, workshops, and seminars.
- Network/Alumni Directory: Users can find and connect with alumni from various companies and batches. Notable alumni work at Google, Tesla, Intel, Amazon, and L&T.
- Donate: Users can donate to campaigns for infrastructure, scholarships, sports, labs, etc.
- User Roles: There are Students, Alumni, and Faculty.
Keep your responses concise, helpful, and slightly enthusiastic. If you don't know an answer, say you can't help with that specific query but mention what you *can* help with.`;

export const getAlmaAIResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "I can't connect to my brain right now. The Gemini API key is missing.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};