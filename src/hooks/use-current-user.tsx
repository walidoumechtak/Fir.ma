"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  profile_image: string;
  google_picture: string;
  // token: string
};

export interface UserActions {
  user: User | undefined;
  code: string | null;
  // token: string | undefined
  setUserStore: (user: User) => void;
  setCodeStore: (code: string) => void;
  // setTokenStore: (token: string) => void
  logout: () => void;
}

export const useUserStore = create<UserActions>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      code: null,
      setUserStore: (user: User) => {
        set({ user });
      },
      setCodeStore: (code: string) => {
        set({ code });
      },
      // setTokenStore: (token: string) => {
      //   console.log('Setting token:', token) // Debug log
      //   set({ token })
      // },
      logout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: "User",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
