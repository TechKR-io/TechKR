import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const skill = searchParams.get("skill");
    const state = searchParams.get("state");
    const minRate = searchParams.get("minRate");
    const maxRate = searchParams.get("maxRate");

    const where: any = {};

    if (skill) {
      where.skills = { has: skill };
    }

    if (state) {
      where.state = state;
    }

    if (minRate || maxRate) {
      where.hourlyRate = {};
      if (minRate) where.hourlyRate.gte = parseFloat(minRate);
      if (maxRate) where.hourlyRate.lte = parseFloat(maxRate);
    }

    const talents = await prisma.talent.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        state: true,
        skills: true,
        hourlyRate: true,
        yearsExperience: true,
        averageRating: true,
        bio: true,
        portfolioUrl: true,
      },
      orderBy: {
        averageRating: "desc",
      },
    });

    return NextResponse.json(talents);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search talents" },
      { status: 500 }
    );
  }
}
