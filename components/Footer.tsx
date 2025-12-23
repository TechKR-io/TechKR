"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 px-6 font-inter">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <img
            src="/logo.png"
            alt="TechKR"
            className="w-[180px] brightness-200"
          />
          <p className="text-sm text-gray-400 leading-relaxed max-w-[300px]">
            A great platform to connect skilled individuals to clients both
            locally and globally.
          </p>
        </div>

        {/* Quick Link */}
        <div>
          <h4 className="text-xl font-medium mb-6">Quick Link</h4>
          <ul className="space-y-4 text-gray-400 text-base">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Client/Talent */}
        <div>
          <h4 className="text-xl font-medium mb-6">Client/Talent</h4>
          <ul className="space-y-4 text-gray-400 text-base">
            <li>
              <Link href="/jobs" className="hover:text-white">
                Browse Job
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/client/post-job" className="hover:text-white">
                Post a Job
              </Link>
            </li>
            <li>
              <Link href="/saved-jobs" className="hover:text-white">
                Saved Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-medium mb-6">Support</h4>
          <ul className="space-y-4 text-gray-400 text-base">
            <li>
              <Link href="/faqs" className="hover:text-white">
                Faqs
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-sm text-gray-500">
          @ 2025 TechKR - Job Portal. All rights Reserved
        </p>
        <div className="flex gap-6">
          <img
            src="/facebook -home.png"
            className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer"
          />
          <img
            src="/instagram - home.png"
            className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer"
          />
          <img
            src="/linkedin - home.png"
            className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer"
          />
          <img
            src="/twitter -home.png"
            className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
}
