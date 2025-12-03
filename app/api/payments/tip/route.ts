import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { paymentId, tip } = await req.json();

        if (!paymentId || !tip) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
            include: { earning: true },
        });

        if (!payment) {
            return NextResponse.json(
                { error: "Payment not found" },
                { status: 404 }
            );
        }

        // Update payment with tip
        const updatedPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: {
                tip: { increment: parseFloat(tip) },
                totalPaid: { increment: parseFloat(tip) },
            },
        });

        // Update earning with tip (100% goes to talent)
        if (payment.earning) {
            await prisma.earning.update({
                where:{ id: payment.earning.id },
                data: {
                    tip: { increment: parseFloat(tip) },
                },
            });

            // Update talent's total earnings
            await prisma.talent.update({
                where: { id: payment.earning.talentId },
                data: {
                    totalEarnings: { increment: parseFloat(tip) },
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: "Tip added successfully",
            payment: updatedPayment,
        });
    } catch (error) {
        console.error("Tip error:", error);
        return NextResponse.json(
            { error: "Failed to add tip" },
            { status: 500 }
        );
    }
}