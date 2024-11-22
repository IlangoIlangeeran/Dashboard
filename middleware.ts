import { NextResponse } from 'next/server';
import { verifyJwtToken } from './utils/jwt'; // Custom utility to verify JWT

// Middleware to handle authentication
export function middleware(req: Request) {
  // Extract token from headers or cookies
  const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies.get('token');

  // If no token is found, return unauthorized response
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Verify the JWT token (you can customize this function based on your needs)
    const user = verifyJwtToken(token);

    // If the token is valid, allow the request to proceed
    const response = NextResponse.next();
    response.locals = { user }; // Attach user info for later use in the request lifecycle
    return response;
  } catch (error) {
    // If token verification fails, return unauthorized response
    return new NextResponse('Unauthorized', { status: 401 });
  }
}

// Export additional configuration for the middleware matcher
export const config = {
  matcher: [
    // Protect all API routes and dashboard routes, but allow public routes
    '/dashboard',
    '/api/((?!.+\\.[\\w]+$|_next).*)', // Include API routes for authentication
  ],
};
