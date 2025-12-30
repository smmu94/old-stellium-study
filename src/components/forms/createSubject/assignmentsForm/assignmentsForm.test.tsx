import { yupResolver } from "@hookform/resolvers/yup";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import AssignmentsForm from ".";
import { CreateSubjectFormData, initialData } from "@/components/forms/createSubject/form";
import { createSubjectSchema } from "@/components/forms/createSubject/schema";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<CreateSubjectFormData>({
    defaultValues: initialData,
    resolver: yupResolver(createSubjectSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("AssignmentsForm", () => {
  it("renders the form title", () => {
    render(<AssignmentsForm />, { wrapper: Wrapper });
    expect(screen.getByText("Assignments, Tests and Tasks")).toBeInTheDocument();
  });

  it("renders all input fields for adding assignments", () => {
    render(<AssignmentsForm />, { wrapper: Wrapper });
    expect(screen.getByText("Assignment Title")).toBeInTheDocument();
    expect(screen.getByText("Assignment Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
  });

  it("renders Add Assignment button", () => {
    render(<AssignmentsForm />, { wrapper: Wrapper });
    const button = screen.getByText("Add Assignment");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("displays empty state message when no assignments added", () => {
    render(<AssignmentsForm />, { wrapper: Wrapper });
    expect(screen.getByText("No assignments added yet")).toBeInTheDocument();
  });

  it("allows typing in title field", async () => {
    const { container } = render(<AssignmentsForm />, { wrapper: Wrapper });
    const titleInput = container.querySelector('input[placeholder="Ex. First Math Test"]') as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "First Math Test" } });

    await waitFor(() => {
      expect(titleInput.value).toBe("First Math Test");
    });
  });

  it("renders with proper card styling", () => {
    const { container } = render(<AssignmentsForm />, { wrapper: Wrapper });
    const cardDiv = container.firstChild;
    expect(cardDiv).toHaveClass("border");
    expect(cardDiv).toHaveClass("bg-white");
    expect(cardDiv).toHaveClass("rounded-sm");
    expect(cardDiv).toHaveClass("p-6");
  });

  it("renders input section with border styling", () => {
    const { container } = render(<AssignmentsForm />, { wrapper: Wrapper });
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0]).toHaveClass("border");
    expect(sections[0]).toHaveClass("bg-white");
    expect(sections[0]).toHaveClass("rounded-md");
  });

  it("has proper responsive layout", () => {
    const { container } = render(<AssignmentsForm />, { wrapper: Wrapper });
    const flexDivs = container.querySelectorAll('[class*="flex-col lg:flex-row"]');
    expect(flexDivs.length).toBeGreaterThan(0);
  });

  it("renders with scrollbar styling", () => {
    const { container } = render(<AssignmentsForm />, { wrapper: Wrapper });
    const scrollableDiv = container.firstChild;
    expect(scrollableDiv).toHaveClass("scrollbar-thin");
    expect(scrollableDiv).toHaveClass("scrollbar-thumb-oxford");
  });
});
