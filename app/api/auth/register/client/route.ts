import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            email,
            password,
            name,
            companyName,
            country,
            industry,
            budgetRangeMin,
            budgetRangeMax,
        } = body;

        // Validate required fields
        if (!email || !password || !name || !country) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user and client profile
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                userType: "CLIENT",
                client: {
                    create: {
                        name,
                        companyName,
                        country,
                        industry,
                        budgetRangeMin: budgetRangeMin ? parseFloat(budgetRangeMin) : null,
                        budgetRangeMax: budgetRangeMax ? parseFloat(budgetRangeMax) : null,
                    },
                },
            },
            include: {
                client: true
            },
        });
        
        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                user: {
                    id: user.id,
                    email: user.email,
                    userType: user.userType,
                    client: user.client,
                },
            },
            { status: 201}
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}