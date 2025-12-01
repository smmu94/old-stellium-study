type Step = {
  id: number;
  label: string;
}

export type StepperProps = {
  steps: Step[];
  activeStep: number;
  onStepChange?: (stepId: number) => void;
  allowClickNavigation?: boolean;
  className?: string;
}