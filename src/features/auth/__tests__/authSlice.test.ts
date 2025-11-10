import { AuthState, SafeUser } from "../types";
import authReducer, { setUser, setInitializing } from "../authSlice";
describe("authSlice", () => {
  const initialState: AuthState = {
    user: null,
    loading: true,
  };

  it("should return the initial state by default", () => {
    const state = authReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle setUser action", () => {
    const mockUser: SafeUser = {
      uid: "123",
      email: "test@example.com",
      displayName: "Test User",
      photoURL: null,
    };
    const state = authReducer(initialState, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
    const clearedState = authReducer(state, setUser(null));
    expect(clearedState.user).toBeNull();
  });

  it("should handle setInitializing action", () => {
    const state = authReducer(initialState, setInitializing(false));
    expect(state.loading).toBe(false);
    const stateTrue = authReducer(state, setInitializing(true));
    expect(stateTrue.loading).toBe(true);
  });
});
