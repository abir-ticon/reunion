"use client";

import RegistrationModal from "@/components/RegistrationModal";
import { ModalProvider, useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";

function RegistrationInfoContent() {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleYes = () => {
    openModal();
  };

  const handleNo = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12" style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#007BFF] mb-4">
            রেজিষ্ট্রেশন তথ্য
          </h1>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
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
        <div className="flex gap-4 justify-center sm:flex-row flex-col">
        <button
            onClick={handleNo}
            className="flex-1 sm:flex-none px-8 py-4 border-2 border-[#007BFF] text-[#007BFF] rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors cursor-pointer"
          >
            না, এখন নয়
          </button>
          <button
            onClick={handleYes}
            className="flex-1 sm:flex-none px-8 py-4 bg-[#007BFF] text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
          >
            হ্যাঁ, রেজিষ্ট্রেশন করব
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default function RegistrationInfoPage() {
  return (
    <ModalProvider>
      <RegistrationInfoContent />
    </ModalProvider>
  );
}
