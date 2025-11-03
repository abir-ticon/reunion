export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white border-t border-gray-200 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-[#555555] text-[16px] flex flex-col items-center justify-center gap-4">
          {/* Address */}
          <a
            href="https://maps.app.goo.gl/Ka9tdty4WoTF4hW86"
            target="_blank"
            className=""
          >
            ইব্রাহিমপুর, হরিরামপুর, মানিকগঞ্জ
          </a>

          {/* Contact Information */}
          <div className="flex md:flex-row flex-col items-center justify-center gap-2 md:gap-4">
            <a href="tel:017133167547">০১৭১৩৩১৬৭৫৪৭</a>
            <a href="tel:01831987922">০১৮৩১৯৮৭৯২২</a>
          </div>
          <p className="text-md text-[#000] leading-[26px]">
            কারিগরি সহযোগিতায়ঃ 
            <a href="https://ticonsys.com/" target="_blank" className="text-[#007BFF]">{" "}টিকন সিস্টেম লিমিটেড</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
