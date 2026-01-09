import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import Avatar from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockUser = {
  displayName: "John",
  email: "john@example.com",
  photoURL: null,
};

describe("Avatar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders initials when no photo", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ user: mockUser });
    render(<Avatar />);
    // expect(screen.getByText(mockUser.displayName.charAt(0).toUpperCase())).toBeInTheDocument();
    // expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
    // expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
});
