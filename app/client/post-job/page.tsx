"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { jobsApi } from "@/lib/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface JobFormData {
  title: string;
  description: string;
  requiredSkills: string;
  hourlyRate: number;
  estimatedHours: number;
}

export default function PostJob() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>();

  const onSubmit = async (data: JobFormData) => {
    if (!session?.user?.profileId) {
      toast.error("Please login as a client to post a job");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const skillsArray = data.requiredSkills.split(",").map((s) => s.trim());

      await jobsApi.create({
        clientId: session.user.profileId,
        title: data.title,
        description: data.description,
        requiredSkills: skillsArray,
        hourlyRate: Number(data.hourlyRate),
        estimatedHours: Number(data.estimatedHours),
      });

      toast.success("Job posted successfully! 🎉");
      router.push("/client/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl font-bold">Tech</span>
              <span className="text-2xl font-bold bg-orange-500 px-2 rounded">
                KR
              </span>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
            <p className="text-gray-600 mb-8">
              Find the perfect Nigerian talent for your project
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title *
                </label>
                <input
                  {...register("title", { required: "Job title is required" })}
                  type="text"
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={6}
                  placeholder="Describe the job, responsibilities, and requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Required Skills * (comma-separated)
                </label>
                <input
                  {...register("requiredSkills", {
                    required: "Skills are required",
                  })}
                  type="text"
                  placeholder="React, Node.js, MongoDB, TypeScript"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.requiredSkills && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.requiredSkills.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hourly Rate (USD) *
                  </label>
                  <input
                    {...register("hourlyRate", {
                      required: "Hourly rate is required",
                      min: { value: 10, message: "Minimum rate is $10/hour" },
                    })}
                    type="number"
                    placeholder="25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.hourlyRate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.hourlyRate.message}
                    </p>
                  )}
                </div>

                {/* Estimated Hours */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Estimated Hours
                  </label>
                  <input
                    {...register("estimatedHours")}
                    type="number"
                    placeholder="40"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
                >
                  {loading ? "Posting..." : "Post Job"}
                </button>
                <Link href="/client/dashboard" className="flex-1">
                  <button
                    type="button"
                    className="w-full py-4 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
