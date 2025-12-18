import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const job = await prisma.job.findUnique({
            where: { id },
            include: {
                client: true,
                applications: {
                    include: {
                        talent: true,
                    },
                },
            },
        });

        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("Get job error:", error)
        return NextResponse.json(
            { error: "Failed to fetch job"},
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();

        const { id } = await params

        const job = await prisma.job.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({
            success: true,
            job,
        });
    } catch (error) {
        console.error("Update  job error:", error)
        return NextResponse.json(
            { error: "Failed to update job" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) { 
    try {
        const {id} = await params
        await prisma.job.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Job deleted",
        });
    } catch (error) {
        console.error("Update job error:", error)
        return NextResponse.json(
            { error: "Failed to delete job"},
            { status: 500 }
        );
    }
}