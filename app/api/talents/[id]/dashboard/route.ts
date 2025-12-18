import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function  GET(
    req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const talent = await prisma.talent.findUnique({
            where: { id },
            include: {
                contracts: {
                    where: { status: "IN_PROGRESS"},
                    include: {
                        job: true,
                        client: true,
                    },
                },
                earnings: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                },
            },
        });

        if (!talent) {
            return NextResponse.json(
                { error: "Talent not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            talent: {
                fullName: talent.fullName,
            },
            stats: {
                totalEarnings: talent.totalEarnings,
                totalClients: talent.totalClients,
                totalHours: talent.totalHours,
                averageRating: talent.averageRating,
            },
            activeJobs: talent.contracts,
            recentEarnings: talent.earnings,
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard" },
            { status: 500 }
        );
    }
}