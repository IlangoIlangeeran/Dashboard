// project-actions.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function createProject(
  projectName: string,
  projectInfo: string,
  projectUrl: string,
  techStack: string[],
  userId: string // userId should be passed from your authentication system
) {
  try {
    if (!userId) {
      return false;
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return false;
    }

    const newProject = await prisma.project.create({
      data: {
        projectName,
        projectInfo,
        techStack,
        projectUrl,
        userId: dbUser.id,
      },
    });

    return newProject ? true : false;
  } catch (error) {
    console.error('Error creating project:', error);
    return false;
  }
}

export async function getProjects(userId: string) {
  try {
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        projects: true,
      },
    });

    if (!dbUser) {
      return new NextResponse('User not exist', { status: 404 });
    }

    return dbUser.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

export async function updateProject(
  projectId: string,
  projectName: string,
  projectInfo: string,
  projectUrl: string,
  techStack: string[]
) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        projectName,
        projectInfo,
        projectUrl,
        techStack,
      },
    });

    return updatedProject
      ? new NextResponse('Project updated', { status: 200 })
      : new NextResponse('Project not found', { status: 404 });
  } catch (error) {
    console.error('Error updating project:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

export async function deleteProject(projectId: string) {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return deletedProject
      ? new NextResponse('Project deleted', { status: 200 })
      : new NextResponse('Project not found', { status: 404 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
