"use client";

import { StepperProps } from "./types";

export default function Stepper({
  steps,
  activeStep,
  onStepChange,
  allowClickNavigation = false,
  className = "",
}: StepperProps) {
  const handleStepClick = (stepId: number) => {
    if (allowClickNavigation && onStepChange) {
      onStepChange(stepId);
    }
  };

  return (
    <div className="flex items-center justify-between w-full relative">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center relative z-10">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
              allowClickNavigation ? "cursor-pointer hover:scale-110" : ""
            } ${
              activeStep >= step.id
                ? "bg-oxford text-white border-oxford"
                : "bg-white text-oxford/40 border-oxford/40"
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            {step.id}
          </div>
          <span
            className={`absolute top-full mt-3 whitespace-nowrap text-preset-4-bolder ${
              activeStep >= step.id ? "text-oxford" : "text-oxford/40"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
      <div className="absolute top-5 left-0 w-full h-0.5 flex items-center z-0">
        {steps.slice(0, -1).map((step, index) => (
          <div
            key={`line-${step.id}`}
            className={`flex-1 h-0.5 transition-all duration-300 ${activeStep > step.id ? "bg-oxford" : "bg-oxford/40"}`}
            style={{
              marginLeft: index === 0 ? "20px" : "0",
              marginRight: index === steps.length - 2 ? "20px" : "0",
            }}
          />
        ))}
      </div>
    </div>
  );
}