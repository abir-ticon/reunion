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
        <div className="text-center">
          {/* Address */}
          <div className="mb-6">
            <p className="text-gray-700 text-lg font-medium">
              ইব্রাহিমপুর, হরিরামপুর, মানিকগঞ্জ
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> email@example.com
            </p>
            <div className="flex justify-center space-x-6">
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> 017 12 323 212
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> 015 12 435 323
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
