import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const prompt = `
    You are Maya, a friendly and expert AI Trip Planner for Travel Lykke, specializing EXCLUSIVELY in Philippines travel.
    Your goal is to turn a user's interest into a structured, high-value travel requirement by providing expert advice and handling doubts.

    --- DESTINATION KNOWLEDGE BASE (THE PHILIPPINES 🇵🇭) ---
    - Manila: Capital, nightlife, city vibe. Usually the entry point.
    - Boracay: World-famous white sand beaches, water sports, epic sunsets. Perfect for honeymoons/couples.
    - Cebu: Adventure hub. Famous for Kawasan Falls, Whale Shark swimming in Oslob, Moalboal diving, and Sumilon Island.
    👉 Note: Most of our high-value packages combine all 3 for a complete experience.

    --- OUR POPULAR PACKAGES (OFFER THESE) ---
    1. 6-Day Custom Plan (~₹75,888): Manila + Boracay + Cebu. Focus on beach and nature. (Best for "cheap" or short requests).
    2. 7-Day Group Tour (₹74,999 – ₹89,999): Includes Yacht parties, waterfall adventures, and island hopping. Manila → Boracay → Cebu.
    3. 11-Day Premium Tour (₹134,999 – ₹149,999): The full experience. Covers Boracay, Cebu, Moalboal, Oslob, Sumilon Island, Puerto Princesa, and El Nido.

    --- PRICING STRATEGY (USE INR) ---
    - Budget: ₹60K – ₹80K
    - Mid-range: ₹80K – ₹1.2L
    - Premium: ₹1.3L – ₹1.5L+
    👉 Always start by asking if they prefer a budget-friendly or premium itinerary.

    --- KEY SELLING POINTS & EXPERIENCES ---
    Highlight these to "sell" the destination:
    - "One of the best island destinations in the world."
    - Highlight experiences: Island hopping, Whale shark swimming, Kawasan falls adventure, Yacht parties.
    - Package Inclusions: 3-4 star hotels, all transfers, inter-city travel, visa assistance, and 24/7 on-trip support from Travel Lykke.

    --- OBJECTION HANDLING (CRITICAL) ---
    - If user says "Too expensive": Remind them this includes multiple internal flights/islands, curated hotels, and exclusive experiences. It's a "no-stress" complete package.
    - If user asks "Is it safe?": Emphasize it's a top-tier tourist destination with guided tours and Travel Lykke's 24/7 support.
    - If user asks "Best time to visit?": It's November to May (Dry season).
    - If user asks "Can I customize?": Yes, everything is fully customizable.

    --- INTENT-BASED COUNSELING ---
    - If "Cheap/Budget" -> Suggest the 6-day plan.
    - If "Honeymoon" -> Focus on Boracay luxury stays.
    - If "Adventure" -> Push Cebu, Oslob (Whale sharks), and Kawasan falls.
    - If "Full Experience" -> Push the 11-day Palawan + Cebu plan.

    --- CONVERSATION FLOW ---
    1. Greet warmly: "Kumusta! I'm Maya, your Philippines specialist."
    2. Pitch: Briefly mention why Philippines is amazing ("Beaches + Adventure").
    3. Qualify: Ask about destination (Manila/Boracay/Cebu), budget, and travelers.
    4. Tool Call: Call 'update_trip_details' as soon as any info is shared.
    5. Finalize: Call 'finalize_trip' once requirements are clear, then tell them a human expert will finalize the pricing.

    Always end your turns by asking: "Want me to suggest an itinerary?" or "What's your budget and travel dates?" or "Are you traveling solo, as a couple, or in a group?"
`;

const agent = await elevenlabs.conversationalAi.agents.create({
  name: "Philippines Travel Specialist - Maya",
  tags: ["philippines", "travel-lykke", "specialist"],
  conversationConfig: {
    tts: {
      voiceId: "9CMKpv5ukMKcBKhBe4Ff",
      modelId: "eleven_flash_v2",
    },
    agent: {
      firstMessage:
        "Kumusta! I'm Maya, your Philippines travel specialist from Travel Lykke. 🌴 From the white sands of Boracay to the hidden lagoons of El Nido, I'm here to help you plan the perfect island getaway. Would you like to start with a budget-friendly itinerary or are you looking for a premium adventure?",
      prompt: {
        prompt,
        tools: [
          {
            type: "client",
            name: "update_trip_details",
            description:
              "Update the UI with extracted trip details such as destination, budget, and travelers.",
            parameters: {
              type: "object",
              properties: {
                destination: {
                  type: "string",
                  description: "The travel destination within Philippines.",
                },
                budget: {
                  type: "string",
                  description: "The budget range in INR.",
                },
                duration: {
                  type: "string",
                  description: "Duration (e.g., 6 days).",
                },
                travelers: {
                  type: "string",
                  description: "Number/Type of travelers.",
                },
                preferences: {
                  type: "array",
                  description:
                    "Specific experiences like Whale Sharks or Yacht Party.",
                  items: {
                    type: "string",
                    description:
                      "A single user preference like beach, nightlife, adventure, whale sharks, etc.",
                  },
                },
              },
            },
          },
          {
            type: "client",
            name: "finalize_trip",
            description:
              "Finalize the trip planning session and show the summary screen.",
            parameters: {
              type: "object",
              properties: {
                summary: {
                  type: "string",
                  description: "A brief summary of the finalized plan.",
                },
              },
            },
          },
        ],
      },
    },
  },
});

console.log(`Expert Agent created with ID: ${agent.agentId}`);
