import { createMessage, getMessages } from "@/dbActions/message-actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Replace Clerk authentication logic with your custom user identification
    const userId = "custom-user-id"; // Replace with your user identification logic
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get ticketId from the query string
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const ticketId = searchParams.get("ticketId");

    if (!ticketId) {
      return new NextResponse("Ticket ID is required", { status: 400 });
    }

    // Fetch messages for the provided ticketId
    const messages = await getMessages(ticketId);

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new NextResponse("Error retrieving messages", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: Response) {
  try {
    // Replace Clerk authentication logic with your custom user identification
    const userId = "custom-user-id"; // Replace with your user identification logic
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body to get the data
    const body = await req.json();
    const { ticketId, content } = body;

    if (!ticketId || !content) {
      return new NextResponse("Ticket ID and content are required", {
        status: 400,
      });
    }

    // Create a new message for the ticket
    const message = await createMessage(ticketId, content);

    return new NextResponse("Message created", { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
