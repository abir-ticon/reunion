"use client";

import Image from "next/image";
import { useState } from "react";

interface Guest {
  id: string;
  name: string;
  relationship: string;
}

interface Step4PaymentProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  guests: Guest[];
}

export default function Step4Payment({
  isSubmitting,
  onSubmit,
  guests,
}: Step4PaymentProps) {
  const [selectedPayment, setSelectedPayment] = useState("bkash");
  const participantCost = 200;
  const guestCost = 150;
  const totalCost = participantCost + guests.length * guestCost;

  return (
    <div className="space-y-6">
      {/* Recap Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">সারসংক্ষেপ</h3>

        <div className="space-y-4">
          {/* Participants Row */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-600">অংশগ্রহণকারী</span>
            <span className="text-gray-900 font-medium">1</span>
          </div>

          {/* Guests Row */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-600">অতিথি</span>
            <span className="text-gray-900 font-medium">{guests.length}</span>
          </div>

          {/* Total Row */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-900 font-bold">মোট</span>
            <span className="text-gray-900 font-bold">{totalCost} BDT</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          পেমেন্ট পদ্ধতি
        </h3>

        <div className="space-y-3">
          {/* Bkash Radio Button */}
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="bkash"
              checked={selectedPayment === "bkash"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="mr-4 w-4 h-4 text-[#007BFF] focus:ring-[#007BFF]"
            />
            <div className="flex items-center space-x-3 flex-1">
              <Image
                src="/images/bkas-icon.png"
                alt="Bkash"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Bkash</span>
                <p className="text-sm text-gray-500">
                  বিকাশ মোবাইল ব্যাংকিংয়ের মাধ্যমে নিরাপদে পেমেন্ট করুন
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
