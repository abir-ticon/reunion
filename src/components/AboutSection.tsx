import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      className="py-16 bg-[#E0F7FA] relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/about-bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div className="lg:max-w-[475px] ">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#1E293B] mb-8">
              ইব্রাহিমপুর ইশ্বরচন্দ্র উচ্চ বিদ্যালয়ের গৌরবোজ্জ্বল শতবর্ষ পূর্তি
              উদযাপন
            </h2>
            <p className="text-md text-[#000] mb-8 leading-[26px]">
              আয়োজনে: ইব্রাহিমপুর ঈশ্বরচন্দ্র উচ্চবিদ্যালয় সম্মিলিত প্রাক্তন
              ছাত্র পরিষদ ।
              <br />
              অনুষ্ঠানের স্থান ও তারিখ
              <br />
              স্কুল প্রাঙ্গণ, ১৩ শে ডিসেম্বর, ২০২৫
            </p>
            <p className="text-md text-[#000] mb-8 leading-[26px]">
              যোগাযোগ <br />
              শতবার্ষিকী উদযাপন &apos;রেজিস্ট্রেশন উপ-কমিটি:&apos; <br />
              আহবায়ক : এস এম আব্দুর রউফ, ফোন নম্বর: ০১৭১৩৩১৬৭৫৪৭ <br />
              সদস্য সচিব : আশরাফ হোসেন কিরন , ফোন নম্বর: ০১৮৩১৯৮৭৯২২
            </p>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/about-image.png"
                alt="Alumni Reunion"
                width={500}
                height={400}
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
