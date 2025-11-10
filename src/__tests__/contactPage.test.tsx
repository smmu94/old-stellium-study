import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

jest.mock("@/components/forms/contactForm", () => ({
  __esModule: true,
  default: () => <form data-testid="contact-form">Mock Contact Form</form>,
}));

describe("ContactPage", () => {
  it("renders the heading correctly", () => {
    render(<ContactPage />);
    expect(
      screen.getByText("Contact and Support")
    ).toBeInTheDocument();
  });

  it("renders the description correctly", () => {
    render(<ContactPage />);
    expect(
      screen.getByText(
        /Do you have any questions, suggestions, or technical issues\?/i
      )
    ).toBeInTheDocument();
  });

  it("renders the ContactForm component", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
