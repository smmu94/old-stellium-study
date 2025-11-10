import { ROUTES } from "@/utils/routes/routes";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUpButton from "./index";


const mockNavigate = jest.fn();
jest.mock("@/hooks/useNavigate", () => ({
  useNavigate: () => mockNavigate,
}));

describe("SignUpButton", () => {
  it("should call navigate with /auth when clicked", () => {
    render(<SignUpButton />);
    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.AUTH);
  });
});
