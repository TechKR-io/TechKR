import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { talentId, coverLetter, proposeRate } = body;

        if (!talentId || !proposeRate) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if already applied
        const existing = await prisma.application.findUnique({
            where: {
                jobId_talentId: {
                    jobId: params.id,
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
                jobId: params.id,
                talentId,
                coverLetter,
                proposedRate: parseFloat(proposeRate),
            },
        });

        return NextResponse.json({
            success: true,
            application,
        }, { status: 201 });
    } catch (error) {
        console.error("Apply error:", error);
        return NextResponse.json(
            { error: "Failed to apply" },
            { status: 500 }
        );
    }
}