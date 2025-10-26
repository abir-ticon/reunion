"use client";

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
  const participantCost = 200;
  const guestCost = 150;
  const totalCost = participantCost + guests.length * guestCost;

  return (
    <div className="space-y-6">
      {/* Recap Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recap</h3>

        <div className="space-y-4">
          {/* Participants Row */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-600">Participants</span>
            <span className="text-gray-900 font-medium">1</span>
          </div>

          {/* Guests Row */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-600">Guests</span>
            <span className="text-gray-900 font-medium">{guests.length}</span>
          </div>

          {/* Total Row */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-900 font-bold">Total</span>
            <span className="text-gray-900 font-bold">{totalCost} BDT</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#007BFF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
}
