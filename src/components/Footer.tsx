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

          {/* Contact Information */}
          
          <p className="text-md text-[#000] leading-[26px]">
            কারিগরি সহযোগিতায়ঃ
            <a
              href="https://ticonsys.com/"
              target="_blank"
              className="text-[#007BFF]"
            >
              {" "}
              টিকন সিস্টেম লিমিটেড
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
