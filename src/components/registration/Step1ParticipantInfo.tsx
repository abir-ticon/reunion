"use client";

import Image from "next/image";
import type { ParsedCountry } from "react-international-phone";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface ParticipantData {
  name: string;
  mobile: string; // Will store full phone number with country code
  email: string;
  sscBatch: string;
  profileImage: File | null;
  countryCode: string; // Will be derived from mobile
}

interface Step1ParticipantInfoProps {
  participantData: ParticipantData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string }
  ) => void;
  errors: Record<string, string>;
}

export default function Step1ParticipantInfo({
  participantData,
  onInputChange,
  onImageUpload,
  onPhoneChange,
  errors,
}: Step1ParticipantInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          নাম <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={participantData.name}
          onChange={onInputChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
            errors.name
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-[#007BFF]"
          }`}
          style={{ color: "#6A6A6A" }}
          placeholder="আপনার পুরো নাম লিখুন"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          মোবাইল নম্বর <span className="text-red-500 font-bold">*</span>
        </label>
        <div
          className={`react-international-phone ${
            errors.mobile ? "error" : ""
          }`}
        >
          <PhoneInput
            value={participantData.mobile}
            onChange={(
              phone: string,
              meta: { country: ParsedCountry; inputValue: string }
            ) => {
              onPhoneChange(phone, meta);
            }}
            defaultCountry="bd"
            inputClassName={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
              errors.mobile
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#007BFF]"
            }`}
            inputStyle={{ height: "50px" }}
            countrySelectorStyleProps={{
              buttonClassName:
                "px-3 py-3 w-16 border border-gray-300 rounded-l-lg focus:outline-none transition-colors hover:border-[#007BFF]",
              buttonStyle: { height: "50px" },
            }}
          />
        </div>
        {errors.mobile && (
          <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          ইমেল <span className="text-gray-500 text-[12px]">(ঐচ্ছিক)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={participantData.email}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="sscBatch"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          এসএসসি ব্যাচ <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="relative">
          <select
            id="sscBatch"
            name="sscBatch"
            value={participantData.sscBatch}
            onChange={onInputChange}
            required
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none transition-colors appearance-none ${
              errors.sscBatch
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#007BFF]"
            }`}
            style={{ color: "#6A6A6A" }}
          >
            <option value="" disabled>
              ব্যাচ নির্বাচন করুন
            </option>
            {Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Image
              src="/images/dropdown-arrow.svg"
              alt="Dropdown"
              width={24}
              height={24}
            />
          </div>
        </div>
        {errors.sscBatch && (
          <p className="mt-1 text-sm text-red-500">{errors.sscBatch}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
          প্রোফাইল ছবি <span className="text-red-500 font-bold">*</span> <span className="text-gray-500 text-[12px]">(সর্বোচ্চ ৫ এমবি)</span>
        </label>
        <div
          className={`border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            errors.profileImage ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => document.getElementById("profileImage")?.click()}
        >
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
            required
          />
          <div className="flex items-center space-x-3 flex-col md:flex-row gap-2 md:gap-0">
            <div className="flex items-center text-[#94A3B8] space-x-2 border border-gray-300 rounded-lg px-2 py-1">
              <Image
                src="/images/upload-icon.svg"
                alt="ছবি আপলোড করুন"
                width={16}
                height={16}
              />
              <span className="text-sm">ছবি আপলোড করুন</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm truncate max-w-[200px]">
                {participantData.profileImage
                  ? participantData.profileImage.name
                  : "কোনো ফাইল নির্বাচন করা হয়নি"}
              </p>
            </div>
          </div>
        </div>
        {errors.profileImage && (
          <p className="mt-1 text-sm text-red-500">{errors.profileImage}</p>
        )}
      </div>
    </div>
  );
}
