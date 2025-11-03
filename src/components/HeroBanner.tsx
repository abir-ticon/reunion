"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const router = useRouter();

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
            ছাত্র পরিষদ । অনুষ্টানের স্থান ও তারিখ স্কুল প্রাঙ্গণ, ১৩ শে
            ডিসেম্বর, ২০২৫
          </p>
          <p className="text-lg md:text-xl mb-8 mx-auto text-[#333]">
            যোগাযোগ শতবার্ষিকী উদযাপন &apos;রেজিস্ট্রেশন উপ-কমিটি:&apos; আহবায়ক
            : এস এম আব্দুর রউফ, ফোন নম্বর: ০১৭১৩৩১৬৭৫৪৭ সদস্য সচিব : আশরাফ হোসেন
            কিরন , ফোন নম্বর: ০১৮৩১৯৮৭৯২২
          </p>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => router.push("/registration-info")}
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
