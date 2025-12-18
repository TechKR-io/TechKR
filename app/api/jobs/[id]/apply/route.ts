import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const applications = await prisma.application.findMany({
      where: { jobId: id },
      include: {
        talent: true,
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { talentId, coverLetter, proposedRate } = body;

    if (!talentId || !proposedRate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.application.findUnique({
      where: {
        jobId_talentId: {
          jobId: id,
          talentId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already applied to this job" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId: id,
        talentId,
        coverLetter,
        proposedRate: parseFloat(proposedRate),
      },
    });

    return NextResponse.json(
      {
        success: true,
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { applicationId, status } = body;

    const application = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID required" },
        { status: 400 }
      );
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });

    return NextResponse.json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
