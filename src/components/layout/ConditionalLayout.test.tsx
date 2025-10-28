import { useFooterVisibility } from "@/hooks/useFooterVisibility";
import { render, screen } from "@testing-library/react";
import ConditionalLayout from "./ConditionalLayout";

jest.mock("@/hooks/useFooterVisibility", () => ({
    useFooterVisibility: jest.fn(),
}));

jest.mock("./footer", () => {
    return function MockFooter() {
        return <footer data-testid="footer">Mocked Footer</footer>;
    };
});

const mockUseFooterVisibility = useFooterVisibility as jest.MockedFunction<typeof useFooterVisibility>;

describe("ConditionalLayout Component", () => {
    const TestChildren = () => <div data-testid="test-children">Test Content</div>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render footer when showFooter is true", () => {
        mockUseFooterVisibility.mockReturnValue(true);
        render(
            <ConditionalLayout>
                <TestChildren />
            </ConditionalLayout>
        );
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("should NOT render footer when showFooter is false", () => {
        mockUseFooterVisibility.mockReturnValue(false);
        render(
            <ConditionalLayout>
                <TestChildren />
            </ConditionalLayout>
        );
        expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
        expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });


    it("should always render children regardless of footer visibility", () => {
        mockUseFooterVisibility.mockReturnValue(true);
        const { rerender } = render(
            <ConditionalLayout>
                <TestChildren />
            </ConditionalLayout>
        );
        expect(screen.getByTestId("test-children")).toBeInTheDocument();
        mockUseFooterVisibility.mockReturnValue(false);
        rerender(
            <ConditionalLayout>
                <TestChildren />
            </ConditionalLayout>
        );
        expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });
});