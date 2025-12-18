"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { talentApi } from "@/lib/api";
import {
  DollarSign,
  Users,
  Clock,
  Star,
  Search,
  MessageSquare,
  Bell,
  User,
} from "lucide-react";

interface DashboardData {
  talent: {
    fullName: string;
  };
  stats: {
    totalEarnings: number;
    totalClients: number;
    totalHours: number;
    averageRating: number;
  };
  activeJobs: any[];
  recentEarnings: any[];
}

export default function TalentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.profileId) {
      fetchDashboard();
    }
  }, [status, session]);

  const fetchDashboard = async () => {
    try {
      const profileId = session?.user?.profileId;
      if (!profileId) {
        throw new Error("Profile ID not found");
      }
      const response = await talentApi.getDashboard(profileId);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Hired: "bg-green-100 text-green-700",
    Applied: "bg-orange-100 text-orange-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Declined: "bg-red-100 text-red-700",
  };

  // --- GUARDS ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  // This check is the "Guard". If dashboardData is null, the code stops here.
  // Everything below this line is "Safe" from null errors.
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-2xl font-bold">Tech</span>
                <span className="text-2xl font-bold bg-orange-500 px-2 rounded">
                  KR
                </span>
              </div>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-blue-600">
                Find Jobs
              </Link>
              <Link
                href="/talent/dashboard"
                className="text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About Us
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
              </button>
              <Link href="/talent/profile">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                  <User size={20} className="text-gray-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hi {dashboardData.talent.fullName.split(" ")[0] || "there"},
              </h1>
              <p className="text-gray-600">
                What would you like to explore today?
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <DollarSign className="text-blue-600 mb-4" size={24} />
            <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">
              ${dashboardData.stats.totalEarnings.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Users className="text-green-600 mb-4" size={24} />
            <p className="text-gray-600 text-sm mb-1">Total Clients</p>
            <p className="text-3xl font-bold">
              {dashboardData.stats.totalClients}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Clock className="text-purple-600 mb-4" size={24} />
            <p className="text-gray-600 text-sm mb-1">Total Hours</p>
            <p className="text-3xl font-bold">
              {dashboardData.stats.totalHours.toFixed(1)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Star className="text-yellow-600 mb-4" size={24} />
            <p className="text-gray-600 text-sm mb-1">Average Rating</p>
            <p className="text-3xl font-bold">
              {dashboardData.stats.averageRating.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>

          {/* Job Cards */}
          <div className="space-y-4">
            {dashboardData.activeJobs.length > 0 ? (
              dashboardData.activeJobs.map((job: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {job.job?.title || "Smart Contract Developer"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {job.client?.name || "Remote"} •{" "}
                        {job.client?.country || "Global"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700`}
                        >
                          {job.status || "Applied"}
                        </span>
                        <span className="text-sm text-gray-500">
                          ${job.agreedRate || "30"}/hr
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No jobs applied yet</p>
                <Link href="/jobs">
                  <button className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                    Browse Jobs
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
