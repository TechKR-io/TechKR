import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateCommission, calculateTalentEarnings, generateTransactionRef } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        const { contractId, amount, tip = 0, paymentMethod } = await req.json();

        const contract = await prisma.contract.findUnique({
            where: { id: contractId },
            include: {
                talent: true,
                client: true,
            },
        });

        if (!contract) {
            return NextResponse.json(
                { error: "Contract not found" },
                { status: 404 }
            );
        }

        const commission = calculateCommission(amount);
        const totalPaid = amount + tip;
        const talentEarnings = calculateTalentEarnings(amount, tip);

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                contractId,
                clientId: contract.clientId,
                amount,
                commission,
                tip,
                totalPaid,
                paymentMethod,
                transactionRef: generateTransactionRef(),
                earning: {
                    create: {
                        talentId: contract.talentId,
                        amount: amount - commission,
                        tip,
                    },
                },
            },
            include: {
                earning: true,
            },
        });

        // Update  talent stats
        await prisma.talent.update({
            where: { id: contract.talentId },
            data: {
                totalEarnings: {
                    increment: talentEarnings,
                },
            },
        });

        // Update client stats
        await prisma.client.update({
            where: { id: contract.clientId },
            data: {
                totalSpent: {
                    increment: totalPaid,
                },
            },
        });

        return NextResponse.json({
            success: true,
            payment,
            breakdown: {
                amount,
                commission,
                tip,
                talentReceives: talentEarnings,
                clientPays: totalPaid,
            },
        });
    } catch (error) {
        console.error("Payment error", error);
        return NextResponse.json(
            { error: "Payment processing failed" },
            { status: 500 }
        );
    }
}