import Image from "next/image";

interface ParticipantData {
  name: string;
  mobile: string;
  email: string;
  sscBatch: string;
  profileImage: File | null;
}

interface Guest {
  id: string;
  name: string;
  relationship: string;
}

interface Step3SummaryProps {
  participantData: ParticipantData;
  guests: Guest[];
  onEditParticipant: () => void;
  onEditGuests: () => void;
}

export default function Step3Summary({
  participantData,
  guests,
  onEditParticipant,
  onEditGuests,
}: Step3SummaryProps) {
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
            onClick={onEditParticipant}
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
          <h3 className="font-semibold text-gray-800 text-lg">Guest Summary</h3>
          <button
            onClick={onEditGuests}
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
              <div key={guest.id} className="flex items-center justify-between">
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
              <span className="font-bold text-[#007BFF]">{totalCost} BDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
