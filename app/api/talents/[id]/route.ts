import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const talent = await prisma.talent.findUnique({
            where: { id },
        });

        if (!talent) {
            return NextResponse.json(
                { error: "Talent not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(talent);
    } catch (error) {
        console.error("Update error:", error)
        return NextResponse.json(
            { error: "Failed to fetch talent" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: {params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const body = await req.json();
        const {
            fullName,
            phoneNumber,
            state,
            skills,
            hourlyRate,
            bio,
            portfolioUrl,
            resumeUrl,
        } = body;

        const talent = await prisma.talent.update({
            where: { id },
            data: {
                fullName,
                phoneNumber,
                state,
                skills,
                hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
                bio,
                portfolioUrl,
                resumeUrl,
            },
        });

        return NextResponse.json({
            success: true,
            talent,
        });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}