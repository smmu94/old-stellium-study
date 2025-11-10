import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from ".";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

jest.mock("emailjs-com", () => ({
  send: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("ContactForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all inputs and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  it("submits the form and calls emailjs.send", async () => {
    (emailjs.send as jest.Mock).mockResolvedValue({});
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello World" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        {
          name: "John Doe",
          email: "john@example.com",
          subject: "Test Subject",
          message: "Hello World",
        },
        expect.any(String)
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Message sent successfully!",
        expect.any(Object)
      );
    });
  });

  it("shows error toast if emailjs.send fails", async () => {
    (emailjs.send as jest.Mock).mockRejectedValue(new Error("Failed"));
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello World" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to send message. Please try again later.",
        expect.any(Object)
      );
    });
  });
});
