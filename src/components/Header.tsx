import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo and School Name */}
          <div className="flex items-center space-x-4">
            {/* School Logo */}
            <Image
              src="/images/logo.svg"
              alt="School Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            {/* School Name */}
            <div className="text-gray-800">
              <h1 className="text-lg font-semibold">
                ইব্রাহিমপুর ঈশ্বর চন্দ্র উচ্চ বিদ্যালয়
              </h1>
            </div>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-6">
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Contact Us
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
