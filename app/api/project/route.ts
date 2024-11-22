import { createProject, getProjects } from '@/dbActions/project-actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Replace with custom user authentication logic
    const userId = "custom-user-id"; // Replace with your user identification logic
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse the request body
    const requestBody = await req.json();
    const { projectName, projectInfo, projectUrl, techStack } = requestBody;

    // Now you can use projectName, projectInfo, projectUrl, and techStack
    await createProject(projectName, projectInfo, projectUrl, techStack);

    return new NextResponse('Project created', { status: 200 });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await getProjects();
    return new NextResponse(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new NextResponse('Error retrieving projects', { status: 500 });
  }
}
