import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Replace with a secure secret key

/**
 * Verifies the provided JWT token and returns the decoded payload.
 * @param token - JWT token to verify
 * @returns The decoded payload if the token is valid
 * @throws Error if the token is invalid or expired
 */
export function verifyJwtToken(token: string) {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
