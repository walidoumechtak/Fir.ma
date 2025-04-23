"use client";

import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";
import { useUserStore } from "../../../hooks/use-current-user";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {
  const setUserStore = useUserStore((state) => state?.setUserStore);
  const setCodeStore = useUserStore((state) => state?.setCodeStore);
  const codeUserStore = useUserStore((state) => state?.code);
  const { setUser, setToken } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    // Access window safely in useEffect
    const urlCode = new URL(window.location.href).searchParams.get("code");
    setCode(urlCode);
    if (!window) setCode(codeUserStore);
  }, []);

  useEffect(() => {
    const fetchTokens = async () => {
      if (code) {
        try {
          const response = await axios.post(
            `/auth/google/callback/`,
            { code },
            {
              withCredentials: true,
            },
          );
          const data = response.data;
          if (data.access_token) {
            console.log("data.refresh_token: ", data.refresh_token);
            setUserStore(data.user);
            setUser({ ...data.user });
            setToken(data.access_token);
            setCodeStore(code);
            // setSuccess('Login successful')
            router.push("/dashboard"); // success
            console.log("Login successful", data);
          } else {
            console.error("Login failed");
          }
        } catch (error) {
          console.error("Error fetching tokens", error);
        }
      }
    };
    fetchTokens();
  }, [code]);

  return <p>Authenticating...</p>;
}
