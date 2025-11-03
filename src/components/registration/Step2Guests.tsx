import Image from "next/image";

interface Guest {
  id: string;
  name: string;
  relationship: string;
}

interface Step2GuestsProps {
  guests: Guest[];
  onAddGuest: () => void;
  onUpdateGuest: (id: string, field: keyof Guest, value: string) => void;
  onRemoveGuest: (id: string) => void;
  errors: Record<string, string>;
}

export default function Step2Guests({
  guests,
  onAddGuest,
  onUpdateGuest,
  onRemoveGuest,
  errors,
}: Step2GuestsProps) {
  return (
    <div className="space-y-6">
      {errors.guests && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.guests}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onAddGuest}
        className="bg-[#007BFF] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <Image
          src="/images/plus-sign.svg"
          alt="অতিথি যোগ করুন"
          width={16}
          height={16}
        />
        <span className="text-[16px]">অতিথি যোগ করুন</span>
      </button>

      {guests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-2">এখনও কোনও অতিথি যোগ করা হয়নি।</p>
          <p className="text-sm text-gray-500">
            আপনার সাথে যোগদানের জন্য কাউকে আমন্ত্রণ জানাতে উপরের &quot;অতিথি যোগ
            করুন&quot; বোতামে ক্লিক করুন।
          </p>
        </div>
      ) : (
        guests.map((guest) => (
          <div
            key={guest.id}
            className="flex items-end md:space-x-4 flex-col md:flex-row gap-2 md:gap-0"
          >
            <div className="md:flex-1 flex-auto w-full">
              <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
                নাম
              </label>
              <input
                type="text"
                value={guest.name}
                onChange={(e) =>
                  onUpdateGuest(guest.id, "name", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
                style={{ color: "#6A6A6A" }}
                placeholder="অতিথির নাম লিখুন"
              />
            </div>
            <div className="md:flex-1 flex-auto flex gap-2 w-full items-end">
              <div className="w-full">
                <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
                  সম্পর্ক
                </label>
                <div className="relative">
                  <select
                    value={guest.relationship}
                    onChange={(e) =>
                      onUpdateGuest(guest.id, "relationship", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors appearance-none"
                    style={{ color: "#6A6A6A" }}
                  >
                    <option value="Spouse">স্বামী/স্ত্রী</option>
                    <option value="Child">সন্তান</option>
                    <option value="Family">পরিবার</option>
                    <option value="Friend">বন্ধু</option>
                    <option value="Colleague">সহকর্মী</option>
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
              </div>
              <button
                type="button"
                onClick={() => onRemoveGuest(guest.id)}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer mb-2"
              >
                <Image
                  src="/images/delete-icon.svg"
                  alt="অতিথি সরান"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
