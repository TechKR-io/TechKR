"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        toast.success("Login successful!");
        const userType = session?.user?.userType;
        router.push(
          userType === "TALENT" ? "/talent/dashboard" : "/client/dashboard"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-white overflow-hidden font-poppins">
      {/* Background Mask Image (Right Side) */}
      <div className="absolute top-0 right-0 h-full w-1/2 hidden lg:block">
        <img
          src="/mask_group.png"
          alt="Background"
          className="h-full w-full object-cover"
        />

        {/* Overlay Hiring Text on the Image side */}
        <div className="absolute top-14 right-20 flex gap-4 items-center z-50">
          <p className="text-white text-xl">Hiring talent?</p>
          <Link
            href="/register/client"
            className="text-[#FFB13D] text-xl font-medium hover:underline"
          >
            Join as a client
          </Link>
          <br />
          <br />
          <p className="text-white text-xl">Looking for Jobs?</p>
          <Link
            href="/register/talent"
            className="text-[#FFB13D] text-xl font-medium hover:underline"
          >
            Join as a talent
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 lg:px-24 pt-12">
        <img src="/logo.png" alt="TechKR" className="w-[180px] mb-20" />

        <div className="max-w-[650px]">
          {/* Tab Switcher */}
          <div className="flex gap-0 mb-12 relative w-full max-w-[500px]">
            <Link href="/register/talent" className="w-1/2">
              <button className="w-full py-3 bg-[#FFEBCE] text-[#1800AD] rounded-l-full text-xl">
                SignUp
              </button>
            </Link>
            <button className="w-1/2 py-3 bg-[#1800AD] text-white rounded-r-full text-xl font-bold shadow-lg z-10">
              Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xl font-medium block">Email</label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Enter your email or phone number"
                className="w-full p-4 border border-[#FFDEAE] rounded-xl outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xl font-medium block">Password</label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-4 border border-[#FFDEAE] rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 border-[#FFDEAE]" />{" "}
                Remember me
              </label>
              <Link
                href="/forgot-password"
                title="Forgotten Password"
                className="text-[#2C73EB] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-[#1800AD] text-white rounded-xl text-xl font-semibold hover:bg-blue-800 transition shadow-xl"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-8 text-xl">
            Are you new?{" "}
            <Link href="/join" className="text-[#1800AD] hover:underline">
              Create an account
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-sm text-gray-500">Or connect with</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-10 pb-20">
            <img
              src="/google.png"
              className="w-8 h-8 cursor-pointer"
              alt="Google"
            />
            <img
              src="/apple.png"
              className="w-8 h-8 cursor-pointer"
              alt="Apple"
            />
            <img
              src="/facebook.png"
              className="w-8 h-8 cursor-pointer"
              alt="Facebook"
            />
            <img src="/x.png" className="w-8 h-8 cursor-pointer" alt="X" />
          </div>
        </div>
      </div>
    </div>
  );
}
