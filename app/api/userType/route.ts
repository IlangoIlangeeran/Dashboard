import { getUserType } from "@/dbActions/user-actions";
import { NextResponse } from "next/server";

// Replace with your custom authentication logic
const getUserId = () => {
  // Example: Return a userId or session information after authentication
  return "custom-user-id"; // Replace with actual user identification
};

export async function GET(req: any) {
  try {
    const userId = getUserId(); // Custom authentication
    if (!userId) {
      return new NextResponse("false", { status: 404 });
    }

    const userType = await getUserType(userId); // Assuming you need userId for this function
    return new NextResponse(JSON.stringify(userType), { status: 200 });
  } catch (error) {
    return new NextResponse("Error retrieving tickets", { status: 500 });
  }
}
