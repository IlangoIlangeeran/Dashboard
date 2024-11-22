import {
  createTicket,
  getTicketWithId,
  getTickets,
} from '@/dbActions/ticket-actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const projectId = searchParams.get('projectId');
    const ticketId = searchParams.get('ticketId');

    let tickets;

    if (!ticketId && projectId) {
      tickets = await getTickets(projectId);
    }
    if (ticketId) {
      tickets = await getTicketWithId(ticketId);
    }

    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    return new NextResponse('Error retrieving tickets', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json(); // Parse the request body

    const { projectId, title, messages, category, priority } = requestBody;

    if (!projectId || !title || !messages || !category || !priority) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const newTicket = await createTicket(
      projectId,
      title,
      messages,
      priority,
      category
    );

    return new NextResponse(JSON.stringify(newTicket), { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return new NextResponse('Error creating ticket', { status: 500 });
  }
}
