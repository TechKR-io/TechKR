import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        client: {
          select: {
            name: true,
            country: true,
            companyName: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Jobs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientId,
      title,
      description,
      requiredSkills,
      hourlyRate,
      estimatedHours,
    } = body;

    if (!clientId || !title || !description || !hourlyRate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        clientId,
        title,
        description,
        requiredSkills: Array.isArray(requiredSkills)
          ? requiredSkills
          : [requiredSkills],
        hourlyRate: parseFloat(hourlyRate),
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : null,
      },
    });

    // Update client's total projects
    await prisma.client.update({
      where: { id: clientId },
      data: {
        totalProjects: { increment: 1 },
      },
    });

    return NextResponse.json(
      {
        success: true,
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json(
      { error: "Failed to created job" },
      { status: 500 }
    );
  }
}
