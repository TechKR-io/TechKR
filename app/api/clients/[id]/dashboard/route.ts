import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Add await here
    
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        jobs: {
          include: {
            applications: true,
          },
        },
        contracts: {
          where: { status: "IN_PROGRESS" },
          include: {
            talent: true,
            job: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      client: {
        name: client.name,
        companyName: client.companyName,
      },
      stats: {
        totalProjects: client.totalProjects,
        totalSpent: client.totalSpent,
      },
      activeJobs: client.contracts,
      postedJobs: client.jobs,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard" },
      { status: 500 }
    );
  }
}