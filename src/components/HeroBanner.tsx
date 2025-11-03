"use client";

import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  const { openInfoModal } = useModal();

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
            ইব্রাহিমপুর ইশ্বরচন্দ্র উচ্চ বিদ্যালয়ের <br /> গৌরবোজ্জ্বল শতবর্ষ
            পূর্তি উদযাপন
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 mx-auto text-[#333]">
            আয়োজনে : ইব্রাহিমপুর ঈশ্বরচন্দ্র উচ্চবিদ্যালয় সম্মিলিত প্রাক্তন
            ছাত্র পরিষদ ।
            <br />
            অনুষ্টানের স্থান ও তারিখ :{" "}
            <Link
              className="font-bold"
              href="https://maps.app.goo.gl/Ka9tdty4WoTF4hW86"
              target="_blank"
            >
              স্কুল প্রাঙ্গণ
            </Link>
            , ১৩ ই ডিসেম্বর, ২০২৫
          </p>
          {/* CTA Button */}
          <button
            type="button"
            onClick={openInfoModal}
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
