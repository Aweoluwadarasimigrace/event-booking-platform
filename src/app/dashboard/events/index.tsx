"use client";
import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Step Header */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`flex-1 text-center pb-2 border-b-4 transition-all ${
              step === num ? "border-amber-500 text-amber-600 font-semibold" : "border-gray-300 text-gray-500"
            }`}
          >
            Step {num}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[150px] text-center">
        {step === 1 && <p>Step 1: Basic Information</p>}
        {step === 2 && <p>Step 2: Details</p>}
        {step === 3 && <p>Step 3: Review & Submit</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`px-4 py-2 rounded-lg ${
            step === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600 text-white"
          }`}
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={step === 3}
          className={`px-4 py-2 rounded-lg ${
            step === 3 ? "bg-gray-300 cursor-not-allowed" : "bg-amber-500 text-white"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
