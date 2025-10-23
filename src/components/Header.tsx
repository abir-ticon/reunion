"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo and School Name */}
          <div className="flex items-center space-x-4">
            {/* School Logo */}
            <Image
              src="/images/logo.svg"
              alt="School Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            {/* School Name - Hidden on mobile */}
            <div className="text-gray-800 hidden md:block">
              <h1 className="text-lg font-semibold text-[#1E293B]">
                ইব্রাহিমপুর ঈশ্বর চন্দ্র উচ্চ বিদ্যালয়
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Contact Us
            </a>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-[48px] font-medium bg-[#007BFF] hover:bg-blue-700 transition-colors cursor-pointer">
              Register Now
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            {/* School Name for Mobile */}
            <div className="text-gray-800 md:hidden">
              <h1 className="text-sm font-semibold">
                ইব্রাহিমপুর ঈশ্বর চন্দ্র উচ্চ বিদ্যালয়
              </h1>
            </div>

            {/* Mobile Navigation Links */}
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-[48px] font-medium bg-[#007BFF] hover:bg-blue-700 transition-colors cursor-pointer w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
