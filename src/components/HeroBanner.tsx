export default function HeroBanner() {
  return (
    <section
      className="relative"
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
          <button className="bg-[#007BFF] text-white px-12 py-3 rounded-[48px] text-lg font-semibold transition-colors inline-flex items-center space-x-2 cursor-pointer">
            <span>Register Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.5 12H5"
                stroke="#F1F5F9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                stroke="#F1F5F9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
