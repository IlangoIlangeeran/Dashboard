import {
  createTicket,
  getTicketWithId,
  getTickets,
} from "@/dbActions/ticket-actions";
import { NextRequest, NextResponse } from "next/server";

// Replace with your custom authentication logic
const getUserId = () => {
  // Example: Return a userId or session information after authentication
  return "custom-user-id"; // Replace with actual user identification
};

export async function GET(req: any) {
  try {
    const userId = getUserId();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const projectId = searchParams.get("projectId");
    const ticketId = searchParams.get("ticketId");

    let tickets;

    if (!ticketId && projectId) {
      tickets = await getTickets(projectId);
    }
    if (ticketId) {
      tickets = await getTicketWithId(ticketId);
    }

    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    return new NextResponse("Error retrieving tickets", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const requestBody = await req.json(); // Parse the request body

    const { projectId, title, messages, category, priority } = requestBody;
    const newTicket = await createTicket(
      projectId,
      title,
      messages,
      priority,
      category
    );

    return new NextResponse("Ticket created", { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
