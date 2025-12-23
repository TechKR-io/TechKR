"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you move footer to a component
import { Search, MapPin, Bookmark } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#F4F8FF] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[50px] leading-tight font-bold text-[#1800AD] mb-8">
            Find a job and showcase your skills
          </h1>

          <div className="flex justify-center gap-4 mb-10">
            <button className="bg-[#1800AD] text-white px-12 py-3 rounded-full font-bold shadow-lg">
              Find Job
            </button>
            <button className="bg-white text-[#1800AD] px-12 py-3 rounded-full font-medium border border-gray-100">
              Post Job
            </button>
          </div>

          <div className="max-w-2xl mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Job title, Keyword..."
              className="w-full pl-6 pr-32 py-4 rounded-xl border border-gray-200 shadow-sm outline-none text-gray-600"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1800AD] text-white px-8 py-2.5 rounded-lg font-semibold">
              Search
            </button>
          </div>

          <img
            src="/homepage picture.png"
            alt="Illustration"
            className="mx-auto w-full max-w-[900px]"
          />
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#303030] mb-4">
            Featured Jobs
          </h2>
          <p className="text-gray-500 text-lg">
            Choose jobs from the top employers and apply for the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Job Card component - map through your data here */}
          {[
            {
              title: "Flutter Developer",
              company: "GOOGLE",
              loc: "California, USA",
              logo: "/google.png",
            },
            {
              title: "Igbo Voice Artist",
              company: "SPOTIFY",
              loc: "Nnewi, Anambra",
              logo: "/sportify.png",
            },
            {
              title: "Content Writer",
              company: "SHANKS",
              loc: "Abeokuta, Ogun",
              logo: "/shanks.png",
            },
            {
              title: "Mathematics Lecturer",
              company: "UNILAG",
              loc: "Akoka-Yaba, Lagos",
              logo: "/unilag.png",
            },
            {
              title: "Senior UI/UX Designer",
              company: "DRIBBBLE",
              loc: "Manchester, UK",
              logo: "/dribbble.png",
            },
            {
              title: "Barber",
              company: "TOPZYCUT",
              loc: "Lekki, Lagos",
              logo: "/barber.png",
            },
          ].map((job, i) => (
            <div
              key={i}
              className="border border-gray-200 p-6 rounded-xl bg-white hover:border-[#1800AD] transition-all relative"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#E7F6EA] text-[#0BA02C] text-[12px] font-bold px-3 py-1 rounded">
                  FULL-TIME
                </span>
                <Bookmark className="text-gray-300 cursor-pointer w-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#18191C] mb-1">
                {job.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Salary:{" "}
                <span className="text-blue-600 cursor-pointer">See More</span>
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center p-2">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#18191C] uppercase">
                    {job.company}
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <MapPin size={12} /> {job.loc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="text-[#1800AD] font-semibold text-lg hover:underline">
            View all
          </button>
        </div>
      </section>

      {/* Testimonials and Contact sections follow the same layout pattern... */}
    </div>
  );
}
