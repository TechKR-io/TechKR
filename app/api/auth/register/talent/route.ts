import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            email,
            password,
            fullName,
            phoneNumber,
            state,
            skillCategory,
            skills,
            yearsExperience,
            hourlyRate,
            portfolioUrl,
            resumeUrl,
        } = body;

        // Validate required fields
        if (!email || !password || !fullName || !phoneNumber || !state) {
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

        // Create user and talent profile
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                userType: "TALENT",
                talent: {
                    create: {
                        fullName,
                        phoneNumber,
                        state,
                        skillCategory: skillCategory || "TECHNICAL",
                        skills: Array.isArray(skills) ? skills : [skills],
                        yearsExperience: parseInt(yearsExperience) || 0,
                        hourlyRate: parseFloat(hourlyRate) || 10,
                        portfolioUrl,
                        resumeUrl,
                    },
                },
            },
            include: {
                talent: true,
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
                    talent: user.talent,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}