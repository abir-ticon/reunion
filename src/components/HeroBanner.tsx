import Image from "next/image";

export default function HeroBanner() {
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
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[#007BFF] leading-[1]">
            Welcome to the <br /> Alumni Program Registration
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 mx-auto text-[#333]">
            Reconnect with fellow alumni through our exclusive event. Register
            now to secure your spot
          </p>

          {/* CTA Button */}
          <button className="bg-[#007BFF] text-white px-12 py-3 rounded-[48px] text-md transition-colors inline-flex items-center space-x-2 cursor-pointer">
            <span>Register Now</span>

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
