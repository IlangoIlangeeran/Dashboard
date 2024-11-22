import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Replace Clerk authentication with custom logic, if required
    const userId = "some-logic-to-retrieve-user-id"; // Add your logic to identify the user
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch user details from the database
    let dbUser = await prisma.user.findUnique({
      where: { id: userId }, // Adjust the field according to your schema
    });

    if (!dbUser) {
      return new NextResponse('User does not exist', { status: 404 });
    }

    const isAdmin = dbUser?.userType === 'admin';

    if (isAdmin) {
      return new NextResponse('Hello admin', { status: 200 });
    }

    // Redirect for non-admin users
    return new NextResponse(null, {
      status: 302, // Temporary redirect
      headers: {
        Location: 'https://localhost:3000/dashboard',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
