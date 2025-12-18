"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authApi } from "@/lib/api";
import toast from "react-hot-toast";
import { NIGERIAN_STATES } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { email } from "zod";
import { SkillCategory } from "@prisma/client";
import SocialIcons from "@/components/SocialIcons";

interface TalentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  skills: string;
  password: string;
  confirmPassword: string;
}

export default function TalentRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TalentFormData>();

  const password = watch("password");

  const onSubmit = async (data: TalentFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const fullName = `${data.firstName} ${data.lastName}`;
      const skillsArray = data.skills.split(",").map((s) => s.trim());

      await authApi.registerTalent({
        email: data.email,
        password: data.password,
        fullName,
        phoneNumber: data.phoneNumber,
        state: data.country,
        SkillCategory: "TECHNICAL",
        skills: skillsArray,
        yearsExperience: 0,
        hourlyRate: 10,
      });

      toast.success("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <span className="text-3xl font-bold">Tech</span>
            <span className="text-3xl font-bold bg-orange-500 px-2 rounded">
              KR
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 rounded-lg font-bold transition ${
                activeTab === "signup"
                  ? "bg-blue-900 text-white"
                  : "bg-orange-100 text-gray-700"
              }`}
            >
              Signup
            </button>
            <Link href="/login" className="flex-1">
              <button className="w-full py-3 rounded-lg font-bold bg-orange-100 text-gray-700">
                Login
              </button>
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="Your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="yourmail@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone number
              </label>
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                type="tel"
                placeholder="phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Country/State */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                {...register("country", { required: "State is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your country</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-2">
                specific Skill(s)
              </label>
              <input
                {...register("skills", { required: "Skills are required" })}
                type="text"
                placeholder="Select your skill"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.skills && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm password",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <label className="text-sm text-gray-600">
                Yes, I understand and agree to the TehcKR{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy policies
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
            >
              {loading ? "Creating Account..." : "SignUp"}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <p className="text-center text-gray-500 text-sm mb-4">
              {" "}
              Or connect with
            </p>
            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      {/* <img className="page-image" src="/back.png" /> */}
      <div className="hidden lg:block flex-1 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/mask_group.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" /> */}
        </div>

        {/* Orange Curve */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-32">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path d="M0,0 Q50,50 0,100 L0" fill="#FFA500" />
          </svg>
        </div> */}

        {/* Top Right Text */}
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
