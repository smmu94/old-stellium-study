import { render } from "@testing-library/react";
import Loader from ".";

describe("Loader Component", () => {
  it("renders the loader spinner", () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector("div > div");
  });
  it("displays loading text", () => {
    const { getByText } = render(<Loader />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});