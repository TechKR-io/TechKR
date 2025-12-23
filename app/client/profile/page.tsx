"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientApi } from "@/lib/api";
import toast from "react-hot-toast";
import {
  User,
  Building2,
  Globe,
  Briefcase,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function ClientProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    country: "",
    industry: "",
  });

  useEffect(() => {
    if (session?.user?.profileId) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await clientApi.getProfile(session?.user?.profileId!);
      setProfile(response.data);
      setFormData({
        name: response.data.name || "",
        companyName: response.data.companyName || "",
        country: response.data.country || "",
        industry: response.data.industry || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await clientApi.updateProfile(session?.user?.profileId!, formData);
      toast.success("Profile updated successfully!");
      router.push("/client/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/client/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </Link>
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-2xl font-bold">Tech</span>
                <span className="text-2xl font-bold bg-orange-500 px-2 rounded">
                  KR
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {formData.name?.charAt(0)?.toUpperCase() || "C"}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {formData.name || "Client Profile"}
                </h1>
                <p className="text-gray-600 mb-4">
                  {formData.companyName || "Company Name"}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <CheckCircle size={16} />
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Building2 className="inline mr-2" size={16} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Globe className="inline mr-2" size={16} />
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Briefcase className="inline mr-2" size={16} />
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <Link href="/client/dashboard" className="flex-1">
                  <button
                    type="button"
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
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
