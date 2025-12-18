"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Add your password reset logic here
    toast.success("Reset link sent to your email!");
    setTimeout(() => router.push("/login"), 2000);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Link href="/">
            <div className="flex items-center mb-8 cursor-pointer">
              <span className="text-3xl font-bold">Tech</span>
              <span className="text-3xl font-bold bg-orange-500 px-2 rounded">
                KR
              </span>
            </div>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Forgotten Password</h1>
          <p className="text-gray-600 mb-8">
            Input your email used for registration of the account
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Continue →"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden lg:block flex-1 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/mask_group.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-32">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d="M0,0 Q50,50 0,100 L0,0" fill="#FFA500" />
          </svg>
        </div>

        <div className="absolute top-12 right-12 text-right">
          <p className="text-white text-lg mb-2">Hiring talent?</p>
          <Link
            href="/register/client"
            className="text-orange-500 text-lg font-bold hover:underline"
          >
            Join as a client
          </Link>
        </div>
      </div>
    </div>
  );
}
