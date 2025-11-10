import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import { useAuthRedirect } from ".";
import { ROUTES } from "@/utils/routes/routes";

const mockReplace = jest.fn();
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => mockUsePathname(),
}));

const mockIsPublicRoute = jest.fn();

jest.mock("@/utils/routes/routes", () => ({
  ROUTES: {
    DASHBOARD: "/dashboard",
    AUTH: "/auth",
  },
  isPublicRoute: (...args: any[]) => mockIsPublicRoute(...args),
}));

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { user: null, loading: false, ...initialState },
    },
  });

const createWrapper =
  (initialState = {}) =>
    function Wrapper({ children }: any) {
      const store = createTestStore(initialState);
      return <Provider store={store}>{children}</Provider>;
    };

describe("useAuthRedirect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return isPublic as true when isPublicRoute returns true", () => {
    mockIsPublicRoute.mockReturnValue(true);
    mockUsePathname.mockReturnValue("/");
    const { result } = renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({ user: null, loading: false }),
    });
    expect(result.current.isPublic).toBe(true);
  });

  it("should return isPublic as false when isPublicRoute returns false", () => {
    mockIsPublicRoute.mockReturnValue(false);
    mockUsePathname.mockReturnValue("/dashboard");
    const { result } = renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({ user: null, loading: false }),
    });
    expect(result.current.isPublic).toBe(false);
  });

  it("should redirect to dashboard when user is logged in and isPublic is true", () => {
    mockIsPublicRoute.mockReturnValue(true);
    mockUsePathname.mockReturnValue("/auth");
    renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({
        user: { uid: "123", email: "test@example.com" },
        loading: false,
      }),
    });
    expect(mockReplace).toHaveBeenCalledWith(ROUTES.DASHBOARD);
  });

  it("should redirect to auth when user is not logged in and isPublic is false", () => {
    mockIsPublicRoute.mockReturnValue(false);
    mockUsePathname.mockReturnValue("/dashboard");
    renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({ user: null, loading: false }),
    });
    expect(mockReplace).toHaveBeenCalledWith(ROUTES.AUTH);
  });

  it("should not redirect when loading is true", () => {
    mockIsPublicRoute.mockReturnValue(false);
    mockUsePathname.mockReturnValue("/dashboard");
    renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({ user: null, loading: true }),
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should not redirect when user is logged in and isPublic is false", () => {
    mockIsPublicRoute.mockReturnValue(false);
    mockUsePathname.mockReturnValue("/dashboard");
    renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({
        user: { uid: "123", email: "test@example.com" },
        loading: false,
      }),
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should not redirect when user is not logged in and isPublic is true", () => {
    mockIsPublicRoute.mockReturnValue(true);
    mockUsePathname.mockReturnValue("/auth");
    renderHook(() => useAuthRedirect(), {
      wrapper: createWrapper({ user: null, loading: false }),
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
