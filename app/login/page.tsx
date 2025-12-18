"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
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
        toast.success("Login successful!");
        // Redirect based on user type (you'll need to get this from session)
        router.push("/talent/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
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
            <p className="text-gray-600 inline">Hiring talent? </p>
            <Link
              href="/register/client"
              className="text-orange-500 font-bold hover:underline"
            >
              Join as a client
            </Link>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-4 mb-8">
            <Link href="/register/talent" className="flex-1">
              <button className="w-full py-3 rounded-lg font-bold bg-orange-100 text-gray-700">
                SignUp
              </button>
            </Link>
            <button className="flex-1 py-3 rounded-lg font-bold bg-blue-900 text-white">
              Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Enter your email or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Create Account Link */}
          <p className="text-center mt-6 text-gray-600">
            Are you New?{" "}
            <Link
              href="/join"
              className="text-blue-600 hover:underline font-medium"
            >
              Create an account
            </Link>
          </p>

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
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
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

      {/* Right Side - Image */}
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
        <div className="absolute left-0 top-0 bottom-0 w-32">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* <path d="M0,0 Q50,50 0,100 L0,0" fill="#FFA500" /> */}
          </svg>
        </div>

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
