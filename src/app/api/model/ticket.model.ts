import mongoose, { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
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

    limitPerUser: {
      type: Number,
      default: 5, // how many a single user can buy
    },

    buyers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Buyer",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Ticket = models.Ticket || model("Ticket", TicketSchema);
export default Ticket;
