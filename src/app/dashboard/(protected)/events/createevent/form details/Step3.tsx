import { useState } from "react";


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
}

const Step3 = ({ data, updateField }: Step3Props) => {

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
    <div>
<div className="space-y-4 border p-4 rounded">
      <h3 className="text-lg font-semibold">Add Tickets</h3>

      <input type="text" placeholder="Ticket Name" value={name} onChange={e => setName(e.target.value)} />
      <label>
        <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} />
        Paid Ticket
      </label>
      {isPaid && (
        <input type="number" placeholder="Price" value={price} min={0} onChange={e => setPrice(Number(e.target.value))} />
      )}
      <input type="number" placeholder="Quantity" value={quantity} min={1} onChange={e => setQuantity(Number(e.target.value))} />
      <input type="number" placeholder="Limit Per User" value={limitPerUser} min={1} onChange={e => setLimitPerUser(Number(e.target.value))} />

      <button type="button" onClick={addTicket} className="bg-blue-500 text-white px-3 py-1 rounded">Add Ticket</button>

      <ul className="mt-3 space-y-1">
        {data.tickets.map((t, i) => (
          <li key={i} className="flex justify-between items-center">
            {t.name} - {t.quantity} {t.isPaid ? `(Paid: $${t.price})` : "(Free)"} - Limit/User: {t.limitPerUser}
            <button onClick={() => removeTicket(i)} className="text-red-500 ml-2">Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Step3