import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative" style={{backgroundImage: "url('/images/hero-bg.png')"}}>
     
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#007BFF]">
            Welcome to the <br /> Alumni Program Registration
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8  mx-auto text-[#333]">
            Reconnect with fellow alumni through our exclusive event. Register
            now to secure your spot
          </p>

          {/* CTA Button */}
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2">
            <span>Register Now</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
