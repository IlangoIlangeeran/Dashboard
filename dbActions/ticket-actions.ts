// ticket-actions.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function createTicket(
  projectId: string,
  title: string,
  messages: string[],
  priority: string,
  category: string[],
  userId: string // userId should be passed from your authentication system
) {
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return new NextResponse("Project not exist", { status: 404 });
    }

    const newTicket = await prisma.ticket.create({
      data: {
        title,
        messages: {
          create: messages.map((content) => ({ sender: userId, content })),
        },
        priority,
        category,
        projectId,
      },
    });

    if (newTicket) {
      return new NextResponse("Ticket created", { status: 200 });
    } else {
      return new NextResponse("Failed to create ticket", { status: 500 });
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function getTickets(projectId: string, userId: string) {
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const dbProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tickets: true,
      },
    });

    if (!dbProject) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Check if the user is authorized to access the project
    if (dbProject.userId !== dbUser.id) {
      return new NextResponse("Unauthorized access to project tickets", {
        status: 403,
      });
    }

    const tickets = dbProject.tickets;

    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function getTicketWithId(ticketId: string, userId: string) {
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const dbTicket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!dbTicket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    return dbTicket;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function updateTicket(
  ticketId: string,
  title: string,
  messages: string[],
  userId: string
) {
  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { messages: true },
    });

    if (!ticket) {
      return new NextResponse("Ticket not found", { status: 404 });
    }

    // Update title
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        title,
      },
    });

    // Update messages
    const updatedMessages = await Promise.all(
      ticket.messages.map(async (message) => {
        if (!messages.includes(message.content)) {
          // Delete messages not present in the updated list
          await prisma.message.delete({
            where: { id: message.id },
          });
        }
      })
    );

    // Create new messages
    const newMessages = await Promise.all(
      messages.map(async (content) => {
        if (!ticket.messages.some((message) => message.content === content)) {
          await prisma.message.create({
            data: {
              sender: dbUser.id,
              content,
              ticketId,
            },
          });
        }
      })
    );

    return new NextResponse("Ticket updated", { status: 200 });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function deleteTicket(ticketId: string) {
  try {
    const deletedTicket = await prisma.ticket.delete({
      where: { id: ticketId },
    });

    if (deletedTicket) {
      return new NextResponse("Ticket deleted", { status: 200 });
    } else {
      return new NextResponse("Ticket not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
