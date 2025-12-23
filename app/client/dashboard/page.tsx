"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientApi } from "@/lib/api";
import {
  Briefcase,
  DollarSign,
  Users,
  Plus,
  MessageSquare,
  Bell,
  User,
} from "lucide-react";

export default function ClientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.profileId) {
      fetchDashboard();
    }
  }, [status, session]);

  const fetchDashboard = async () => {
    try {
      const response = await clientApi.getDashboard(session?.user?.profileId!);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
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
              <Link href="/home" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link
                href="/client/find-talent"
                className="text-gray-700 hover:text-blue-600"
              >
                Find Jobs
              </Link>
              <Link
                href="/client/dashboard"
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

              <Link href="/client/profile">
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
                Hi{" "}
                {dashboardData?.client?.name?.split(" ")[0] ||
                  session?.user?.email?.split("@")[0] ||
                  "there"}
                ,
              </h1>
              <p className="text-gray-600">
                What would you like to explore today?
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* FIX: Wrap this profile card in a Link too for better UX */}
              <Link
                href="/client/profile"
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
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
                  {/* FIX: Dynamic Name and Country */}
                  <p className="font-bold">
                    {dashboardData?.client?.name || "Client Name"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {dashboardData?.client?.country || "Location Not Set"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Projects</p>
            <p className="text-3xl font-bold">
              {dashboardData?.stats?.totalProjects || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Spent</p>
            <p className="text-3xl font-bold">
              ${dashboardData?.stats?.totalSpent?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Talents Hired</p>
            <p className="text-3xl font-bold">
              {dashboardData?.activeJobs?.length || 0}
            </p>
          </div>
        </div>

        {/* Active Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Projects</h2>
            <Link href="/client/post-job">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                <Plus size={20} />
                Post New Job
              </button>
            </Link>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {dashboardData?.activeJobs?.length > 0 ? (
              dashboardData.activeJobs.map((contract: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-blue-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">
                          {contract.job?.title || "Product Designer"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Hired: {contract.talent?.fullName || "N/A"} • $
                          {contract.agreedRate}/hr
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Progress: 60%
                          </span>
                          <div className="flex-1 max-w-xs h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href={`/client/contracts/${contract.id}`}>
                      <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No active projects</p>
                <Link href="/client/post-job">
                  <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                    Post Your First Job
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Posted Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Posted Jobs</h2>

          <div className="space-y-4">
            {dashboardData?.postedJobs?.length > 0 ? (
              dashboardData.postedJobs.map((job: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>${job.hourlyRate}/hr</span>
                        <span>•</span>
                        <span>
                          {job._count?.applications || 0} Applications
                        </span>
                        <span>•</span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            job.status === "OPEN"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <Link href={`/client/jobs/${job.id}`}>
                      <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        View Applications
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No jobs posted yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
