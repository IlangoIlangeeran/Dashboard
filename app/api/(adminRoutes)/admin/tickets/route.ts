import { getTicketsWithAdmin } from '@/dbActions/admin/ticket-actions';
import {
  createTicket,
  getTicketWithId,
  getTickets,
} from '@/dbActions/ticket-actions';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const projectId = searchParams.get('projectId');
    const ticketId = searchParams.get('ticketId');

    let projects;

    if (!ticketId && projectId) {
      projects = await getTickets(projectId);
    } else if (ticketId) {
      projects = await getTicketWithId(ticketId);
    } else {
      projects = await getTicketsWithAdmin();
    }

    return new NextResponse(JSON.stringify(projects), { status: 200 });
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

export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json(); // Parse the request body

    const { ticketId, status } = requestBody;

    if (!ticketId || !status) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    return new NextResponse('Ticket status updated', { status: 200 });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    return new NextResponse('Error updating ticket status', { status: 500 });
  }
}
