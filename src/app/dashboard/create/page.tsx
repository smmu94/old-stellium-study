"use client";
import AssignmentsForm from "@/components/forms/createSubject/assignmentsForm";
import { CreateSubjectFormData, initialData } from "@/components/forms/createSubject/form";
import GeneralInfoForm from "@/components/forms/createSubject/generalInfoForm";
import { createSubjectSchema } from "@/components/forms/createSubject/schema";
import Button from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { useIsMobile } from "@/hooks/useIsMobile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const steps = [
  { id: 1, label: "General Info" },
  { id: 2, label: "Assignments" },
];

export default function CreateSubjectPage() {
  const [currentStep, setCurrentStep] = useState(steps[1].id);
  const methods = useForm<CreateSubjectFormData>({
    defaultValues: initialData,
    resolver: yupResolver(createSubjectSchema),
  });
  
  const isMobile = useIsMobile();

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await methods.trigger("generalInfo");
      if (!valid) return;
    }
    if (currentStep === 2) {
      methods.setValue("assignment", null, { shouldValidate: false, shouldDirty: false });
      const valid = await methods.trigger("assignments");
      if (!valid) return;
    }
    setCurrentStep((s) => s + 1);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que el paso 1 esté completo
    const generalInfoValid = await methods.trigger("generalInfo");
    if (!generalInfoValid) return;
    
    // Validar que haya al menos una asignación
    const assignmentsValid = await methods.trigger("assignments");
    if (!assignmentsValid) return;
    
    const data = methods.getValues();
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 min-h-0 h-full lg:overflow-hidden">
        <header className="flex flex-col items-start gap-4">
          <div>
            <h1 className="text-preset-2 font-bold text-oxford">
            Add a New Subject
            </h1>
            <p className="text-oxford mt-2">
            Fill in the details of the subject you wish to add
            </p>
          </div>
        </header>
        <section className="flex flex-col items-center flex-1 border border-oxford/50 rounded-xl w-full lg:overflow-hidden">
          <div className="w-full flex justify-center shrink-0">
            <div className="px-10 py-5 max-w-3xl w-full">
              <Stepper
                steps={steps}
                activeStep={currentStep}
                onStepChange={setCurrentStep}
                allowClickNavigation={true}
              />
            </div>
          </div>
          <div className="flex-1 w-full lg:h-0 border-t border-oxford/50 p-2 flex justify-center items-center bg-oxford/20 lg:overflow-hidden">
            {currentStep === steps[0].id && (
              <GeneralInfoForm />
            )}
            {currentStep === steps[1].id && (
              <AssignmentsForm />
            )}
          </div>
          <div className="w-full border-t border-oxford/50 p-4 flex justify-center md:justify-end gap-2 md:gap-10">
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                style="secondary"
              >
                {!isMobile ? "Back" : <HiChevronLeft size={20} />}
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
                style="secondary"
              >
                {!isMobile ? "Next" : <HiChevronRight size={20} />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button>Cancel</Button>
              <Button
                disabled={currentStep !== steps.length}
                type="submit"
              >
              Create
              </Button>
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
}
