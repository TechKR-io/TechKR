"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authApi } from "@/lib/api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface ClientFormData {
  companyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  industry: string;
  budgetRange: string;
  password: string;
  confirmPassword: string;
}

export default function ClientRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>();

  const password = watch("password");

  const onSubmit = async (data: ClientFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authApi.registerClient({
        email: data.email,
        password: data.password,
        name: data.name,
        companyName: data.companyName,
        country: data.country,
        industry: data.industry,
        budgetRangeMin: 10,
        budgetRangeMax: 100,
      });

      toast.success("Registration successful! 🎉");
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

          {/* Top Right Link */}
          <div className="text-right mb-4">
            <p className="text-gray-600 inline">
              Ready to showcase your skills?{" "}
            </p>
            <Link
              href="/register/talent"
              className="text-orange-500 font-bold hover:underline"
            >
              Join as a talent
            </Link>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-3 rounded-lg font-bold bg-blue-900 text-white">
              SignUp
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
                  Company Name
                </label>
                <input
                  {...register("companyName")}
                  type="text"
                  placeholder="Work name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Work Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="workmail@gmail.com"
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

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                {...register("country", { required: "Country is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Industry field
              </label>
              <select
                {...register("industry")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select field</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Budget Range Per Hour
              </label>
              <select
                {...register("budgetRange")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="10-25">$10 - $25/hour</option>
                <option value="25-50">$25 - $50/hour</option>
                <option value="50-100">$50 - $100/hour</option>
                <option value="100+">$100+/hour</option>
              </select>
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
                    placeholder="Must be at least 8 characters"
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
                      required: "Please confirm password",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Must be at least 8 characters"
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
                Yes, I understand and agree to the TechKR{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  privacy policies
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
              Or connect with
            </p>
            <div className="flex justify-center gap-6">
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-yellow-50 to-blue-50 items-center justify-center p-12 relative">
        {/* Add your illustration/image here */}
        <Image src="/client_1.png" alt="client" width={2000} height={2000} />
        {/* <Image src="/bg 1.png" alt="nothing" width={2000} height={2000} /> */}
        <div className="text-center">
          {/* <p className="text-gray-600 text-xl">
            Illustration: Woman with laptop and team avatars with ratings
          </p> */}
        </div>
      </div>
    </div>
  );
}
