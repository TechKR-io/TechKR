"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { jobsApi } from "@/lib/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Loader2, ShieldCheck, Wallet } from "lucide-react";

interface JobFormData {
  title: string;
  description: string;
  requiredSkills: string;
  hourlyRate: number;
  estimatedHours: number;
}

// --- MOCK CARDANO MODAL FOR DEMO ---
function CardanoDemoModal({
  amount,
  onComplete,
}: {
  amount: number;
  onComplete: (txHash: string) => void;
}) {
  const [step, setStep] = useState<
    "idle" | "connecting" | "signing" | "success"
  >("idle");

  const simulatePayment = async () => {
    setStep("connecting");
    await new Promise((r) => setTimeout(r, 1500)); // Simulate Wallet Bridge

    setStep("signing");
    await new Promise((r) => setTimeout(r, 2000)); // Simulate Aiken Script Validation

    const mockTxHash =
      "0x" + Math.random().toString(16).slice(2, 12) + "...cardano";
    setStep("success");
    toast.success("Funds locked in Cardano Escrow!");

    setTimeout(() => onComplete(mockTxHash), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        {step === "idle" && (
          <>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="text-blue-900" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Blockchain Escrow</h2>
            <p className="text-gray-500 mb-8">
              To post this job, you need to verify your Cardano wallet. This
              ensures funds are ready for your talent.
            </p>
            <button
              onClick={simulatePayment}
              className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition"
            >
              Connect Wallet
            </button>
          </>
        )}

        {(step === "connecting" || step === "signing") && (
          <div className="py-10">
            <Loader2
              className="animate-spin text-blue-600 mx-auto mb-6"
              size={50}
            />
            <h2 className="text-xl font-bold">
              {step === "connecting"
                ? "Connecting Nami..."
                : "Signing with Lucid Evolution..."}
            </h2>
            <p className="text-gray-500 mt-2 text-sm italic">
              Simulating Aiken Script Validator
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="py-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-green-600">Verified</h2>
            <p className="text-gray-500 mt-2">
              Wallet integrated. Redirecting to save job...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostJob() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showBlockchainDemo, setShowBlockchainDemo] = useState(false);
  const [pendingData, setPendingData] = useState<JobFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>();

  // 1. First trigger the Blockchain Modal
  const handleInitialSubmit = (data: JobFormData) => {
    if (!session?.user?.profileId) {
      toast.error("Please login as a client to post a job");
      router.push("/login");
      return;
    }
    setPendingData(data);
    setShowBlockchainDemo(true);
  };

  // 2. After Blockchain "payment" is successful, save to Database
  const saveJobToDatabase = async (txHash: string) => {
    if (!pendingData) return;

    setShowBlockchainDemo(false);
    setLoading(true);
    try {
      const skillsArray = pendingData.requiredSkills
        .split(",")
        .map((s) => s.trim());

      await jobsApi.create({
        clientId: session?.user?.profileId,
        title: pendingData.title,
        description: pendingData.description,
        requiredSkills: skillsArray,
        hourlyRate: Number(pendingData.hourlyRate),
        estimatedHours: Number(pendingData.estimatedHours),
        txHash: txHash, // Send the mock hash to the backend
      });

      toast.success("Job posted with Blockchain Escrow! 🎉");
      router.push("/client/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {showBlockchainDemo && (
        <CardanoDemoModal
          amount={
            Number(pendingData?.hourlyRate) *
            Number(pendingData?.estimatedHours)
          }
          onComplete={saveJobToDatabase}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src="/image/logo.png" alt="TechKR" className="h-10" />
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[30px] shadow-sm p-10">
            <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
            <p className="text-gray-600 mb-8">
              Every job on TechKR is protected by a Cardano Smart Contract.
            </p>

            <form
              onSubmit={handleSubmit(handleInitialSubmit)}
              className="space-y-6"
            >
              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Job Title *
                </label>
                <input
                  {...register("title", { required: "Job title is required" })}
                  type="text"
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Job Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={6}
                  placeholder="Describe the job, responsibilities, and requirements..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Required Skills * (comma-separated)
                </label>
                <input
                  {...register("requiredSkills", {
                    required: "Skills are required",
                  })}
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Hourly Rate (ADA) *
                  </label>
                  <input
                    {...register("hourlyRate", {
                      required: "Rate is required",
                    })}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Est. Hours
                  </label>
                  <input
                    {...register("estimatedHours")}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
                >
                  {loading ? "Syncing..." : "Connect Wallet & Post"}
                </button>
                <Link href="/client/dashboard" className="flex-1">
                  <button
                    type="button"
                    className="w-full py-4 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
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
