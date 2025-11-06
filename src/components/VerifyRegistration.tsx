"use client";

import {
  calculateTotalCost,
  GUEST_COST,
  PARTICIPANT_COST,
} from "@/constants/pricing";
import { useState } from "react";

interface Guest {
  id: number;
  name: string;
  relationship: string;
  created_at: string;
}

interface Payment {
  id: number;
  payment_id: string;
  amount: string;
  status: string;
  bkash_url: string | null;
  transaction_id: string | null;
  bkash_payment_id: string | null;
  created_at: string;
  updated_at: string;
}

interface RegistrationData {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  ssc_batch: string;
  profile_image: string;
  guests: Guest[];
  payment: Payment;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: RegistrationData[];
}

interface VerifyRegistrationProps {
  onClose: () => void;
}

export default function VerifyRegistration({
  onClose,
}: VerifyRegistrationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RegistrationData[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const response = await fetch(
        `https://isa100years.com/cms/api/search/?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data: ApiResponse = await response.json();

      if (data.error || !data.data || data.data.length === 0) {
        setError(data.message || "কোন নিবন্ধন পাওয়া যায়নি");
        setSearchResults(null);
      } else {
        setSearchResults(data.data);
        setError(null);
      }
    } catch {
      setError(
        "নিবন্ধন যাচাই করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "অপেক্ষমান";
      case "PAID":
        return "পেমেন্ট করা হয়েছে";
      case "COMPLETED":
        return "নিশ্চিত";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="py-8 px-4  bg-white "
      style={{
        backgroundImage: "url('/images/about-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg border border-gray-200  p-6">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            নিবন্ধন যাচাই করুন
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="ফোন নম্বর বা নাম লিখুন"
            className="w-full text-black px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#007BFF] hover:text-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((registration, index) => {
              const totalAmount = calculateTotalCost(
                registration.guests.length
              );
              return (
                <div
                  key={registration.id}
                  className="bg-gray-50 rounded-lg md:p-6 p-4 border border-gray-200"
                >
                  {searchResults.length > 1 && (
                    <div className="mb-4 pb-4 border-b border-gray-300">
                      <span className="text-sm font-semibold text-[#007BFF]">
                        নিবন্ধন #{index + 1}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
                    নিবন্ধন তথ্য
                  </h3>

                  <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                    {/* Participant Info */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#1E293B] mb-3">
                        অংশগ্রহণকারীর তথ্য
                      </h4>
                      <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span className="font-semibold text-[#1E293B] min-w-[140px]">
                            নাম:
                          </span>
                          <span className="text-gray-700">
                            {registration.name}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span className="font-semibold text-[#1E293B] min-w-[140px]">
                            মোবাইল:
                          </span>
                          <span className="text-gray-700">
                            {registration.mobile_number}
                          </span>
                        </div>
                        {registration.email && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <span className="font-semibold text-[#1E293B] min-w-[140px]">
                              ইমেইল:
                            </span>
                            <span className="text-gray-700">
                              {registration.email}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span className="font-semibold text-[#1E293B] min-w-[140px]">
                            এসএসসি ব্যাচ:
                          </span>
                          <span className="text-gray-700">
                            {registration.ssc_batch}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#1E293B] mb-3">
                        অতিথি ({registration.guests.length} জন)
                      </h4>
                      {registration.guests.length > 0 ? (
                        <div className="space-y-2">
                          {registration.guests.map((guest, guestIndex) => (
                            <div
                              key={guest.id}
                              className="flex flex-col md:flex-row md:items-center gap-2"
                            >
                              <span className="text-gray-700">
                                {guestIndex + 1}. {guest.name} (
                                {guest.relationship})
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">কোন অতিথি যোগ করা হয়নি</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-[#007BFF] rounded-lg md:p-6 p-4 text-white">
                    <h4 className="text-lg font-semibold mb-4">পেমেন্ট তথ্য</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="font-semibold min-w-[140px]">
                          অংশগ্রহণকারী:
                        </span>
                        <span>{PARTICIPANT_COST} BDT</span>
                      </div>
                      {registration.guests.length > 0 && (
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span className="font-semibold min-w-[140px]">
                            অতিথি ({registration.guests.length} জন):
                          </span>
                          <span>
                            {registration.guests.length * GUEST_COST} BDT
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 pt-3 border-t border-blue-400">
                        <span className="font-bold text-base min-w-[140px]">
                          মোট:
                        </span>
                        <span className="font-bold text-base">
                          {totalAmount} BDT
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3">
                        <span className="font-semibold min-w-[140px]">
                          স্ট্যাটাস:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium w-max ${getStatusColor(
                            registration.payment.status
                          )}`}
                        >
                          {getStatusText(registration.payment.status)}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="font-semibold min-w-[140px]">
                          নিবন্ধন নম্বর:
                        </span>
                        <span>{registration.id}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="font-semibold min-w-[140px]">
                          পেমেন্ট আইডি:
                        </span>
                        <span>{registration.payment.payment_id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
