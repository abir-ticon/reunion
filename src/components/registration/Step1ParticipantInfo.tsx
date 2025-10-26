import Image from "next/image";

interface ParticipantData {
  name: string;
  mobile: string;
  email: string;
  sscBatch: string;
  profileImage: File | null;
}

interface Step1ParticipantInfoProps {
  participantData: ParticipantData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

export default function Step1ParticipantInfo({
  participantData,
  onInputChange,
  onImageUpload,
  errors,
}: Step1ParticipantInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={participantData.name}
          onChange={onInputChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
            errors.name
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-[#007BFF]"
          }`}
          style={{ color: "#6A6A6A" }}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          Mobile Number *
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={participantData.mobile}
          onChange={onInputChange}
          required
          maxLength={11}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
            errors.mobile
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-[#007BFF]"
          }`}
          style={{ color: "#6A6A6A" }}
          placeholder="01XXXXXXXXX"
        />
        {errors.mobile && (
          <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={participantData.email}
          onChange={onInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007BFF] transition-colors"
          style={{ color: "#6A6A6A" }}
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="sscBatch"
          className="block text-sm font-medium text-[#1E293B] mb-2 font-medium"
        >
          SSC Batch *
        </label>
        <div className="relative">
          <select
            id="sscBatch"
            name="sscBatch"
            value={participantData.sscBatch}
            onChange={onInputChange}
            required
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none transition-colors appearance-none ${
              errors.sscBatch
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#007BFF]"
            }`}
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
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Image
              src="/images/dropdown-arrow.svg"
              alt="Dropdown"
              width={24}
              height={24}
            />
          </div>
        </div>
        {errors.sscBatch && (
          <p className="mt-1 text-sm text-red-500">{errors.sscBatch}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2 font-medium">
          Profile Image
        </label>
        <div
          className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("profileImage")?.click()}
        >
          <input
            type="file"
            id="profileImage"
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center space-x-3 flex-col md:flex-row gap-2 md:gap-0">
            <div className="flex items-center text-[#94A3B8] space-x-2 border border-gray-300 rounded-lg px-2 py-1">
              <Image
                src="/images/upload-icon.svg"
                alt="Upload Image"
                width={16}
                height={16}
              />
              <span className="text-sm">Upload image</span>
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
}
