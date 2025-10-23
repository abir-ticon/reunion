"use client";

import Image from "next/image";
import { useState } from "react";

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

  const [participantData, setParticipantData] = useState({
    name: "",
    mobile: "",
    email: "",
    sscBatch: "",
    profileImage: null as File | null,
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
      relationship: "Family",
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

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form and close modal
    setParticipantData({
      name: "",
      mobile: "",
      email: "",
      sscBatch: "",
      profileImage: null,
    });
    setGuests([]);
    setCurrentStep(1);
    setIsSubmitting(false);
    onClose();

    // Show success message
    alert("Registration submitted successfully! We'll contact you soon.");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={participantData.name}
          onChange={handleParticipantInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Mobile Number *
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={participantData.mobile}
          onChange={handleParticipantInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
          placeholder="+88 01X XXXX XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={participantData.email}
          onChange={handleParticipantInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="sscBatch"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          SSC Batch *
        </label>
        <select
          id="sscBatch"
          name="sscBatch"
          value={participantData.sscBatch}
          onChange={handleParticipantInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
        >
          <option value="" disabled>
            1980 - 2025
          </option>
          {Array.from({ length: 45 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        <div
          className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("profileImage")?.click()}
        >
          <input
            type="file"
            id="profileImage"
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-[#007BFF]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-medium">Upload image</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">
                {participantData.profileImage
                  ? participantData.profileImage.name
                  : "No File Chosen"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <button
        type="button"
        onClick={addGuest}
        className="bg-[#007BFF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add Guest</span>
      </button>

      {guests.map((guest) => (
        <div key={guest.id} className="flex items-end space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={guest.name}
              onChange={(e) => updateGuest(guest.id, "name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
              style={{ color: "#6A6A6A" }}
              placeholder="Enter guest name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship
            </label>
            <select
              value={guest.relationship}
              onChange={(e) =>
                updateGuest(guest.id, "relationship", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
              style={{ color: "#6A6A6A" }}
            >
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeGuest(guest.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}

      {guests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>
            No guests added yet. Click &quot;Add Guest&quot; to get started.
          </p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => {
    const participantCost = 200;
    const guestCost = 150;
    const totalCost = participantCost + guests.length * guestCost;

    return (
      <div className="space-y-6">
        {/* Participant Summary */}
        <div
          className="p-6"
          style={{
            borderRadius: "16px",
            border: "1px solid #BFBFBF",
            backgroundColor: "white",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">
              Participant Summary
            </h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-[#007BFF] text-sm flex items-center space-x-1 hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit Info</span>
            </button>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center relative">
              {participantData.profileImage ? (
                <Image
                  src={URL.createObjectURL(participantData.profileImage)}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <button className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[#007BFF] text-xs">
                Change
              </button>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <span className="text-gray-500 text-sm">Name</span>
                <p className="font-medium text-gray-800">
                  {participantData.name || "Name not provided"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Mobile</span>
                <p className="text-gray-800">
                  {participantData.mobile || "Mobile not provided"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Email</span>
                <p className="text-gray-800">
                  {participantData.email || "Email not provided"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Batch</span>
                <p className="text-gray-800">
                  {participantData.sscBatch || "Not selected"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Summary */}
        <div
          className="p-6"
          style={{
            borderRadius: "16px",
            border: "1px solid #BFBFBF",
            backgroundColor: "white",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">
              Guest Summary
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-[#007BFF] text-sm flex items-center space-x-1 hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Guest</span>
            </button>
          </div>
          {guests.length > 0 ? (
            <div className="space-y-3">
              {guests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span className="text-gray-500 text-sm">
                      Guest {index + 1}
                    </span>
                    <p className="font-medium text-gray-800">
                      {guest.name || "Guest name"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No guests added</p>
          )}
        </div>

        {/* Cost Breakdown */}
        <div
          className="p-6"
          style={{
            borderRadius: "16px",
            border: "1px solid #BFBFBF",
            backgroundColor: "white",
          }}
        >
          <h3 className="font-semibold text-gray-800 text-lg mb-6">
            Cost Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Participant:</span>
              <span className="text-gray-800">{participantCost} BDT</span>
            </div>
            {guests.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Each Guest:</span>
                <span className="text-gray-800">
                  {guests.length} x {guestCost} BDT
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 mt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total Cost:</span>
                <span className="font-bold text-[#007BFF]">
                  {totalCost} BDT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Complete your registration by clicking the button below.
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#007BFF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Complete Registration"}
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Participant Information";
      case 2:
        return "Add Your Guests";
      case 3:
        return "Summary & Review";
      case 4:
        return "Payment Checkout";
      default:
        return "Participant Information";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "#EFEFEF" }}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ width: "846px", padding: "64px 154px" }}
      >
        {/* Modal Header */}
        <div className="mb-8">
          <p className="text-sm text-[#007BFF] font-medium">
            Step {currentStep} of 4
          </p>
          <h2 className="text-xl font-bold text-[#1E293B]">{getStepTitle()}</h2>
        </div>

        {/* Modal Body */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? onClose : prevStep}
            className="px-6 py-3 border border-[#007BFF] text-[#007BFF] rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Back
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentStep === 3 ? "Proceed to Payment" : "Next"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
