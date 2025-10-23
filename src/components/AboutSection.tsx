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
              About the Alumni Program
            </h2>
            <p className="text-lg text-[#696969] mb-8 leading-[26px]">
              Our alumni program aims to bring together generations of students
              to share memories, network, and strengthen our community. Join the
              upcoming reunion event and celebrate the bond that connects us
              all.
            </p>
            <button className="border-2 border-blue-500 text-blue-600 px-12 py-3 rounded-[48px] transition-colors inline-flex items-center space-x-2 cursor-pointer">
              <span>Learn More</span>
              <Image width={24} height={24} src="/images/arrow-right.svg" alt="Arrow Right" />
            </button>
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
