import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters"; // Import Adapter type

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      userType: string;
      profileId: string;
    };
  }
  interface User {
    id?: string; // Add id as it's often needed
    userType: string;
    profileId: string;
  }
}

// Extend AdapterUser to prevent internal type mismatches
declare module "next-auth/adapters" {
  interface AdapterUser {
    userType: string;
    profileId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType: string;
    profileId: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Casting to any handles the internal type mismatch between @auth/prisma-adapter and next-auth v4
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
          profileId: (user.talent?.id || user.client?.id) as string,
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
        session.user.id = token.sub as string;
        session.user.userType = token.userType;
        session.user.profileId = token.profileId;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
