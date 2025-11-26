import useUserStore from "@/store/getCurrentUser";
import { useEffect } from "react";


const Step1 = ({ data, updateField, errors }: any) => {
const {user, fetchUser} = useUserStore();

useEffect(() => {
  fetchUser();

}, [fetchUser]);


    const categories = [
  "Technology",
  "Business",
  "Music",
  "Art",
  "Health",
  "Education",
  "Sports",
  "Entertainment",
];

const formats = [
  "Conference",
  "Concert",
  "Workshop",
  "Seminar",
  "Meetup",
  "Festival",
  "Webinar",
  "Competition",
];

const countries = ["nigeria", "ghana", "south africa", "kenya", "tanzania", "uganda"];

  return (
    <div className="max-w-[1200px] mx-auto">

        <div>
            <h1 className="text-3xl font-bold mb-4">Hey {user?.firstname}!</h1>
            <p className="mb-4 text-[#c3c4c7]">Let's set up your event - it will only take a few minutes</p>
        </div>
  
  {/* Title */}

  <h1 className="text-xl font-bold mb-4">Event Details</h1>
  <div className="flex flex-col space-y-1 mb-3">
    <label className="font-medium text-[#c4c5c8] mb-3">Event Title</label>
    <input
      type="text"
      placeholder="Enter event title"
      value={data.title}
      onChange={e => updateField("title", e.target.value)}
      className="border rounded-lg p-3 w-full placeholder-[#c4c5c8]"
      required
    />
    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  {/* Description */}
  <div className="flex flex-col space-y-1 mb-3">
    <label className="font-medium text-[#c4c5c8] mb-3">Description</label>
    <textarea
      placeholder="Write about the event..."
      value={data.description}
      onChange={e => updateField("description", e.target.value)}
      className="border rounded-lg p-3 w-full h-28 mb-3 placeholder-[#c4c5c8]"
    />
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>


  <h1 className="text-xl font-bold mb-4">Event Location</h1>

  {/* Country */}
  <div className="flex flex-col space-y-1 mb-3">
    <label className="font-medium text-[#c4c5c8] mb-3">Country</label>
    <select
      value={data.country}
      onChange={e => updateField("country", e.target.value)}
      className="border rounded-lg p-3 w-full"
    >
      <option value="">Select country</option>
      {countries.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  
  {/* Location or Link */}
  {!data.isVirtual && (
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-[#c4c5c8]">Location</label>
      <input
        type="text"
        placeholder="Enter event location"
        value={data.location}
        onChange={e => updateField("location", e.target.value)}
        className="border rounded-lg p-3 w-full placeholder-[#c4c5c8]"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  )}

  {/* Virtual Check */}
  <label className="flex items-center gap-2 text-[#c4c5c8] font-medium mb-3">
    <input
      type="checkbox"
      checked={data.isVirtual}
      onChange={e => updateField("isVirtual", e.target.checked)}
    />
    Virtual Event
  </label>

  {data.isVirtual && (
    <div className="flex flex-col space-y-1 mb-3">
      <label className="font-medium text-[#c4c5c8]">Meeting Link</label>
      <input
        type="text"
        placeholder="Enter meeting link"
        value={data.meetingLink}
        onChange={e => updateField("meetingLink", e.target.value)}
        className="border rounded-lg p-3 w-full"
      />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  )}

<h1 className="text-xl font-bold mb-4">Event Format</h1>
{/* Format */}
  <div className="flex flex-col space-y-1 mb-3">
    <label className="font-medium text-[#c4c5c8] mb-3">Format</label>
    <select
      value={data.format}
      onChange={e => updateField("format", e.target.value)}
      className="border rounded-lg p-3 w-full"
      required
    >
      <option value="">Select format</option>
      {formats.map(f => (
        <option key={f} value={f}>{f}</option>
      ))}
    </select>
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>


<h1 className="text-xl font-bold mb-4">Event Category</h1>
  {/* Category (Box Style) */}
  <div className="flex flex-col space-y-2 mb-3">
    <label className="font-medium text-[#c4c5c8] mb-3">Category</label>
    <div className="flex flex-wrap gap-2">
      {categories.map(c => (
        <div
          key={c}
          onClick={() => updateField("category", c)}
          className={`p-1 border rounded-md text-center cursor-pointer transition
            ${data.category === c ? "border-amber-600 bg-amber-100" : "border-gray-300"}
          `}
        >
          {c}
        </div>
      ))}
    </div>
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>


<h1 className="text-xl font-bold mb-4">When is your event?</h1>
{/* Dates */}
  <div className="grid grid-cols-2 gap-3 mb-3">
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-[#c4c5c8] mb-3">Start Date</label>
      <input
        type="date"
        value={data.startDate}
        onChange={e => updateField("startDate", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>

    <div className="flex flex-col space-y-1">
      <label className="font-medium text-[#c4c5c8] mb-3">Start Time</label>
      <input
        type="time"
        value={data.startTime}
        onChange={e => updateField("startTime", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  </div>

  {/* Time */}
  <div className="grid grid-cols-3 gap-3 mb-3">
     <div className="flex flex-col space-y-1">
      <label className="font-medium text-[#c4c5c8] mb-3">End Date</label>
      <input
        type="date"
        value={data.endDate}
        onChange={e => updateField("endDate", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>


    <div className="flex flex-col space-y-1">
      <label className="font-medium text-[#c4c5c8] mb-3">End Time</label>
      <input
        type="time"
        value={data.endTime}
        onChange={e => updateField("endTime", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>

  </div>

</div>

  )
}

export default Step1