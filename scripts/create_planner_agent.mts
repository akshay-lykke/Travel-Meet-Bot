import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const prompt = `
    You are Maya, a friendly and expert AI Trip Planner for Travel Lykke.
    Your goal is to help users brainstorm and define their perfect travel plan through a natural conversation.

    Tasks:
    - Greet the user warmly and introduce yourself as Maya from Travel Lykke.
    - Guide the user through providing these key details:
        1. Destination (or help them discover one based on their interests).
        2. Budget (Vague is fine, e.g., "around 1 lakh").
        3. Travel dates or duration (e.g., "5 days in June" or "not sure, maybe October").
        4. Group type (Solo, Couple, Family, Friends).
        5. Preferences (e.g., Beach, Adventure, Luxury, Local Culture, Foodie).
    - As soon as you extract any of these details, call the 'update_trip_details' tool with the extracted JSON.
    - Be conversational! Don't just list questions. Respond to their ideas with enthusiasm (e.g., "Oh, Bali in October is beautiful, the weather is perfect for surfing!").
    - Once you have most of the basic information (or the user feels ready), call the 'finalize_trip' tool to show the summary.
    - Remind the user that after this, they can connect with a human Travel Expert to finalize the actual itinerary and bookings.

    Guidelines:
    - Keep responses relatively concise but warm.
    - Use 'update_trip_details' frequently as information becomes available.
    - If the user is unsure, offer suggestions (e.g., "If you like beaches and a bit of nightlife, maybe Boracay or Phuket?").
`;

const agent = await elevenlabs.conversationalAi.agents.create({
    name: "Travel Lykke - AI Trip Planner",
    tags: ["trip-planner", "mvp"],
    conversationConfig: {
        tts: {
            voiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah - warm and professional
            modelId: "eleven_flash_v2",
        },
        agent: {
            firstMessage: "Hi there! I'm Maya, your AI Trip Planner from Travel Lykke. I'm so excited to help you plan your next adventure! Where are you thinking of heading, or are you looking for some inspiration?",
            prompt: {
                prompt,
                tools: [
                    {
                        type: "client",
                        name: "update_trip_details",
                        description: "Update the UI with extracted trip details such as destination, budget, and travelers.",
                        parameters: {
                            type: "object",
                            properties: {
                                destination: { type: "string", description: "The travel destination." },
                                budget: { type: "string", description: "The user's budget range." },
                                duration: { type: "string", description: "Planned duration or dates." },
                                travelers: { type: "string", description: "Type of group (e.g., Couple, Family)." },
                                preferences: { type: "array", items: { type: "string" }, description: "List of travel preferences." }
                            }
                        }
                    },
                    {
                        type: "client",
                        name: "finalize_trip",
                        description: "Finalize the trip planning session and show the summary screen to the user.",
                        parameters: {
                            type: "object",
                            properties: {
                                summary: { type: "string", description: "A brief summary of the conversation." }
                            }
                        }
                    }
                ]
            }
        },
    },
});

console.log(`Agent created with ID: ${agent.agentId}`);
