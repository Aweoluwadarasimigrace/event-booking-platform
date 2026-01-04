import React, { useState } from "react";

type Ticket = {
  name: string;
  isPaid: boolean;
  price: number;
  quantity: number;
  limitPerUser: number;
};

interface Step3Props {
  data: { tickets: Ticket[] };
  updateField: (field: string, value: any) => void;
  errors: Record<string, string>;
}

const Step3 = ({ data, updateField, errors }: Step3Props) => {
  const [name, setName] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [limitPerUser, setLimitPerUser] = useState(5);

  const addTicket = () => {
    if (!name || quantity <= 0) return;

    const newTicket: Ticket = { name, isPaid, price, quantity, limitPerUser };
    updateField("tickets", [...data.tickets, newTicket]);

    // reset form
    setName("");
    setIsPaid(true);
    setPrice(0);
    setQuantity(1);
    setLimitPerUser(5);
  };

  const removeTicket = (index: number) => {
    const newTickets = [...data.tickets];
    newTickets.splice(index, 1);
    updateField("tickets", newTickets);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-xl space-y-6 bg-white shadow">
      <h3 className="text-xl font-semibold text-gray-800">Add Tickets</h3>

      {/* Ticket Name */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-gray-700">Ticket Name</label>
        <input
          type="text"
          placeholder="Enter ticket name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Paid Ticket Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPaid}
          onChange={(e) => {
            const checked = e.target.checked;
            setIsPaid(checked);
            if (!checked) setPrice(0); // 🔥 important
          }}
          className="h-4 w-4"
        />

        <span className="font-medium text-gray-700">Paid Ticket</span>
      </div>

      {/* Price (only if Paid) */}
      {isPaid && (
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>
      )}

      {/* Quantity */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Limit Per User */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-gray-700">Limit Per User</label>
        <input
          type="number"
          placeholder="Enter limit per user"
          value={limitPerUser}
          min={1}
          onChange={(e) => setLimitPerUser(Number(e.target.value))}
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Add Ticket Button */}
      <button
        type="button"
        onClick={addTicket}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Ticket
      </button>

      {/* Ticket List */}
      {data.tickets.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Tickets Added</h4>
          <ul className="space-y-2">
            {data.tickets.map((t, i) => (
              <li
                key={i}
                className="flex justify-between items-center border p-2 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="text-gray-800">
                  <span className="font-medium">{t.name}</span> - {t.quantity}{" "}
                  {t.isPaid ? `(Paid: $${t.price})` : "(Free)"} - Limit/User:{" "}
                  {t.limitPerUser}
                </div>
                <button
                  onClick={() => removeTicket(i)}
                  className="text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Step3;
