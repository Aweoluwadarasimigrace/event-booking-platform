

const Step1 = ({ data, updateField }: any) => {

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
    <div>

            <div className="max-w-xl mx-auto p-6 border rounded space-y-3">
      <input type="text" placeholder="Title" value={data.title} onChange={e => updateField("title", e.target.value)} required />
      <textarea placeholder="Description" value={data.description} onChange={e => updateField("description", e.target.value)} />
      
      <select value={data.category} onChange={e => updateField("category", e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={data.format} onChange={e => updateField("format", e.target.value)} required>
        <option value="">Select Format</option>
        {formats.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      <select value={data.country} onChange={e => updateField("country", e.target.value)}>
        <option value="">Select Country</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <label>
        <input type="checkbox" checked={data.isVirtual} onChange={e => updateField("isVirtual", e.target.checked)} /> Virtual Event
      </label>

      {!data.isVirtual && (
        <input type="text" placeholder="Location" value={data.location} onChange={e => updateField("location", e.target.value)} />
      )}

      {data.isVirtual && (
        <input type="text" placeholder="Meeting Link" value={data.meetingLink} onChange={e => updateField("meetingLink", e.target.value)} />
      )}

      <div className="flex gap-2">
        <input type="date" value={data.startDate} onChange={e => updateField("startDate", e.target.value)} required />
        <input type="date" value={data.endDate} onChange={e => updateField("endDate", e.target.value)} required />
      </div>

      <div className="flex gap-2">
        <input type="time" value={data.startTime} onChange={e => updateField("startTime", e.target.value)} required />
        <input type="time" value={data.endTime} onChange={e => updateField("endTime", e.target.value)} required />
        <select value={data.meridiem} onChange={e => updateField("meridiem", e.target.value)}>
          {meridiems.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
    </div>

    </div>
  )
}

export default Step1