import { NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const apiKey = process.env.ELEVENLABS_API_KEY;
const agentId = process.env.ELEVENLABS_AGENT_ID;
const environment = process.env.ELEVENLABS_ENVIRONMENT || "staging";

export async function GET() {
  if (!apiKey || !agentId) {
    return NextResponse.json(
      {
        error:
          "Missing server configuration. Set ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID.",
      },
      { status: 500 }
    );
  }

  try {
    const client = new ElevenLabsClient({ apiKey: () => apiKey });
    const response = await client.conversationalAi.conversations.getSignedUrl({
      agentId,
      environment,
      includeConversationId: true,
    });

    return NextResponse.json({ signedUrl: response.signedUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
