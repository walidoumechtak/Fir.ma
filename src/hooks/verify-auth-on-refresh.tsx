"use client";

import { useRouter } from "next/navigation";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useAuth } from "@/hooks/useAuth";

import React, { useEffect, useState } from "react";

export const VerifyAuthOnRefresh = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const refresh = useRefreshToken();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        // Try to refresh token if no token exists
        if (!token) {
          const refreshedToken = await refresh();
          // If refresh failed and we're still mounted, redirect
          if (!refreshedToken && isMounted) {
            router.push("/login");
            return;
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          router.push("/login");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [refresh, router, token]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // If no token after loading finished, don't render protected content
  if (!token) {
    return null;
  }

  return <>{children}</>;
};
