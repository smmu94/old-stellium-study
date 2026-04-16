import { auth } from "@/lib/firebase";
import { AppDispatch } from "@/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { setInitializing, setUser } from "./authSlice";
import { handleFirebaseError, logOut, mapFirebaseUserToSafeUser } from "./utils";

export const listenToAuthChanges = (dispatch: AppDispatch) => {
  if (!auth) {
    dispatch(setUser(null));
    dispatch(setInitializing(false));
    return;
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const safeUser = mapFirebaseUserToSafeUser(firebaseUser);
      dispatch(setUser(safeUser));
    } else {
      dispatch(setUser(null));
    }
    dispatch(setInitializing(false));
  });
};

export const handleLogout = async () => {
  const { error } = await logOut();
  if (error) {
    handleFirebaseError(error);
  }
};
