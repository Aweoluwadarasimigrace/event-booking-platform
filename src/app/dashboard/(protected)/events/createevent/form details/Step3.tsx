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
   <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-8">
  <h3 className="text-2xl font-semibold text-gray-900">
    Add Tickets
  </h3>

  {/* Ticket Name */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Ticket Name
    </label>
    <input
      type="text"
      placeholder="e.g. VIP Ticket"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.message && (
      <p className="text-xs text-red-500">{errors.message}</p>
    )}
  </div>

  {/* Paid Toggle */}
  <div className="flex items-center justify-between bg-gray-50 border rounded-xl p-4">
    <div>
      <p className="font-medium text-gray-800">Paid Ticket</p>
      <p className="text-sm text-gray-500">
        Toggle if this ticket requires payment
      </p>
    </div>

    <input
      type="checkbox"
      checked={isPaid}
      onChange={(e) => {
        const checked = e.target.checked;
        setIsPaid(checked);
        if (!checked) setPrice(0);
      }}
      className="h-5 w-5 accent-blue-500"
    />
  </div>

  {/* Price */}
  {isPaid && (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Price ($)
      </label>
      <input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}

  {/* Quantity & Limit */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Quantity
      </label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Limit Per User
      </label>
      <input
        type="number"
        min={1}
        value={limitPerUser}
        onChange={(e) => setLimitPerUser(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Add Button */}
  <button
    type="button"
    onClick={addTicket}
    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
  >
    Add Ticket
  </button>

  {/* Ticket List */}
  {data.tickets.length > 0 && (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800">
        Tickets Added
      </h4>

      <ul className="space-y-3">
        {data.tickets.map((t, i) => (
          <li
            key={i}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-4 bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-900">
                {t.name}
              </p>
              <p className="text-sm text-gray-600">
                {t.quantity} available •{" "}
                {t.isPaid ? `₦${t.price}` : "Free"} • Limit {t.limitPerUser}
              </p>
            </div>

            <button
              onClick={() => removeTicket(i)}
              className="text-sm text-red-500 hover:underline"
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
