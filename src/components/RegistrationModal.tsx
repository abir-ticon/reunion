"use client";

import { useState } from "react";
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    // Only allow numbers for mobile field
    if (name === "mobile") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setParticipantData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setParticipantData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!participantData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!participantData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^01[3-9]\d{8}$/.test(participantData.mobile)) {
      newErrors.mobile = "Please enter a valid Bangladesh mobile number";
    }

    if (!participantData.sscBatch) {
      newErrors.sscBatch = "SSC batch is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    // Check if any guest exists with empty name
    if (guests.length > 0) {
      const incompleteGuests = guests.filter((guest) => !guest.name.trim());

      if (incompleteGuests.length > 0) {
        setErrors({
          guests: "Please fill in all guest names or remove empty guests",
        });
        return false;
      }
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Prepare submission data
    const submissionData = {
      participant: {
        name: participantData.name,
        mobile: participantData.mobile,
        email: participantData.email,
        sscBatch: participantData.sscBatch,
        profileImage: participantData.profileImage
          ? {
              name: participantData.profileImage.name,
              size: participantData.profileImage.size,
              type: participantData.profileImage.type,
            }
          : null,
      },
      guests: guests,
      totalCost:
        200 +
        guests.length * 150 +
        " BDT (Participant: 200 BDT, Each Guest: 150 BDT)",
    };

    // Log all data to console
    console.log("====================================");
    console.log("REGISTRATION FORM DATA SUBMITTED:");
    console.log("====================================");
    console.log("\n📝 PARTICIPANT INFORMATION:");
    console.log(participantData);
    console.log("\n👥 GUEST INFORMATION:");
    console.log(guests);
    console.log("\n💰 COST BREAKDOWN:");
    console.log(submissionData.totalCost);
    console.log("\n✅ Complete Submission Data:");
    console.log(JSON.stringify(submissionData, null, 2));
    console.log("====================================");

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ParticipantInfo
            participantData={participantData}
            onInputChange={handleParticipantInputChange}
            onImageUpload={handleImageUpload}
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
            errors={errors}
          />
        );
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Participant Information";
      case 2:
        return "Add Your Guests (Optional)";
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
      <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full md:w-[846px] mx-auto px-8 md:px-[154px] py-8 md:py-[64px]">
        {/* Modal Header */}
        <div className="mb-8">
          <p className="text-xl text-[#007BFF] font-medium">
            Step {currentStep} of 4
          </p>
          <h2 className="text-3xl font-bold text-[#1E293B]">
            {getStepTitle()}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex gap-6">
          <button
            type="button"
            onClick={currentStep === 1 ? onClose : prevStep}
            className="flex-[40%] px-6 py-3 border border-[#007BFF] text-[#007BFF] rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Back
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-[60%] px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentStep === 3 ? "Proceed to Payment" : "Next"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-[60%] px-6 py-3 bg-[#007BFF] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
