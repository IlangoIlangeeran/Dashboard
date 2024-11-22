import { NextResponse } from 'next/server';

export async function GET(req: any) {
  try {
    // Perform any required logic here if needed

    return new NextResponse('true', { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return new NextResponse('Error retrieving tickets', { status: 500 });
  }
}
