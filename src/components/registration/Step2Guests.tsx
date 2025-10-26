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
          <div className="flex-1">
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
                <img
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
}
