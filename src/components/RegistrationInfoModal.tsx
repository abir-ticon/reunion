"use client";

interface RegistrationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RegistrationInfoModal({
  isOpen,
  onClose,
  onConfirm,
}: RegistrationInfoModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNo = () => {
    onClose();
  };

  const handleYes = () => {
    onClose();
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full md:w-[846px] mx-auto px-8 md:px-[154px] py-8 md:py-[44px]">
        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="md:text-3xl text-xl font-bold text-[#1E293B] text-center mb-4">
            রেজিষ্ট্রেশন তথ্য
          </h2>
        </div>

        {/* Info Card */}
        <div className="mb-6">
          <div className="space-y-6">
            <p className="text-lg font-semibold text-[#1E293B] mb-6">
              রেজিষ্ট্রেশন এর ব্যাপারে আর-ও কিছু জরুরি তথ্য উপস্থাপন করা হইল :
            </p>

            <div className="space-y-4 text-[#1E293B] leading-relaxed">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">১)</span> তিন বছরের নিচের
                  বাচ্চাদের ও সঙ্গে নিয়ে আসা যাবে এবং তাদের জন্য কোন
                  রেজিষ্ট্রেশন ফি লাগবে না।
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">২)</span> তিন বছরের উপর থেকে
                  সবার জন্য রেজিষ্ট্রেশন ফি ৫১০/= টাকা প্রতিজন।
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">৩)</span> যারা রেজিষ্ট্রেশন এর
                  যোগ্য হবেন :
                </p>
                <ul className="list-none space-y-2 ml-4 mt-2">
                  <li>
                    <span className="font-semibold">ক)</span> স্কুলের সকল
                    প্রাক্তন ছাত্র ছাত্রী বৃন্দ,
                  </li>
                  <li>
                    <span className="font-semibold">খ)</span> প্রাক্তন ছাত্র
                    ছাত্রী দের স্বামী ও স্ত্রীগন।
                  </li>
                  <li>
                    <span className="font-semibold">গ)</span> তাদের ছেলে, মেয়ে,
                    ছেলের বউ ও মেয়র জামাইগন।
                  </li>
                  <li>
                    <span className="font-semibold">ঘ)</span> প্রাক্তন ছাত্র
                    ছাত্রী দের মধ্যে যারা অবিবাহিত তাদের বাবা - মা এবং বিবাহিদের
                    মধ্যে ও যদি কেউ বাবা - মা কে আনতে চান তারা।
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-lg font-semibold text-[#007BFF]">
                  আশাকরি আপনারা স্বপরিবারে অংশগ্রহণ করতে পারবেন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 sm:flex-row flex-col">
          <button
            type="button"
            onClick={handleNo}
            className="flex-[40%] px-6 py-3 border border-[#007BFF] text-[#007BFF] rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            না, এখন নয়
          </button>
          <button
            type="button"
            onClick={handleYes}
            className="flex-[60%] px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            হ্যাঁ, রেজিষ্ট্রেশন করব
          </button>
        </div>
      </div>
    </div>
  );
}

