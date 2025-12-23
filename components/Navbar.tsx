"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MessageSquare, Bell, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.png" alt="TechKR" className="h-10" />
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[15px]">
          <Link href="/home" className="font-semibold text-[#1800AD]">
            Home
          </Link>
          <Link
            href="/jobs"
            className="font-medium text-gray-700 hover:text-[#1800AD]"
          >
            Find Jobs
          </Link>
          <Link
            href={
              session?.user?.userType === "TALENT"
                ? "/talent/dashboard"
                : "/client/dashboard"
            }
            className="font-medium text-gray-700 hover:text-[#1800AD]"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-700 hover:text-[#1800AD]"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <button className="text-gray-500 hover:text-[#1800AD]">
            <MessageSquare size={22} />
          </button>
          <button className="text-gray-500 hover:text-[#1800AD] relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link href="/talent/profile">
            <img
              src="/account settings.png"
              alt="Profile"
              className="w-9 h-9 rounded-full cursor-pointer"
            />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-gray-400 hover:text-red-500"
          >
            <img src="/exit.png" alt="Logout" className="w-15 h-15" />
          </button>
        </div>
      </div>
    </header>
  );
}
