"use client";

import { listenToAuthChanges } from "@/features/auth/authThunks";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";

function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    listenToAuthChanges(dispatch);
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}