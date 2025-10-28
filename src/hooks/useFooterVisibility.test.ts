import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useFooterVisibility } from "./useFooterVisibility";
import { ROUTES } from "@/utils/routes/routes";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("useFooterVisibility Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return true for home route", () => {
        mockUsePathname.mockReturnValue(ROUTES.HOME);
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(true);
    });

    it("should return true for features route", () => {
        mockUsePathname.mockReturnValue(ROUTES.FEATURES);
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(true);
    });

    it("should return true for about route", () => {
        mockUsePathname.mockReturnValue(ROUTES.ABOUT);
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(true);
    });

    it("should return true for contact route", () => {
        mockUsePathname.mockReturnValue(ROUTES.CONTACT);
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(true);
    });

    it("should return true for auth route", () => {
        mockUsePathname.mockReturnValue(ROUTES.AUTH);
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(true);
    });

    it("should return false for unknown/private routes", () => {
        mockUsePathname.mockReturnValue("/admin");
        const { result } = renderHook(() => useFooterVisibility());
        expect(result.current).toBe(false);
    });
});