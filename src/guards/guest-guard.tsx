"use client";

import { useAuth } from "@hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@config/routes.config";

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "idle" || status === "loading") return;

    if (isAuthenticated) {
      router.replace(ROUTES.dashboard.root);
    }
  }, [isAuthenticated, status, router]);

  if (status === "loading") {
    return null; 
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
