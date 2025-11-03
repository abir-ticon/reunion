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
            <h2 className="text-3xl md:text-[56px] font-bold text-[#1E293B] mb-8">
            প্রাক্তন শিক্ষার্থী কর্মসূচি সম্পর্কে
            </h2>
            <p className="text-lg text-[#696969] mb-8 leading-[26px]">
            আমাদের প্রাক্তন শিক্ষার্থী কর্মসূচির লক্ষ্য হল বিভিন্ন প্রজন্মের শিক্ষার্থীদের একত্রিত করা যাতে তারা স্মৃতি ভাগাভাগি করতে, নেটওয়ার্কিং করতে এবং আমাদের সম্প্রদায়কে শক্তিশালী করতে পারে। আসন্ন পুনর্মিলনী অনুষ্ঠানে যোগ দিন এবং সেই বন্ধন উদযাপন করুন যা আমাদের সবাইকে সংযুক্ত করে।
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
