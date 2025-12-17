"use client";

import { useDev } from "@hooks/use-dev";

interface DevGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DevGuard({ children, fallback = null }: DevGuardProps) {
  const { isDev } = useDev();

  if (!isDev) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
