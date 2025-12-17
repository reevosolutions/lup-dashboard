import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthStatus,
  logoutUser,
} from "@/store/features/auth/auth-slice";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  // Role helpers
  const isMaster = user?.role_group === "master";
  const isSeller = user?.role_group === "sellers";
  const isAgent = user?.role_group === "agents";
  const isAdmin = user?.role_group === "administrators";
  const isDeliverer = user?.role_group === "deliverers";
  const isAppAdmin = user?.role_group === "application_administrators";
  const isCompanyAdmin = user?.role_group === "company_administrators";
  const isCompanyOwner = user?.role_group === "company_account_owners";
  const isSystemAdmin = user?.role_group === "system_administrators";
  const isAppOwner = user?.role_group === "application_account_owners";

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  // Permission check placeholder - to be implemented fully with permission data
  const hasPermission = useCallback(
    (permissionName: string | string[]) => {
      if (isMaster) return true;
      // TODO: Implement actual permission checking logic when permissions are in state
      return false;
    },
    [isMaster]
  );

  return {
    user,
    isAuthenticated,
    status,
    logout,
    hasPermission,
    isMaster,
    isSeller,
    isAgent,
    isAdmin,
    isDeliverer,
    isAppAdmin,
    isCompanyAdmin,
    isCompanyOwner,
    isSystemAdmin,
    isAppOwner,
  };
};
