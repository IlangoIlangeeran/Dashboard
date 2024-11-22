import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Replace Clerk authentication with your custom logic to retrieve the user ID
    const userId = "custom-user-id"; // Replace with your user identification logic
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch user details from the database
    let dbUser = await prisma.user.findUnique({
      where: { id: userId }, // Replace 'id' with the field in your database that matches your userId
    });

    if (!dbUser) {
      // Create a new user in the database if they don't exist
      dbUser = await prisma.user.create({
        data: {
          id: userId, // Use the appropriate field for user ID
          name: "FirstName", // Replace with your method to retrieve the user's name
          lastName: "LastName", // Replace with your method to retrieve the user's last name
          email: "user@example.com", // Replace with your method to retrieve the user's email
        },
      });
    }

    if (!dbUser) {
      // Redirect to a "new user" onboarding page if user creation fails
      return new NextResponse(null, {
        status: 302, // Temporary redirect
        headers: {
          Location: 'https://go.bradi.tech/api/auth/new-user',
        },
      });
    }

    // Redirect the user to the dashboard
    return new NextResponse(null, {
      status: 302, // Temporary redirect
      headers: {
        Location: 'https://go.bradi.tech/dashboard',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
