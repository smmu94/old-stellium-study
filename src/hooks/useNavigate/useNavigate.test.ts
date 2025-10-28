import { renderHook } from "@testing-library/react";
import { useNavigate } from "./index";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe("useNavigate", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it("should call router.push with the correct path", () => {
        const { result } = renderHook(() => useNavigate());
        result.current("/test-path");
        expect(mockPush).toHaveBeenCalledWith("/test-path");
    });

    it("should call router.push with another path", () => {
        const { result } = renderHook(() => useNavigate());
        result.current("/another-path");
        expect(mockPush).toHaveBeenCalledWith("/another-path");
    });
});
