import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: {
      type: String,
      default: "https://res.cloudinary.com/datfugth6/image/upload/v1761205537/downloadss_y8c47e.jpg"
    },
    // ✅ Event Category — choose from 8 predefined options
    category: {
      type: String,
      enum: [
        "Technology",
        "Business",
        "Music",
        "Art",
        "Health",
        "Education",
        "Sports",
        "Entertainment",
      ],
      required: true,
    },

    // ✅ Event Format — type of event
    format: {
      type: String,
      enum: [
        "Conference",
        "Concert",
        "Workshop",
        "Seminar",
        "Meetup",
        "Festival",
        "Webinar",
        "Competition",
      ],
      required: true,
    },

    isVirtual: { type: Boolean, default: false },
    location: { type: String },
    meetingLink: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    meridiem: { type: String, enum: ["AM", "PM"], required: true },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
