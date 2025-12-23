"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { talentApi } from "@/lib/api";
import toast from "react-hot-toast";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function TalentProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [showNINVerification, setShowNINVerification] = useState(false);
  const [ninNumber, setNinNumber] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    state: "",
    skills: "",
    hourlyRate: 10,
    bio: "",
    portfolioUrl: "",
  });

  useEffect(() => {
    if (session?.user?.profileId) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await talentApi.getProfile(session?.user?.profileId!);
      setProfile(response.data);
      setFormData({
        fullName: response.data.fullName || "",
        phoneNumber: response.data.phoneNumber || "",
        state: response.data.state || "",
        skills: response.data.skills?.join(", ") || "",
        hourlyRate: response.data.hourlyRate || 10,
        bio: response.data.bio || "",
        portfolioUrl: response.data.portfolioUrl || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim());
      await talentApi.updateProfile(session?.user?.profileId!, {
        ...formData,
        skills: skillsArray,
      });
      toast.success("Profile updated successfully!");
      router.push("/talent/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleNINVerification = async () => {
    if (ninNumber.length !== 11) {
      toast.error("NIN must be 11 digits");
      return;
    }

    setLoading(true);
    // TODO: Integrate actual NIN verification API
    setTimeout(() => {
      toast.success(
        "NIN verification submitted! You will be notified once verified."
      );
      setShowNINVerification(false);
      setLoading(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/talent/dashboard">
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
                {formData.fullName?.charAt(0)?.toUpperCase() || "T"}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {formData.fullName || "Talent Profile"}
                </h1>
                <p className="text-gray-600 mb-4">
                  ${formData.hourlyRate}/hour • {formData.state}
                </p>
                <div className="flex items-center gap-3">
                  {profile?.verified ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1 text-sm">
                      <CheckCircle size={16} />
                      NIN Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowNINVerification(true)}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-orange-200 transition"
                    >
                      <AlertCircle size={16} />
                      Verify with NIN
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* NIN Verification Modal */}
          {showNINVerification && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">NIN Verification</h2>
                    <p className="text-sm text-gray-600">
                      Verify your identity with NIN
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    National Identification Number (NIN)
                  </label>
                  <input
                    type="text"
                    maxLength={11}
                    value={ninNumber}
                    onChange={(e) =>
                      setNinNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 11-digit NIN"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Your NIN will be securely verified. This helps build trust
                    with clients.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleNINVerification}
                    disabled={loading || ninNumber.length !== 11}
                    className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition disabled:bg-gray-400"
                  >
                    {loading ? "Verifying..." : "Verify NIN"}
                  </button>
                  <button
                    onClick={() => setShowNINVerification(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Briefcase className="inline mr-2" size={16} />
                  Skills * (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  placeholder="React, Node.js, UI/UX Design"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="inline mr-2" size={16} />
                  Hourly Rate (USD) *
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  min="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Portfolio URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell clients about yourself and your experience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                <Link href="/talent/dashboard" className="flex-1">
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
