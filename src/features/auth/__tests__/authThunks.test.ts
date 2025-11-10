import { setUser, setInitializing } from "../authSlice";
import * as authUtils from "../utils";
import { onAuthStateChanged } from "firebase/auth";
import { handleLogout, listenToAuthChanges } from "../authThunks";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(() => ({})),
    GoogleAuthProvider: jest.fn().mockImplementation(() => ({
      setCustomParameters: jest.fn(),
    })),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  };
});

jest.mock("../utils", () => ({
  mapFirebaseUserToSafeUser: jest.fn(),
  handleFirebaseError: jest.fn(),
  logOut: jest.fn(),
}));

describe("authThunk", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listenToAuthChanges", () => {
    it("dispatches setUser with safeUser when firebaseUser exists", () => {
      const mockFirebaseUser = { uid: "123" };
      const mockSafeUser = { uid: "123", email: "test@example.com", displayName: "Test", photoURL: null };
      (authUtils.mapFirebaseUserToSafeUser as jest.Mock).mockReturnValue(mockSafeUser);
      (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
        callback(mockFirebaseUser);
      });
      listenToAuthChanges(mockDispatch);
      expect(authUtils.mapFirebaseUserToSafeUser).toHaveBeenCalledWith(mockFirebaseUser);
      expect(mockDispatch).toHaveBeenCalledWith(setUser(mockSafeUser));
      expect(mockDispatch).toHaveBeenCalledWith(setInitializing(false));
    });

    it("dispatches setUser null when firebaseUser is null", () => {
      (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
        callback(null);
      });
      listenToAuthChanges(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setUser(null));
      expect(mockDispatch).toHaveBeenCalledWith(setInitializing(false));
    });
  });

  describe("handleLogout", () => {
    it("calls handleFirebaseError when logOut returns error", async () => {
      (authUtils.logOut as jest.Mock).mockResolvedValue({ error: "some error" });
      await handleLogout();
      expect(authUtils.handleFirebaseError).toHaveBeenCalledWith("some error");
    });

    it("does not call handleFirebaseError when logOut succeeds", async () => {
      (authUtils.logOut as jest.Mock).mockResolvedValue({ error: null });
      await handleLogout();
      expect(authUtils.handleFirebaseError).not.toHaveBeenCalled();
    });
  });
});
