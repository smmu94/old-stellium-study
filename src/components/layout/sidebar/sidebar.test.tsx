import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from ".";
import { DASHBOARD_ITEMS } from "./constants";
import { handleLogout } from "@/features/auth/authThunks";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/features/auth/authThunks", () => ({
  handleLogout: jest.fn(),
}));

jest.mock("./components/avatar", () => ({
  __esModule: true,
  default: () => <div data-testid="avatar" />,
}));

jest.mock("./components/item", () => ({
  __esModule: true,
  default: ({ title, onClick }: any) => (
    <div data-testid="item" onClick={onClick}>
      {title}
    </div>
  ),
}));

const mockReplace = jest.fn();
const mockOnClose = jest.fn();

describe("Sidebar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
  });
  it("renders Sidebar and Avatar", () => {
    render(<Sidebar isOpen onClose={mockOnClose} />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });
  it("renders all DASHBOARD_ITEMS", () => {
    render(<Sidebar isOpen onClose={mockOnClose} />);
    const items = screen.getAllByTestId("item");
    expect(items).toHaveLength(DASHBOARD_ITEMS.length);
    DASHBOARD_ITEMS.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  it("calls onClose when close button is clicked", () => {
    render(<Sidebar isOpen onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
  it("calls onClose when an item is clicked", () => {
    render(<Sidebar isOpen onClose={mockOnClose} />);
    const item = screen.getByText(DASHBOARD_ITEMS[0].title);
    fireEvent.click(item);
    expect(mockOnClose).toHaveBeenCalled();
  });
  it("calls handleLogout and router.replace when Log Out is clicked", async () => {
    (handleLogout as jest.Mock).mockResolvedValueOnce(undefined);
    render(<Sidebar isOpen onClose={mockOnClose} />);
    const logoutButton = screen.getByText(/log out/i);
    fireEvent.click(logoutButton);
    expect(handleLogout).toHaveBeenCalled();
    await Promise.resolve();
    expect(mockReplace).toHaveBeenCalledWith("/auth");
  });
  it("applies correct classes based on isOpen prop", () => {
    const { rerender } = render(<Sidebar isOpen onClose={mockOnClose} />);
    const aside = screen.getByRole("complementary") || screen.getByTestId("sidebar");
    expect(aside.className).toContain("translate-x-0");
    rerender(<Sidebar isOpen={false} onClose={mockOnClose} />);
    expect(aside.className).toContain("-translate-x-full");
  });
});
