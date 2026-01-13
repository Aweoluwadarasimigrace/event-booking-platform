import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    eventOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true, // e.g. "VIP Ticket"
    },

    isPaid: {
      type: Boolean,
      default: true, // false = free ticket
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1, // minimum 1 ticket
    },
    sold: {
      type: Number,
      default: 0, // tickets sold
      min: 0,
    },
    limitPerUser: {
      type: Number,
      default: 5, // how many a single user can buy
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
export default Ticket;
