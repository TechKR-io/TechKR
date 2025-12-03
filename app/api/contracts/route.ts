import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { jobId, talentId, clientId, agreedRate } = body;

        if (!jobId || !talentId || !clientId || ! agreedRate) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create contract
        const contract = await prisma.contract.create({
            data: {
                jobId,
                talentId,
                clientId,
                agreedRate: parseFloat(agreedRate),
            },
        });

        // Update job status
        await prisma.job.update({
            where: { id: jobId },
            data: { status: "IN_PROGRESS" },
        });

        // Update talent's client count
        await prisma.talent.update({
            where: { id: talentId },
            data: {
                totalClients: { increment: 1 },
            },
        });

        return NextResponse.json({
            success: true,
            contract,
        }, { status: 201 });
    } catch (error) {
        console.error("Contract error:", error);
        return NextResponse.json(
            { error: "Failed to create contract" },
            { status: 500 }
        );
    }
}