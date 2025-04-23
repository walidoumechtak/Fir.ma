import axios from "../api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "./use-current-user";

export const getCsrfToken = async () => {
  const response = await axios.get("get-csrf-token/", {
    withCredentials: true,
  });
  return response.data;
};

const useRefreshToken = () => {
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const setUserStore = useUserStore((state) => state?.setUserStore);

  const refresh = async () => {
    try {
      const response = await axios.post(
        "refresh/",
        {},
        {
          withCredentials: true,
        },
      );

      setToken(response.data.access_token);
      setUser(response.data.user);
      setUserStore(response.data.user);
      return response.data.access_token;
    } catch (err: any) {
      // Clear auth state on refresh failure
      setToken(null);
      setUser(undefined);
      setUserStore(null);

      if (window.location.pathname.startsWith("/dashboard")) {
        router.push("/login");
      }
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
