import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GeneralInfoForm from ".";
import { createSubjectSchema } from "@/components/forms/createSubject/schema";
import { CreateSubjectFormData, initialData } from "@/components/forms/createSubject/form";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<CreateSubjectFormData>({
    defaultValues: initialData,
    resolver: yupResolver(createSubjectSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("GeneralInfoForm", () => {
  it("renders all form fields", () => {
    render(<GeneralInfoForm />, { wrapper: Wrapper });
    expect(screen.getByText("Subject Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Pick an icon for this subject")).toBeInTheDocument();
    expect(screen.getByText("Choose subject color")).toBeInTheDocument();
  });

  it("renders input fields with correct placeholders", () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].placeholder).toBe("Ex. Mathematics");
  });

  it("renders textarea for description", () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
    expect(textarea?.placeholder).toBe("Ex. This is a description of the subject");
  });

  it("allows typing in name field", async () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const nameInput = container.querySelector('input[placeholder="Ex. Mathematics"]') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Advanced Mathematics" } });

    await waitFor(() => {
      expect(nameInput.value).toBe("Advanced Mathematics");
    });
  });

  it("allows typing in description field", async () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const descriptionInput = container.querySelector("textarea") as HTMLTextAreaElement;

    fireEvent.change(descriptionInput, { target: { value: "A comprehensive math course" } });

    await waitFor(() => {
      expect(descriptionInput.value).toBe("A comprehensive math course");
    });
  });

  it("renders icon options", () => {
    render(<GeneralInfoForm />, { wrapper: Wrapper });
    expect(screen.getByText("Pick an icon for this subject")).toBeInTheDocument();
  });

  it("renders color options", () => {
    render(<GeneralInfoForm />, { wrapper: Wrapper });
    expect(screen.getByText("Choose subject color")).toBeInTheDocument();
  });

  it("has proper responsive layout", () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const flexDivs = container.querySelectorAll('[class*="flex-col lg:flex-row"]');
    expect(flexDivs.length).toBeGreaterThan(0);
  });

  it("renders with proper card styling", () => {
    const { container } = render(<GeneralInfoForm />, { wrapper: Wrapper });
    const cardDiv = container.firstChild;
    expect(cardDiv).toHaveClass("border");
    expect(cardDiv).toHaveClass("bg-white");
    expect(cardDiv).toHaveClass("rounded-sm");
    expect(cardDiv).toHaveClass("p-6");
  });
});
