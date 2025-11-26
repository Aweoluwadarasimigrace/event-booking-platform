import { apiClient } from "@/app/lib/client";
import { useState } from "react";
import { toast } from "sonner";
import Step1 from "./form details/Step1";
import Step2 from "./form details/Step2";
import Step3 from "./form details/Step3";
import { set } from "mongoose";

type Ticket = {
  name: string; // e.g. "VIP Ticket"
  isPaid: boolean; // true = paid, false = free
  price: number; // price in your currency
  quantity: number; // total tickets available
  limitPerUser: number; // max tickets per user
};

type EventFormData = {
  id: string;
  title: string;
  description: string;
  category: string;
  format: string;
  country: string;
  isVirtual: boolean;
  location: string | null;
  meetingLink: string | null;
  startDate: string;
  image: string | null;
  endDate: string;
  startTime: string;
  endTime: string;
  meridiem: string;
  tickets: Ticket[];
};

const initialData: EventFormData = {
  id: "",
  title: "",
  description: "",
  category: "",
  format: "",
  country: "",
  isVirtual: false,
  meetingLink: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  meridiem: "",
  location: "",
  image: null,
  tickets: [],
};

export default function useMultiForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [eventId, setEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1 = async () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.format ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.meridiem
    ) {
      setErrors({ message: "Please fill all required fields" });
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post("/api/Event/createevent", {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        format: formData.format,
        country: formData.country,
        isVirtual: formData.isVirtual,
        meetingLink: formData.isVirtual ? formData.meetingLink : null,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.isVirtual ? null : formData.location,
        meridiem: formData.meridiem,
      });
      setEventId(res?.data?._id);
      setStep(2);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async () => {
    if (!formData.image) {
      setErrors({ message: "Please upload an image" });
      return;
    }
    if (!eventId || !formData.image) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", formData.image);
      const res = await apiClient.post(`/api/Event/${eventId}/updateImage`, fd);
      setStep(3);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStep3 = async () => {
    if (!formData.tickets) {
      setErrors({ message: "Please add at least one ticket" });
      return;
    }
    if (!eventId) return;
    setLoading(true);
    try {
      const res = await apiClient.post(`/api/Event/${eventId}/ticket`, {
        tickets: formData.tickets,
      });
      toast.success("Event created successfully!");
      setFormData(initialData);
      setEventId(null);
      setStep(1);
    } catch (error) {
      console.error("Error adding tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded">
      {step === 1 && <Step1 data={formData} updateField={updateField} errors={errors} />}
      {step === 2 && <Step2 data={formData} updateField={updateField} errors={errors} />}
      {step === 3 && <Step3 data={formData} updateField={updateField} errors={errors} />}

      <div className="mt-4 flex justify-between">
        {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}

        {step === 1 && (
          <button onClick={handleStep1} disabled={loading}>
            {loading ? "Saving..." : "Next"}
          </button>
        )}
        {step === 2 && (
          <button onClick={handleStep2} disabled={loading}>
            {loading ? "Uploading..." : "Next"}
          </button>
        )}
        {step === 3 && (
          <button onClick={handleStep3} disabled={loading}>
            {loading ? "Saving..." : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
