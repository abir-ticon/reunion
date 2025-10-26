interface Step4PaymentProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function Step4Payment({
  isSubmitting,
  onSubmit,
}: Step4PaymentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Complete your registration by clicking the button below.
        </p>

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
