
import { GoogleGenAI, Type } from "@google/genai";
import { QuoteRequest, QuoteResponse } from "../types";

// Helper function to get AI-powered cleaning quote using Google GenAI
export const getAIQuote = async (request: QuoteRequest): Promise<QuoteResponse> => {
  // Initialize Gemini with the API key from environment variables directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-pro-preview for tasks requiring mathematical estimation and reasoning
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Estimate cleaning cost for: ${JSON.stringify(request)}. 
    Context: Bellevue, WA market. High cost of living area but competitive pricing required.
    Team: Assume a team of 2 professional cleaners. Adjust duration to reflect 2 people working (e.g., 2-3 hours for average home).
    Pricing Rules:
    - Base dispatch fee: $120 (includes travel & supplies for team)
    - Standard Clean: $40/bedroom, $50/bathroom
    - Deep Clean: +40% total
    - Move-in/out: +60% total
    - Extras: $25 each
    - Output duration as a range (e.g. "2 - 2.5 hours") assuming the 2-person team.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedPrice: { 
            type: Type.STRING,
            description: "Formatted price estimate string"
          },
          duration: { 
            type: Type.STRING,
            description: "Estimated cleaning duration in hours"
          },
          recommendation: { 
            type: Type.STRING,
            description: "A helpful recommendation for the client"
          }
        },
        required: ["estimatedPrice", "duration", "recommendation"]
      }
    }
  });

  // Access the .text property directly and sanitize it
  let jsonStr = response.text || "{}";
  
  // Hardening: Remove markdown code blocks if present (e.g. ```json ... ```)
  jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');
  
  // Find the first opening brace and last closing brace to ensure we have a valid JSON object
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(jsonStr) as QuoteResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response:", jsonStr);
    throw new Error("Invalid quote format received.");
  }
};
