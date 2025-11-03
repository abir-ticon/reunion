"use client";

import { calculateTotalCost } from "@/constants/pricing";
import { generateRegistrationPDF } from "@/utils/generatePDF";
import { parsePhoneNumber } from "libphonenumber-js";
import { useState } from "react";
import type { ParsedCountry } from "react-international-phone";
import Step1ParticipantInfo from "./registration/Step1ParticipantInfo";
import Step2Guests from "./registration/Step2Guests";
import Step3Summary from "./registration/Step3Summary";
import Step4Payment from "./registration/Step4Payment";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Guest {
  id: string;
  name: string;
  relationship: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [participantData, setParticipantData] = useState({
    name: "",
    mobile: "",
    email: "",
    sscBatch: "",
    profileImage: null as File | null,
    countryCode: "+880", // Default to Bangladesh
  });

  const [guests, setGuests] = useState<Guest[]>([]);

  const handleParticipantInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParticipantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string }
  ) => {
    // Extract country code from phone number
    let countryCode = "+880"; // default
    try {
      if (phone) {
        const parsed = parsePhoneNumber(phone);
        countryCode = `+${parsed.countryCallingCode}`;
      }
    } catch {
      // If parsing fails, use dialCode from country object
      countryCode = `+${meta.country.dialCode}`;
    }

    setParticipantData((prev) => ({
      ...prev,
      mobile: phone,
      countryCode: countryCode,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setParticipantData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const addGuest = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: "",
      relationship: "পিতা",
    };
    setGuests((prev) => [...prev, newGuest]);
  };

  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const removeGuest = (id: string) => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!participantData.name.trim()) {
      newErrors.name = "নাম প্রয়োজন";
    }

    if (!participantData.mobile.trim()) {
      newErrors.mobile = "মোবাইল নম্বর প্রয়োজন";
    }

    if (!participantData.sscBatch) {
      newErrors.sscBatch = "এসএসসি ব্যাচ প্রয়োজন";
    }

    if (!participantData.profileImage) {
      newErrors.profileImage = "প্রোফাইল ছবি প্রয়োজন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    // If no guests, validation passes (user can skip)
    if (guests.length === 0) {
      setErrors({});
      return true;
    }

    // Check if any guest exists with empty name
    const incompleteGuests = guests.filter((guest) => !guest.name.trim());

    if (incompleteGuests.length > 0) {
      setErrors({
        guests:
          "অনুগ্রহ করে সকল অতিথির নাম পূরণ করুন অথবা খালি অতিথিদের নাম সরিয়ে দিন।",
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    // Validate before moving to next step
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    } else if (currentStep === 2) {
      // Only validate if there are guests with incomplete info
      if (!validateStep2()) {
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setErrors({}); // Clear errors when successfully moving forward
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total amount
      const totalAmount = calculateTotalCost(guests.length);

      // Format guests data (remove id field, keep only name and relationship)
      const guestsData = guests.map((guest) => ({
        name: guest.name,
        relationship: guest.relationship,
      }));

      // Get CSRF token from cookies
      const getCsrfToken = () => {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split("=");
          if (name === "csrftoken" || name === "csrf_token") {
            return value;
          }
        }
        return null;
      };

      const csrfToken = getCsrfToken();

      // Create FormData
      const formData = new FormData();
      formData.append("name", participantData.name);
      formData.append("mobile_number", participantData.mobile);
      formData.append("email", participantData.email || "");
      formData.append("ssc_batch", participantData.sscBatch);

      // Append profile image if available
      if (participantData.profileImage) {
        formData.append("profile_image", participantData.profileImage);
      } else {
        formData.append("profile_image", "");
      }

      // Append guests as JSON string
      formData.append("guests", JSON.stringify(guestsData));
      formData.append("amount", totalAmount.toString());

      // Prepare headers
      const headers: HeadersInit = {
        accept: "application/json",
      };

      // Add CSRF token to headers if available
      if (csrfToken) {
        headers["X-CSRFTOKEN"] = csrfToken;
      }

      // Get API URL from environment variable
      const apiUrl =
        process.env.NEXT_PUBLIC_CHECKOUT_API_URL ||
        "https://isa100years.com/cms/api/checkout/";

      // Make API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: formData,
        credentials: "include", // Include cookies for CSRF token
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `API request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Checkout API response:", result);

      // Generate PDF after successful API call
      setIsDownloadingPDF(true);
      try {
        await generateRegistrationPDF({
          participant: {
            name: participantData.name,
            mobile: participantData.mobile,
            email: participantData.email,
            sscBatch: participantData.sscBatch,
            countryCode: participantData.countryCode,
          },
          guests: guests,
          totalCost: totalAmount,
          registrationId: result.registration_id,
          paymentId: result.payment_id,
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        // Don't throw here, API call was successful
      } finally {
        setIsDownloadingPDF(false);
      }

      // Show success popup
      setShowSuccessPopup(true);

      // Reset form and close modal after showing success
      setTimeout(() => {
        setParticipantData({
          name: "",
          mobile: "",
          email: "",
          sscBatch: "",
          profileImage: null,
          countryCode: "+880",
        });
        setGuests([]);
        setCurrentStep(1);
        setIsSubmitting(false);
        setShowSuccessPopup(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting registration:", error);
      setIsSubmitting(false);

      // Show error popup
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "নিবন্ধন জমা দেওয়ার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
      setShowErrorPopup(true);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ParticipantInfo
            participantData={participantData}
            onInputChange={handleParticipantInputChange}
            onImageUpload={handleImageUpload}
            onPhoneChange={handlePhoneChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2Guests
            guests={guests}
            onAddGuest={addGuest}
            onUpdateGuest={updateGuest}
            onRemoveGuest={removeGuest}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3Summary
            participantData={participantData}
            guests={guests}
            onEditParticipant={() => setCurrentStep(1)}
            onEditGuests={() => setCurrentStep(2)}
            onImageUpload={handleImageUpload}
          />
        );
      case 4:
        return (
          <Step4Payment
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            guests={guests}
          />
        );
      default:
        return (
          <Step1ParticipantInfo
            participantData={participantData}
            onInputChange={handleParticipantInputChange}
            onImageUpload={handleImageUpload}
            onPhoneChange={handlePhoneChange}
            errors={errors}
          />
        );
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "অংশগ্রহণকারীর তথ্য";
      case 2:
        return "অতিথি যোগ করুন";
      case 3:
        return "সারাংশ ও পর্যালোচনা";
      case 4:
        return "পেমেন্ট সম্পন্ন করুন";
      default:
        return "অংশগ্রহণকারীর তথ্য";
    }
  };

  const getStepDisplay = () => {
    const stepOrdinals: Record<number, string> = {
      1: "প্রথম",
      2: "দ্বিতীয়",
      3: "তৃতীয়",
      4: "চতুর্থ",
    };

    const bengaliNumerals: Record<number, string> = {
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
    };

    const ordinal = stepOrdinals[currentStep] || "প্রথম";
    const currentBengali = bengaliNumerals[currentStep] || "১";
    const totalBengali = "৪";

    return `${ordinal} ধাপ ( ধাপ ${currentBengali} এর ${totalBengali} )`;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full md:w-[846px] mx-auto px-8 lg:px-[154px] py-8 md:py-[44px]">
          {/* Modal Header */}
          <div className="mb-6">
            <h2 className="md:text-3xl text-xl font-bold text-[#1E293B] flex items-center justify-between sm:flex-row flex-col">
              {getStepTitle()}
              <p className="text-xl text-[#007BFF] font-medium">
                {getStepDisplay()}
              </p>
            </h2>
          </div>

          {/* Modal Body */}
          <div className="mb-6">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex gap-6 sm:flex-row flex-col">
            <button
              type="button"
              onClick={currentStep === 1 ? onClose : prevStep}
              className="flex-[40%] px-6 py-3 border border-[#007BFF] text-[#007BFF] rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              পিছনে
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-[60%] px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {currentStep === 3
                  ? "পরবর্তী"
                  : currentStep === 2 && guests.length === 0
                  ? "এড়িয়ে যান"
                  : "পরবর্তী"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[60%] px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "প্রক্রিয়াকরণ হচ্ছে..."
                  : "নিবন্ধন সম্পন্ন করুন"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Downloading PDF Modal Overlay */}
      {isDownloadingPDF && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl px-12 py-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007BFF] mb-4"></div>
            <p className="text-lg font-semibold text-[#1E293B]">
              PDF ডাউনলোড হচ্ছে...
            </p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl px-12 py-8 flex flex-col items-center">
            <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[#1E293B] text-center">
              নিবন্ধন সফলভাবে জমা দেওয়া হয়েছে!
            </p>
            <p className="text-sm text-[#6A6A6A] mt-2 text-center">
              আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowErrorPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl px-12 py-8 flex flex-col items-center max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[#1E293B] text-center mb-2">
              ত্রুটি
            </p>
            <p className="text-sm text-[#6A6A6A] text-center mb-6">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => setShowErrorPopup(false)}
              className="px-6 py-2 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </>
  );
}
