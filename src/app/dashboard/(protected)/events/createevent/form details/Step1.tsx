

const Step1 = ({ data, updateField, errors }: any) => {

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
const meridiems = ["AM", "PM"];
  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl space-y-6 bg-white shadow">
  
  {/* Title */}
  <div className="flex flex-col space-y-1">
    <label className="font-medium text-gray-700">Event Title</label>
    <input
      type="text"
      placeholder="Enter event title"
      value={data.title}
      onChange={e => updateField("title", e.target.value)}
      className="border rounded-lg p-3 w-full"
      required
    />
    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  {/* Description */}
  <div className="flex flex-col space-y-1">
    <label className="font-medium text-gray-700">Description</label>
    <textarea
      placeholder="Write about the event..."
      value={data.description}
      onChange={e => updateField("description", e.target.value)}
      className="border rounded-lg p-3 w-full h-28"
    />
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  {/* Category (Box Style) */}
  <div className="flex flex-col space-y-2">
    <label className="font-medium text-gray-700">Category</label>
    <div className="grid grid-cols-2 gap-2">
      {categories.map(c => (
        <div
          key={c}
          onClick={() => updateField("category", c)}
          className={`p-3 border rounded-lg text-center cursor-pointer transition
            ${data.category === c ? "border-blue-600 bg-blue-50" : "border-gray-300"}
          `}
        >
          {c}
        </div>
      ))}
    </div>
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </div>

  {/* Format */}
  <div className="flex flex-col space-y-1">
    <label className="font-medium text-gray-700">Format</label>
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

  {/* Country */}
  <div className="flex flex-col space-y-1">
    <label className="font-medium text-gray-700">Country</label>
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

  {/* Virtual Check */}
  <label className="flex items-center gap-2 text-gray-700 font-medium">
    <input
      type="checkbox"
      checked={data.isVirtual}
      onChange={e => updateField("isVirtual", e.target.checked)}
    />
    Virtual Event
     {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
  </label>

  {/* Location or Link */}
  {!data.isVirtual && (
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">Location</label>
      <input
        type="text"
        placeholder="Enter event location"
        value={data.location}
        onChange={e => updateField("location", e.target.value)}
        className="border rounded-lg p-3 w-full"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  )}

  {data.isVirtual && (
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">Meeting Link</label>
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

  {/* Dates */}
  <div className="grid grid-cols-2 gap-3">
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">Start Date</label>
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
      <label className="font-medium text-gray-700">End Date</label>
      <input
        type="date"
        value={data.endDate}
        onChange={e => updateField("endDate", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  </div>

  {/* Time */}
  <div className="grid grid-cols-3 gap-3">
    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">Start Time</label>
      <input
        type="time"
        value={data.startTime}
        onChange={e => updateField("startTime", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>

    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">End Time</label>
      <input
        type="time"
        value={data.endTime}
        onChange={e => updateField("endTime", e.target.value)}
        className="border rounded-lg p-3 w-full"
        required
      />
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>

    <div className="flex flex-col space-y-1">
      <label className="font-medium text-gray-700">AM/PM</label>
      <select
        value={data.meridiem}
        onChange={e => updateField("meridiem", e.target.value)}
        className="border rounded-lg p-3 w-full"
      >
        {meridiems.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  </div>

</div>

  )
}

export default Step1