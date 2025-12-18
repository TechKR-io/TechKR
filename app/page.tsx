'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function LandingPage() {
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowJobsDropdown(false);
    if (showJobsDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showJobsDropdown]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay  */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
      </div>

      {/* Content  */}
      <div className="relative z-10">
        {/* Navigation  */}
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-bold text-white">Tech</span>
            <span className="text-3xl font-bold bg-orange-500 px-2 rounded">
              KR
            </span>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-6">
            {/* Find Jobs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowJobsDropdown(!showJobsDropdown)}
                className="flex items-center gap-2 text-white hover:text-orange-500 transition"
              >
                Find Jobs
                <ChevronDown size={16} />
              </button>

              {showJobsDropdown && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 w-64 z-50">
                  <Link
                    href="/jobs?location=Lagos"
                    className="block py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    Jobs in Lagos
                  </Link>
                  <Link
                    href="/jobs?location=Abuja"
                    className="block py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    Jobs in Abuja
                  </Link>
                  <Link
                    href="/jobs?location=River"
                    className="block py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    Jobs in River
                  </Link>
                  <Link
                    href="/jobs?location=Florida"
                    className="block py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    Jobs in Florida
                  </Link>
                  <Link
                    href="/jobs"
                    className="block py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    Jobs in your area
                  </Link>
                  <hr className="my-2" />
                  <Link
                    href="/jobs"
                    className="block py-2 px-4 text-blue-600 font-medium hover:bg-gray-100 rounded"
                  >
                    View all
                  </Link>
                </div>
              )}
            </div>

            <Link href="/client/post-job">
              <button className="px-6 py-2 bg-white text-blue-900 rounded-lg font-medium hover:bg-gray-100 transition border border-blue-900">
                Post a Job
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connecting Skilled Nigerians to Local and Global Opportunities
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              <span className="font-semibold">TechKR</span> is a platform for
              skilled technical and non-technical individuals in Nigeria. The
              aim is to bridge the gap between skills and opportunities.
            </p>

            <Link href="/join">
              <button className="px-10 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition shadow-lg">
                Join
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}