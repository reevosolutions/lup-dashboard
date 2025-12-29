/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import { ROLE_GROUP_ORDER } from "@constants/roles.constants";

/**
 * Role groups are in this order:
 * - 0: master
 * - 10: system_administrators
 * - 20: application_account_owners
 * - 21: application_administrators
 * - 30: company_account_owners
 * - 31: company_administrators
 * - 50: administrators
 * - 51: agents
 * - 60: deliverers
 * - 70: sellers
 * - 100: users
 * @param {Levelup.V2.Auth.Entity.TRoleGroup | undefined} currentUserRoleGroup
 * @param {Levelup.V2.Auth.Entity.TRoleGroup} roleGroup
 * @returns boolean
 */
export function userHasRoleGroupOrAbove(currentUserRoleGroup: Levelup.V2.Auth.Entity.TRoleGroup | undefined, roleGroup: Levelup.V2.Auth.Entity.TRoleGroup) {
  if (!currentUserRoleGroup || !roleGroup) return false;
  return ROLE_GROUP_ORDER[currentUserRoleGroup] <= ROLE_GROUP_ORDER[roleGroup];
}

export function userMustBeLinkedToCompany(currentUserRoleGroup: Levelup.V2.Auth.Entity.TRoleGroup | undefined) {
  if (!currentUserRoleGroup) return false;
  return currentUserRoleGroup !== "users" && !userHasRoleGroupOrAbove(currentUserRoleGroup, "application_administrators");
}

export const roleGroupList = (groups: Levelup.V2.Auth.Entity.TRoleGroup[]) => groups;
