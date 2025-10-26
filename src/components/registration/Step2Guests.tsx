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
          alt="Add Guest"
          width={16}
          height={16}
        />
        <span className="text-[16px]">Add Guest</span>
      </button>

      {guests.map((guest) => (
        <div
          key={guest.id}
          className="flex items-end md:space-x-4 flex-col md:flex-row gap-2 md:gap-0"
        >
          <div className="md:flex-1 flex-auto w-full">
            <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              value={guest.name}
              onChange={(e) => onUpdateGuest(guest.id, "name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
              style={{ color: "#6A6A6A" }}
              placeholder="Enter guest name"
            />
          </div>
          <div className="md:flex-1 flex-auto flex gap-2 w-full items-end">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
                Relationship
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
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
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
                alt="Remove Guest"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
