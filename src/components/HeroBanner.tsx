"use client";

import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";

export default function HeroBanner() {
  const { openModal } = useModal();

  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto pt-[100px] md:pt-[156px] pb-[77px] max-w-7xl px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[#007BFF] leading-[1.2]">
            প্রাক্তন শিক্ষার্থী <br /> কর্মসূচি নিবন্ধনে স্বাগতম
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 mx-auto text-[#333]">
          আমাদের বিশেষ ইভেন্টের মাধ্যমে প্রাক্তন শিক্ষার্থীদের সাথে পুনরায় সংযোগ স্থাপন করুন। আপনার স্থান নিশ্চিত করতে এখনই নিবন্ধন করুন।
          </p>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="bg-[#007BFF] text-white px-12 py-3 rounded-[48px] text-md transition-colors inline-flex items-center space-x-2 cursor-pointer hover:bg-blue-700"
          >
            <span>নিবন্ধন করুন</span>

            <Image
              width={24}
              height={24}
              src="/images/arrow-right-white.svg"
              alt="Arrow Right"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
