"use client";

import { useAuth } from "@hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@config/routes.config";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null,
  redirectTo 
}: RoleGuardProps) {
  const { user, isAuthenticated, isMaster } = useAuth();
  const router = useRouter();

  const hasRole = isMaster || (user?.role_group && allowedRoles.includes(user.role_group));

  useEffect(() => {
    if (isAuthenticated && !hasRole && redirectTo) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, hasRole, redirectTo, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (!hasRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
