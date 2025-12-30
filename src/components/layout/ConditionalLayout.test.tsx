import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ConditionalLayout from "./ConditionalLayout";
import authReducer from "@/features/auth/authSlice";

jest.mock("@/hooks/useAuthRedirect", () => ({
  useAuthRedirect: jest.fn(),
}));

jest.mock("./footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Mocked Footer</footer>;
  };
});

jest.mock("./navbar", () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Mocked Navbar</nav>;
  };
});

jest.mock("@/components/ui/loader", () => {
  return function MockLoader() {
    return <div data-testid="loader">Mocked Loader</div>;
  };
});

const mockUseAuthRedirect = require("@/hooks/useAuthRedirect")
  .useAuthRedirect as jest.MockedFunction<typeof import("@/hooks/useAuthRedirect").useAuthRedirect>;
  
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        loading: false,
        ...initialState,
      },
    },
  });
};

describe("ConditionalLayout Component", () => {
  const TestChildren = () => <div data-testid="test-children">Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render footer and navbar when isPublic is true", () => {
    mockUseAuthRedirect.mockReturnValue({ isPublic: true });
    const store = createTestStore({ user: null, loading: false });

    render(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("should NOT render footer or navbar when isPublic is false", () => {
    mockUseAuthRedirect.mockReturnValue({ isPublic: false });
    const store = createTestStore({ user: null, loading: false });

    render(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("should always render children regardless of layout visibility", () => {
    mockUseAuthRedirect.mockReturnValue({ isPublic: true });
    const store = createTestStore({ user: null, loading: false });

    const { rerender } = render(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.getByTestId("test-children")).toBeInTheDocument();

    mockUseAuthRedirect.mockReturnValue({ isPublic: false });
    rerender(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("should render loader when loading is true", () => {
    mockUseAuthRedirect.mockReturnValue({ isPublic: true });
    const store = createTestStore({ user: null, loading: true });

    render(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByTestId("test-children")).not.toBeInTheDocument();
  });

  it("should render loader when user is logged in and isPublic is true", () => {
    mockUseAuthRedirect.mockReturnValue({ isPublic: true });
    const store = createTestStore({ 
      user: { uid: "123", email: "test@example.com", displayName: "Test User", photoURL: null }, 
      loading: false 
    });

    render(
      <Provider store={store}>
        <ConditionalLayout>
          <TestChildren />
        </ConditionalLayout>
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByTestId("test-children")).not.toBeInTheDocument();
  });
});
