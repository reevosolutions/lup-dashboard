"use client";

import { useAuth } from "@hooks/use-auth";

interface PermissionGuardProps {
  children: React.ReactNode;
  permissions: string | string[];
  fallback?: React.ReactNode;
}

export function PermissionGuard({ 
  children, 
  permissions, 
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission } = useAuth();

  const canAccess = hasPermission(permissions);

  if (!canAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
