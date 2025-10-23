export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-10 text-4xl">📅</div>
        <div className="absolute top-8 right-20 text-3xl">💡</div>
        <div className="absolute bottom-4 left-1/4 text-3xl">✏️</div>
        <div className="absolute bottom-8 right-10 text-4xl">⚙️</div>
        <div className="absolute top-1/2 left-20 text-3xl">📄</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-[#555555] text-[16px] flex flex-col items-center justify-center gap-4">
          {/* Address */}
          <a href="https://maps.app.goo.gl/Ka9tdty4WoTF4hW86" target="_blank" className="">ইব্রাহিমপুর, হরিরামপুর, মানিকগঞ্জ</a>

          {/* Contact Information */}
          <div className="flex md:flex-row flex-col items-center justify-center gap-2 md:gap-4">
            <a href="mailto:email@example.com" className="">
              email@example.com
            </a>
            <a href="tel:01712323212">017 12 323 212</a>
            <a href="tel:01512435323">015 12 435 323</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
