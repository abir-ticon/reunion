import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 bg-blue-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-bg.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-5"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About the Alumni Program
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our alumni program aims to bring together generations of students
              to share memories, network, and strengthen our community. Join the
              upcoming reunion event and celebrate the bond that connects us
              all.
            </p>
            <button className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors inline-flex items-center space-x-2">
              <span>Learn More</span>
              <svg
                className="w-4 h-4"
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

          {/* Right side - Image */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Image
                src="/images/about-image.png"
                alt="Alumni Reunion"
                width={500}
                height={400}
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>

            {/* Decorative elements around image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
