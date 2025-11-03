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
          <div className="flex items-center flex-col justify-center gap-2 md:gap-2">
            <span className="font-bold">যোগাযোগ</span>
            <div className="flex flex-col gap-2 items-start">
              <span>শতবার্ষিকী উদযাপন &apos;রেজিস্ট্রেশন উপ-কমিটি&apos;</span>

              <span>
                আহবায়ক : এস এম আব্দুর রউফ(
                <a href="tel:017133167547">০১৭১৩৩১৬৭৫৪৭</a>)
              </span>
              <span>
                সদস্য সচিব : আশরাফ হোসেন কিরন(
                <a href="tel:01831987922">০১৮৩১৯৮৭৯২২</a>)
              </span>
            </div>
          </div>
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
