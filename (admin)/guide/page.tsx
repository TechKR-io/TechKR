import React, { useState } from "react";
import {
  Database,
  Users,
  Briefcase,
  DollarSign,
  Shield,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function TechKrBackendGuide() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const sections = {
    overview: {
      title: "Backend Overview",
      icon: Database,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Framework</h4>
              <p className="text-sm">Next.js 14+ (App Router)</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Database</h4>
              <p className="text-sm">PostgreSQL with Prisma ORM</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Authentication</h4>
              <p className="text-sm">NextAuth.js (Auth.js v5)</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">File Storage</h4>
              <p className="text-sm">AWS S3 or Cloudinary</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-blue-600 mt-6">
            Project Structure
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <pre>{`techkr/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── talents/
│   │   ├── clients/
│   │   ├── jobs/
│   │   └── payments/
│   ├── (auth)/
│   ├── (talent)/
│   └── (client)/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
└── types/
    └── index.ts`}</pre>
          </div>
        </div>
      ),
    },
    database: {
      title: "Database Schema",
      icon: Database,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">Prisma Schema</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserType {
  TALENT
  CLIENT
}

enum SkillCategory {
  TECHNICAL
  NON_TECHNICAL
}

enum JobStatus {
  OPEN
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  userType      UserType
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  talent        Talent?
  client        Client?
}

model Talent {
  id              String        @id @default(cuid())
  userId          String        @unique
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  fullName        String
  phoneNumber     String
  state           String
  skillCategory   SkillCategory
  skills          String[]
  yearsExperience Int
  hourlyRate      Float         @default(10)
  portfolioUrl    String?
  resumeUrl       String?
  bio             String?
  
  totalEarnings   Float         @default(0)
  totalClients    Int           @default(0)
  totalHours      Float         @default(0)
  averageRating   Float         @default(0)
  
  skillCheckPassed Boolean      @default(false)
  skillCheckDate   DateTime?
  
  applications    Application[]
  contracts       Contract[]
  earnings        Earning[]
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Client {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name            String
  companyName     String?
  country         String
  industry        String?
  budgetRangeMin  Float?
  budgetRangeMax  Float?
  
  totalProjects   Int       @default(0)
  totalSpent      Float     @default(0)
  
  jobs            Job[]
  contracts       Contract[]
  payments        Payment[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Job {
  id              String      @id @default(cuid())
  clientId        String
  client          Client      @relation(fields: [clientId], references: [id], onDelete: Cascade)
  
  title           String
  description     String
  requiredSkills  String[]
  hourlyRate      Float
  estimatedHours  Float?
  status          JobStatus   @default(OPEN)
  
  applications    Application[]
  contract        Contract?
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model Application {
  id          String    @id @default(cuid())
  jobId       String
  job         Job       @relation(fields: [jobId], references: [id], onDelete: Cascade)
  talentId    String
  talent      Talent    @relation(fields: [talentId], references: [id], onDelete: Cascade)
  
  coverLetter String?
  proposedRate Float
  status      String    @default("pending")
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@unique([jobId, talentId])
}

model Contract {
  id              String      @id @default(cuid())
  jobId           String      @unique
  job             Job         @relation(fields: [jobId], references: [id], onDelete: Cascade)
  talentId        String
  talent          Talent      @relation(fields: [talentId], references: [id], onDelete: Cascade)
  clientId        String
  client          Client      @relation(fields: [clientId], references: [id], onDelete: Cascade)
  
  agreedRate      Float
  hoursWorked     Float       @default(0)
  status          JobStatus   @default(IN_PROGRESS)
  
  startDate       DateTime    @default(now())
  endDate         DateTime?
  
  talentRating    Int?
  clientRating    Int?
  talentFeedback  String?
  clientFeedback  String?
  
  payments        Payment[]
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model Payment {
  id              String    @id @default(cuid())
  contractId      String
  contract        Contract  @relation(fields: [contractId], references: [id], onDelete: Cascade)
  clientId        String
  client          Client    @relation(fields: [clientId], references: [id], onDelete: Cascade)
  
  amount          Float
  commission      Float
  tip             Float     @default(0)
  totalPaid       Float
  
  paymentMethod   String?
  transactionRef  String?
  
  createdAt       DateTime  @default(now())
  
  earning         Earning?
}

model Earning {
  id          String    @id @default(cuid())
  talentId    String
  talent      Talent    @relation(fields: [talentId], references: [id], onDelete: Cascade)
  paymentId   String    @unique
  payment     Payment   @relation(fields: [paymentId], references: [id], onDelete: Cascade)
  
  amount      Float
  tip         Float     @default(0)
  
  createdAt   DateTime  @default(now())
}`}</pre>
          </div>
        </div>
      ),
    },
    api: {
      title: "API Routes",
      icon: Settings,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">
            API Endpoints Structure
          </h3>

          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Authentication</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>POST /api/auth/register/talent</li>
                <li>POST /api/auth/register/client</li>
                <li>POST /api/auth/login</li>
                <li>POST /api/auth/logout</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Talents</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>GET /api/talents - Search/filter talents</li>
                <li>GET /api/talents/[id] - Get talent profile</li>
                <li>PUT /api/talents/[id] - Update talent profile</li>
                <li>GET /api/talents/[id]/dashboard - Dashboard stats</li>
                <li>POST /api/talents/[id]/skillcheck - Submit skill check</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold">Clients</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>GET /api/clients/[id] - Get client profile</li>
                <li>PUT /api/clients/[id] - Update client profile</li>
                <li>GET /api/clients/[id]/dashboard - Dashboard stats</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold">Jobs</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>GET /api/jobs - List all jobs (public)</li>
                <li>POST /api/jobs - Create new job</li>
                <li>GET /api/jobs/[id] - Get job details</li>
                <li>PUT /api/jobs/[id] - Update job</li>
                <li>DELETE /api/jobs/[id] - Delete job</li>
                <li>POST /api/jobs/[id]/apply - Apply to job</li>
                <li>GET /api/jobs/[id]/applications - Get applications</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold">Contracts</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>POST /api/contracts - Create contract</li>
                <li>GET /api/contracts/[id] - Get contract details</li>
                <li>PUT /api/contracts/[id]/hours - Update hours worked</li>
                <li>POST /api/contracts/[id]/complete - Mark complete</li>
                <li>POST /api/contracts/[id]/rate - Submit rating</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-600 pl-4">
              <h4 className="font-semibold">Payments</h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>POST /api/payments - Process payment</li>
                <li>POST /api/payments/tip - Add tip</li>
                <li>GET /api/payments/[id] - Get payment details</li>
                <li>POST /api/payments/webhook - Payment webhook</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    auth: {
      title: "Authentication",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">
            NextAuth.js Configuration
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            talent: true,
            client: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          userType: user.userType,
          profileId: user.talent?.id || user.client?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.profileId = user.profileId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.userType = token.userType;
        session.user.profileId = token.profileId;
      }
      return session;
    },
  },
};`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-blue-600 mt-6">
            Registration Example
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// app/api/auth/register/talent/route.ts
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
            skillCategory,
            skills,
            yearsExperience: parseInt(yearsExperience),
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
        message: "Registration successful",
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
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
}`}</pre>
          </div>
        </div>
      ),
    },
    middleware: {
      title: "Middleware & Utils",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">
            Auth Middleware
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect talent routes
    if (path.startsWith("/talent") && token?.userType !== "TALENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect client routes
    if (path.startsWith("/client") && token?.userType !== "CLIENT") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/talent/:path*", "/client/:path*", "/api/protected/:path*"],
};`}</pre>
          </div>

          <h3 className="text-xl font-semibold text-blue-600 mt-6">
            Utility Functions
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// lib/utils.ts

// Calculate commission (15%)
export function calculateCommission(amount: number): number {
  return amount * 0.15;
}

// Calculate talent earnings after commission
export function calculateTalentEarnings(amount: number, tip: number = 0): number {
  const afterCommission = amount - calculateCommission(amount);
  return afterCommission + tip; // Tips are 100% to talent
}

// Nigerian states
export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi",
  "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

// File upload helper (for S3/Cloudinary)
export async function uploadFile(file: File, folder: string): Promise<string> {
  // Implementation depends on your choice (S3/Cloudinary)
  // Return the uploaded file URL
}

// Validate Nigerian phone number
export function validateNigerianPhone(phone: string): boolean {
  const pattern = /^(\+234|0)[789][01]\d{8}$/;
  return pattern.test(phone);
}`}</pre>
          </div>
        </div>
      ),
    },
    payment: {
      title: "Payment Integration",
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600">
            Payment Processing
          </h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs">{`// app/api/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateCommission, calculateTalentEarnings } from "@/lib/utils";

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

    // Update talent stats
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
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}

function generateTransactionRef(): string {
  return 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}`}</pre>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-2">Payment Gateway Options</h4>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Paystack:</strong> Best for Nigerian payments (NGN)
              </li>
              <li>
                <strong>Stripe:</strong> Best for international payments (USD)
              </li>
              <li>
                <strong>Flutterwave:</strong> Good for both local and
                international
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">TechKr Backend Guide</h1>
            <p className="text-blue-100">
              Complete Next.js backend architecture for your hackathon
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 bg-gray-50 p-4 border-r">
              <nav className="space-y-2">
                {Object.entries(sections).map(([key, section]) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedTab(key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        selectedTab === key
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium text-sm">
                        {section.title}
                      </span>
                      {selectedTab === key && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex-1 p-6">{sections[selectedTab].content}</div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Quick Start Commands
          </h2>
          <div className="space-y-3">
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
              npm install prisma @prisma/client next-auth bcryptjs
            </div>
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
              npx prisma init
            </div>
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
              npx prisma migrate dev --name init
            </div>
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
              npx prisma generate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
