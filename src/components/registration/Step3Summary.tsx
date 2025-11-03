import Image from "next/image";

interface ParticipantData {
  name: string;
  mobile: string;
  email: string;
  sscBatch: string;
  profileImage: File | null;
  countryCode: string;
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
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Step3Summary({
  participantData,
  guests,
  onEditParticipant,
  onEditGuests,
  onImageUpload,
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
          <h3 className="font-semibold text-[#1E293B] text-lg">
            Participant Summary
          </h3>
          <button
            onClick={onEditParticipant}
            className="text-[#007BFF] text-sm flex items-center space-x-1 hover:underline font-medium"
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
        <div className="flex items-start space-x-6 md:gap-[60px] gap-4 md:flex-row flex-col">
          {/* Profile Picture Section */}
          <div className="flex flex-row md:gap-0 gap-4 items-center md:flex-col">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden mb-2">
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
            </div>
            <div>
              <input
                type="file"
                id="changeProfileImage"
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() =>
                  document.getElementById("changeProfileImage")?.click()
                }
                className="text-[#007BFF] text-xs font-medium hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[#6A6A6A] text-sm font-medium min-w-[80px]">
                  Name
                </span>
                <p className="text-[#1E293B]">
                  {participantData.name || "Name not provided"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[#6A6A6A] text-sm font-medium min-w-[80px]">
                  Mobile
                </span>
                <p className="text-[#1E293B]">
                  {participantData.mobile || "Mobile not provided"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[#6A6A6A] text-sm font-medium min-w-[80px]">
                  Email
                </span>
                <p className="text-[#1E293B]">
                  {participantData.email || "Email not provided"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[#6A6A6A] text-sm font-medium min-w-[80px]">
                  Batch
                </span>
                <p className="text-[#1E293B]">
                  {participantData.sscBatch || "Not selected"}
                </p>
              </div>
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
          <h3 className="font-semibold text-[#1E293B] text-lg">
            Guest Summary
          </h3>
          <button
            onClick={onEditGuests}
            className="text-[#007BFF] text-sm flex items-center space-x-1 hover:underline font-medium cursor-pointer"
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
          <div className="space-y-0">
            {guests.map((guest, index) => (
              <div key={guest.id}>
                {index > 0 && (
                  <div className="border-t border-gray-200 my-3"></div>
                )}
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#6A6A6A] text-sm font-medium">
                    Guest {index + 1}
                  </span>
                  <p className="text-[#6A6A6A]">{guest.name || "Guest name"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6A6A6A] text-sm">No guests added</p>
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
        <h3 className="font-semibold text-[#1E293B] text-lg mb-6">
          Cost Breakdown
        </h3>
        <div className="space-y-0">
          {/* Participant */}
          <div className="flex justify-between py-2">
            <span className="text-[#6A6A6A]">Participant</span>
            <span className="text-[#6A6A6A]">{participantCost} BDT</span>
          </div>

          {/* Separator */}
          {guests.length > 0 && (
            <div className="border-t border-[#BFBFBF] my-3"></div>
          )}

          {/* Each Guest */}
          {guests.length > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-[#6A6A6A]">Each Guest</span>
              <span className="text-[#6A6A6A]">
                {guests.length} x {guestCost} BDT
              </span>
            </div>
          )}

          {/* Separator */}
          <div className="border-t border-[#BFBFBF] my-3"></div>

          {/* Total Cost */}
          <div className="flex justify-between py-2">
            <span className="font-bold text-[#1E293B]">Total Cost</span>
            <span className="font-bold text-[#007BFF]">{totalCost} BDT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
