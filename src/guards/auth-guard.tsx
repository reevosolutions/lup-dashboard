"use client";

import { useAuth } from "@hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@config/routes.config";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if(!isChecking) return;
    if (status === "idle" || status === "loading") return;

    if (!isAuthenticated) {
      const loginPath = ROUTES.public.login;
      // Avoid infinite redirect loop
      if (pathname !== loginPath) {
        const searchParams = new URLSearchParams({
          returnUrl: pathname,
        });
        router.replace(`${loginPath}?${searchParams.toString()}`);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChecking(false);
  }, [isAuthenticated, status, router, pathname, isChecking]);

  if (status === "loading" || isChecking) {
    return fallback || null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
