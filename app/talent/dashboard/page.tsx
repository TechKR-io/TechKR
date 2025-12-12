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

export default function TalentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.profileId) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
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
                  <img
                    src="/default-avatar.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Ccircle cx="16" cy="16" r="16" fill="%234F46E5"/%3E%3C/svg%3E';
                    }}
                  />
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
                Hi {session?.user?.name || "Tosin"},
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-gray-600">
                What would you like to explore today?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/default-avatar.png"
                alt="Profile"
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Ccircle cx="32" cy="32" r="32" fill="%234F46E5"/%3E%3C/svg%3E';
                }}
              />
              <div>
                <p className="font-bold">Akande Tosin</p>
                <p className="text-sm text-gray-600">UX Designer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">
              ${dashboardData?.stats?.totalEarnings?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Clients</p>
            <p className="text-3xl font-bold">
              {dashboardData?.stats?.totalClients || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Hours</p>
            <p className="text-3xl font-bold">
              {dashboardData?.stats?.totalHours?.toFixed(1) || "0.0"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Average Rating</p>
            <p className="text-3xl font-bold">
              {dashboardData?.stats?.averageRating?.toFixed(1) || "0.0"}
            </p>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Applied Job</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search Applied Job"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800">
                Search
              </button>
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {["Search", "Hired", "Applied", "Pending", "Declined"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status.toLowerCase())}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                    filterStatus === status.toLowerCase()
                      ? statusColors[status as keyof typeof statusColors] ||
                        "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {dashboardData?.activeJobs?.length > 0 ? (
              dashboardData.activeJobs.map((job: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{job.icon || "💼"}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {job.job?.title || "Smart Contract Developer"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {job.client?.name || "Remote"} •{" "}
                        {job.client?.country || "Web3, Nigeria"}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          Full Time
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          ${job.agreedRate || "30"}/hr
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          +3YoE
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          Programming
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors.Applied}`}
                        >
                          {job.status || "Applied"}
                        </span>
                        <span className="text-sm text-gray-500">1 day ago</span>
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
